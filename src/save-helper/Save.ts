import {
	SaveCampaignPlayer_0_1_0,
	SaveColonyData_0_1_0,
	SaveFile_0_1_0,
	SaveKerbalData_0_1_0,
	SaveMetadata_0_1_0,
	SaveProperties_0_1_0,
	SaveSessionManager_0_1_0,
} from "../types/save/SaveFile-0-1-0";
import { Agency } from "./Agency";
import { PlantedFlag } from "./PlantedFlag";
import { TravelLog } from "./TravelLog";
import { Vessel } from "./Vessel";

export class Save {
	Metadata: SaveMetadata_0_1_0;
	private MetadataChangeListeners = new Set<
		(metadata: SaveMetadata_0_1_0) => void
	>();
	Properties: SaveProperties_0_1_0;
	GalaxyDefinitionKey: string;
	SessionManager: SaveSessionManager_0_1_0;
	private SessionManagerChangeListeners = new Set<
		(sessionManager: SaveSessionManager_0_1_0) => void
	>();
	SessionGuid: string;
	agencies: Agency[];
	CampaignPlayers: SaveCampaignPlayer_0_1_0[];
	vessels: Vessel[];
	ColonyData: SaveColonyData_0_1_0;
	KerbalData: SaveKerbalData_0_1_0;
	plantedFlags: PlantedFlag[];
	travelLog: TravelLog;

	constructor(saveFile: SaveFile_0_1_0) {
		this.Metadata = saveFile.Metadata;
		this.Properties = saveFile.Properties;
		this.GalaxyDefinitionKey = saveFile.GalaxyDefinitionKey;
		this.SessionManager = saveFile.SessionManager;
		this.SessionGuid = saveFile.SessionGuid;
		this.agencies = saveFile.Agencies.map((agency) => new Agency(agency, this));
		this.CampaignPlayers = saveFile.CampaignPlayers;
		this.vessels = saveFile.Vessels.map((vessel) => new Vessel(vessel, this));
		this.ColonyData = saveFile.ColonyData;
		this.KerbalData = saveFile.KerbalData;
		this.plantedFlags = saveFile.PlantedFlags.map(
			(flag) => new PlantedFlag(flag, this)
		);
		this.travelLog = new TravelLog(saveFile.TravelLogData, this);

		this.subscribeToMetadataChange = this.subscribeToMetadataChange.bind(this);
		this.subscribeToSessionManagerChange =
			this.subscribeToSessionManagerChange.bind(this);
	}

	mergeMetadata(metadata: Partial<SaveMetadata_0_1_0>) {
		this.Metadata = {
			...this.Metadata,
			...metadata,
		};
		this.MetadataChangeListeners.forEach((callback) => callback(this.Metadata));
	}

	subscribeToMetadataChange(callback: (metadata: SaveMetadata_0_1_0) => void) {
		this.MetadataChangeListeners.add(callback);
		return () => this.MetadataChangeListeners.delete(callback);
	}

	subscribeToSessionManagerChange(
		callback: (sessionManager: SaveSessionManager_0_1_0) => void
	) {
		this.SessionManagerChangeListeners.add(callback);
		return () => this.SessionManagerChangeListeners.delete(callback);
	}

	serialize(): SaveFile_0_1_0 {
		return {
			Metadata: this.Metadata,
			Properties: this.Properties,
			GalaxyDefinitionKey: this.GalaxyDefinitionKey,
			SessionManager: this.SessionManager,
			SessionGuid: this.SessionGuid,
			Agencies: this.agencies.map((agency) => agency.serialize()),
			CampaignPlayers: this.CampaignPlayers,
			Vessels: this.vessels.map((vessel) => vessel.serialize()),
			ColonyData: this.ColonyData,
			KerbalData: this.KerbalData,
			PlantedFlags: this.plantedFlags.map((flag) => flag.serialize()),
			TravelLogData: this.travelLog.serialize(),
		};
	}

	export() {
		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(JSON.stringify(this.serialize()))
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
