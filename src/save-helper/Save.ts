import {
	SaveAgency_0_1_0,
	SaveCampaignPlayer_0_1_0,
	SaveColonyData_0_1_0,
	SaveFile_0_1_0,
	SaveKerbalData_0_1_0,
	SaveMetadata_0_1_0,
	SaveMissionData_0_1_0,
	SavePlantedFlag_0_1_0,
	SaveProperties_0_1_0,
	SaveSessionManager_0_1_0,
	SaveTravelLogData_0_1_0,
} from "../types/save/SaveFile-0-1-0";
import { Vessel_0_1 } from "../types/vessel/VesselInfo-0-1";

export class Save implements SaveFile_0_1_0 {
	Metadata: SaveMetadata_0_1_0;
	Properties: SaveProperties_0_1_0;
	GalaxyDefinitionKey: string;
	SessionManager: SaveSessionManager_0_1_0;
	SessionGuid: string;
	Agencies: SaveAgency_0_1_0[];
	CampaignPlayers: SaveCampaignPlayer_0_1_0[];
	Vessels: Vessel_0_1[];
	missionData: SaveMissionData_0_1_0[];
	ColonyData: SaveColonyData_0_1_0;
	KerbalData: SaveKerbalData_0_1_0;
	PlantedFlags: SavePlantedFlag_0_1_0[];
	TravelLogData: SaveTravelLogData_0_1_0;

	constructor(saveFile: SaveFile_0_1_0) {
		this.Metadata = saveFile.Metadata;
		this.Properties = saveFile.Properties;
		this.GalaxyDefinitionKey = saveFile.GalaxyDefinitionKey;
		this.SessionManager = saveFile.SessionManager;
		this.SessionGuid = saveFile.SessionGuid;
		this.Agencies = saveFile.Agencies;
		this.CampaignPlayers = saveFile.CampaignPlayers;
		this.Vessels = saveFile.Vessels;
		this.missionData = saveFile.missionData;
		this.ColonyData = saveFile.ColonyData;
		this.KerbalData = saveFile.KerbalData;
		this.PlantedFlags = saveFile.PlantedFlags;
		this.TravelLogData = saveFile.TravelLogData;
	}

	getPlayer(id: number) {
		return this.CampaignPlayers.find((player) => player.PlayerId === id);
	}

	getTimeSince(time: number) {
		return this.Metadata.UniverseTime - time;
	}
}
