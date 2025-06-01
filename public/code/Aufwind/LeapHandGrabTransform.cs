using UnityEngine;

public class LeapHandGrabTransform
{
#if UNITY_EDITOR
    public static void RecordTransformR(Transform grabbableWristR, LeapGrabPoint grabPoint)
    {
        grabPoint.RecordedTransformsRight = new HandBoneInfos[PlayerController.Instance.WristR.GetComponentsInChildren<Transform>().Length];

        Transform tmpParent = PlayerController.Instance.WristR.parent;

        PlayerController.Instance.WristR.SetParent(grabbableWristR.parent);

        int i = 0;

        foreach (Transform wristChild in PlayerController.Instance.WristR.GetComponentsInChildren<Transform>())
        {
            grabPoint.RecordedTransformsRight[i].BoneTransform = wristChild;
            grabPoint.RecordedTransformsRight[i].BonePosition = wristChild.localPosition;
            grabPoint.RecordedTransformsRight[i].BoneRotation = wristChild.localRotation;
            i++;
        }

        SetHandTransform(grabbableWristR, grabPoint);

        PlayerController.Instance.WristR.SetParent(tmpParent);
    }

    public static void RecordTransformL(Transform grabbableWristL, LeapGrabPoint grabPoint)
    {
        grabPoint.RecordedTransformsLeft = new HandBoneInfos[PlayerController.Instance.WristL.GetComponentsInChildren<Transform>().Length];

        Transform tmpParent = PlayerController.Instance.WristL.parent;

        PlayerController.Instance.WristL.SetParent(grabbableWristL.parent);

        int i = 0;

        foreach (Transform wristChild in PlayerController.Instance.WristL.GetComponentsInChildren<Transform>())
        {
            grabPoint.RecordedTransformsLeft[i].BoneTransform = wristChild;
            grabPoint.RecordedTransformsLeft[i].BonePosition = wristChild.localPosition;
            grabPoint.RecordedTransformsLeft[i].BoneRotation = wristChild.localRotation;
            i++;
        }

        SetHandTransform(grabbableWristL, grabPoint);

        PlayerController.Instance.WristL.SetParent(tmpParent);
    }

    public static void SetHandTransform(Transform grabbableWrist, LeapGrabPoint grabPoint)
    {
        if (grabbableWrist)
        {
            int i = 0;

            foreach (Transform wristChild in grabbableWrist.GetComponentsInChildren<Transform>())
            {
                wristChild.localPosition = grabPoint.HandIsValid == ValidHand.Right ? grabPoint.RecordedTransformsRight[i].BonePosition : grabPoint.RecordedTransformsLeft[i].BonePosition;
                wristChild.localRotation = grabPoint.HandIsValid == ValidHand.Right ? grabPoint.RecordedTransformsRight[i].BoneRotation : grabPoint.RecordedTransformsLeft[i].BoneRotation;
                i++;
            }
        }
    }
#endif
}