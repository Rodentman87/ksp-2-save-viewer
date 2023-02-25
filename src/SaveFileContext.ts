import { createContext, useContext } from "react";
import { Save } from "./save-helper/Save";

export const SaveFileContext = createContext<Save>(null as unknown as Save);

export function useSaveFile() {
	return useContext(SaveFileContext);
}
