import { SaveFile_0_1_0 } from "../types/save/SaveFile-0-1-0";
import { Save } from "./Save";

export function loadSaveData(saveData: string): Save {
	const saveFile: SaveFile_0_1_0 = JSON.parse(saveData); // TODO do some better handling later to add helper functions
	return new Save(saveFile);
}
