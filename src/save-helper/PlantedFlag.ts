import { GuidWithDebugName_0_1_0, Location_0_1 } from "../types/common/Common";
import {
	SaveFlagDefinition_0_1_0,
	SaveFlagState_0_1_0,
	SavePlantedFlag_0_1_0,
} from "../types/save/SaveFile-0-1-0";
import { Save } from "./Save";

export class PlantedFlag {
	Guid: GuidWithDebugName_0_1_0;
	OwnerPlayerGuidString: string;
	OwnerPlayerId: number;
	AuthorityPlayerId: number;
	FlagDefinition: SaveFlagDefinition_0_1_0;
	FlagState: SaveFlagState_0_1_0;
	Location: Location_0_1;

	constructor(flag: SavePlantedFlag_0_1_0, public save: Save) {
		this.Guid = flag.Guid;
		this.OwnerPlayerGuidString = flag.OwnerPlayerGuidString;
		this.OwnerPlayerId = flag.OwnerPlayerId;
		this.AuthorityPlayerId = flag.AuthorityPlayerId;
		this.FlagDefinition = flag.FlagDefinition;
		this.FlagState = flag.FlagState;
		this.Location = flag.Location;
	}

	serialize(): SavePlantedFlag_0_1_0 {
		return {
			Guid: this.Guid,
			OwnerPlayerGuidString: this.OwnerPlayerGuidString,
			OwnerPlayerId: this.OwnerPlayerId,
			AuthorityPlayerId: this.AuthorityPlayerId,
			FlagDefinition: this.FlagDefinition,
			FlagState: this.FlagState,
			Location: this.Location,
		};
	}
}
