using A4VR.Tools.Unity.Management;
using A4VR.Tools.Unity.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Sirenix.OdinInspector;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;
using UnityEngine.XR;

[ModuleDepedencies(typeof(FlamecoachLicenseManager), typeof(ExtinguisherManager))]
public class ExtinguisherTrackerIdManager : ManagerModule
{
    [Serializable]
    internal class ValidTracker
    {
        public string SerialNumber;
        public bool IsConnected;

        public ValidTracker(string serialNumber, bool isConnected)
        {
            SerialNumber = serialNumber;
            IsConnected = isConnected;
        }
    }

    [Serializable]
    internal class IdWrapper
    {
        public List<HardwareTracker> Extinguisher = new();
        public List<string> UnboundedTracker = new();

        [JsonIgnore]
        public IReadOnlyCollection<HardwareTracker> HardwareTrackerCollection => Extinguisher;
    }

    [SerializeField] private bool _debugMode = true;
    [SerializeField] private bool _showDebugs;
    [SerializeField] private IdWrapper _idWrapper;

    private HashSet<string> _connectedTrackerIds = new();

    private static readonly string TrackerDeviceKey = "Tracker";
    private static readonly string StreamingFilePath = "SaveData/Extinguisher_TrackerIDs.json";

    private HashSet<string> _boundedTrackerIds = new();

    private List<InputDevice> _deviceCollectionNoAlloc = new();
    private HashSet<string> _detectedTrackerIds;

    public event Action OnLicensedExtinguisherInitFinished;
    private HashSet<string> _removeBufferNonAlloc = new();

    protected virtual void OnDestroy()
    {
        if (Manager.Instance != null)
            Manager.Use<ExtinguisherManager>().DeviceListener.OnHardwareDeviceStateChanged -= HandleHardwareDeviceChanged;

        DeveloperToolsHelper.OnDevToolAccessChanged -= HandleDevToolAccessChanged;

        if (DeveloperToolsHelper.DevToolsEnabled)
            HandleDevToolAccessChanged(false);
    }

    protected override void OnInitialization(out int? errorCode)
    {   
        if (DeveloperToolsHelper.DevToolsEnabled)
            HandleDevToolAccessChanged(true);

        DeveloperToolsHelper.OnDevToolAccessChanged += HandleDevToolAccessChanged;
        Manager.Use<ExtinguisherManager>().DeviceListener.OnHardwareDeviceStateChanged += HandleHardwareDeviceChanged;

        if (!ReadFile())
            _idWrapper = new();

        if (Manager.Use<FlamecoachLicenseManager>().LicenseValidated)
        {
            InitializeLicensedExtinguisher();
        }

        base.OnInitialization(out errorCode);
    }

    protected virtual void Update()
    {
        foreach (KeyValuePair<string, TrackerUdpReceiver.TrackerPose> tracker in TrackerUdpReceiver.TrackerData)
        {
            bool trackerIsUnknown = true;

            for (int i = 0; i < _idWrapper.Extinguisher.Count; i++)
            {
                List<HardwareTracker.TrackerInfo> trackerList = _idWrapper.Extinguisher[i].Tracker;

                for (int j = 0; j < trackerList.Count; j++)
                {
                    if (trackerList[j].SerialNumber == tracker.Key)
                    {
                        trackerIsUnknown = false;
                        goto EndCheck;
                    }
                }
            }

            for (int i = 0; i < _idWrapper.UnboundedTracker.Count; i++)
            {
                if (_idWrapper.UnboundedTracker[i] == tracker.Key)
                {
                    trackerIsUnknown = false;
                    break;
                }
            }

        EndCheck:;


            if (trackerIsUnknown)
            {
                _idWrapper.UnboundedTracker.Add(tracker.Key);
                WriteJsonFile();
                PublishTrackerListChange(-1);
            }
        }
    }

    public void InitializeLicensedExtinguisher()
    {
        foreach (ushort licensedExtId in Manager.Use<FlamecoachLicenseManager>().LicensedExtinguishers.Select(t => t.Key))
        {
            if (!_idWrapper.HardwareTrackerCollection.Any(t => t.ID == licensedExtId))
                AddExtinguisherHardware(licensedExtId);
        }

        OnLicensedExtinguisherInitFinished?.Invoke();

        WriteJsonFile();
    }

    private void HandleDevToolAccessChanged(bool devToolActive)
    {
        if (devToolActive)
        {
            foreach (ushort idTable in ExtinguisherIdTable.All.Select(t => t.Key))
            {
                if (!_idWrapper.HardwareTrackerCollection.Any(t => t.ID == idTable))
                    AddExtinguisherHardware(idTable);
            }
        }
        else
        {
            for (int i = _idWrapper.Extinguisher.Count - 1; i >= 0; i--)
            {
                HardwareTracker currentTracker = _idWrapper.Extinguisher[i];

                if (currentTracker.ID != 0 && !Manager.Use<FlamecoachLicenseManager>().LicensedExtinguishers.ContainsKey(currentTracker.ID)
                    && Manager.Use<ExtinguisherManager>().DeviceListener.GetState(currentTracker.ID) != ExtinguisherDeviceListener.ExtinguisherDeviceState.Spawned)
                {
                    TryRemoveExtinguisher(currentTracker.ID);
                }
            }
        }

        WriteJsonFile();
        OnLicensedExtinguisherInitFinished?.Invoke();
    }

    private void HandleHardwareDeviceChanged(A4VRCON vRCON, ExtinguisherDeviceListener.ExtinguisherDeviceState state)
    {
        if (state == ExtinguisherDeviceListener.ExtinguisherDeviceState.Spawned)
        {
            if (!_idWrapper.HardwareTrackerCollection.Any(t => t.ID == vRCON.SoftwareId))
            {
                AddExtinguisherHardware(vRCON.SoftwareId);
                WriteJsonFile();
            }

            OnLicensedExtinguisherInitFinished?.Invoke();
        }
    }

    private void AddExtinguisherHardware(ushort extinguisherId)
    {
        _idWrapper.Extinguisher.Add(new HardwareTracker(extinguisherId, new List<HardwareTracker.TrackerInfo>()));
    }

    private void PublishTrackerListChange(short extinguisherId)
    {
        Manager.Use<EventAggregator>().GetEvent<OnTrackerIdChangedOnExtinguisher>().Publish(extinguisherId);
    }

    private void LogError(string message)
    {
        if (_showDebugs)
            Debug.LogError(message);
    }

    #region Set Data

    /// <summary>
    /// Attempts to assign a tracker to a specific role of a fire extinguisher or creates a new extinguisher data if not found.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="type">The type of the fire extinguisher.</param>
    /// <param name="serialNumber">The serial number of the tracker.</param>
    /// <param name="role">The role to assign the tracker to.</param>
    /// <returns>True if the assignment was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryAssignTrackerToExtinguisher(ushort extinguisherId, string serialNumber, ExtinguisherTrackerRoles role)
    {
        if (string.IsNullOrEmpty(serialNumber))
        {
            LogError($"Serialnumber must be specified");
            return false;
        }

        if (!SerialnumberExistsAndUnbounded(serialNumber))
        {
            LogError($"Serialnumber does not exist or is already bounded");
            return false;
        }

        if (role == ExtinguisherTrackerRoles.Unknown)
        {
            LogError($"Tracker {serialNumber} cannot be set because the role is unknown");
            return false;
        }

        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher != null)
        {
            HardwareTracker.TrackerInfo trackerSet = extinguisher.Tracker.FirstOrDefault(n => n.TrackerRole == role);

            if (trackerSet != null)
            {
                if (_idWrapper.Extinguisher.Any(t => t.Tracker.Any(n => n.SerialNumber.Equals(serialNumber, StringComparison.OrdinalIgnoreCase))))
                {
                    LogError($"Tracker {serialNumber} is already assigned to a role for this extinguisher.");
                    return false;
                }

                _idWrapper.UnboundedTracker.Add(trackerSet.SerialNumber);
                trackerSet.SerialNumber = serialNumber;
            }
            else
            {
                extinguisher.Tracker.Add(new HardwareTracker.TrackerInfo { SerialNumber = serialNumber, TrackerRole = role });
            }
        }
        else
        {
            _idWrapper.Extinguisher.Add(new HardwareTracker(extinguisherId, new List<HardwareTracker.TrackerInfo> {
                                                            new HardwareTracker.TrackerInfo { SerialNumber = serialNumber, TrackerRole = role }
                                                            }));
        }

        _idWrapper.UnboundedTracker.Remove(serialNumber);

        PublishTrackerListChange((short)extinguisherId);
        return true;
    }

    /// <summary>
    /// Attempts to assign a tracker to a specific role of a fire extinguisher or creates a new extinguisher data if not found.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="type">The type of the fire extinguisher.</param>
    /// <param name="tracker">The tracker containing the serial number and role to assign.</param>
    /// <returns>True if the assignment was successful, otherwise false.</returns>
    public bool TryAssignTrackerToExtinguisher(ushort extinguisherId, HardwareTracker.TrackerInfo tracker)
    {
        if (string.IsNullOrEmpty(tracker.SerialNumber))
        {
            LogError($"Serialnumber must be specified");
            return false;
        }

        if (!SerialnumberExistsAndUnbounded(tracker.SerialNumber))
        {
            LogError($"Serialnumber does not exist or is already bounded");
            return false;
        }

        if (tracker.TrackerRole == ExtinguisherTrackerRoles.Unknown)
        {
            LogError($"Tracker {tracker.SerialNumber} cannot be set because the role is unknown");
            return false;
        }

        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher != null)
        {
            HardwareTracker.TrackerInfo trackerSet = extinguisher.Tracker.FirstOrDefault(n => n.TrackerRole == tracker.TrackerRole);

            if (trackerSet != null)
            {
                if (_idWrapper.Extinguisher.Any(t => t.Tracker.Any(n => n.SerialNumber.Equals(tracker.SerialNumber))))
                {
                    LogError($"Tracker {tracker.SerialNumber} is already assigned to a role for this extinguisher.");
                    return false;
                }

                _idWrapper.UnboundedTracker.Add(trackerSet.SerialNumber);
                trackerSet.SerialNumber = tracker.SerialNumber;
            }
            else
            {
                extinguisher.Tracker.Add(new HardwareTracker.TrackerInfo { SerialNumber = tracker.SerialNumber, TrackerRole = tracker.TrackerRole });
            }
        }
        else
        {
            _idWrapper.Extinguisher.Add(new HardwareTracker(extinguisherId, new List<HardwareTracker.TrackerInfo> {
                                                            new HardwareTracker.TrackerInfo { SerialNumber = tracker.SerialNumber, TrackerRole = tracker.TrackerRole }
                                                            }));
        }

        _idWrapper.UnboundedTracker.Remove(tracker.SerialNumber);

        PublishTrackerListChange((short)extinguisherId);
        return true;
    }

    /// <summary>
    /// Attempts to assign a new extinguisher with the specified ID and type.
    /// </summary>
    /// <param name="extinguisherId">The ID of the new extinguisher.</param>
    /// <param name="type">The type of the new extinguisher to assign.</param>
    /// <returns>True if the assignment was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryAssignNewExtinguisher(ushort extinguisherId)
    {
        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher != null)
        {
            LogError($"Extinguisher ID {extinguisherId} already exists");
            return false;
        }

        _idWrapper.Extinguisher.Add(new HardwareTracker(extinguisherId, new()));

        return true;
    }

    /// <summary>
    /// Attempts to change an extinguisher type to the specified ID.
    /// </summary>
    /// <param name="extinguisherId">The ID of the extinguisher.</param>
    /// <param name="type">The type of the extinguisher to change.</param>
    /// <returns>True if the change was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryChangeExistingExtinguisherType(ushort extinguisherId)
    {
        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher == null)
        {
            LogError($"Extinguisher ID {extinguisherId} is not found");
            return false;
        }

        //extinguisher.BodyType = type;

        PublishTrackerListChange((short)extinguisherId);
        return true;
    }

    /// <summary>
    /// Exchanges the IDs of the trackers assigned to a given extinguisher.
    /// </summary>
    /// <param name="extinguisherId">The ID of the extinguisher whose tracker IDs are to be exchanged.</param>
    /// <returns>True if the exchange was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryExchangeTrackerIdsOnExtinguisher(ushort extinguisherId)
    {
        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher == null)
        {
            LogError($"Extinguisher ID {extinguisherId} is not found");
            return false;
        }

        if (extinguisher.Tracker.Count != 2)
        {
            LogError($"Tracker exchange cannot be performed because less or more than 2 serialnumbers are assigned to the extinguisher");
            return false;
        }

        (extinguisher.Tracker[1].SerialNumber, extinguisher.Tracker[0].SerialNumber) = (extinguisher.Tracker[0].SerialNumber, extinguisher.Tracker[1].SerialNumber);

        PublishTrackerListChange((short)extinguisherId);
        return true;
    }

    /// <summary>
    /// Attempts to remove a tracker from a fire extinguisher.
    /// </summary>
    /// <param name="serialNumber">The serial number of the tracker to remove.</param>
    /// <returns>True if the removal was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryRemoveTrackerFromExtinguisher(string serialNumber)
    {
        if (string.IsNullOrEmpty(serialNumber))
        {
            LogError($"Tracker {serialNumber} must be specified");
            return false;
        }

        HardwareTracker extinguisherData = _idWrapper.Extinguisher.FirstOrDefault(n => n.Tracker.Any(t => t.SerialNumber.Equals(serialNumber, StringComparison.OrdinalIgnoreCase)));

        if (extinguisherData == null)
            LogError($"Tracker {serialNumber} is not found or already unbounded");

        bool success = _idWrapper.Extinguisher.Any(t => t.Tracker.RemoveAll(n => n.SerialNumber == serialNumber) > 0);

        if (success)
        {
            _idWrapper.UnboundedTracker.Add(serialNumber);
            PublishTrackerListChange((short)extinguisherData.ID);
        }

        return success;
    }


    /// <summary>
    /// Attempts to remove a tracker role from a specified fire extinguisher.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="role">The role of the tracker to remove.</param>
    /// <returns>True if the removal was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryRemoveTrackerSetFromExtinguisher(ushort extinguisherId, ExtinguisherTrackerRoles role)
    {
        if (!TryGetExtinguisherTrackerInfoList(extinguisherId, out List<HardwareTracker.TrackerInfo> trackerSets))
            return false;

        HardwareTracker.TrackerInfo trackerSet = trackerSets.FirstOrDefault(t => t.TrackerRole.Equals(role));

        if (trackerSet == null)
        {
            LogError($"Role {role} does not exist in any tracker set for the specified fire extinguisher ID {extinguisherId}");
            return false;
        }

        bool success = trackerSets.Remove(trackerSet);

        if (success)
        {
            _idWrapper.UnboundedTracker.Add(trackerSet.SerialNumber);
            PublishTrackerListChange((short)extinguisherId);
        }

        return success;
    }

    /// <summary>
    /// Attempts to delete data of a fire extinguisher with the specified ID.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher to delete.</param>
    /// <returns>True if the deletion was successful, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryRemoveExtinguisher(ushort extinguisherId)
    {
        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher == null)
        {
            LogError($"No saved data found for the specified fire extinguisher ID {extinguisherId}");
            return false;
        }

        extinguisher.Tracker.ForEach(t => _idWrapper.UnboundedTracker.Add(t.SerialNumber));

        bool success = _idWrapper.Extinguisher.RemoveAll(t => t.ID == extinguisherId) > 0;

        if (success)
            PublishTrackerListChange((short)extinguisherId);

        return success;
    }

    /// <summary>
    /// Attempts to remove data of a fire extinguisher identified by the specified tracker from the system.
    /// </summary>
    /// <param name="extinguisherData">The tracker representing the fire extinguisher to remove.</param>
    /// <returns>True if the removal was successful, otherwise false.</returns>
    public bool TryRemoveExtinguisher(HardwareTracker extinguisherData)
    {
        if (extinguisherData == null)
        {
            LogError($"No tracker data found for the specified fire extinguisher ID {extinguisherData.ID}");
            return false;
        }

        extinguisherData.Tracker.ForEach(t => _idWrapper.UnboundedTracker.Add(t.SerialNumber));

        bool success = _idWrapper.Extinguisher.RemoveAll(t => t.ID == extinguisherData.ID) > 0;

        if (success)
        {
            PublishTrackerListChange((short)extinguisherData.ID);
        }

        return success;
    }

    public bool TryRemoveAllBoundedTrackerFromExtinguisher(ushort extinguisherId)
    {
        HardwareTracker extinguisher = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId));

        if (extinguisher == null)
        {
            LogError($"No saved data found for the specified fire extinguisher ID {extinguisherId}");
            return false;
        }

        extinguisher.Tracker.ForEach(t => _idWrapper.UnboundedTracker.Add(t.SerialNumber));

        PublishTrackerListChange((short)extinguisherId);

        return true;
    }

    /// <summary>
    /// Removes the specified serial number from the unbounded tracker list, if it exists.
    /// </summary>
    /// <param name="serialNumber">The serial number to remove from the unbounded tracker list.</param>
    /// <returns>True if the serial number was found and removed successfully, otherwise false.</returns>
    [Button, ShowIf(nameof(_debugMode))]
    public bool TryRemoveUnboundedTracker(string serialNumber)
    {
        if (string.IsNullOrEmpty(serialNumber))
        {
            LogError($"Serialnumber must be specified");
            return false;
        }

        if (!SerialnumberExistsAndUnbounded(serialNumber))
            return false;

        if (_idWrapper.UnboundedTracker.Remove(serialNumber))
        {
            PublishTrackerListChange(-1);
            return true;

        }

        return false;
    }

    #endregion Set Data

    #region Retrieve Data

    /// <summary>
    /// Tries to retrieve the tracker information for a fire extinguisher with the specified ID and role.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="role">The role of the tracker associated with the fire extinguisher.</param>
    /// <param name="tracker">When this method returns, contains the tracker information, if found; otherwise, null.</param>
    /// <returns>True if the tracker information was found, otherwise false.</returns>
    public bool TryGetExtinguisherTracker(ushort extinguisherId, ExtinguisherTrackerRoles role, out HardwareTracker tracker)
    {
        tracker = _idWrapper.Extinguisher.FirstOrDefault(t => t.ID.Equals(extinguisherId) && t.Tracker.Any(n => n.TrackerRole == role));

        return tracker != null;
    }

    /// <summary>
    /// Tries to retrieve the input device associated with a specific fire extinguisher tracker.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="role">The role of the tracker associated with the fire extinguisher.</param>
    /// <param name="trackerDevice">The input device associated with the tracker, if found.</param>
    /// <returns>True if the tracker device was successfully retrieved, otherwise false.</returns>
    public bool TryGetExtinguisherTrackerDevice(ushort extinguisherId, ExtinguisherTrackerRoles role, out KeyValuePair<string, TrackerUdpReceiver.TrackerPose> trackerDevice)
    {
        trackerDevice = new KeyValuePair<string, TrackerUdpReceiver.TrackerPose>();

        if (!ExtinguisherIdExists(extinguisherId))
            return false;

        string serialNumber = string.Empty;

        foreach (HardwareTracker extinguisher in _idWrapper.Extinguisher)
        {
            if (extinguisher.ID.Equals(extinguisherId))
            {
                foreach (HardwareTracker.TrackerInfo tracker in extinguisher.Tracker)
                {
                    if (tracker.TrackerRole == role)
                    {
                        serialNumber = tracker.SerialNumber;
                        break;
                    }
                }
                break;
            }
        }

        if (string.IsNullOrEmpty(serialNumber))
        {
            LogError($"Serialnumber is null or empty");
            return false;
        }

        if (SerialnumberExistsAndUnbounded(serialNumber))
            return false;

        if(!TrackerUdpReceiver.TrackerData.TryGetValue(serialNumber, out TrackerUdpReceiver.TrackerPose trackerPose))
        {
            LogError($"Tracker with serial number {serialNumber} was not found among InputDevices and appears to be disconnected");
            return false;
        }

        trackerDevice = new KeyValuePair<string, TrackerUdpReceiver.TrackerPose>(serialNumber, trackerPose);
        return true;
    }

    /// <summary>
    /// Checks the connection state of a tracker with the specified serial number.
    /// </summary>
    /// <param name="serialNumber">The serial number of the tracker to check.</param>
    /// <param name="connected">Outputs a boolean indicating whether the tracker is connected.</param>
    /// <returns>True if the tracker information was successfully retrieved, otherwise false.</returns>
    public bool TryGetTrackerConnectionState(string serialNumber, out bool connected)
    {
        connected = false;

        if (string.IsNullOrEmpty(serialNumber))
            return false;

        HashSet<string> knownIds = GetAllKnownTrackerIds();

        foreach (string id in knownIds)
        {
            if (id.Equals(serialNumber))
            {
                foreach(string connectedId in _connectedTrackerIds)
                {
                    if (id.Equals(serialNumber))
                    {
                        connected = true;
                        return true;
                    }
                }
            }
        }
        return true;
    }

    /// <summary>
    /// Attempts to retrieve the tracker sets associated with a specified fire extinguisher and role.
    /// </summary>
    /// <param name="extinguisherId">The ID of the fire extinguisher.</param>
    /// <param name="role">The role of the tracker sets to retrieve.</param>
    /// <param name="trackerInfo">The list of tracker infos associated with the extinguisher and role, if found.</param>
    /// <returns>True if the retrieval was successful, otherwise false.</returns>
    public bool TryGetExtinguisherTrackerInfoList(ushort extinguisherId, out List<HardwareTracker.TrackerInfo> trackerInfo)
    {
        trackerInfo = new();

        if (!ExtinguisherIdExists(extinguisherId))
            return false;

        trackerInfo = _idWrapper.Extinguisher.FirstOrDefault(e => e.ID.Equals(extinguisherId)).Tracker;

        if (trackerInfo is not { Count: > 0})
        {
            LogError($"No tracker sets exist for the specified fire extinguisher ID {extinguisherId}");
            return false;
        }

        return true;
    }

    /// <summary>
    /// Validates an extinguisher by ID, returning its definition and license status.
    /// Checks licensed entries, legacy fallback, spawned instances, and developer mode.
    /// </summary>
    /// <param name="extinguisherId">The software ID of the extinguisher.</param>
    /// <param name="def">The extinguisher definition (manufacturer and bodytype), if found.</param>
    /// <param name="isLicensed">True if the extinguisher is licensed.</param>
    /// <param name="isLegacy">True if the extinguisher is a legacy device.</param>
    /// <returns>True if a valid definition was found; otherwise, false.</returns>
    public bool TryGetDisplayValidation(ushort extinguisherId, out ExtinguisherBodyDefinition def, out bool isLicensed, out bool isLegacy)
    {
        if (Manager.Use<FlamecoachLicenseManager>().LicensedExtinguishers.TryGetValue(extinguisherId, out def))
        {
            isLicensed = true;
            isLegacy = false;
            return true;
        }

        isLicensed = false;
        isLegacy = extinguisherId == A4VRCON.LegacyDefaultId;

        if (Manager.Use<ExtinguisherManager>().DeviceListener.TryGetSpawnedExtinguisherForSoftwareId(extinguisherId, out Extinguisher ext))
        {
            def = ext.BodyType;
            return true;
        }

        if(isLegacy)
        {
            def = default;
            return true;
        }

        if(Manager.Use<FlamecoachLicenseManager>().IsDeveloperLicense)
            return ExtinguisherIdTable.All.TryGetValue(extinguisherId, out def);

        def = default;
        isLicensed = default;
        isLegacy = default;

        return false;
    }

    public List<HardwareTracker> GetBoundedData()
    {
        return _idWrapper.Extinguisher;
    }

    public List<ushort> GetUsedExtingisherIds()
    {
        return _idWrapper.Extinguisher.Select(n => n.ID).ToList();
    }

    public HashSet<string> GetBoundedTrackerIds()
    {
        _boundedTrackerIds.Clear();

        foreach (HardwareTracker extinguisher in _idWrapper.Extinguisher)
        {
            foreach (HardwareTracker.TrackerInfo tracker in extinguisher.Tracker)
                _boundedTrackerIds.Add(tracker.SerialNumber);
        }

        return _boundedTrackerIds;
    }

    public List<string> GetUnboundedTrackerIds()
    {
        return _idWrapper.UnboundedTracker;
    }

    public HashSet<string> GetAllKnownTrackerIds()
    {
        return GetUnboundedTrackerIds().Concat(GetBoundedTrackerIds()).ToHashSet();
    }

    public List<HardwareTracker.TrackerInfo> GetBoundedTrackerSets()
    {
        return _idWrapper.Extinguisher
            .SelectMany(e => e.Tracker)
            .ToList();
    }

    public List<HardwareTracker.TrackerInfo> GetExtinguisherTrackerSets(ushort extinguisherId)
    {
        if (!ExtinguisherIdExists(extinguisherId))
            return null;

        return _idWrapper.Extinguisher
            .FirstOrDefault(e => e.ID.Equals(extinguisherId))
            .Tracker;
    }

    public List<ExtinguisherTrackerRoles> GetUsedTrackerRoles(ushort extinguisherId)
    {
        if (!ExtinguisherIdExists(extinguisherId))
            return null;

        return _idWrapper.Extinguisher
            .FirstOrDefault(e => e.ID.Equals(extinguisherId))
            .Tracker.Select(tracker => tracker.TrackerRole)
            .ToList();
    }

    private bool ExtinguisherIdExists(ushort extinguisherId)
    {
        if (!_idWrapper.Extinguisher.Any(e => e.ID.Equals(extinguisherId)))
        {
            LogError($"Extinguisher ID {extinguisherId} is either empty or not found");
            return false;
        }

        return true;
    }

    private bool SerialnumberExistsAndUnbounded(string serialNumber)
    {
        return !string.IsNullOrEmpty(serialNumber) && _idWrapper.UnboundedTracker.Contains(serialNumber);
    }

    #endregion Retrieve Data

    #region JsonFile Management

    public List<HardwareTracker> FilterDisplayPanels()
    {
        if (Manager.Use<FlamecoachLicenseManager>().IsDeveloperLicense && DeveloperToolsHelper.DevToolsEnabled)
            return _idWrapper.Extinguisher.ToList();

        List<HardwareTracker> result = new();

        foreach (HardwareTracker jsonTrackerData in _idWrapper.Extinguisher)
        {
            HashSet<ushort> displayIds = Manager.Use<FlamecoachLicenseManager>().LicensedExtinguishers.Select(t => t.Key)
                .Union(Manager.Use<ExtinguisherManager>().DeviceListener.GetAllSpawnedInstances().Select(t => ushort.Parse(t.Id))).ToHashSet();

            if (_idWrapper.HardwareTrackerCollection.Any(t => t.ID == A4VRCON.LegacyDefaultId))
            {
                displayIds.Add(A4VRCON.LegacyDefaultId);
            }

            if (displayIds.Contains(jsonTrackerData.ID))
            {
                result.Add(jsonTrackerData);
            }
        }
        return result;
    }

    [Button]
    public bool ReadFile()
    {
        if (!File.Exists(Path.Combine(Application.streamingAssetsPath, StreamingFilePath)))
            return false;

        string json = File.ReadAllText(Path.Combine(Application.streamingAssetsPath, StreamingFilePath));

        JsonSerializerSettings settings = new JsonSerializerSettings{ Converters = new List<JsonConverter> { new StringEnumConverter() } };

        IdWrapper result = default;
        
        try
        {
            result = JsonConvert.DeserializeObject<IdWrapper>(json, settings);
        }
        catch(Exception ex)
        {
            Debug.LogException(ex);
            return false;
        }

        _idWrapper = result;

        if (result == null || result.Extinguisher.Count == 0)
            return false;

        return true;
    }

    [Button, HorizontalGroup("Buttons")]
    public void WriteJsonFile()
    {
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            Converters = new List<JsonConverter> { new StringEnumConverter() },
            Formatting = Formatting.Indented
        };

        string json = JsonConvert.SerializeObject(_idWrapper, settings);

        File.WriteAllText(Path.Combine(Application.streamingAssetsPath, StreamingFilePath), json);
    }

    [Button, HorizontalGroup("Buttons")]
    public void DeleteJsonFile()
    {
        File.Delete(Path.Combine(Application.streamingAssetsPath, StreamingFilePath));
    }

    #endregion JsonFile Management
}