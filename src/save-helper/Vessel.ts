import { GuidWithDebugName_0_1_0, Location_0_1 } from "../types/common/Common";
import { SymmetrySets_0_1 } from "../types/vessel/SymmetrySets-0-1";
import {
	AssemblyDefinition_0_1,
	AssemblyOABConfig_0_1,
	KerbalState_0_1,
	ManeuverPlanState_0_1,
	PartOwnerState_0_1,
	Part_0_1,
	StagingState_0_1,
	VesselState_0_1,
	Vessel_0_1,
} from "../types/vessel/VesselInfo-0-1";
import { Save } from "./Save";

export class Vessel {
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
	IsDebris: boolean;
	SymmetrySets: SymmetrySets_0_1[];
	location: Location_0_1;
	parts: Part_0_1[];

	constructor(vessel: Vessel_0_1, public save: Save) {
		this.Version = vessel.Version;
		this.Guid = vessel.Guid;
		this.OwnerPlayerGuidString = vessel.OwnerPlayerGuidString;
		this.OwnerPlayerId = vessel.OwnerPlayerId;
		this.AuthorityPlayerId = vessel.AuthorityPlayerId;
		this.AssemblyOABConfig = vessel.AssemblyOABConfig;
		this.AssemblyDefinition = vessel.AssemblyDefinition;
		this.stagingState = vessel.stagingState;
		this.partOwnerState = vessel.partOwnerState;
		this.maneuverPlanState = vessel.maneuverPlanState;
		this.vesselState = vessel.vesselState;
		this.kerbalState = vessel.kerbalState;
		this.IsDebris = vessel.IsDebris;
		this.SymmetrySets = vessel.SymmetrySets;
		this.location = vessel.location;
		this.parts = vessel.parts;
	}

	getTravelLogObject() {
		return this.save.travelLog.objects.get(this.Guid.Guid);
	}
}
