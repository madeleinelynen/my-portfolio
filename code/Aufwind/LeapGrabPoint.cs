using Leap.Unity.Interaction;
using Sirenix.OdinInspector;
using System;
using UnityEngine;

public enum ValidHand { Right, Left }

[Serializable]
public struct HandBoneInfos
{
    public Transform BoneTransform;
    public Vector3 BonePosition;
    public Quaternion BoneRotation;
}

public class LeapGrabPoint : MonoBehaviour
{
    [SerializeField, Title("References", titleAlignment: TitleAlignments.Centered)]
    private InteractionBehaviour _leapInteraction;

    public Transform WristTransform;
    public Transform HandRoot;
    public bool OverrideTransformsWithList;

    [SerializeField, Title("Settings", titleAlignment: TitleAlignments.Centered), GUIColor(nameof(RecordingVariableColor))]
    private bool _recordMovement;

    [PropertySpace(5, 0), EnumToggleButtons, GUIColor(nameof(EnumButtonColor))]
    public ValidHand HandIsValid;

    [SerializeField, ShowIf(nameof(HandIsValid), ValidHand.Right)]
    private KeyCode _recordingKeyR = KeyCode.R;

    [SerializeField, ShowIf(nameof(HandIsValid), ValidHand.Left)]
    private KeyCode _recordingKeyL = KeyCode.L;

    [PropertySpace(5, 0), ShowIf(nameof(HandIsValid), ValidHand.Right)]
    public HandBoneInfos[] RecordedTransformsRight;

    [PropertySpace(5, 0), ShowIf(nameof(HandIsValid), ValidHand.Left)]
    public HandBoneInfos[] RecordedTransformsLeft;

    //[HideInInspector]
    public HandBoneInfos[] GrabPointChilds;


    private void Start()
    {
        GrabPointChilds = new HandBoneInfos[PlayerController.Instance.WristR.GetComponentsInChildren<Transform>().Length];

        int i = 0;

        foreach (Transform wristChild in WristTransform.GetComponentsInChildren<Transform>())
        {
            GrabPointChilds[i].BoneTransform = wristChild;
            GrabPointChilds[i].BonePosition = wristChild.localPosition;
            GrabPointChilds[i].BoneRotation = wristChild.localRotation;

            i++;
        }
    }


#if UNITY_EDITOR
    private void Awake()
    {
        if (_recordMovement)
        {
            if(_leapInteraction != null)
                _leapInteraction.enabled = false;

            gameObject.name = "[RECORDING] " + gameObject.name;
            Debug.Log("+++ Ready to record transforms of LeapGrabPoint: " + gameObject.name);
        }
    }

    private void Update()
    {
        if (_recordMovement)
        {
            if (Input.GetKeyDown(_recordingKeyR) && HandIsValid == ValidHand.Right || Input.GetKeyDown(_recordingKeyL) && HandIsValid == ValidHand.Left)
                RecordTransforms();
        }
    }

    [Button, HorizontalGroup("Buttons")]
    public void SetHandTransforms()
    {
        LeapHandGrabTransform.SetHandTransform(WristTransform, this);
    }

    [Button, HorizontalGroup("Buttons")]
    private void RecordTransforms()
    {
        if (HandIsValid == ValidHand.Right)
            LeapHandGrabTransform.RecordTransformR(WristTransform, this);
        else
            LeapHandGrabTransform.RecordTransformL(WristTransform, this);

        Debug.Log($"Recorded Movement on Object: {gameObject.name}");
    }

    [Button]
    private void DeleteAll()
    {
        RecordedTransformsRight = new HandBoneInfos[0];
        RecordedTransformsLeft = new HandBoneInfos[0];
    }

#endif
    private Color EnumButtonColor()
    {
        return Color.cyan;
    }

    private Color RecordingVariableColor()
    {
        return _recordMovement ? Color.red : Color.white;
    }
}
