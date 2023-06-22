import { useSyncExternalStore } from "react";
import { useSaveFile } from "../SaveFileContext";

export function useSaveFileMetadata() {
	const save = useSaveFile();
	const metadata = useSyncExternalStore(
		save.subscribeToMetadataChange,
		() => save.Metadata
	);
	return metadata;
}
