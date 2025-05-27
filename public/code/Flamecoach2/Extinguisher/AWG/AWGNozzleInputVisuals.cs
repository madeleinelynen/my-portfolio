using A4VR.Tools.Unity.Core;
using DG.Tweening;
using Sirenix.OdinInspector;
using UnityEngine;

public class AWGNozzleInputVisuals : MonoBehaviour
{
    private AWGNozzleInputManager _inputManager;

    [Title("Transforms")]
    [SerializeField] private Transform _handle;
    [SerializeField] private Transform _gripMiddle;
    [SerializeField] private Transform _gripFront;

    [Title("Rotation Ranges")]
    [SerializeField] private Range _handleRotation;
    [SerializeField] private float[] _gripMiddleRotation;
    [SerializeField] private float[] _gripFrontRotation;

    [Title("Lerping")]
    [SerializeField] private bool _useHandleLerp;
    [SerializeField, ShowIf(nameof(_useHandleLerp))] private float _handleLerpDuration;
    [SerializeField] private bool _useMiddleGripLerp;
    [SerializeField, ShowIf(nameof(_useMiddleGripLerp))] private float _middleGripLerpDuration;
    [SerializeField] private bool _useFrontGripLerp;
    [SerializeField, ShowIf(nameof(_useFrontGripLerp))] private float _frontGripDuration;

    [Title("Vfx")]
    [SerializeField] private AWGNozzleVfx _effectManager;

    [Title("Received normed Input")]
    [ShowInInspector, ReadOnly] private float _receivedHall1GripMiddleInput;
    [ShowInInspector, ReadOnly] private float _receivedHall2GripFrontInput;
    [ShowInInspector, ReadOnly] private float _receivedHall3HandleInput;
    [ShowInInspector, ReadOnly] private bool _receivedHall3HandleLockState;

    protected virtual void OnEnable()
    {
        _inputManager.OnAWGHall1InputReceived += Hall1GripMiddleInput;
        _inputManager.OnAWGHall2InputReceived += Hall2GripFrontInput;
        _inputManager.OnAWGHall3InputReceived += Hall3HandleInput;
    }

    protected virtual void OnDisable()
    {
        _inputManager.OnAWGHall1InputReceived -= Hall1GripMiddleInput;
        _inputManager.OnAWGHall2InputReceived -= Hall2GripFrontInput;
        _inputManager.OnAWGHall3InputReceived -= Hall3HandleInput;
    }

    private void Awake()
    {
        _inputManager = GetComponent<AWGNozzleInputManager>();
    }

    private void Hall1GripMiddleInput(float value, int rotationIndex)
    {
        float rotationValue = _gripMiddleRotation[rotationIndex];

        _receivedHall1GripMiddleInput = rotationValue;

        if (_useMiddleGripLerp)
            TweenGripMiddle(rotationValue);
        else
            _gripMiddle.localRotation = Quaternion.Euler(new Vector3(0, 0, rotationValue));

        if (_effectManager != null)
            _effectManager.Hall1MiddleValueChanged(value);
    }

    private void TweenGripMiddle(float value)
    {
        _gripMiddle.DOLocalRotateQuaternion(Quaternion.Euler(new Vector3(0, 0, value)), _middleGripLerpDuration).SetEase(Ease.OutQuad);
    }

    private void Hall2GripFrontInput(float value, int rotationIndex)
    {
        float rotationValue = _gripFrontRotation[rotationIndex];

        _receivedHall2GripFrontInput = rotationValue;

        if (_useFrontGripLerp)
            TweenGripFront(rotationValue);
        else
            _gripFront.localRotation = Quaternion.Euler(new Vector3(0, 0, rotationValue));

        if (_effectManager != null)
            _effectManager.Hall2FrontValueChanged(value);
    }

    private void TweenGripFront(float value)
    {
        _gripFront.DOLocalRotateQuaternion(Quaternion.Euler(new Vector3(0, 0, value)), _frontGripDuration).SetEase(Ease.OutQuad);
    }

    private void Hall3HandleInput(float normedValue, bool isLocked)
    {
        normedValue = 1f - normedValue;

        _receivedHall3HandleInput = normedValue;
        _receivedHall3HandleLockState = isLocked;

        if (_useHandleLerp)
            TweenHandle(normedValue);
        else
            _handle.localRotation = Quaternion.Euler(new Vector3(Mathf.Lerp(_handleRotation.From, _handleRotation.To, normedValue), 0, 0));

        if (_effectManager != null)
            _effectManager.Hall3HandleValueChanged(normedValue);
    }

    private void TweenHandle(float percentage)
    {
        _handle.DOLocalRotateQuaternion(Quaternion.Euler(new Vector3(Mathf.Lerp(_handleRotation.From, _handleRotation.To, percentage), 0, 0)), _handleLerpDuration).SetEase(Ease.OutQuad);
    }
}
