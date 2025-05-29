using Sirenix.OdinInspector;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Events;
using Range = A4VR.Tools.Unity.Core.Range;

public class AWGNozzleInputManager : ExtinguisherInputManager<StreamNozzleInputData>
{
    [System.Serializable]
    public struct CurrentValues
    {
        public float CurrentInputValue;
        public int CurrentIndex;
    }

    public event Action<float, int> OnAWGHall1InputReceived;
    public event Action<float, int> OnAWGHall2InputReceived;
    public event Action<float, bool> OnAWGHall3InputReceived;

    [SerializeField] private bool _controllerConnected;

    [Title("Raw Input")]
    [SerializeField, ReadOnly] private float _gripFrontValueRaw;
    [SerializeField, ReadOnly] private float _gripMiddleValueRaw;
    [SerializeField, ReadOnly] private float _handleValueRaw;

    [Title("Debug Inputs - User Mode")]
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(GripFrontDebug)), PropertyRange(0f, 1f)] private float _gripFrontValueDebug;
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(GripMiddleDebug)), PropertyRange(0f, 1f)] private float _gripMiddleValueDebug;
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(HandleDebug)), PropertyRange(0f, 1f)] private float _handleValueDebug;

    [Title("Hall1")]
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(0), GUIColor(nameof(Hall1CalibrationColorFeedback))] private Range[] _gripMiddlePointranges;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(0), Range(0f, 1f)] private float[] _gripMiddlePointOffsets;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(0), MinValue(0), ShowIf(nameof(_activeHall1Calibration))] private int _hall1CalibrationIndex;

    [Title("Hall2")]
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(2), GUIColor(nameof(Hall2CalibrationColorFeedback))] private Range[] _gripFrontPointranges;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(2), Range(0f, 1f)] private float[] _gripFrontPointOffsets;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(2), MinValue(0), ShowIf(nameof(_activeHall2Calibration))] private int _hall2CalibrationIndex;

    [Title("Hall3")]
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(4), GUIColor(nameof(Hall3CalibrationColorFeedback))] private Range _handleValueRange;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(4)] private float _handleThreshold = .04f;
    [SerializeField, BoxGroup("Calibration"), PropertyOrder(4)] private bool _reverseHandleInput = true;


    [Title("Input Events")]
    [PropertyOrder(2)] public UnityEvent<float> OnNormedAngleInputChanged;
    [PropertyOrder(2), FoldoutGroup("Events")] public UnityEvent<float> OnNormedNozzleInputChanged;

    public int Hall1CalibrationIndex => _hall1CalibrationIndex;
    public int Hall2CalibrationIndex => _hall2CalibrationIndex;

    private CurrentValues _currentHall1Values;
    private CurrentValues _currentHall2Values;
    private CurrentValues _currentHall3Values;

    private bool _activeHall1Calibration;
    private bool _activeHall2Calibration;
    private bool _activeHall3Calibration;

    protected override void OnEnable()
    {
        base.OnEnable();

        GripUiCalibration.OnGripIndexChanged += OnGripIndexIncreased;
    }

    protected override void OnDisable()
    {
        base.OnDisable();

        GripUiCalibration.OnGripIndexChanged -= OnGripIndexIncreased;
    }

    protected override void Start()
    {
        base.Start();

        if (_useDebugInputs)
            LoadCalibrationData();
    }

    protected void Update()
    {
        _controllerConnected = Input.GetJoystickNames().Length > 0 ? Input.GetJoystickNames().Contains("RNi Gamepad") : false;

        if (_activeHall1Calibration)
        {
            CalibrateRangeArray(_hall1CalibrationIndex, _gripMiddlePointranges, _gripMiddlePointOffsets, _gripMiddleValueRaw);
        }

        if (_activeHall2Calibration)
        {
            CalibrateRangeArray(_hall2CalibrationIndex, _gripFrontPointranges, _gripFrontPointOffsets, _gripFrontValueRaw);
        }

        if (_activeHall3Calibration)
        {
            UpdateRangeIfLess(_handleValueRange.From, _handleValueRaw, ref _handleValueRange);
            UpdateRangeIfGreater(_handleValueRange.To, _handleValueRaw, ref _handleValueRange);
        }
    }

    private void CalibrateRangeArray(int i, Range[] ranges, float[] offsets, float rawInput)
    {
        offsets[i] = ClampOffsetValue(i, offsets[i], ranges);

        float clampedRawValue = ClampRawValue(i, rawInput, ranges, offsets[i]);

        if (clampedRawValue > ranges[i].From)
            ranges[i].From = clampedRawValue;

        UpdateRangeIfLess(ranges[i].From, clampedRawValue, ref ranges[i]);
        UpdateRangeIfGreater(ranges[i].To, rawInput, ref ranges[i]);
    }

    private float ClampOffsetValue(int i, float offset, Range[] ranges)
    {
        if (i == 0)
            return Mathf.Clamp(offset, 0f, ranges[i].To - ranges[i].From);

        return Mathf.Clamp(offset, 0f, ranges[i].To - ranges[i - 1].To);
    }

    private float ClampRawValue(int i, float rawInput, Range[] ranges, float offset)
    {
        if (i == 0)
            return rawInput;

        return Mathf.Clamp(rawInput, ranges[i - 1].To + offset, 1);
    }

    #region Calibration

    public override bool TryReadInputRange<T>(CalibrationTypes calibrationType, out T inputRange)
    {
        inputRange = default;
        Type inputType = typeof(T);

        switch (calibrationType)
        {
            case CalibrationTypes.StreamNozzleFront:
                if (CastIsValid(inputType, _gripFrontPointranges.GetType()))
                    inputRange = (T)(object)_gripFrontPointranges;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleMiddle:
                if (CastIsValid(inputType, _gripMiddlePointranges.GetType()))
                    inputRange = (T)(object)_gripMiddlePointranges;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleHandle:
                if (CastIsValid(inputType, _handleValueRange.GetType()))
                    inputRange = (T)(object)_handleValueRange;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            default:
                HandleInvalidCalibrationType();
                break;
        }

        return inputRange != null;
    }
    public override bool TryReadSavedInputRange<T>(CalibrationTypes calibrationType, out T savedInputRange)
    {
        savedInputRange = default;
        Type inputType = typeof(T);

        if (!TryLoadCalibrationData(out StreamNozzleInputData dataCollection))
            return false;

        switch (calibrationType)
        {
            case CalibrationTypes.StreamNozzleFront:
                if (CastIsValid(inputType, dataCollection.GripFrontRanges.GetType()))
                    savedInputRange = (T)(object)dataCollection.GripFrontRanges;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleMiddle:
                if (CastIsValid(inputType, dataCollection.GripMiddleRanges.GetType()))
                    savedInputRange = (T)(object)dataCollection.GripMiddleRanges;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleHandle:
                if (CastIsValid(inputType, dataCollection.HandleRange.GetType()))
                    savedInputRange = (T)(object)dataCollection.HandleRange;
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

    public override bool TryReadRawInput<T>(CalibrationTypes calibrationType, out T rawInput)
    {
        rawInput = default;
        Type inputType = typeof(T);

        switch (calibrationType)
        {
            case CalibrationTypes.StreamNozzleFront:
                if (CastIsValid(inputType, _gripFrontValueRaw.GetType()))
                    rawInput = (T)(object)_gripFrontValueRaw;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleMiddle:
                if (CastIsValid(inputType, _gripMiddleValueRaw.GetType()))
                    rawInput = (T)(object)_gripMiddleValueRaw;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            case CalibrationTypes.StreamNozzleHandle:
                if (CastIsValid(inputType, _handleValueRaw.GetType()))
                    rawInput = (T)(object)_handleValueRaw;
                else
                    HandleInvalidCast<T>(calibrationType);
                break;
            default:
                HandleInvalidCalibrationType();
                break;
        }

        return rawInput != null;
    }

    public override void HandleCalibrationMode(Dictionary<CalibrationTypes, bool> calibrationTypeState)
    {
        bool enable;

        if (TryGetEnableValue(calibrationTypeState, CalibrationTypes.StreamNozzleFront, out enable))
            Hall2GripFrontCalibration(enable);
        else if (TryGetEnableValue(calibrationTypeState, CalibrationTypes.StreamNozzleMiddle, out enable))
            Hall1GripMiddleCalibration(enable);
        else if (TryGetEnableValue(calibrationTypeState, CalibrationTypes.StreamNozzleHandle, out enable))
            Hall3HandleCalibration(enable);
        else
            HandleInvalidCalibrationType();

        if (!enable)
            LoadCalibrationData();

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
            { CalibrationTypes.StreamNozzleFront, _activeHall2Calibration },
            { CalibrationTypes.StreamNozzleMiddle, _activeHall1Calibration },
            { CalibrationTypes.StreamNozzleHandle, _activeHall3Calibration }
        };

        return true;
    }

    public override void DisableActiveCalibrations()
    {
        if (_activeHall2Calibration)
            Hall2GripFrontCalibration(false);

        if (_activeHall1Calibration)
            Hall1GripMiddleCalibration(false);

        if (_activeHall3Calibration)
            Hall3HandleCalibration(false);
    }

    /// <summary>
    /// Resets all ranges in the given array to the default value.
    /// </summary>
    /// <param name="ranges">The array of ranges to reset.</param>
    public void ResetFullRangeArray(Range[] ranges)
    {
        ranges.ToList().ForEach(r => r = new Range(0f, 0f));
    }

    /// <summary>
    /// Toggles the calibration mode for Hall 1 grip middle.
    /// </summary>
    [PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/GripMiddle"), Button("Toggle Calibration", ButtonSizes.Small), GUIColor(nameof(Hall1CalibrationColorFeedback))]
    public void Hall1GripMiddleCalibrationToggle()
    {
        _hall1CalibrationIndex = 0;
        _activeHall1Calibration = !_activeHall1Calibration;
    }

    /// <summary>
    /// Set the calibration mode for Hall 1 grip middle.
    /// </summary>
    /// <param name="enable">True to enable calibration mode, false to disable.</param>
    public void Hall1GripMiddleCalibration(bool enable)
    {
        _hall1CalibrationIndex = 0;
        _activeHall1Calibration = enable;
    }

    /// <summary>
    /// Resets the grip middle point range at the specified index for Hall 1.
    /// </summary>
    [PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/GripMiddle"), Button("Reset at Index", ButtonSizes.Small)]
    public void Hall1GripMiddleResetAtRange()
    {
        float baseRangeValue = Mathf.Clamp(_gripMiddleValueRaw, _hall1CalibrationIndex > 0 ? _gripMiddlePointranges[_hall1CalibrationIndex - 1].To : 0, 1);
        _gripMiddlePointranges[_hall1CalibrationIndex] = new Range(baseRangeValue, baseRangeValue);
    }

    /// <summary>
    /// Toggles the calibration mode for Hall 2 grip front and resets the calibration index.
    /// </summary>
    [PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/GripFront"), Button("Toggle Calibration", ButtonSizes.Small), GUIColor(nameof(Hall2CalibrationColorFeedback))]
    public void Hall2GripFrontCalibrationToggle()
    {
        _activeHall2Calibration = !_activeHall2Calibration;
        _hall2CalibrationIndex = 0;

        if (_activeHall2Calibration)
            Hall2GripFrontResetAtRange();
    }

    /// <summary>
    /// Set the calibration mode for Hall 2 grip front and resets the calibration index.
    /// </summary>
    /// <param name="enable">True to enable calibration mode, false to disable.</param>
    public void Hall2GripFrontCalibration(bool enable)
    {
        _activeHall2Calibration = enable;
        _hall2CalibrationIndex = 0;

        if (_activeHall2Calibration)
            Hall2GripFrontResetAtRange();
    }

    /// <summary>
    /// Resets the grip front point range at the specified index for Hall 2.
    /// </summary>
    [PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/GripFront"), Button("Reset at Index", ButtonSizes.Small)]
    public void Hall2GripFrontResetAtRange()
    {
        float baseRangeValue = Mathf.Clamp(_gripFrontValueRaw, _hall2CalibrationIndex > 0 ? _gripFrontPointranges[_hall2CalibrationIndex - 1].To : 0, 1);
        _gripFrontPointranges[_hall2CalibrationIndex] = new Range(baseRangeValue, baseRangeValue);
    }

    /// <summary>
    ///  the calibration mode for Hall 3 handle.
    /// </summary>
    [PropertyOrder(5), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/Handle"), Button("Toggle Calibration", ButtonSizes.Small), GUIColor(nameof(Hall3CalibrationColorFeedback))]
    public void Hall3HandleCalibrationToggle()
    {
        _activeHall3Calibration = !_activeHall3Calibration;

        if (_activeHall3Calibration)
            Hall3HandleReset();
    }

    /// <summary>
    /// Set the calibration mode for Hall 3 handle.
    /// </summary>
    /// <param name="enable">True to enable calibration mode, false to disable.</param>
    public void Hall3HandleCalibration(bool enable)
    {
        _activeHall3Calibration = enable;

        if (_activeHall3Calibration)
            Hall3HandleReset();
    }

    /// <summary>
    /// Resets the Hall 3 handle value to the raw value.
    /// </summary>
    [PropertyOrder(5), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/Handle"), Button("Reset", ButtonSizes.Small)]
    public void Hall3HandleReset()
    {
        _handleValueRange = new Range(_handleValueRaw, _handleValueRaw);
    }

    #endregion

    #region Input
    protected override void SecondaryAngleRawInputPerformed(float value)
    {
        Hall1GripMiddleInput(value);
    }

    private void Hall1GripMiddleInput(float value)
    {
        _gripMiddleValueRaw = (float)System.Math.Round(value, 3);

        _currentHall1Values.CurrentInputValue = value;

        if (value >= _gripMiddlePointranges[_gripMiddlePointranges.Length - 1].To)
        {
            _currentHall1Values.CurrentIndex = _gripMiddlePointranges.Length - 1;
        }
        else
        {
            for (int i = 0; i < _gripMiddlePointranges.Length; i++)
            {
                if (value >= _gripMiddlePointranges[i].From && value <= _gripMiddlePointranges[i].To)
                {
                    _currentHall1Values.CurrentIndex = i;
                    break;
                }
            }
        }

        OnAWGHall1InputReceived?.Invoke(value, _currentHall1Values.CurrentIndex);
        OnNormedAngleInputChanged?.Invoke(value > (_handleThreshold * 2) ? value : 0);
    }

    protected override void PrimaryAngleRawInputPerformed(float value)
    {
        Hall2GripFrontInput(value);
    }

    private void Hall2GripFrontInput(float value)
    {
        _gripFrontValueRaw = (float)System.Math.Round(value, 3);

        _currentHall2Values.CurrentInputValue = value;

        if (value >= _gripFrontPointranges[_gripFrontPointranges.Length - 1].To)
        {
            _currentHall1Values.CurrentIndex = _gripFrontPointranges.Length - 1;
        }
        else
        {
            for (int i = 0; i < _gripFrontPointranges.Length; i++)
            {
                if (value >= _gripFrontPointranges[i].From && value <= _gripFrontPointranges[i].To)
                {
                    _currentHall2Values.CurrentIndex = i;
                    break;
                }
            }
        }

        OnAWGHall2InputReceived?.Invoke(value, _currentHall2Values.CurrentIndex);
    }

    protected override void MainFlowRawInputPerformed(float value)
    {
        Hall3HandleInput(value);
    }

    private void Hall3HandleInput(float value)
    {
        _handleValueRaw = (float)System.Math.Round(value, 3);

        if (Mathf.Abs(_currentHall3Values.CurrentInputValue - value) < _handleThreshold)
            return;

        _currentHall3Values.CurrentInputValue = value;

        //special input case, because hall3 maybe needs to be reversed
        float normedInput = _reverseHandleInput ? 1f - Mathf.Clamp01((value - _handleValueRange.From) / (_handleValueRange.To - _handleValueRange.From)):
                                                       Mathf.Clamp01((value - _handleValueRange.From) / (_handleValueRange.To - _handleValueRange.From));

        NormalizedFlowStrength = normedInput > (_handleThreshold * 2) ? normedInput : 0;
        OnNormedNozzleInputChanged?.Invoke(normedInput > (_handleThreshold * 2) ? normedInput : 0);
        OnAWGHall3InputReceived?.Invoke(normedInput, true);
    }

    #endregion

    #region RangeIndexButtons

    private void OnGripIndexIncreased(int i, CalibrationTypes type)
    {
        switch (type)
        {
            case CalibrationTypes.StreamNozzleFront:
                if (_activeHall2Calibration)
                    SetHall2RangeIndex(i);
                break;
            case CalibrationTypes.StreamNozzleMiddle:
                if(_activeHall1Calibration)
                    SetHall1RangeIndex(i);
                break;
            default:
                break;
        }
    }


    [PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/IndexHall1"), Button("←", ButtonSizes.Small), ShowIf(nameof(_activeHall1Calibration))]
    private void Hall1DecreaseRangeIndex()
    {
        _hall1CalibrationIndex = ChangeRangeArrayIndex(_hall1CalibrationIndex, _gripMiddlePointranges.Count() - 1, false);
    }

    [PropertyOrder(1), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/IndexHall1"), Button("→", ButtonSizes.Small), ShowIf(nameof(_activeHall1Calibration))]
    private void Hall1IncreaseRangeIndex()
    {
        _hall1CalibrationIndex = ChangeRangeArrayIndex(_hall1CalibrationIndex, _gripMiddlePointranges.Count() - 1, true);
    }

    [PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/IndexHall2"), Button("←", ButtonSizes.Small), ShowIf(nameof(_activeHall2Calibration))]
    private void Hall2DecreaseRangeIndex()
    {
        _hall2CalibrationIndex = ChangeRangeArrayIndex(_hall2CalibrationIndex, _gripFrontPointranges.Count() - 1, false);
    }

    [PropertyOrder(3), PropertySpace(5, 5), BoxGroup("Calibration"), HorizontalGroup("Calibration/IndexHall2"), Button("→", ButtonSizes.Small), ShowIf(nameof(_activeHall2Calibration))]
    private void Hall2IncreaseRangeIndex()
    {
        _hall2CalibrationIndex = ChangeRangeArrayIndex(_hall2CalibrationIndex, _gripFrontPointranges.Count() - 1, true);
    }

    private void SetHall1RangeIndex(int index)
    {
        _hall1CalibrationIndex = Mathf.Clamp(index, 0, _gripMiddlePointranges.Count() - 1);
    }

    private void SetHall2RangeIndex(int index)
    {
        _hall2CalibrationIndex = Mathf.Clamp(index, 0, _gripFrontPointranges.Count() - 1);
    }

    #endregion

    #region JsonFile Management

    [Button]
    public override bool TrySaveCalibrationData()
    {
        StreamNozzleInputData data = new StreamNozzleInputData(Id.ToString(), _handleValueRange, _gripMiddlePointranges, _gripFrontPointranges);

        if (data == null)
            return false;

        SaveData(data);
        return true;
    }

    [Button]
    public override void LoadCalibrationData()
    {
        StreamNozzleInputData data = LoadData(Id);

        if (data != null)
        {
            if (_showDebugs)
                Debug.Log($"ID: {data.ID}, Label (MISSING): {data}, Handle:{data.HandleRange}, MiddleRanges: {data.GripMiddleRanges}, FrontRanges: {data.GripFrontRanges}");

            _handleValueRange = data.HandleRange;
            _gripMiddlePointranges = data.GripMiddleRanges;
            _gripFrontPointranges = data.GripFrontRanges;
        }
    }

    public override bool TryLoadCalibrationData<T>(out T calibrationData)
    {
        calibrationData = default;

        if (typeof(T) == typeof(StreamNozzleInputData))
            calibrationData = (T)(object)LoadData(Id);

        return !EqualityComparer<T>.Default.Equals(calibrationData, default);
    }

    #endregion

    #region GUIColor

    private Color Hall1CalibrationColorFeedback()
    {
        return _activeHall1Calibration ? Color.yellow : Color.white;
    }

    private Color Hall2CalibrationColorFeedback()
    {
        return _activeHall2Calibration ? Color.yellow : Color.white;
    }

    private Color Hall3CalibrationColorFeedback()
    {
        return _activeHall3Calibration ? Color.yellow : Color.white;
    }

    #endregion GUIColor

    #region Debugging

    private void HandleDebug()
    {
        Hall3HandleInput(_handleValueDebug);
    }

    private void GripMiddleDebug()
    {
        Hall1GripMiddleInput(_gripMiddleValueDebug);
    }

    private void GripFrontDebug()
    {
        Hall2GripFrontInput(_gripFrontValueDebug);
    }

    public override bool TryResetInputRange(CalibrationTypes calibrationType)
    {
        return false;
    }

    #endregion Debugging
}