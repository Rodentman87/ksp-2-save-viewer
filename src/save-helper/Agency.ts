import { colorToRGBA } from "../helpers/formatting";
import { Color } from "../types/common/Common";
import {
	SaveAgency_0_1_0,
	SaveMissionData_0_1_0,
} from "../types/save/SaveFile-0-1-0";
import { Save } from "./Save";

export class Agency {
	AgencyId: number;
	AgencyName: string;

	ColorBase: Color;
	get colorBaseRGBA() {
		return colorToRGBA(this.ColorBase);
	}
	ColorAccent: Color;
	get colorAccentRGBA() {
		return colorToRGBA(this.ColorAccent);
	}

	FlagSpriteLocation: string;
	MissionData: SaveMissionData_0_1_0[];

	constructor(agency: SaveAgency_0_1_0, public save: Save) {
		this.AgencyId = agency.AgencyId;
		this.AgencyName = agency.AgencyName;
		this.ColorBase = agency.ColorBase;
		this.ColorAccent = agency.ColorAccent;
		this.FlagSpriteLocation = agency.FlagSpriteLocation;
		this.MissionData = agency.MissionData;
	}

	getColorsAsGradient() {
		const primary = this.colorBaseRGBA;
		const accent = this.colorAccentRGBA;
		return `linear-gradient(100deg, ${primary} 0%,  ${primary} 50%, ${accent} 50%, ${accent} 100%)`;
	}
}
