using Sirenix.OdinInspector;
using System;
using UnityEngine;

public class PinAndKnobInputManager : NozzlePinInputBase
{
    public Action<bool> OnKnobInputReceived;

    [Title("Calculated Inputs")]
    [ReadOnly] public bool KnobButtonTriggered;

    [Title("Inputs Raw"), HideIf(nameof(_useDebugInputs))]
    [SerializeField, HideIf(nameof(_useDebugInputs)), ReadOnly] private float _conType;
    [SerializeField, HideIf(nameof(_useDebugInputs)), ReadOnly] private bool _buttonKnobRaw;

    [Title("Debug Inputs - User Mode")]
    [SerializeField, ShowIf(nameof(_useDebugInputs)), OnValueChanged(nameof(DebugKnobButtonInput))] private bool _buttonKnobPressedDebug;

    #region Input
    protected override void KnobUnlockRawInputStarted()
    {
        ReceiveButtonKnobInput(true);
    }

    protected override void KnobUnlockRawInputCanceled()
    {
        ReceiveButtonKnobInput(false);
    }

    private void ReceiveButtonKnobInput(bool pressed)
    {
        _buttonKnobRaw = pressed;

        KnobButtonTriggered = true;
        OnKnobInputReceived?.Invoke(pressed);
    }

    private void ResetButtonKnobState()
    {
        ReceiveButtonKnobInput(false);
    }
    #endregion

    #region DebugMode
    private void DebugKnobButtonInput()
    {
        OnKnobInputReceived?.Invoke(_buttonKnobPressedDebug);
    }
    #endregion

}
