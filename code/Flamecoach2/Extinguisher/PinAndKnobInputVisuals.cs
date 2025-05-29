using A4VR.Tools.Unity.Core;
using UnityEngine;
using DG.Tweening;
using Sirenix.OdinInspector;

public class PinAndKnobInputVisuals : MonoBehaviour
{
    public enum Axis
    {
        X,
        Y,
        Z
    }

    [SerializeField] private Transform _knob;
    [SerializeField] private Transform _pin;

    [SerializeField] private Axis _nozzleRotation = Axis.X;
    [SerializeField] private Transform _nozzleHandle;
    [SerializeField] private Transform _nozzleSpring;

    [SerializeField] private Range _knobHeightRange;
    [SerializeField] private Animator _pinAnimator;
    [SerializeField] private string _pinTriggerLock = "LockPin";

    [SerializeField, ShowIf(nameof(_nozzleHandle))] private Range _nozzleRotationRange;
    [SerializeField, ShowIf(nameof(_nozzleSpring))] private Range _nozzleSpringScaleRange;

    [SerializeField] private float _knobLerpDuration = .5f;

    [Title("Received Input")]
    [ShowInInspector, ReadOnly] private bool _receivedKnobInput;
    [ShowInInspector, ReadOnly] private bool _receivedPinLockedInput;
    [ShowInInspector, ReadOnly] private float _receivedNozzleInput;

    private PinAndKnobInputManager _inputManager;
    private Tween _knobMovement;

    protected virtual void OnEnable()
    {
        _inputManager.OnKnobInputReceived += KnobInputReceived;
        _inputManager.OnPinInputReceived += PinInputReceived;
        _inputManager.OnNormedNozzleInputChanged.AddListener(NozzleInputReceived);
    }

    protected virtual void OnDisable()
    {
        _inputManager.OnKnobInputReceived -= KnobInputReceived;
        _inputManager.OnPinInputReceived -= PinInputReceived;
        _inputManager.OnNormedNozzleInputChanged.RemoveListener(NozzleInputReceived);
    }

    private void Awake()
    {
        _inputManager = GetComponent<PinAndKnobInputManager>();
    }

    public void ManualKnobLockChange(bool pressed)
    {
        KnobInputReceived(pressed);
    }

    public void ManualPinLockChange(bool unlocked)
    {
        PinInputReceived(!unlocked);
    }

    private void KnobInputReceived(bool hasPressInput)
    {
        if (_knob == null) return;

        _receivedKnobInput = hasPressInput;

        if (_knobMovement != null && _knobMovement.IsActive())
            _knobMovement.Kill();

        _knobMovement = _knob.DOLocalMoveZ(hasPressInput ? _knobHeightRange.From : _knobHeightRange.To, _knobLerpDuration);
    }

    private void PinInputReceived(bool isLocked)
    {
        if (_pin == null) return;

        _receivedPinLockedInput = isLocked;

        if (_pinAnimator != null)
            _pinAnimator.SetBool(_pinTriggerLock, isLocked);
        else
            _pin.gameObject.SetActive(isLocked);

    }

    private void NozzleInputReceived(float normedInput)
    {
        _receivedNozzleInput = normedInput;

        if (_nozzleHandle != null)
        {
            float result = _nozzleRotationRange.To + normedInput * (_nozzleRotationRange.From - _nozzleRotationRange.To);
            Vector3 newRotation = _nozzleHandle.localEulerAngles;

            if (_nozzleRotation == Axis.X) newRotation.x = result;
            else if (_nozzleRotation == Axis.Y) newRotation.y = result;
            else if (_nozzleRotation == Axis.Z) newRotation.z = result;

            _nozzleHandle.localRotation = Quaternion.Euler(newRotation);
        }

        if (_nozzleSpring != null)
        {
            float scale = _nozzleSpringScaleRange.To + normedInput * (_nozzleSpringScaleRange.From - _nozzleSpringScaleRange.To);
            _nozzleSpring.localScale = new Vector3(_nozzleSpring.localScale.x, _nozzleSpring.localScale.y, scale);
        }
    }
}
