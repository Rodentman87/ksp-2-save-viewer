import { useSyncExternalStore } from "react";
import { useSaveFile } from "../SaveFileContext";

export function useSessionManager() {
	const save = useSaveFile();
	const sessionManager = useSyncExternalStore(
		save.subscribeToSessionManagerChange,
		() => save.SessionManager
	);
	return sessionManager;
}
