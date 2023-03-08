import { createContext, useContext, useSyncExternalStore } from "react";
import { Save } from "./save-helper/Save";

export const SaveFileContext = createContext<Save>(null as unknown as Save);

export function useSaveFile() {
	return useContext(SaveFileContext);
}

export function useSaveFileMetadata() {
	const save = useSaveFile();
	const metadata = useSyncExternalStore(
		save.subscribeToMetadataChange,
		() => save.Metadata
	);
	return metadata;
}
