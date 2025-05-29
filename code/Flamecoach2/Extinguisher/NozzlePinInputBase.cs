using A4VR.Tools.Unity.Core;
using Sirenix.OdinInspector;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using Range = A4VR.Tools.Unity.Core.Range;

public class NozzlePinInputBase : ExtinguisherInputManager<NozzleAndPinInputData>
{
    public float CurrentSafetyPinInput => CurrentSafetyPinValue;
    public float SafetyPinChange => Mathf.Abs(SafetyPinDefaultValue - CurrentSafetyPinValue);

    public Action<bool> OnPinInputReceived;

    [SerializeField] private bool _resetPoseOnStart;

    [Title("Calculated Inputs")]
    [SerializeField] private float _nozzleThreshold;
    [SerializeField] private bool _inverseRawNozzleValue;
    [ReadOnly, PropertyRange(0f, 1f)] public float NozzleValueNormed;
    [ReadOnly] public float PinValue;
    [ReadOnly] public bool PinButtonLocked;
    [SerializeField] private float _pinThreshold = 1f;

    [SerializeField, HideIf(nameof(_useDebugInputs)), ReadOnly] private float _hall1NozzleRaw;
    [SerializeField, HideIf(nameof(_useDebugInputs)), ReadOnly] private float _hall2PinRaw;
    [SerializeField, HideIf(nameof(_useDebugInputs)), ReadOnly] private bool _buttonPinLockedRaw;

    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(DebugNozzleInput)), PropertyRange(0f, 255f)] private float _hall1NozzleDebug;
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(DebugPinInput)), PropertyRange(0f, 255f)] private float _hall2PinDebug;
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(DebugPinButtonInput))] private bool _buttonPinLockedDebug;


    [Title("Nozzle"), BoxGroup("Calibration"), HideInEditorMode]
    [InfoBox(message: "For calibration, press the nozzle as tight as you can, then release it. For better results, press the Reset button first. Press on the same calibration button to finish calibration.", VisibleIf = nameof(_activeNozzleCalibration))]
    [SerializeField, GUIColor(nameof(NozzleCalibrationColorFeedback)), PropertyOrder(0), BoxGroup("Calibration")] protected Range _nozzleStrengthRange = new(0f, 0f);
    [BoxGroup("Calibration")]
    [SerializeField, Curve] private AnimationCurve _nozzleCorrection = AnimationCurve.Linear(.1f, 0, .9f, 1f);

    [Title("Pin"), BoxGroup("Calibration"), InfoBox("Pin/Knob value calibration currently unused.", InfoMessageType.Warning), HideInEditorMode]
    [InfoBox(message: "For calibration, put the pin in the extinguisher, click on reset when calibration mode is on, and wiggle the pin a little bit. Press on the same calibration button to finish calibration.", VisibleIf = nameof(_activeLockedPinCalibration))]
    [SerializeField, GUIColor(nameof(LockedPinCalibrationColorFeedback)), PropertyOrder(2), BoxGroup("Calibration")] protected Range _lockedPinRange = new(0f, 0f);
    [BoxGroup("Calibration"), PropertyOrder(3)]
    [SerializeField, Curve] private AnimationCurve _pinCorrection = AnimationCurve.Linear(.1f, 0, .9f, 1f);

    [Title("Input Events")]
    [PropertyOrder(2), FoldoutGroup("Events")] public UnityEvent<float, A4VR.Tools.Unity.Core.Range> OnRawNozzleInputChanged;
    [PropertyOrder(2), FoldoutGroup("Events")] public UnityEvent<float> OnNormedNozzleInputChanged;

    private bool _activeNozzleCalibration;
    private bool _activeLockedPinCalibration;

    private const float SafetyPinDefaultValue = 0.5f;
    private const float CurrentSafetyPinValue = 1f;

    protected virtual void Awake()
    {
        if (_resetPoseOnStart)
        {
            transform.position = Vector3.zero;
            transform.rotation = Quaternion.identity;
        }

        PinButtonLocked = true;
    }

    protected override void Start()
    {
        base.Start();

        if (_useDebugInputs)
            LoadCalibrationData();
    }

    protected void Update()
    {
        if (_activeNozzleCalibration)
        {
            UpdateRangeIfGreater(_nozzleStrengthRange.To, _useDebugInputs ? _hall1NozzleDebug : _hall1NozzleRaw, ref _nozzleStrengthRange);
            UpdateRangeIfLess(_nozzleStrengthRange.From, _useDebugInputs ? _hall1NozzleDebug : _hall1NozzleRaw, ref _nozzleStrengthRange);
        }

        if (_activeLockedPinCalibration)
        {
            UpdateRangeIfGreater(_lockedPinRange.To, _useDebugInputs ? _hall2PinDebug : _hall2PinRaw, ref _lockedPinRange);
            UpdateRangeIfLess(_lockedPinRange.From, _useDebugInputs ? _hall2PinDebug : _hall2PinRaw, ref _lockedPinRange);
        }
    }

    #region Calibration

    public override bool TryResetInputRange(CalibrationTypes calibrationType)
    {
        bool success = true;

        switch (calibrationType)
        {
            case CalibrationTypes.Nozzle:
                ResetNozzleRange();
                break;
            case CalibrationTypes.Pin:
                ResetButtonPinState();
                break;
            default:
                HandleInvalidCalibrationType();
                success = false;
                break;
        }

        return success;
    }

    public override bool TryReadInputRange<T>(CalibrationTypes calibrationType, out T inputRange)
    {
        inputRange = default;
        Type inputType = typeof(T);

        switch (calibrationType)
        {
            case CalibrationTypes.Nozzle:
                if (CastIsValid(inputType, _nozzleStrengthRange.GetType()))
                    inputRange = (T)(object)_nozzleStrengthRange;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.Pin:
                if (CastIsValid(inputType, _lockedPinRange.GetType()))
                    inputRange = (T)(object)_lockedPinRange;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            default:
                HandleInvalidCalibrationType();
                break;
        }
        bool success = !EqualityComparer<T>.Default.Equals(inputRange, default);

        return success;
    }

    public override bool TryReadSavedInputRange<T>(CalibrationTypes calibrationType, out T savedInputRange)
    {
        savedInputRange = default;
        Type inputType = typeof(T);

        if (!TryLoadCalibrationData(out NozzleAndPinInputData dataCollection))
            return false;

        switch (calibrationType)
        {
            case CalibrationTypes.Nozzle:
                if (CastIsValid(inputType, dataCollection.NozzleRange.GetType()))
                    savedInputRange = (T)(object)dataCollection.NozzleRange;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.Pin:
                if (CastIsValid(inputType, dataCollection.PinRange.GetType()))
                    savedInputRange = (T)(object)dataCollection.PinRange;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            default:
                HandleInvalidCalibrationType();
                break;
        }
        bool success = !EqualityComparer<T>.Default.Equals(savedInputRange, default);

        return success;
    }

    public override bool TryReadRawInput<T>(CalibrationTypes calibrationType, out T input)
    {
        input = default;
        Type inputType = typeof(T);

        switch (calibrationType)
        {
            case CalibrationTypes.Nozzle:
                if (CastIsValid(inputType, _hall1NozzleRaw.GetType()))
                    input = (T)(object)_hall1NozzleRaw;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.Pin:
                if (CastIsValid(inputType, _hall2PinRaw.GetType()))
                    input = (T)(object)_hall2PinRaw;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            default:
                HandleInvalidCalibrationType();
                break;
        }

        return input != null;
    }

    public override void HandleCalibrationMode(Dictionary<CalibrationTypes, bool> calibrationTypeState)
    {
        bool enable;

        if (TryGetEnableValue(calibrationTypeState, CalibrationTypes.Nozzle, out enable))
        {
            CalibrateNozzleRange(enable);
        }
        else if (TryGetEnableValue(calibrationTypeState, CalibrationTypes.Pin, out enable))
        {
            CalibrateLockedPinRange(enable);
        }
        else
        {
            HandleInvalidCalibrationType();
        }

        bool TryGetEnableValue(Dictionary<CalibrationTypes, bool> calibrationTypeState, CalibrationTypes calibrationType, out bool value)
        {
            value = false;
            return calibrationTypeState.ContainsKey(calibrationType) && calibrationTypeState.TryGetValue(calibrationType, out value);
        }
    }

    public override bool TryGetCalibrationState(out Dictionary<CalibrationTypes, bool> calibrationTypeStates)
    {
        calibrationTypeStates = new()
        {
            { CalibrationTypes.Nozzle, _activeNozzleCalibration },
            { CalibrationTypes.Pin, _activeLockedPinCalibration }
        };

        return true;
    }

    public override void DisableActiveCalibrations()
    {
        if (_activeNozzleCalibration)
            CalibrateNozzleRange(false);

        if (_activeLockedPinCalibration)
            CalibrateLockedPinRange(false);
    }

    /// <summary>
    /// Toggles the calibration mode for the locked pin range.
    /// </summary>
    [HideInEditorMode, PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/LockedPinRange"), Button("Toggle Calibration", ButtonSizes.Small), GUIColor(nameof(LockedPinCalibrationColorFeedback))]
    public void CalibrateLockedPinRangeToggle()
    {
        _activeLockedPinCalibration = !_activeLockedPinCalibration;

        if (_activeLockedPinCalibration)
            ResetLockedPinRange();
    }

    /// <summary>
    /// Toggles the calibration mode for the locked pin range.
    /// </summary>
    /// <param name="enable">True to enable calibration mode, false to disable.</param>
    public void CalibrateLockedPinRange(bool enable)
    {
        _activeLockedPinCalibration = enable;

        if (_activeLockedPinCalibration)
            ResetLockedPinRange();
    }

    /// <summary>
    /// Resets the locked pin range to a default value.
    /// </summary>
    [HideInEditorMode, PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/LockedPinRange"), Button("Reset", ButtonSizes.Small)]
    public void ResetLockedPinRange()
    {
        float defaultValue = _useDebugInputs ? _hall2PinDebug : _hall2PinRaw;

        _lockedPinRange = new Range(defaultValue, defaultValue);
    }

    /// <summary>
    /// Toggles the calibration mode for the nozzle range.
    /// </summary>
    [HideInEditorMode, PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/NozzleRange"), Button("Toggle Calibration", ButtonSizes.Small), GUIColor(nameof(NozzleCalibrationColorFeedback))]
    public void CalibrateNozzleRangeToggle()
    {
        _activeNozzleCalibration = !_activeNozzleCalibration;

        if (_activeNozzleCalibration)
            ResetNozzleRange();

        // block nozzle activation
    }

    /// <summary>
    /// Toggles the calibration mode for the nozzle range.
    /// </summary>
    /// <param name="enable">True to enable calibration mode, false to disable.</param>
    public void CalibrateNozzleRange(bool enable)
    {
        _activeNozzleCalibration = enable;

        if (_activeNozzleCalibration)
            ResetNozzleRange();
        else
        {
            //Debug.Log("[Maddy] reset nozzle to saved value");
            _nozzleStrengthRange = SavedNozzleRange();
        }
    }

    /// <summary>
    /// Resets the nozzle range to a default value.
    /// </summary>
    [HideInEditorMode, PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/NozzleRange"), Button("Reset", ButtonSizes.Small)]
    public void ResetNozzleRange()
    {
        float defaultValue = _useDebugInputs ? _hall1NozzleDebug : _hall1NozzleRaw;

        _nozzleStrengthRange = new Range(defaultValue, defaultValue);
    }

    #endregion

    #region Input

    private void ReceiveButtonPinInput(bool locked)
    {
        PinButtonLocked = locked;
        OnPinInputReceived?.Invoke(locked);
    }

    private void ResetButtonPinState()
    {
        ReceiveButtonPinInput(false);
    }

    protected override void PinUnlockRawInputStarted()
    {
        ReceiveButtonPinInput(true);
    }

    protected override void PinUnlockRawInputCanceled()
    {
        ReceiveButtonPinInput(false);
    }

    protected override void PinUnlockRawInputState(float value)
    {
        _buttonPinLockedRaw = value > 0;

        if (PinButtonLocked && !_buttonPinLockedRaw)
        {
            ReceiveButtonPinInput(false);
        }
        else if (!PinButtonLocked && _buttonPinLockedRaw)
        {
            ReceiveButtonPinInput(true);
        }
    }

    private void HandlePinInput(float input)
    {
        _hall2PinRaw = input;

        if (Mathf.Abs(input - PinValue) >= _pinThreshold)
        {
            PinValue = input;
            OnPinInputReceived?.Invoke(input > _lockedPinRange.From);
        }
    }

    protected override void MainFlowRawInputPerformed(float input)
    {
        input *= 255f;

        HandleNozzleInput(input);
    }

    private void HandleNozzleInput(float input)
    {
        _hall1NozzleRaw = input;
        OnRawNozzleInputChanged?.Invoke(_hall1NozzleRaw, _nozzleStrengthRange);

        float relativeInput = Mathf.Clamp01(Mathf.InverseLerp(_nozzleStrengthRange.From, _nozzleStrengthRange.To, input));
        float normedInput = _nozzleCorrection.Evaluate(Mathf.Abs(_inverseRawNozzleValue ? 1 - relativeInput : relativeInput));

        if (Mathf.Abs(normedInput - NozzleValueNormed) > _nozzleThreshold)
        {
            NozzleValueNormed = normedInput;

            OnNormedNozzleInputChanged?.Invoke(normedInput);
            NormalizedFlowStrength = normedInput;
        }
    }

    #endregion

    #region JsonFile Management

    [Button]
    public override bool TrySaveCalibrationData()
    {
        NozzleAndPinInputData data = new NozzleAndPinInputData(Id.ToString(), _lockedPinRange, _nozzleStrengthRange);

        if (data == null)
            return false;

        SaveData(data);
        LoadCalibrationData();

        return true;
    }

    [Button]
    public override void LoadCalibrationData()
    {
        NozzleAndPinInputData dataCollection = LoadData(Id);

        if (dataCollection != null)
        {
            _lockedPinRange = dataCollection.PinRange;
            _nozzleStrengthRange = dataCollection.NozzleRange;
        }
    }

    private Range SavedNozzleRange()
    {
        NozzleAndPinInputData dataCollection = LoadData(Id);

        if (dataCollection != null)
            return dataCollection.NozzleRange;

        return new Range(0, 0);
    }

    public override bool TryLoadCalibrationData<T>(out T calibrationData)
    {
        calibrationData = default;

        if (typeof(T) == typeof(NozzleAndPinInputData))
            calibrationData = (T)(object)LoadData(Id);

        return !EqualityComparer<T>.Default.Equals(calibrationData, default);
    }
    #endregion

    #region DebugMode

    private void DebugPinButtonInput()
    {
        OnPinInputReceived?.Invoke(_buttonPinLockedDebug);
    }

    private void DebugPinInput()
    {
        HandlePinInput(_hall2PinDebug);
    }

    private void DebugNozzleInput()
    {
        HandleNozzleInput(_hall1NozzleDebug);
    }

    #endregion

    #region InspectorColor
    private Color NozzleCalibrationColorFeedback()
    {
        return _activeNozzleCalibration ? Color.yellow : Color.white;
    }

    private Color LockedPinCalibrationColorFeedback()
    {
        return _activeLockedPinCalibration ? Color.yellow : Color.white;
    }

    #endregion
}
