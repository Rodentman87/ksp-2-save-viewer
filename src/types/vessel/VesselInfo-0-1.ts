import {
	FlightControlState_0_1_0,
	GuidWithDebugName_0_1_0,
	Location_0_1,
	Quaternion,
	Vector3,
} from "../common/Common";
import { SymmetrySets_0_1 } from "./SymmetrySets-0-1";

export interface Vessel_0_1 {
	Version: "0.1";
	Guid: GuidWithDebugName_0_1_0;
	OwnerPlayerGuidString: string;
	OwnerPlayerId: number;
	AuthorityPlayerId: number;
	AssemblyOABConfig: AssemblyOABConfig_0_1;
	AssemblyDefinition: AssemblyDefinition_0_1;
	stagingState: StagingState_0_1;
	partOwnerState: PartOwnerState_0_1;
	maneuverPlanState: ManeuverPlanState_0_1;
	vesselState: VesselState_0_1;
	kerbalState: KerbalState_0_1;
	scienceStorageState: ScienceStorageState_0_1;
	IsDebris: boolean;
	SymmetrySets: SymmetrySets_0_1[];
	location: Location_0_1;
	parts: Part_0_1[];
	CameraGimbalState: CameraGimbalState_0_1;
}

export interface AssemblyOABConfig_0_1 {
	RootGuid: GuidWithDebugName_0_1_0;
	StagingState: null; // TODO figure out this type
	PartRelationshipData: null; // TODO figure out this type
	SymmetySets: null; // TODO figure out this type
}

export interface AssemblyDefinition_0_1 {
	assemblyName: string;
	localizationNameKey: string;
	version: "1";
	description: null; // TODO maybe string | null?
	simulationObjectType: string; // TODO enum?
	offsetToGround: number;
}

export interface StagingState_0_1 {
	availableStages: StageInfo_0_1[];
	unassignedParts: null; // TODO figure out this type
	totalStageCount: number;
}

export interface StageInfo_0_1 {
	partGuids: null; // TODO this is null but the next one is an array of actual guids???????
	PartIds: GuidWithDebugName_0_1_0[];
	StageID: number;
	IsActive: boolean;
	DeltaVSituation: DeltaVSituation_0_1;
}

export interface DeltaVSituation_0_1 {
	CelestialBody: null; // TODO
	IsAtmosphere: boolean;
	Altitute: number;
}

export interface PartOwnerState_0_1 {
	virtualConnections: never[]; // TODO figure out this type, maybe related to multiplayer?
}

export interface ManeuverPlanState_0_1 {
	maneuvers: Maneuver_0_1[]; // TODO verify this is still correct as of 0.2.0
}

export interface Maneuver_0_1 {
	RelatedSimID: GuidWithDebugName_0_1_0;
	IsOnManeuverTrajectory: boolean;
	NodeID: string;
	NodeName: string;
	Time: number;
	BurnVector: Vector3;
	BurnRequiredDeltaV: number;
	BurnDuration: number;
}

export interface VesselState_0_1 {
	launchTime: number;
	landedAtBase: null; // TODO figure out this type
	landedAtBaseTime: number;
	flightCtrlState: FlightControlState_0_1_0;
	speedMode: string; // TODO enum?
	autoSpeedMode: string; // TODO enum?
	altimeterMode: string; // TODO enum?
	/**
	 * SAS mode
	 */
	autoPilotMode: string; // TODO enum?
	/**
	 * SAS enabled
	 */
	autoPilotState: false;
	isKerbalEVA: boolean;
	isRCSEnabled: boolean;
	flightControlsMode: string; // TODO enum?
	actionGroupStates: null; // TODO figure out this type
	PhysicsMode: string; // TODO enum?
	currentTargetID: GuidWithDebugName_0_1_0;
	launchLocation: string; // TODO enum? maybe? not sure exactly what this is, it says "Invalid" in my save
	SubVessels: never[]; // TODO figure out this type
	Situation: VesselSituations; // TODO enum?
	ControlState: string; // TODO enum?
	CommandModulesState: string; // TODO enum?
	MaxAltitudeReachedDuringFlight: number;
	CurrentControlOwnerPart: GuidWithDebugName_0_1_0;
}

export type VesselSituations =
	| "PreLaunch"
	| "Landed"
	| "Splashed"
	| "Flying"
	| "SubOrbital"
	| "Orbiting"
	| "Escaping";

export interface KerbalState_0_1 {
	CurrentLadderPartId: GuidWithDebugName_0_1_0 | null;
	LadderUpPosOffsetSigned: number | null;
	IsCarryingFlag: boolean | null;
}

export interface ScienceStorageState_0_1 {
	ResearchReports: ResearchReport_0_1[]; // TODO
	ActiveTransmittingReports: Record<string, unknown>; // TODO
}

export interface ResearchReport_0_1 {
	ExperimentID: string;
	ResearchLocationID: string;
	ResearchReportType: string; // TODO enum?
	Location: ResearchReportLocation_0_1;
	InitialScienceValue: number;
	TransmissionStatus: boolean;
	TransmissionPercentage: number;
	FlavorText: string;
	ExperimentDisplayName: string;
	EcRequired: number;
	TimeRequired: number;
	TransmissionSize: number;
	ResearchReportKey: string;
}

export interface ResearchReportLocation_0_1 {
	RequiresRegion: boolean;
	BodyName: string;
	ScienceSituation: string; // TODO enum?
	ScienceRegion: string;
	ResearchLocationId: string;
}

export interface Part_0_1 {
	partGuid: null; // TODO is this always null?
	PartGuid: GuidWithDebugName_0_1_0;
	partName: string;
	partState: PartState_0_1;
	PartModulesState: PartModuleState_0_1[];
	ModulesState: null; // TODO figure out this type
	LegacyModulesState: never[]; // TODO figure out this type
}

export interface PartState_0_1 {
	partOwnerGuid: null; // TODO is this always null?
	PartOwnerGuid: GuidWithDebugName_0_1_0;
	partStatus: string; // TODO enum? maybe?
	attachnodeStates: AttachnodeState_0_1[];
	resources: Record<string, Resource_0_1>;
	localPosition: Vector3;
	originalAttachLocalPosition: Vector3;
	localRotation: Quaternion;
	UserRotation: Quaternion;
	isMirrored: boolean;
	StageIndex: number;
	FuelCrossfeed: boolean;
	Temperature: number;
	partPropertyOverrides: null; // TODO figure out this type
}

export interface AttachnodeState_0_1 {
	nodeId: string;
	IsDynamic: boolean;
	attachedPartGuid: null; // TODO is this always null?
	AttachedPartGuid: GuidWithDebugName_0_1_0;
	attachedPartNodeID: string;
	SizeForDynamic: number;
	LocalPositionForDynamic: Vector3;
	LocalRotationForDynamic: Quaternion;
}

export interface Resource_0_1 {
	name: string;
	storedUnits: number;
	capacityUnits: number;
}

export interface PartModuleState_0_1 {
	Name: string;
	ComponentType: string;
	BehaviorType: string;
	ModuleData: ModuleData_0_1[];
}

export interface ModuleData_0_1 {
	Name: string;
	ModuleType: string;
	DataType: string;
	Data: null; // TODO figure out this type
	DataObject: DataObject_0_1;
}

export interface DataObject_0_1 {
	$type: string;
	ModuleType: string;
	DataType: string;
	IsActiveInStagingProp: {
		ContextKey: null; // TODO figure out this type
		storedValue: false; // TODO figure out this type
	};
	[extra: string]: unknown;
}

export interface CameraGimbalState_0_1 {
	distance: number;
	pitch: number;
	heading: number;
	roll: number;
	localPitch: number;
	localHeading: number;
	pan: {
		x: number;
		y: number;
	};
}

export interface ValueWithContextKey<T> {
	ContextKey: string;
	storedValue: T;
}
