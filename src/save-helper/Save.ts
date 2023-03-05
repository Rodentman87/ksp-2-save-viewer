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
} from "../types/save/SaveFile-0-1-0";
import { TravelLog } from "./TravelLog";
import { Vessel } from "./Vessel";

export class Save {
	Metadata: SaveMetadata_0_1_0;
	Properties: SaveProperties_0_1_0;
	GalaxyDefinitionKey: string;
	SessionManager: SaveSessionManager_0_1_0;
	SessionGuid: string;
	Agencies: SaveAgency_0_1_0[];
	CampaignPlayers: SaveCampaignPlayer_0_1_0[];
	vessels: Vessel[];
	missionData: SaveMissionData_0_1_0[];
	ColonyData: SaveColonyData_0_1_0;
	KerbalData: SaveKerbalData_0_1_0;
	PlantedFlags: SavePlantedFlag_0_1_0[];
	travelLog: TravelLog;

	constructor(saveFile: SaveFile_0_1_0) {
		this.Metadata = saveFile.Metadata;
		this.Properties = saveFile.Properties;
		this.GalaxyDefinitionKey = saveFile.GalaxyDefinitionKey;
		this.SessionManager = saveFile.SessionManager;
		this.SessionGuid = saveFile.SessionGuid;
		this.Agencies = saveFile.Agencies;
		this.CampaignPlayers = saveFile.CampaignPlayers;
		this.vessels = saveFile.Vessels.map((vessel) => new Vessel(vessel, this));
		this.missionData = saveFile.missionData;
		this.ColonyData = saveFile.ColonyData;
		this.KerbalData = saveFile.KerbalData;
		this.PlantedFlags = saveFile.PlantedFlags;
		this.travelLog = new TravelLog(saveFile.TravelLogData, this);
	}

	export() {
		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(JSON.stringify(this))
		);
		element.setAttribute("download", this.Metadata.Name + ".json");

		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	getPlayer(id: number) {
		return this.CampaignPlayers.find((player) => player.PlayerId === id);
	}

	getTimeSince(time: number) {
		return this.Metadata.UniverseTime - time;
	}

	getVesselByGuid(guid: string) {
		return this.vessels.find((vessel) => vessel.Guid.Guid === guid);
	}
}
