import {
	Color,
	FlightControlState_0_1_0,
	GuidWithDebugName_0_1_0,
	Location_0_1,
} from "../common/Common";
import { Vessel_0_1 } from "../vessel/VesselInfo-0-1";

/**
 * This is a full top level save file, as of save version 0.1.0.
 */
export interface SaveFile_0_1_0 {
	Metadata: SaveMetadata_0_1_0;
	Properties: SaveProperties_0_1_0;
	GalaxyDefinitionKey: string;
	SessionManager: SaveSessionManager_0_1_0;
	SessionGuid: string;
	Agencies: SaveAgency_0_1_0[];
	CampaignPlayers: SaveCampaignPlayer_0_1_0[];
	Vessels: Vessel_0_1[];
	ColonyData: SaveColonyData_0_1_0;
	KerbalData: SaveKerbalData_0_1_0;
	PlantedFlags: SavePlantedFlag_0_1_0[];
	TravelLogData: SaveTravelLogData_0_1_0;
}

// #region SaveMetadata_0_1_0

/**
 * This object contains the metadata describing the save file itself and some generic campaign settings.
 */
export interface SaveMetadata_0_1_0 {
	VersionString: "0.1.0";

	/**
	 * The save name that is displayed in the save list.
	 */
	Name: string;

	/**
	 * The save description that is displayed in the save list.
	 */
	Description: string;

	/**
	 * The absolute path to the save file.
	 */
	Filepath: string;

	/**
	 * The current time of the universe (in seconds?)
	 */
	UniverseTime: number;

	/**
	 * The absolute path to the thumbnail image for the save.
	 */
	ThumbnailImagePath: string;

	/**
	 * The name of the host player's active vessel.
	 */
	HostPlayerActiveVesselName: string;

	/**
	 * The time that this file was saved in ISO 8601 format.
	 */
	SaveCreatedTime: string;

	/**
	 * The type of save this is (manual, auto, quick).
	 */
	SavedGameType: SaveTypes_0_1_0;

	/**
	 * The amount of science points available to the player
	 */
	AvailableScience: number;

	/**
	 * The campaign mode of this save (sandbox).
	 */
	GameMode: SaveGameMode_0_1_0;

	/**
	 * The campaign type of this save (single player).
	 */
	CampaignType: SaveCampaignTypes_0_1_0;

	/**
	 * The difficulty level of this save.
	 */
	DifficultyLevel: string; // TODO enum?

	/**
	 * Whether or not the first time player help is enabled.
	 */
	NewPlayerIsFTUEEnabled: boolean;
}

export type SaveTypes_0_1_0 = "Manual" | "Auto" | "Quick";
export type SaveGameMode_0_1_0 = "Sandbox" | "ExplorationMode"; // May need to expand this later, depending on if the save version increments first
export type SaveCampaignTypes_0_1_0 = "SinglePlayer"; // May need to expand this later, depending on if the save version increments first

// #endregion

// #region SaveProperties_0_1_0

export interface SaveProperties_0_1_0 {
	BoolProperties: SaveBoolProperties_0_1_0;
}

export interface SaveBoolProperties_0_1_0 {
	NoCrashDamage: boolean;
	DisableGravity: boolean;
	DisableAerodynamics: boolean;
	DisableThermodynamics: boolean;
	IgnoreMaxTemp: boolean;
	UnlockAllParts: boolean;
}

// #endregion

// #region SaveSessionManager_0_1_0

export interface SaveSessionManager_0_1_0 {
	DifficultyOptions: SaveDifficultyOptions_0_1_0;
	DefaultDifficultyOptions: SaveDifficultyOptions_0_1_0;
}

export interface SaveDifficultyOptions_0_1_0 {
	Difficulty: string; // TODO enum?
	AllowRevert: boolean;
	AllowQuickLoad: boolean;
	IncludeStockVessels: boolean;
	DockingTolerance: number;
	CommNetRequired: boolean;
	UnbreakableJoints: boolean;
	InfiniteFuel: boolean;
	InfinitePower: boolean;
	HeatEnabled: boolean;
	HeatScaling: number;
	HeatPartDestruction: boolean;
	StartingScience: number;
	ScienceRewards: number;
	MissionRewards: number;
}

// #endregion

// #region SaveAgencies_0_1_0

export interface SaveAgency_0_1_0 {
	AgencyId: number;
	AgencyName: string;
	SubmittedResearchReports: null[]; // TODO
	SciencePointCapacity: number;
	AdditionalSciencePoints: number;
	ColorBase: Color;
	ColorAccent: Color;
	FlagSpriteLocation: string;
	MissionData: SaveMissionData_0_1_0[];
}

// #endregion

// #region SaveCampaignPlayers_0_1_0

export interface SaveCampaignPlayer_0_1_0 {
	PlayerName: string;
	PlayerGuid: string;
	PlayerId: number;
	StartingGameState: string; // TODO enum?
	HistoricalGameState: string; // TODO enum?
	AgencyId: number;
	ActiveVesselName: string;
	ActiveVesselGuid: GuidWithDebugName_0_1_0;
	UnlockedTechNodes: string[];
	AllocatedSciencePoints: number;
	ActiveCameraGroup: string; // TODO enum?
	ActiveCameraInfo: SaveActiveCameraInfo_0_1_0;
	ActiveLocalSpaceCB: string; // TODO enum?
	ObservedSimObjectGuid: GuidWithDebugName_0_1_0;
	FlightControlState: FlightControlState_0_1_0;
	LastOABWorkspaceSnapshot: null; // TODO figure out this type
	LastOABConfig: null; // TODO figure out this type
	CopyLocation: null; // TODO figure out this type
	FavoritedParts: Record<string, 0>;
	FTUE: boolean;
	MissionSaveData: SaveMissionData_0_1_0[]; // TODO
	/**
	 * A comma-separated list of tutorials that have been completed.
	 */
	CompletedTutorialList: string;
	/**
	 * A comma-separated list of FTUE thingies that have been completed.
	 */
	CompletedFTUEList: string;
	TrackedMissions: SaveTrackedMissions_0_1_0[];
	PartColorBase: Color;
	PartColorAccent: Color;
}

export interface SaveActiveCameraInfo_0_1_0 {
	ActiveCameraId: string; // TODO enum?
	ActiveCameraMode: string; // TODO enum?
	Distance: number;
	Yaw: number;
	Pitch: number;
}

export interface SaveTrackedMissions_0_1_0 {
	MissionOwner: string;
	OwnerId: number;
	MissionIDs: string[];
}

// #endregion

// #region SaveMissionData_0_1_0

export interface SaveMissionData_0_1_0 {
	MissionID: string;
	CompletedStages: SaveMissionStage_0_1_0[];
	IsNew: boolean;
	IsActive: boolean;
	Available: boolean;
	Completed: boolean;
	TurnedIn: boolean;
}

export interface SaveMissionStage_0_1_0 {
	PlayerId: number;
	StageIds: null; // TODO figure out this type
	CurrentStageIndex: number;
}

// #endregion

// #region SaveColonyData_0_1_0

export interface SaveColonyData_0_1_0 {
	activeFlights: null; // TODO figure out this type, may remain null for now
	deliveryRoutes: null; // TODO figure out this type, may remain null for now
}

// #endregion

// #region SaveKerbalData_0_1_0

export interface SaveKerbalData_0_1_0 {
	Kerbals: Record<string, SaveKerbal_0_1_0>;
	TotalKerbalSpawnCount: number;
	CustomKerbals: Record<string, string>;
	VeteranKerbalRefresh: Record<string, unknown>; // TODO
}

export interface SaveKerbal_0_1_0 {
	NameKey: string;
	EnrollmentUT: number;
	PlayerGuidString: string;
	SimObjectIdString: string;
	SecondaryIdString: string;
	PositionIndex: number;
	Attributes: SaveKerbalAttributes_0_1_0;
}

export interface SaveKerbalAttributes_0_1_0 {
	CustomNameKey: string;
	FirstName: string;
	Surname: string;
}

// #endregion

// #region SavePlantedFlag_0_1_0

export interface SavePlantedFlag_0_1_0 {
	Guid: GuidWithDebugName_0_1_0;
	OwnerPlayerGuidString: string;
	OwnerPlayerId: number;
	AuthorityPlayerId: number;
	FlagDefinition: SaveFlagDefinition_0_1_0;
	FlagState: SaveFlagState_0_1_0;
	Location: Location_0_1;
}

export interface SaveFlagDefinition_0_1_0 {
	Name: string;
	LocationName: string;
	LocationDescription: string | null;
}

export interface SaveFlagState_0_1_0 {
	PhsyicsMode: string; // TODO enum?
}

// #endregion

// #region SaveTravelLogData_0_1_0

export interface SaveTravelLogData_0_1_0 {
	Objects: SaveTravelLogObject_0_1_0[];
	ObjectEvents: SaveTravelLogObjectEvent_0_1_0[];
	Firsts: SaveTravelLogFirsts_0_1_0; // Added in 0.2.0
}

export interface SaveTravelLogFirsts_0_1_0 {
	SOIReached: SaveTravelLogFirstData_0_1_0[];
	DiscoverableReached: SaveTravelLogFirstData_0_1_0[];
	CBLanded: SaveTravelLogFirstData_0_1_0[];
	WalkedOn: SaveTravelLogFirstData_0_1_0[];
	CBLaunched: SaveTravelLogFirstData_0_1_0[];
}

export interface SaveTravelLogFirstData_0_1_0 {
	TravelObjectId: string;
	ObjectKey: string;
	UT: number;
}

export interface SaveTravelLogObject_0_1_0 {
	TravelObjectId: string;
	Statistics: SaveTravelLogStatistics_0_1_0;
}

export interface SaveTravelLogStatistics_0_1_0 {
	DistanceTravelled: number;
	GroundDistanceTravelled: number;
	MaxAltitude: number;
	MaxGeeForce: number;
	MaxSpeed: number;
	MaxSpeedOverGround: number;
	MaxGroundSpeed: number;
}

export interface SaveTravelLogObjectEvent_0_1_0 {
	TravelObjectIds: string[];
	EventKey: string;
	UT: number;
	FlightReportArgs: string[];
}

// #endregion
