import { EuiErrorBoundary } from "@elastic/eui";
import { useSaveFileUnsafe } from "SaveFileContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectOnMissingSaveFile: React.FC = () => {
	const file = useSaveFileUnsafe();

	if (file === null) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<EuiErrorBoundary>
				<Outlet />
			</EuiErrorBoundary>
		</>
	);
};
