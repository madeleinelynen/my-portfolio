using System;
using System.Collections.Generic;
using System.Linq;
using A4VR.Tools.Unity.Management;
using A4VR.Tools.Unity.Utilities;
using Sirenix.OdinInspector;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Users;

public abstract class ExtinguisherInputManager : MonoBehaviour
{
    [Flags]
    protected enum PinInputModes
    {
        Button = 0,
        Value = 1 << 0
    }

    [SerializeField] protected bool _useDebugInputs;

    private const string MainFlowBindingPath = "<A4VRCON>/Hall1";
    private const string PrimaryAngleBindingPath = "<A4VRCON>/Hall2";
    private const string SecondaryAngleBindingPath = "<A4VRCON>/Hall3";
    private const string KnobUnlockBindingPath = "<A4VRCON>/Button1";
    private const string PinUnlockBindingPath = "<A4VRCON>/Button2";

    public float NormalizedFlowStrength { get; protected set; }

    private A4VRCON _controllerDeviceValue;
    public A4VRCON ControllerDevice
    {
        get => _controllerDeviceValue;
        set
        {
            if (_controllerDeviceValue == value)
                return;

            _controllerDeviceValue = value;

            if (_startedFlag && _controllerDeviceValue != null)
                ApplyInputDevice();
        }
    }


    private InputUser _inputUser;

    private bool _startedFlag;


    private InputAction _mainFlowAction;
    private InputAction _primaryAngleAction;
    private InputAction _secondaryAngleAction;
    private InputAction _knobUnlockAction;
    private InputAction _pinUnlockAction;

    protected virtual void Start()
    {
        if (ControllerDevice != null)
            ApplyInputDevice();

        _startedFlag = true;
    }


    #region InputHandling

    private void HandleMainFlowInput(InputAction.CallbackContext context)
    {
        switch(context.phase)
        {
            case InputActionPhase.Started:
                MainFlowRawInputStarted();
                break;
            case InputActionPhase.Performed:
                MainFlowRawInputPerformed(context.ReadValue<float>());
                break;
            case InputActionPhase.Canceled:
                MainFlowRawInputCanceled();
                break;
        }
    }

    private void HandlePrimaryAngleInput(InputAction.CallbackContext context)
    {
        switch (context.phase)
        {
            case InputActionPhase.Started:
                PrimaryAngleRawInputStarted();
                break;
            case InputActionPhase.Performed:
                PrimaryAngleRawInputPerformed(context.ReadValue<float>());
                break;
            case InputActionPhase.Canceled:
                PrimaryAngleRawInputCanceled();
                break;
        }
    }

    private void HandleSecondaryAngleInput(InputAction.CallbackContext context)
    {
        switch (context.phase)
        {
            case InputActionPhase.Started:
                SecondaryAngleRawInputStarted();
                break;
            case InputActionPhase.Performed:
                SecondaryAngleRawInputPerformed(context.ReadValue<float>());
                break;
            case InputActionPhase.Canceled:
                SecondaryAngleRawInputCanceled();
                break;
        }
    }

    private void HandleKnobUnlockInput(InputAction.CallbackContext context)
    {
        switch (context.phase)
        {
            case InputActionPhase.Started:
                KnobUnlockRawInputStarted();
                break;
            case InputActionPhase.Performed:
                KnobUnlockRawInputPerformed();
                break;
            case InputActionPhase.Canceled:
                KnobUnlockRawInputCanceled();
                break;
        }
    }

    private void HandlePinUnlockInput(InputAction.CallbackContext context)
    {
        switch (context.phase)
        {
            case InputActionPhase.Started:
                PinUnlockRawInputStarted();
                break;
            case InputActionPhase.Performed:
                PinUnlockRawInputPerformed();
                break;
            case InputActionPhase.Canceled:
                PinUnlockRawInputCanceled();
                break;
        }
    }

    #endregion

    protected virtual void MainFlowRawInputStarted() { }
    protected virtual void MainFlowRawInputPerformed(float value) { }
    protected virtual void MainFlowRawInputCanceled() { }

    protected virtual void PrimaryAngleRawInputStarted() { }
    protected virtual void PrimaryAngleRawInputPerformed(float value) { }
    protected virtual void PrimaryAngleRawInputCanceled() { }

    protected virtual void SecondaryAngleRawInputStarted() { }
    protected virtual void SecondaryAngleRawInputPerformed(float value) { }
    protected virtual void SecondaryAngleRawInputCanceled() { }

    protected virtual void KnobUnlockRawInputStarted() { }
    protected virtual void KnobUnlockRawInputPerformed() { }
    protected virtual void KnobUnlockRawInputCanceled() { }
    protected virtual void KnobUnlockRawInputState(float value) { }

    protected virtual void PinUnlockRawInputStarted() { }
    protected virtual void PinUnlockRawInputPerformed() { }
    protected virtual void PinUnlockRawInputCanceled() { }
    protected virtual void PinUnlockRawInputState(float value) { }


    private void ApplyInputDevice()
    {
        _inputUser = InputUser.PerformPairingWithDevice(ControllerDevice);

        UnsubscribeInputActionEvents();

        _mainFlowAction?.Disable();
        _primaryAngleAction?.Disable();
        _secondaryAngleAction?.Disable();
        _knobUnlockAction?.Disable();
        _pinUnlockAction?.Disable();

        var actionMap = new InputActionMap();
        _mainFlowAction = actionMap.AddAction("MainFlow", binding: MainFlowBindingPath, type: InputActionType.Value);
        _primaryAngleAction = actionMap.AddAction("PrimaryAngle", binding: PrimaryAngleBindingPath, type: InputActionType.Value);
        _secondaryAngleAction = actionMap.AddAction("SecondaryAngle", binding: SecondaryAngleBindingPath, type: InputActionType.Value);
        _knobUnlockAction = actionMap.AddAction("KnobUnlock", binding: KnobUnlockBindingPath, type: InputActionType.Button);
        _pinUnlockAction = actionMap.AddAction("PinUnlock", binding: PinUnlockBindingPath, type: InputActionType.Button);

        _knobUnlockAction.wantsInitialStateCheck = true;
        _pinUnlockAction.wantsInitialStateCheck = true;

        _mainFlowAction.Enable();
        _primaryAngleAction.Enable();
        _secondaryAngleAction.Enable();
        _knobUnlockAction.Enable();
        _pinUnlockAction.Enable();

        SubscribeInputActionEvents();

        _inputUser.AssociateActionsWithUser(actionMap);
    }

    private void SubscribeInputActionEvents()
    {
        _mainFlowAction.started += HandleMainFlowInput;
        _mainFlowAction.performed += HandleMainFlowInput;
        _mainFlowAction.canceled += HandleMainFlowInput;

        _primaryAngleAction.started += HandlePrimaryAngleInput;
        _primaryAngleAction.performed += HandlePrimaryAngleInput;
        _primaryAngleAction.canceled += HandlePrimaryAngleInput;

        _secondaryAngleAction.started += HandleSecondaryAngleInput;
        _secondaryAngleAction.performed += HandleSecondaryAngleInput;
        _secondaryAngleAction.canceled += HandleSecondaryAngleInput;

        _knobUnlockAction.started += HandleKnobUnlockInput;
        _knobUnlockAction.performed += HandleKnobUnlockInput;
        _knobUnlockAction.canceled += HandleKnobUnlockInput;

        _pinUnlockAction.started += HandlePinUnlockInput;
        _pinUnlockAction.performed += HandlePinUnlockInput;
        _pinUnlockAction.canceled += HandlePinUnlockInput;
    }

    protected virtual void UnsubscribeInputActionEvents()
    {
        if (_mainFlowAction != null)
        {
            _mainFlowAction.started -= HandleMainFlowInput;
            _mainFlowAction.performed -= HandleMainFlowInput;
            _mainFlowAction.canceled -= HandleMainFlowInput;
        }

        if (_primaryAngleAction != null)
        {
            _primaryAngleAction.started -= HandlePrimaryAngleInput;
            _primaryAngleAction.performed -= HandlePrimaryAngleInput;
            _primaryAngleAction.canceled -= HandlePrimaryAngleInput;
        }

        if (_secondaryAngleAction != null)
        {
            _secondaryAngleAction.started -= HandleSecondaryAngleInput;
            _secondaryAngleAction.performed -= HandleSecondaryAngleInput;
            _secondaryAngleAction.canceled -= HandleSecondaryAngleInput;
        }

        if (_knobUnlockAction != null)
        {
            _knobUnlockAction.started -= HandleKnobUnlockInput;
            _knobUnlockAction.performed -= HandleKnobUnlockInput;
            _knobUnlockAction.canceled -= HandleKnobUnlockInput;
        }
            
        if (_pinUnlockAction != null)
        {
            _pinUnlockAction.started -= HandlePinUnlockInput;
            _pinUnlockAction.performed -= HandlePinUnlockInput;
            _pinUnlockAction.canceled -= HandlePinUnlockInput;
        }
    }
}

public abstract class ExtinguisherInputManager<T> : ExtinguisherInputManager where T : BasicSaveData
{
    public static event Action OnAnyInputChanged;
    public string Id => Extinguisher.Id;

    [Title("Dependencies")]
    [SerializeField, Required]
    protected Extinguisher Extinguisher;

    [SerializeField]
    protected bool _showDebugs;

    [SerializeField]
    protected CalibrationTypes[] _validCalibrationTypes;

    public abstract bool TrySaveCalibrationData();
    public abstract void LoadCalibrationData();
    public abstract bool TryLoadCalibrationData<TInput>(out TInput CalibrationData);
    public abstract void DisableActiveCalibrations();
    public abstract bool TryResetInputRange(CalibrationTypes calibrationType);

    /// <summary>
    /// Tries to retrieve the calibration state for each calibration type and populates a dictionary with the results.
    /// </summary>
    /// <param name="calibrationTypeStates">Dictionary containing calibration types and their corresponding states.</param>
    /// <returns>True if calibration states were successfully retrieved and populated into the dictionary, otherwise false.</returns>
    public abstract bool TryGetCalibrationState(out Dictionary<CalibrationTypes, bool> calibrationTypeStates);

    /// <summary>
    /// Handles calibration mode based on the provided calibration type state dictionary.
    /// </summary>
    /// <param name="calibrationTypeState">A dictionary containing calibration types as keys and their corresponding enable/disable states as values.</param>
    public abstract void HandleCalibrationMode(Dictionary<CalibrationTypes, bool> calibrationTypeStates);

    /// <summary>
    /// Reads input based on the provided calibration type.
    /// </summary>
    /// <typeparam name="T">The type of input to read.</typeparam>
    /// <param name="calibrationType">The type of calibration.</param>
    /// <param name="rawInput">The read input value.</param>
    public abstract bool TryReadRawInput<TInput>(CalibrationTypes calibrationType, out TInput input);

    /// <summary>
    /// Reads the input range for a specific calibration type.
    /// </summary>
    /// <typeparam name="T">The type of input range.</typeparam>
    /// <param name="calibrationType">The type of calibration.</param>
    /// <param name="inputRange">The read input range.</param>
    public abstract bool TryReadInputRange<TInput>(CalibrationTypes calibrationType, out TInput inputRange);

 
    /// <summary>
    /// Reads the current calibrating input range for a specific calibration type.
    /// </summary>
    /// <typeparam name="T">The type of input range.</typeparam>
    /// <param name="calibrationType">The type of calibration.</param>
    /// <param name="inputRange">The read input range.</param>
    public abstract bool TryReadSavedInputRange<TInput>(CalibrationTypes calibrationType, out TInput inputRange);


    protected virtual void OnEnable()
    {
        Extinguisher.OnIdSet += LoadCalibrationData;

        Manager.Use<EventAggregator>().GetEvent<DisableActiveCalibrationsCommand>().Subscribe(DisableActiveCalibrations);
        Manager.Use<EventAggregator>().GetEvent<HandleCalibrationStateCommand>().Subscribe(HandleCalibrationMode);
    }

    protected virtual void OnDisable()
    {
        Extinguisher.OnIdSet -= LoadCalibrationData;

        Manager.Use<EventAggregator>().GetEvent<DisableActiveCalibrationsCommand>().Unsubscribe(DisableActiveCalibrations);
        Manager.Use<EventAggregator>().GetEvent<HandleCalibrationStateCommand>().Unsubscribe(HandleCalibrationMode);
    }

    protected void SaveData(T saveData)
    {
        ExtinguisherInputArchive.AddToSaveDataList(saveData);
        ExtinguisherInputArchive.WriteFile();
    }

    protected T LoadData(string id)
    {
        if (!ExtinguisherInputArchive.ReadFile(out BasicSaveData[] loadedData))
            return null;

        T[] typeData = ConvertToSpecificClassArray(loadedData)?.Where(item => item != null).ToArray();

        T filteredData = typeData?.FirstOrDefault(n => string.Equals(n.ID, id));

        if (filteredData == null)
            return null;

        LogDebug($"Loaded {filteredData} data files for Extinguisher with Id: {id}. Save Data type is {typeof(T).Name}");

        return filteredData;
    }

    private IEnumerable<T> ConvertToSpecificClassArray(IEnumerable<BasicSaveData> dataArray)
    {
        try
        {
            return dataArray.OfType<T>().ToArray();
        }
        catch (InvalidCastException)
        {
            Debug.LogError($"Error converting the SaveData array to a {typeof(T).Name} array.");
            return null;
        }
    }

    #region Calibration

    protected void UpdateRangeIfGreater(float calibratedValue, float rawInput, ref A4VR.Tools.Unity.Core.Range target)
    {
        if (rawInput > calibratedValue)
            target.To = rawInput;
    }

    protected void UpdateRangeIfLess(float calibratedValue, float rawInput, ref A4VR.Tools.Unity.Core.Range target)
    {
        if (rawInput < calibratedValue)
            target.From = rawInput;
    }

    protected int ChangeRangeArrayIndex(int i, int max, bool increase)
    {
        return Mathf.Clamp(increase ? i + 1 : i - 1, 0, max);
    }

    #endregion

    protected bool CastIsValid(Type targetType, Type input)
    {
        return input != null
            && targetType == input
            && ReferenceEquals(targetType, input);
    }

    protected void HandleInvalidCalibrationType()
    {
        Debug.LogError("Calibration type is not valid for this input manager");
    }

    protected void HandleInvalidCast<I>(CalibrationTypes calibrationType)
    {
        Debug.LogError($"Invalid cast to type {typeof(I).Name} of calibration type {calibrationType}");
    }

    protected void LogDebug(string m)
    {
        if (_showDebugs)
            Debug.Log(m);
    }
}
