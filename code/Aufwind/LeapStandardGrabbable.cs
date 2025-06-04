using Leap.Unity;
using Leap.Unity.Interaction;
using Sirenix.OdinInspector;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

[RequireComponent(typeof(InteractionBehaviour))]
public class LeapStandardGrabbable : MonoBehaviour
{
    [SerializeField] protected bool _allowObjectStealth = true;
    [SerializeField] protected bool _moveObjectWhenGrabbed = true;
    [SerializeField] protected bool _deactivateHandsOnStart = true;
    [SerializeField] protected int _grabbableLayer;
    [SerializeField] protected LeapGrabPoint[] _snappingPoints;

    [SerializeField] protected bool _handSmoothGrab;
    [SerializeField, ShowIf(nameof(_handSmoothGrab))] protected float _smoothmentDuration = .1f;
    [SerializeField] protected bool _handSmoothGrabEnd;
    [SerializeField, ShowIf(nameof(_handSmoothGrabEnd))] protected float _smoothmentDurationGrabEnd = .1f;
    [SerializeField] protected bool _moveObjectToHandWhenGrabbed;
    [SerializeField, ShowIf(nameof(_moveObjectToHandWhenGrabbed))] protected bool _objectSmoothGrab;

    protected InteractionBehaviour _interactionBehaviour;
    private LeapGrabPoint _curSnapPoint;
    private GameObject _helperObj;
    private Transform _grabbedVrHand;
    protected Rigidbody _rb;
    protected float _elapsedTime;

    [HideInInspector] public Transform DefaultParent;
    [HideInInspector] public InteractionController CurGraspingController;

    public static event Action GrabbingHandDeactivated;

    protected virtual void OnEnable()
    {
        HandEnableDisableEvents.OnHandActivationChanged += GetHandState;
        _interactionBehaviour.OnSuspensionBegin += OnSuspensionBegin;
    }

    protected virtual void OnDisable()
    {
        HandEnableDisableEvents.OnHandActivationChanged -= GetHandState;
        _interactionBehaviour.OnSuspensionBegin -= OnSuspensionBegin;
    }

    protected virtual void Awake()
    {
        _interactionBehaviour = GetComponent<InteractionBehaviour>();
        _rb = GetComponent<Rigidbody>();

        _interactionBehaviour.moveObjectWhenGrasped = false;
        DefaultParent = transform.parent;
    }

    protected virtual void Start()
    {
        if (_snappingPoints.Length > 0 && _deactivateHandsOnStart)
            _snappingPoints.ForEach(n => n.HandRoot.gameObject.SetActive(false));
    }

    private void GetHandState(bool isEnabled, bool isLeft)
    {
        if (CurGraspingController == null)
            return;

        if (!isEnabled && isLeft && CurGraspingController.isLeft || !isLeft && !CurGraspingController.isLeft)
        {
            ThrowHandDeactivationEvent();
            OnGrabEnd();
        }
    }

    private void OnSuspensionBegin(InteractionController controller)
    {
        ThrowHandDeactivationEvent();
        OnGrabEnd();
    }

    protected void ThrowHandDeactivationEvent()
    {
        GrabbingHandDeactivated?.Invoke();
    }

    public virtual void OnGrabBegin()
    {
        if (_snappingPoints.Length == 0)
            return;

        _rb.useGravity = false;
        _rb.isKinematic = true;

        CurGraspingController = _interactionBehaviour.graspingController;

        if (!_allowObjectStealth)
        {
            if (CurGraspingController.isLeft)
                _interactionBehaviour.ignoreGraspingMode = IgnoreHoverMode.Right;
            else
                _interactionBehaviour.ignoreGraspingMode = IgnoreHoverMode.Left;
        }

        _grabbedVrHand = CurGraspingController.isLeft ? PlayerController.Instance.WristL : PlayerController.Instance.WristR;

        GetNearestHandPose(CurGraspingController.isLeft, out LeapGrabPoint nearestPoint, out Transform nearestPalm);

        if (_moveObjectToHandWhenGrabbed)
            SetGrabbedObjectTransform(nearestPalm, CurGraspingController.isLeft ? PlayerController.Instance.WristL : PlayerController.Instance.WristR);

        SetVrHandPos(nearestPoint, _grabbedVrHand);
    }

    public virtual void OnGrabEnd()
    {
        if (_snappingPoints.Length == 0) return;

        transform.SetParent(DefaultParent);

        if (_helperObj)
            Destroy(_helperObj);

        if (_curSnapPoint && CurGraspingController)
        {
            if (_handSmoothGrabEnd)
            {
                StartCoroutine(SmoothGrabHandEnd(CurGraspingController.isLeft, _curSnapPoint, CurGraspingController.isLeft ? PlayerController.Instance.WristL : PlayerController.Instance.WristR));
            }
            else
            {
                _curSnapPoint.HandRoot.gameObject.SetActive(false);

                if (CurGraspingController.isLeft)
                    PlayerController.Instance.RiggedHandMeshL.enabled = true;
                else
                    PlayerController.Instance.RiggedHandMeshR.enabled = true;
            }
        }

        CurGraspingController = null;

        if (!_allowObjectStealth)
        {
            _interactionBehaviour.ignoreGraspingMode = IgnoreHoverMode.None;
        }
    }

    private void SetGrabbedObjectTransform(Transform grabPoint, Transform grabbedHand)
    {
        if (_helperObj)
            Destroy(_helperObj);

        _helperObj = new GameObject();

        _helperObj.transform.SetPositionAndRotation(grabPoint.position, grabPoint.rotation);
        _helperObj.transform.SetParent(grabbedHand, true);

        transform.SetParent(_helperObj.transform);

        if (_objectSmoothGrab)
        {
            StartCoroutine(SmoothGrabObject());
            return;
        }

        _helperObj.transform.localPosition = Vector3.zero;
        _helperObj.transform.localRotation = Quaternion.identity;
    }

    private IEnumerator SmoothGrabObject()
    {
        float elapsedTime = 0;

        Vector3 pos = _helperObj.transform.localPosition;
        Quaternion rot = _helperObj.transform.localRotation;

        while (elapsedTime < _smoothmentDuration && _helperObj != null)
        {
            _helperObj.transform.localPosition = Vector3.Lerp(pos, Vector3.zero, elapsedTime / _smoothmentDuration);
            _helperObj.transform.localRotation = Quaternion.Lerp(rot, Quaternion.identity, elapsedTime / _smoothmentDuration);

            elapsedTime += Time.deltaTime;
            yield return null;
        }

        if (_helperObj != null)
        {
            _helperObj.transform.localPosition = Vector3.zero;
            _helperObj.transform.localRotation = Quaternion.identity;
        }
    }

    private void SetVrHandPos(LeapGrabPoint grabbedPoint, Transform grabbedVRHand)
    {
        if (CurGraspingController.isLeft)
            PlayerController.Instance.RiggedHandMeshL.enabled = false;
        else
            PlayerController.Instance.RiggedHandMeshR.enabled = false;

        grabbedPoint.HandRoot.gameObject.SetActive(true);

        if (_handSmoothGrab)
            StartCoroutine(SmoothGrabHand(grabbedPoint, grabbedVRHand));

        if (CurGraspingController.isLeft)
            PlayerController.Instance.WristL.SetPositionAndRotation(grabbedPoint.WristTransform.position, grabbedPoint.WristTransform.rotation);
        else
            PlayerController.Instance.WristR.SetPositionAndRotation(grabbedPoint.WristTransform.position, grabbedPoint.WristTransform.rotation);
    }

    private IEnumerator SmoothGrabHand(LeapGrabPoint grabbedPoint, Transform grabbedVrHand)
    {
        _elapsedTime = 0;

        Transform tmpParent = grabbedPoint.WristTransform.transform.parent;
        Transform[] grabbedHandChildren = grabbedVrHand.GetComponentsInChildren<Transform>();
        grabbedHandChildren = grabbedHandChildren.Where(n => n.gameObject.layer == _grabbableLayer).ToArray();

        grabbedPoint.WristTransform.transform.SetParent(grabbedVrHand.parent);

        for (int i = 0; i < grabbedHandChildren.Length; i++)
        {
            if (grabbedHandChildren[i].gameObject.layer == _grabbableLayer)
            {
                grabbedPoint.GrabPointChilds[i].BoneTransform.localPosition = grabbedHandChildren[i].localPosition;
                grabbedPoint.GrabPointChilds[i].BoneTransform.localRotation = grabbedHandChildren[i].localRotation;
            }
        }

        grabbedPoint.WristTransform.transform.SetParent(tmpParent);
        grabbedPoint.WristTransform.transform.SetAsFirstSibling();

        List<Transform> palmChildren = grabbedPoint.WristTransform.GetComponentsInChildren<Transform>().ToList();
        List<Transform> handStartTransform = palmChildren.Select(n => n.transform).ToList();

        while (_elapsedTime < _smoothmentDuration)
        {
            for (int i = 0; i < palmChildren.Count; i++)
            {
                palmChildren[i].localPosition = Vector3.Lerp(handStartTransform[i].localPosition, grabbedPoint.GrabPointChilds[i].BonePosition, _elapsedTime / _smoothmentDuration);
                palmChildren[i].localRotation = Quaternion.Slerp(handStartTransform[i].localRotation, grabbedPoint.GrabPointChilds[i].BoneRotation, _elapsedTime / _smoothmentDuration);
            }

            _elapsedTime += Time.deltaTime;
            yield return null;
        }

        for (int i = 0; i < palmChildren.Count; i++)
        {
            palmChildren[i].localPosition = grabbedPoint.GrabPointChilds[i].BonePosition;
            palmChildren[i].localRotation = grabbedPoint.GrabPointChilds[i].BoneRotation;
        }

        SmoothGrabFinished = true;
    }

    public bool SmoothGrabFinished { get; private set; }

    private IEnumerator SmoothGrabHandEnd(bool isLeft, LeapGrabPoint grabbedPoint, Transform grabbedVrHand)
    {
        _elapsedTime = 0;

        Transform grabbedPointParent = grabbedPoint.WristTransform.transform.parent;
        Transform[] grabbedHandChildren = grabbedVrHand.GetComponentsInChildren<Transform>();
        grabbedHandChildren = grabbedHandChildren.Where(n => n.gameObject.layer == _grabbableLayer).ToArray();

        List<Transform> palmChildren = grabbedPoint.WristTransform.GetComponentsInChildren<Transform>().ToList();
        List<Transform> palmChildrenStartTransforms = palmChildren;
        List<Transform> curHandTransforms = palmChildren.Select(n => n.transform).ToList();

        grabbedPoint.WristTransform.transform.SetParent(grabbedVrHand.parent);

        while (_elapsedTime < _smoothmentDurationGrabEnd)
        {
            for (int i = 0; i < grabbedHandChildren.Length; i++)
            {
                palmChildren[i].localPosition = Vector3.Lerp(palmChildrenStartTransforms[i].localPosition, grabbedHandChildren[i].localPosition, _elapsedTime / _smoothmentDuration);
                palmChildren[i].localRotation = Quaternion.Slerp(palmChildrenStartTransforms[i].localRotation, grabbedHandChildren[i].localRotation, _elapsedTime / _smoothmentDuration);
            }

            _elapsedTime += Time.deltaTime;
            yield return null;
        }

        grabbedPoint.WristTransform.transform.SetParent(grabbedPointParent);
        grabbedPoint.WristTransform.transform.SetAsFirstSibling();

        if (isLeft)
            PlayerController.Instance.RiggedHandMeshL.enabled = true;
        else
            PlayerController.Instance.RiggedHandMeshR.enabled = true;

        grabbedPoint.HandRoot.gameObject.SetActive(false);
        grabbedPoint = null;

        Debug.LogError("Smooth Grab Hand End finsihed with hand: " + (isLeft ? "Left" : "Right"));
    }

    protected virtual void GetNearestHandPose(bool isLeft, out LeapGrabPoint nearestGrabPoint, out Transform nearestMiddlePoint)
    {
        nearestGrabPoint = null;
        nearestMiddlePoint = null;

        List<Transform> allGrabWrists = _snappingPoints.Where(n => n.HandIsValid == (isLeft ? ValidHand.Left : ValidHand.Right)).Select(m => m.WristTransform).ToList();

        //foreach (Transform t in allGrabWrists)
        //{
        //    Debug.LogError("All GRab Wrist for special Hand: " + t.gameObject.name);
        //}

        if (allGrabWrists.Count == 0)
            return;

        nearestMiddlePoint = allGrabWrists.Count > 1
            ? allGrabWrists.OrderBy(n => Vector3.Distance(n.transform.position, isLeft ? PlayerController.Instance.WristL.position : PlayerController.Instance.WristR.position)).FirstOrDefault()
            : allGrabWrists.FirstOrDefault();

        nearestGrabPoint = nearestMiddlePoint.parent.GetComponentInParent<LeapGrabPoint>();

        _curSnapPoint = nearestGrabPoint;
    }

#if UNITY_EDITOR

    [Button]
    private void ToggleHandVisibility()
    {
        _snappingPoints.ToList().ForEach(n => n.HandRoot.gameObject.SetActive(!n.gameObject.activeSelf));
    }

#endif
}