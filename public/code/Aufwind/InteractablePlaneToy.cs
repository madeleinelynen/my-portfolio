using A4VR.Tools.Unity.Core;
using Sirenix.OdinInspector;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class InteractablePlaneToy : MonoBehaviour
{
    [SerializeField] private bool _debugMode;
    [SerializeField] private bool _showSplineLines;
    [SerializeField] private float _pointToPointDuration = .2f;

    [SerializeField] private Collider _room;
    [SerializeField] private GameObject _bezierCurvePoint;

    [SerializeField] private int _positionPointCount;

    [SerializeField, MinMax(1, 50)] private Range _smoothnessRange = new Range(5, 50);
    [SerializeField, MinMax(0, 180)] private Range _angleRange = new Range(60f);
    [SerializeField, MinMax(0, 1)] private Range _distanceModRange = new Range(.5f);

    [SerializeField] private AnimationCurve _curveTweaker = AnimationCurve.Linear(0, 0, 1, 1);

    [SerializeField, FoldoutGroup("Debugging")] private LineRenderer _debugLine;
    [SerializeField, FoldoutGroup("Debugging")] private GameObject _debugSphere;

    private GameObject _root;
    private GameObject _endPointObject;
    private Range _distanceRange;
    private Vector3 _lastSplinePoint;
    private Vector3 _spawnPosition;
    private Rigidbody _rb;

    private int _smoothness;

    private List<GameObject> _posObjects = new List<GameObject>();
    private List<Vector3> _bezierPositions = new List<Vector3>();

    private void Awake()
    {
        _rb = GetComponent<Rigidbody>();
        GetDistanceRange();
    }

    public void OnGrabBegin()
    {
    }

    public void OnGrabEnd()
    {
        _rb.useGravity = false;
        _rb.isKinematic = true;

        GetPointsInBoundingBox();
    }

    [Button]
    private void GetPointsInBoundingBox()
    {
        if (!Application.isPlaying)
            GetDistanceRange();

        if (_posObjects.Count > 0)
        {
            _posObjects.ToList().ForEach(n => DestroyImmediate(n));
            _posObjects.Clear();
        }

        if (_root != null)
            DestroyImmediate(_root);

        _root = new GameObject();
        _root.name = "- PointRoot -";

        for (int i = 0; i < _positionPointCount; i++)
        {
            //StartCoroutine(RandomPositionInBox());
           // Vector3 pos = GetRandomPositionInBox();

            GameObject obj = Instantiate(_bezierCurvePoint);
            _bezierCurvePoint.transform.position = GetRandomPositionInBox();

            _posObjects.Add(obj);
            obj.transform.SetParent(_root.transform);
        }

        _posObjects.OrderBy(n => Vector3.Distance(PlayerController.Instance.transform.position, n.transform.position));
        _posObjects.ForEach(n => n.name = "Pos " + _posObjects.IndexOf(n).ToString());

        if (!_endPointObject)
            _endPointObject = new GameObject();

        _endPointObject.transform.SetPositionAndRotation(transform.position, transform.rotation);
        _endPointObject.transform.SetParent(_root.transform);
        _posObjects.Add(_endPointObject);

        FillBezierPointList();
        DrawDebugLine();

        if(Application.isPlaying)
            StartCoroutine(FlyInBezierCurve());
    }

    private IEnumerator FlyInBezierCurve()
    {
        foreach (Vector3 bezierPos in _bezierPositions)
        {
            float elapsedTime = 0;
            Vector3 startPosition = transform.position;
            Quaternion startRotation = transform.rotation;

            transform.LookAt(bezierPos, Vector3.up);
             Quaternion endRotation = transform.rotation;

            while (elapsedTime < _pointToPointDuration)
            {
                transform.position = Vector3.Lerp(startPosition, bezierPos, elapsedTime / _pointToPointDuration);
                transform.rotation = Quaternion.Slerp(startRotation, endRotation, elapsedTime / _pointToPointDuration);

                elapsedTime += Time.deltaTime;
                yield return null;
            }
        }
    }

    private void FillBezierPointList()
    {
        _bezierPositions.Clear();

        for (int i = 0; i < _posObjects.Count; i++)
        {
            if (i < _posObjects.Count - 1)
            {
                float distance = i == 0
                        ? Vector3.Distance(transform.position, _posObjects[i].transform.position)
                        : Vector3.Distance(_posObjects[i - 1].transform.position, _posObjects[i].transform.position);

                float distanceNormalized = Mathf.Abs(Mathf.InverseLerp(_distanceRange.From, _distanceRange.To, distance));

                //_smoothness = Mathf.FloorToInt(_smoothnessRange.From + (_smoothnessRange.To - _smoothnessRange.From) * distanceNormalized);
                _smoothness = Mathf.FloorToInt(Mathf.Lerp(_smoothnessRange.From, _smoothnessRange.To, distanceNormalized));
            }

            if (i > 0)
            {
                Vector3 lookAtPoint = _lastSplinePoint;

                GameObject tmp = new GameObject();
                tmp.transform.position = lookAtPoint;
                tmp.transform.LookAt(_posObjects[i - 1].transform);

                tmp.transform.position = tmp.transform.position + tmp.transform.forward * 3;

                _posObjects[i - 1].transform.LookAt(tmp.transform);

                DestroyImmediate(tmp);
            }

            List<Vector3> tmpList = GetCurvePoints(i == 0 ? transform : _posObjects[i - 1].transform, _posObjects[i].transform.position);
 
            tmpList.ForEach(n => _bezierPositions.Add(n));
        }
    }

    private void DrawDebugLine()
    {
        if (_showSplineLines)
        {
            _debugLine.positionCount = _bezierPositions.Count;
            _debugLine.SetPositions(_bezierPositions.ToArray());
        }
        else
            _debugLine.positionCount = 0;
    }

    private List<Vector3> GetCurvePoints(Transform startTrans, Vector3 endPos)
    {
        Vector3[] result = new Vector3[_smoothness + 2];

        result[0] = startTrans.position;

        Vector3 curveDefinitionPoint = GetCurveDefinitionPoint(startTrans, endPos);

        for (int i = 0; i < _smoothness; i++)
        {
            float divider = 1f / (_smoothness + 1);

            result[i + 1] = Bezier.GetPoint(startTrans.position, curveDefinitionPoint, endPos, Mathf.Lerp(0, 1, (i + 1f) * divider));

            if (_debugMode)
            {
                GameObject debugSphere = Instantiate(_debugSphere, _root.transform);
                debugSphere.transform.position = result[i + 1];
            }
        }

        result[result.Length - 1] = endPos;

        if (_debugMode)
        {
            GameObject debugSphere = Instantiate(_debugSphere, _root.transform);
            debugSphere.transform.position = endPos;
        }

        _lastSplinePoint = result[result.Length - 2];

        return result.ToList();
    }

    private Vector3 GetCurveDefinitionPoint(Transform startTransform, Vector3 end)
    {
        float angle = Vector3.Angle(end - startTransform.position, startTransform.forward);
        float delta = Mathf.InverseLerp(_angleRange.From, _angleRange.To, angle);
        return startTransform.position + startTransform.forward * Vector3.Distance(startTransform.position, end) * Mathf.Lerp(_distanceModRange.From, _distanceModRange.To, _curveTweaker.Evaluate(delta));
    }

    private void GetDistanceRange()
    {
        GameObject minSize = new GameObject();
        GameObject maxSize = new GameObject();

        minSize.transform.position = new Vector3(_room.bounds.min.x, 0, _room.bounds.min.z);
        maxSize.transform.position = new Vector3(_room.bounds.max.x, 0, _room.bounds.max.z);

        bool ZBoundsIsLargest = Mathf.Abs(maxSize.transform.position.x - minSize.transform.position.x) < Mathf.Abs(maxSize.transform.position.z - minSize.transform.position.z);

        _distanceRange = ZBoundsIsLargest ? new Range(minSize.transform.position.z, maxSize.transform.position.z) : new Range(minSize.transform.position.x, maxSize.transform.position.x);

        DestroyImmediate(minSize);
        DestroyImmediate(maxSize);
    }

    private Vector3 GetRandomPositionInBox()
    {
        return new Vector3(Random.Range(_room.bounds.min.x, _room.bounds.max.x), Random.Range(_room.bounds.min.y, _room.bounds.max.y), Random.Range(_room.bounds.min.z, _room.bounds.max.z));
    }

    private IEnumerator RandomPositionInBox()
    {
        _spawnPosition = new Vector3(Random.Range(_room.bounds.min.x, _room.bounds.max.x), Random.Range(_room.bounds.min.y, _room.bounds.max.y), Random.Range(_room.bounds.min.z, _room.bounds.max.z));

        while(_posObjects.Any(n => Vector3.Distance(n.transform.position, _spawnPosition) < 3f))
        {
            Debug.Log("nope ");
            _spawnPosition = new Vector3(Random.Range(_room.bounds.min.x, _room.bounds.max.x), Random.Range(_room.bounds.min.y, _room.bounds.max.y), Random.Range(_room.bounds.min.z, _room.bounds.max.z));
            yield return null;
        }

        Debug.Log("yes " + _spawnPosition);
    }

}