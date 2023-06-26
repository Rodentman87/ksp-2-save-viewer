import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "./save-helper/Save";

export const SaveFileContext = createContext<Save | null>(null);

/**
 * This returns the save file, or redirects to the home page if a save file is not loaded.
 * @returns The save file
 */
export function useSaveFile() {
	const file = useContext(SaveFileContext);
	const navigate = useNavigate();
	if (!file) {
		// We're on a page that requires the save file, but we don't have one, so we'll redirect to the home page.
		navigate("/");
		throw new Error("No save file loaded");
	}
	return file;
}

/**
 * This function is for use in components and pages that are accessible without a save file, but may have additional functionality if a save file is loaded.
 * @returns The save file, or null if a file is not loaded.
 */
export function useSaveFileUnsafe() {
	return useContext(SaveFileContext);
}
