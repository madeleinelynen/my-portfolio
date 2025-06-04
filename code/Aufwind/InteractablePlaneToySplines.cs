using A4VR.Tools.Unity.Core;
using A4VR.Tools.Unity.LevelLoading;
using Dreamteck.Splines;
using Leap.Unity.Interaction;
using Sirenix.OdinInspector;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UIElements;

[System.Serializable] public class UnityEventBool : UnityEvent<bool> { }

[System.Serializable]
public struct SplineCollection
{
    public SplinePoint[] SplinePointGroup;
}

[RequireComponent(typeof(Collider), typeof(Rigidbody), typeof(SplineFollower))]
public class InteractablePlaneToySplines : MonoBehaviour
{
    public enum FlyingRouteModes { Random, Angle }
    public FlyingRouteModes FlyingRouteMode;

    [SerializeField] private bool _debugMode;
    [SerializeField] private bool _randomGeneratedPoints;

    #region References

    [SerializeField, FoldoutGroup("Scene References")] private GameObject _tableObject;
    [SerializeField, FoldoutGroup("Scene References")] private SplineComputer _splineComputer;
    [SerializeField, FoldoutGroup("Scene References")] private BoxCollider _spawnRoom;
    [SerializeField, FoldoutGroup("Scene References")] private Color EditorColorPicker;

    [SerializeField, FoldoutGroup("Rotation")] private Transform _planeRotatorPivot;
    [SerializeField, FoldoutGroup("Rotation")] private Transform _objectToRotate;
    [SerializeField, FoldoutGroup("Rotation")] private Vector3 _rotationValues;

    #endregion References

    [FoldoutGroup("UnityEvents")] public UnityEventBool OnMovementChanged;

    [SerializeField] private float _fallHeightY;
    [SerializeField, MinValue(0)] private float _lastPointYOffset = .1f;
    [SerializeField, MinValue(0)] private float _minThrowVelocity = 1f;
    [SerializeField, MinValue(1)] private float _throwVelocityMultiplier = 1.2f;
    [SerializeField, MinValue(0)] private float _respawnTime = 2f;

    [SerializeField] private AnimationCurve _decelerationCurve;
    [SerializeField, MinValue(0)] private float _goalDecelertionValue = .5f;
    [SerializeField, MinValue(0)] private float _lerpSpeed = 100f;

    [SerializeField, MinMax(.1f, 2f), BoxGroup("Slider"), GUIColor(nameof(GetPickerColor))] private Range _firstPointLength = new Range(0.3f, 0.7f);
    [SerializeField, MinMax(0.1f, 5), BoxGroup("Slider"), GUIColor(nameof(GetPickerColor))] private Range _followSpeedRange = new Range(.1f, 2.5f);
    [SerializeField, MinMax(-1, 1), BoxGroup("Slider"), GUIColor(nameof(GetPickerColor))] private Range _followSpeedSensibility = new Range(-.5f, .5f);
    [SerializeField, MinMax(-90, 90), BoxGroup("Slider"), GUIColor(nameof(GetPickerColor))] private Range localXTilt = new Range(-10f, 10f);

    [SerializeField, MinMax(3, 30), ShowIf(nameof(_randomGeneratedPoints)), BoxGroup("Random Mode Settings"), GUIColor(nameof(GetPickerColor))] private Range _pointCountRange;
    [SerializeField, MinValue(0), ShowIf(nameof(_randomGeneratedPoints)), BoxGroup("Random Mode Settings"), GUIColor(nameof(GetPickerColor))] private float _minFreeFlightTime = .5f;
    [SerializeField, MinValue(0), ShowIf(nameof(_randomGeneratedPoints)), BoxGroup("Random Mode Settings"), GUIColor(nameof(GetPickerColor))] private float _spawnRoomSizeOffset = .2f;
    [SerializeField, MinMax(0, 5), ShowIf(nameof(_randomGeneratedPoints)), BoxGroup("Random Mode Settings"), GUIColor(nameof(GetPickerColor))] private Range _distanceRange = new Range(.6f, 5f);

    [SerializeField] private List<SplineCollection> _splineCollection;

    private LeapStandardGrabbable _leapGrabbable;
    private SplineFollower _splineFollower;
    private Rigidbody _rb;
    private Collider _collider;
    private Coroutine _resetRotCoroutine;
    private InteractionBehaviour _interactionBehaviour;
    private SplinePoint[] _points;
    private Quaternion _startQuaternion;
    private Vector3 _endPosition, _velocity;

    [HideInInspector] public bool _grabBlocked;
    private bool _generatePointsFinish;
    private bool _isMoving;
    private bool _nearEndOfSpline;
    private float _currentFollowSpeed;
    private bool _sceneSwitchGrabBlock;

    private KeyValuePair<Vector3, float> _lastVelocityState;

    private const int NextLevelIndex = 3;
    private const float SplineEndNormalized = .92f;

    private System.Action<int> _onDissolveStart;

    protected virtual void OnEnable()
    {
        LeapStandardGrabbable.GrabbingHandDeactivated += GrabbingHandIsInactive;

        _interactionBehaviour.OnGraspBegin += OnGrabBegin;
        _interactionBehaviour.OnGraspEnd += OnGrabEnd;

        _onDissolveStart = (_) => DeactivateInteraction();
        DissolveEffectHandler.OnDissolveStarted += _onDissolveStart;
        LevelLoadingBehaviour.OnLoadLevel += LevelLoad;
    }

    protected virtual void OnDisable()
    {
        LeapStandardGrabbable.GrabbingHandDeactivated -= GrabbingHandIsInactive;

        _interactionBehaviour.OnGraspBegin -= OnGrabBegin;
        _interactionBehaviour.OnGraspEnd -= OnGrabEnd;

        _onDissolveStart = (_) => DeactivateInteraction();
        DissolveEffectHandler.OnDissolveStarted -= _onDissolveStart;
        LevelLoadingBehaviour.OnLoadLevel -= LevelLoad;
    }

    //SOUND
    private SFXToyPlaneSoundManager _soundmanager;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
        _collider = GetComponent<Collider>();
        _splineFollower = GetComponent<SplineFollower>();
        _leapGrabbable = GetComponent<LeapStandardGrabbable>();
        _interactionBehaviour = GetComponent<InteractionBehaviour>();

        //SOUND
        _soundmanager = GetComponent<SFXToyPlaneSoundManager>();

        _startQuaternion = transform.rotation;
        _endPosition = new Vector3(transform.position.x, transform.position.y + _lastPointYOffset, transform.position.z);

        SetPlaneToDefaultSettings();
    }

    private void SetPlaneToDefaultSettings()
    {
        MovementChanged(false);

        //SOUND
        _soundmanager.StopEngineSound();

        _splineFollower.follow = false;

        _rb.velocity = Vector3.zero;
        _rb.angularVelocity = Vector3.zero;
        _rb.useGravity = true;
        _rb.isKinematic = false;
    }

    private void GrabbingHandIsInactive()
    {
        if (!_grabBlocked) return;

        _grabBlocked = false;
        _collider.isTrigger = false;
        _rb.isKinematic = false;

        MovementChanged(true);

        _rb.velocity = _velocity * _throwVelocityMultiplier;
        transform.LookAt(transform.position + _rb.velocity.normalized, Vector3.up);

        if (_randomGeneratedPoints)
        {
            _generatePointsFinish = false;

            StartCoroutine(GenerateRandomSpline());
            StartCoroutine(Movement());

            return;
        }

        if (_splineCollection.Count < 0)
        {
            _rb.useGravity = true;
            Debug.LogError($"No generated SplinePoints found for Object {gameObject.name}");
            return;
        }

        ChooseSplineFromList(Random.Range(0, _splineCollection.Count));
    }

    public void OnGrabBegin()
    {
        if (_sceneSwitchGrabBlock) return;
        if (_grabBlocked || _isMoving) return;

        _leapGrabbable.OnGrabBegin();
        _soundmanager.PlayGrabSound();

        _grabBlocked = true;
        _collider.isTrigger = true;

        _rb.useGravity = false;
        _rb.isKinematic = true;
    }

    public void OnGrabEnd()
    {
        if (_sceneSwitchGrabBlock) return;
        if (!_grabBlocked) return;

        int nearestIndex = GetRouteIndexWithAngle();

        _leapGrabbable.OnGrabEnd();

        _grabBlocked = false;
        _collider.isTrigger = false;
        _rb.isKinematic = false;

        if (_velocity.magnitude * _throwVelocityMultiplier < _minThrowVelocity)
        {
            _rb.useGravity = true;
            return;
        }

        MovementChanged(true);

        if (_randomGeneratedPoints)
        {
            _generatePointsFinish = false;

            _rb.velocity = _velocity * _throwVelocityMultiplier;
            transform.LookAt(transform.position + _rb.velocity.normalized, Vector3.up);

            StartCoroutine(GenerateRandomSpline());
            StartCoroutine(Movement());

            return;
        }

        if (_splineCollection.Count < 0)
        {
            _rb.useGravity = true;
            Debug.LogError($"No generated SplinePoints found for Object {gameObject.name}");
            return;
        }

        ChooseSplineFromList(FlyingRouteMode == FlyingRouteModes.Random ? Random.Range(0, _splineCollection.Count) : nearestIndex);
    }

    [Button]
    private void FlyRandomFromList()
    {
        _collider.isTrigger = false;
        _rb.isKinematic = false;

        MovementChanged(true);

        if (_splineCollection.Count < 0)
        {
            _rb.useGravity = true;
            Debug.LogError($"No generated SplinePoints found for Object {gameObject.name}");
            return;
        }

        ChooseSplineFromList(FlyingRouteMode == FlyingRouteModes.Random ? Random.Range(0, _splineCollection.Count) : GetRouteIndexWithAngle());
    }

    private IEnumerator Movement()
    {
        yield return new WaitForSeconds(_minFreeFlightTime);
        yield return new WaitUntil(() => _generatePointsFinish);

        SetPointValues(0, transform.position);
        SetPointValues(1, transform.position + transform.forward * Random.Range(_firstPointLength.From, _firstPointLength.To));

        _splineComputer.SetPoints(_points);

        SetAutoBezierTangents();
        RescaleTangents(.5f);

        yield return new WaitForEndOfFrame();

        StartSplineMovement();
    }

    private void ChooseSplineFromList(int rIndex)
    {
        if (_debugMode)
            Debug.Log($"Chosen Spline with Index {rIndex}");

        _points = new SplinePoint[_splineCollection[rIndex].SplinePointGroup.Length];

        for (int i = 2; i < _points.Length; i++)
            SetPointValues(i, i < _points.Length - 1 ? _splineComputer.TransformPoint(_splineCollection[rIndex].SplinePointGroup[i].position) : _endPosition);

        SetPointValues(0, transform.position);
        SetPointValues(1, transform.position + transform.forward * Random.Range(_firstPointLength.From,  _firstPointLength.To));

        _splineComputer.SetPoints(_points);

        SetSingleAutoBezierTangent(1);
        SetSingleAutoBezierTangent(0);

        for (int i = 2; i < _points.Length; i++)
        {
            _splineComputer.SetPointTangents(i, _splineComputer.TransformPoint(_splineCollection[rIndex].SplinePointGroup[i].tangent), _splineComputer.TransformPoint(_splineCollection[rIndex].SplinePointGroup[i].tangent2));
            _splineComputer.SetPointNormal(i, _splineCollection[rIndex].SplinePointGroup[i].normal);
        }
        if (Application.isPlaying)
            StartSplineMovement();
    }

    private void StartSplineMovement()
    {
        _rb.useGravity = false;
        _rb.isKinematic = true;

        _splineFollower.SetPercent(0f);
        _splineFollower.follow = true;
    }

    private int GetRouteIndexWithAngle()
    {
        int curIndex = 0;
        int smallestAngle = GetAngleToSplineCollectionStart(0);

        for(int i = 1; i < _splineCollection.Count; i++)
        {
            int angle = GetAngleToSplineCollectionStart(i);

           // Debug.Log($"Angle of index {i} is {angle}");

            if (angle < smallestAngle)
            {
                smallestAngle = angle;
                curIndex = i;
            }
        }

       // Debug.Log($"Smallest Angle is {smallestAngle} from {curIndex}");

        return curIndex;
    }

    private int GetAngleToSplineCollectionStart(int i)
    {
        return Mathf.FloorToInt(Vector3.Angle(transform.forward, (_splineCollection[i].SplinePointGroup[2].position - transform.position).normalized));
    }

    private IEnumerator GenerateRandomSpline()
    {
        _points = new SplinePoint[Mathf.FloorToInt(Random.Range(_pointCountRange.From, _pointCountRange.To))];

        _splineComputer.space = (SplineComputer.Space)Space.Self;

        SetPointValues(2, GetRandomPositionInBoxWithOffset());

        for (int i = 3; i < _points.Length; i++)
        {
            if (i < _points.Length - 1)
            {
                Vector3 pointPosition = GetRandomPositionInBoxWithOffset();

                while (!RandomPointHasValidPos(pointPosition, _points[i - 1]))
                {
                    pointPosition = GetRandomPositionInBoxWithOffset();
                    yield return null;
                }

                SetPointValues(i, pointPosition);
            }
            else
                SetPointValues(i, _endPosition);
        }

        _generatePointsFinish = true;
    }

    private void SetPointValues(int i, Vector3 pos)
    {
        _points[i].position = pos;
        _points[i].size = .04f;
        _points[i].normal = Vector3.up;
        _points[i].color = Color.white;

        if (i == 0)
            _points[i].type = SplinePoint.Type.Broken;
    }

    private Vector3 _rbVelocity;
    private Vector3 _prevPosition;

    private void Update()
    {
        if (_grabBlocked && _leapGrabbable.CurGraspingController != null)
        {
            Vector3 palmPosition = _leapGrabbable.CurGraspingController.isLeft ? PlayerController.Instance.PalmMiddleL.position : PlayerController.Instance.PalmMiddleR.position;

            _velocity = (palmPosition - _lastVelocityState.Key) / (Time.time - _lastVelocityState.Value);
            _lastVelocityState = new KeyValuePair<Vector3, float>(palmPosition, Time.time);
        }

        if (IsUnderMinHeight())
            ResetPlaneTransform();

        if (_isMoving)
        {
            if (_objectToRotate != null) _objectToRotate.Rotate(_rotationValues * Time.deltaTime);

            _nearEndOfSpline = _splineFollower.GetPercent() > SplineEndNormalized;

            if (_nearEndOfSpline)
            {
                if (_resetRotCoroutine == null)
                {
                    _resetRotCoroutine = StartCoroutine(FinishSpline());
                    _currentFollowSpeed = _splineFollower.followSpeed;
                }

                AssignSpeedValues(true);
            }
            else
            {
                _prevPosition = transform.position;
                _resetRotCoroutine = null;
                AssignSpeedValues(false);
                AssignTiltValue();
            }
        }
    }

    private void FixedUpdate()
    {
        if (_isMoving && _nearEndOfSpline)
        {
            Vector3 curVelocity = (transform.position - _prevPosition) / Time.deltaTime;

            if (curVelocity == Vector3.zero)
                return;

            _rbVelocity = curVelocity;
            _prevPosition = transform.position;
        }
    }

    private void AssignTiltValue()
    {
        float tiltNormalized = Mathf.InverseLerp(-1, 1, transform.forward.x);
        _planeRotatorPivot.localRotation = Quaternion.Euler(new Vector3(0, 0, Mathf.Lerp(localXTilt.From, localXTilt.To, tiltNormalized)));
    }

    private void AssignSpeedValues(bool endOfSpline)
    {
        if (endOfSpline)
        {
            _splineFollower.followSpeed = Mathf.Lerp(_currentFollowSpeed, _goalDecelertionValue, Mathf.Abs(1 - _decelerationCurve.Evaluate(Mathf.InverseLerp(SplineEndNormalized, 1f, (float)_splineFollower.GetPercent()))));
            return;
        }

        float speedNormalized = Mathf.Abs(1 - Mathf.InverseLerp(_followSpeedSensibility.From, _followSpeedSensibility.To, transform.forward.y));
        _splineFollower.followSpeed = Mathf.Lerp(_splineFollower.followSpeed, Mathf.Lerp(_followSpeedRange.From, _followSpeedRange.To, speedNormalized), Time.deltaTime* _lerpSpeed);
    }

    private Vector3 GetRandomPositionInBoxWithOffset()
    {
        if (!_spawnRoom)
            return Vector3.zero;

        float halfOffset = _spawnRoomSizeOffset * .5f;

        return new Vector3(Random.Range(_spawnRoom.transform.position.x + (_spawnRoom.bounds.size.x * .5f) - halfOffset, _spawnRoom.transform.position.x - (_spawnRoom.bounds.size.x * .5f) + halfOffset),
                           Random.Range(_spawnRoom.transform.position.y + (_spawnRoom.bounds.size.y * .5f) - halfOffset, _spawnRoom.transform.position.y - (_spawnRoom.bounds.size.y * .5f) + halfOffset),
                           Random.Range(_spawnRoom.transform.position.z + (_spawnRoom.bounds.size.z * .5f) - halfOffset, _spawnRoom.transform.position.z - (_spawnRoom.bounds.size.z * .5f) + halfOffset));
    }

    private void SetAutoBezierTangents()
    {
        for (int i = 0; i < _points.Length; i++)
        {
            int index = i;

            Vector3 prevPos = _splineComputer.GetPoint(index).position;
            Vector3 forwardPos = _splineComputer.GetPoint(index).position;

            if (index == 0 && _splineComputer.pointCount > 1)
            {
                _splineComputer.SetPointTangents(index, _splineComputer.GetPoint(1).position, _splineComputer.GetPoint(1).position);
                continue;
            }
            else if (index == 1 && _splineComputer.pointCount > 2)
            {
                _splineComputer.SetPointTangents(index, _splineComputer.GetPoint(1).position - (_splineComputer.GetPoint(1).position - _splineComputer.GetPoint(0).position) * .5f, _splineComputer.GetPoint(1).position + (_splineComputer.GetPoint(1).position - _splineComputer.GetPoint(0).position) * .5f);
                continue;
            }
            else
                prevPos = _splineComputer.GetPoint(index - 1).position;

            if (index == _splineComputer.pointCount - 1 && _splineComputer.pointCount > 1)
                forwardPos = _splineComputer.GetPoint(_splineComputer.pointCount - 1).position + (_splineComputer.GetPoint(_splineComputer.pointCount - 1).position - _splineComputer.GetPoint(_splineComputer.pointCount - 2).position);
            else
                forwardPos = _splineComputer.GetPoint(index + 1).position;

            Vector3 delta = (forwardPos - prevPos) / 2f;

            _splineComputer.SetPointTangents(index, _splineComputer.GetPoint(index).position - delta / 3f, _splineComputer.GetPoint(index).position + delta / 3f);
        }
    }

    private void SetSingleAutoBezierTangent(int index)
    {
        Vector3 prevPos = _splineComputer.GetPoint(index).position;
        Vector3 forwardPos = _splineComputer.GetPoint(index).position;

        if (index == 0 && _splineComputer.pointCount > 1)
        {
            _splineComputer.SetPointTangents(0, _splineComputer.GetPoint(1).position, _splineComputer.GetPoint(0).position);
            return;
        }
        else if (index == 1 && _splineComputer.pointCount > 2)
        {
            _splineComputer.SetPointTangents(1, _splineComputer.GetPoint(0).position, Vector3.zero);
            return;
        }
        else
            prevPos = _splineComputer.GetPoint(index - 1).position;

        if (index == _splineComputer.pointCount - 1 && _splineComputer.pointCount > 1)
            forwardPos = _splineComputer.GetPoint(_splineComputer.pointCount - 1).position + (_splineComputer.GetPoint(_splineComputer.pointCount - 1).position - _splineComputer.GetPoint(_splineComputer.pointCount - 2).position);
        else
            forwardPos = _splineComputer.GetPoint(index + 1).position;

        Vector3 delta = (forwardPos - prevPos) / 2f;

        _splineComputer.SetPointTangents(index, _splineComputer.GetPoint(index).position - delta / 3f, _splineComputer.GetPoint(index).position + delta / 3f);
    }

    private void RotateFirstPointTangents(float degree)
    {
        //Vector3 vector = Quaternion.AngleAxis(degree, Vector3.up) * _splineComputer.GetPoint(0).tangent;
        //Vector3 vector = Quaternion.Euler(0, degree, 0) * _splineComputer.GetPoint(0).tangent;

        _splineComputer.SetPointTangents(1, _splineComputer.GetPoint(2).position, _splineComputer.GetPoint(0).position);
    }

    private void RescaleTangents(float tangentlength)
    {
        for (int i = 2; i < _points.Length; i++)
        {
            int index = i;

            Vector3 pointPos = _splineComputer.GetPoint(index).position;

            Vector3 tangentAVector = (_splineComputer.GetPointTangent(index) - pointPos).normalized;
            Vector3 tangentBVector = (_splineComputer.GetPointTangent2(index) - pointPos).normalized;

            Vector3 newTangentAPos = pointPos + tangentAVector * tangentlength;
            Vector3 newTangentBPos = pointPos + tangentBVector * tangentlength;

            _splineComputer.SetPointTangents(index, newTangentAPos, newTangentBPos);
            _splineComputer.SetPointNormal(index, Vector3.up);
        }
    }

    public void EndReached()
    {
        SetPlaneToDefaultSettings();
        //_rb.AddForce(_rbVelocity * _splineFollower.followSpeed, ForceMode.VelocityChange);
    }

    private bool RandomPointHasValidPos(Vector3 nextPointPos, SplinePoint prevSplinePoint)
    {
        float pointDistance = Vector3.Distance(nextPointPos, prevSplinePoint.position);
        return pointDistance > _distanceRange.From && pointDistance < _distanceRange.To;
    }

    #region Buttons

    [FoldoutGroup("Manager", Expanded = true), Button, ShowIf("@UnityEngine.Application.isPlaying")]
    public void SaveDataToSplineCollection()
    {
        SplineCollection newCollection = new SplineCollection();
        newCollection.SplinePointGroup = new SplinePoint[_points.Length];

        for (int i = 2; i < _points.Length; i++)
        {
            newCollection.SplinePointGroup[i].position = _splineComputer.InverseTransformPoint(_splineComputer.GetPoint(i).position);
            newCollection.SplinePointGroup[i].color = _splineComputer.GetPoint(i).color;
            newCollection.SplinePointGroup[i].normal = _splineComputer.GetPoint(i).normal;
            newCollection.SplinePointGroup[i].size = _splineComputer.GetPoint(i).size;
            newCollection.SplinePointGroup[i].tangent = _splineComputer.InverseTransformPoint(_splineComputer.GetPoint(i).tangent);
            newCollection.SplinePointGroup[i].tangent2 = _splineComputer.InverseTransformPoint(_splineComputer.GetPoint(i).tangent2);
        }
        _splineCollection.Add(newCollection);
    }

    [FoldoutGroup("Controller", Expanded = true), Button, ShowIf("@UnityEngine.Application.isPlaying")]
    public void GeneratePointsDebug()
    {
        StartCoroutine(GenerateRandomSpline());
        StartCoroutine(Movement());
    }

    [FoldoutGroup("Controller", Expanded = true), Button, GUIColor(nameof(Cyan)), ShowIf("@UnityEngine.Application.isPlaying")]
    public void ResetPlaneTransform()
    {
        _rb.velocity = Vector3.zero;
        _rb.angularVelocity = Vector3.zero;
        transform.position = _endPosition;
        transform.rotation = _startQuaternion;
    }

    [FoldoutGroup("Controller", Expanded = true), Button, GUIColor(nameof(Cyan)), ShowIf("@UnityEngine.Application.isPlaying")]
    public void FlySpecificRoute(int index)
    {
        if (index > _splineCollection.Count - 1)
            throw new System.ArgumentOutOfRangeException($"Index {index} is larger than SplineCollection Count ({_splineCollection.Count - 1})");

        if (!Application.isPlaying)
        {
            _endPosition = new Vector3(transform.position.x, transform.position.y + _lastPointYOffset, transform.position.z);
        }

        _collider.isTrigger = false;
        _rb.isKinematic = false;

        MovementChanged(true);
        ChooseSplineFromList(index);
    }

    [FoldoutGroup("Controller", Expanded = true), Button, GUIColor(nameof(Cyan)), ShowIf("@UnityEngine.Application.isPlaying")]
    public void RecreateSpecificRoute(int index)
    {
        if (index > _splineCollection.Count - 1)
            throw new System.ArgumentOutOfRangeException($"Index {index} is larger than SplineCollection Count ({_splineCollection.Count - 1})");

        ChooseSplineFromList(index);
        MovementChanged(true);

        _splineCollection.RemoveAt(index);
    }

    [Button, GUIColor(nameof(Cyan)), HideIf("@UnityEngine.Application.isPlaying")]
    public void RecreateRoute(int index)
    {
        if (index > _splineCollection.Count - 1)
            throw new System.ArgumentOutOfRangeException($"Index {index} is larger than SplineCollection Count ({_splineCollection.Count - 1})");

        _endPosition = new Vector3(transform.position.x, transform.position.y + _lastPointYOffset, transform.position.z);

        ChooseSplineFromList(index);
    }

    #endregion Buttons

    private void MovementChanged(bool isMoving)
    {
        OnMovementChanged.Invoke(isMoving);
        _isMoving = isMoving;

        //SOUND
        _soundmanager.PlayEngineSound();
    }

    private bool IsUnderMinHeight()
    {
        return !_grabBlocked && !_isMoving && transform.position.y < _fallHeightY;
    }
    private IEnumerator FinishSpline()
    {
        Quaternion currentLocalRot = _planeRotatorPivot.localRotation;

        float elapsedTime = 0;
        float duration = _splineFollower.followDuration;

        while (elapsedTime < duration)
        {
            _planeRotatorPivot.localRotation = Quaternion.Slerp(currentLocalRot, Quaternion.identity, elapsedTime / duration);

            elapsedTime += Time.deltaTime;
            yield return null;
        }
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.blue;
        Gizmos.DrawWireCube(_spawnRoom.transform.position, new Vector3(_spawnRoom.bounds.size.x - _spawnRoomSizeOffset, _spawnRoom.bounds.size.y - _spawnRoomSizeOffset, _spawnRoom.bounds.size.z - _spawnRoomSizeOffset));

        Gizmos.color = Color.white;
        Gizmos.DrawWireCube(_spawnRoom.transform.position, _spawnRoom.bounds.size);
    }


    public void DestroyGo()
    {
        Destroy(gameObject);
    }

    [Button]
    private void DeactivateInteraction()
    {
        _sceneSwitchGrabBlock = true;

        if (!_isMoving)
        {
            _leapGrabbable.OnGrabEnd();

            _collider.isTrigger = false;

            _rb.useGravity = true;
            _rb.isKinematic = false;
        }

        _grabBlocked = false;
        transform.parent = _leapGrabbable.DefaultParent;
        _interactionBehaviour.ignoreContact = true;
    }

    private void LevelLoad(int level)
    {
        if(level == NextLevelIndex)
        {
            DeactivateInteraction();
        }
    }

    #region Color

    private Color GetPickerColor()
    {
        return EditorColorPicker;
    }

    private Color Green()
    {
        return Color.green;
    }

    private Color Red()
    {
        return Color.red;
    }

    private Color Yellow()
    {
        return Color.yellow;
    }

    private Color Cyan()
    {
        return Color.cyan;
    }

    #endregion Color
}