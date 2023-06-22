import {
	EuiFlexGrid,
	EuiFlexItem,
	EuiPageTemplate,
	EuiPanel,
} from "@elastic/eui";
import React, { useMemo } from "react";
import { useSaveFileMetadata, useSessionManager } from "../hooks";

export const Home: React.FC = () => {
	const metadata = useSaveFileMetadata();
	const sessionManager = useSessionManager();

	const createdDate = useMemo(() => {
		return new Date(metadata.SaveCreatedTime);
	}, [metadata.SaveCreatedTime]);

	const universeTime = useMemo(() => {
		const time = metadata.UniverseTime;
		const days = Math.floor(time / 21600);
		const hours = Math.floor((time % 21600) / 900);
		const minutes = Math.floor((time % 900) / 15);
		const seconds = Math.floor((time % 15) / 0.25);

		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}, [metadata.UniverseTime]);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="save"
				pageTitle="Save Data"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiFlexGrid columns={3}>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="mb-2 text-xl font-bold">Save File</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Name</span>
								<span>{metadata.Name}</span>
								<span>Description</span>
								<span>{metadata.Description}</span>
								<span>Version</span>
								<span>{metadata.VersionString}</span>
								<span>Created</span>
								<span>{createdDate.toLocaleString()}</span>
								<span>Save Type</span>
								<span>{metadata.SavedGameType}</span>
							</div>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="mb-2 text-xl font-bold">Campaign</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Universe Time</span>
								<span>{universeTime}</span>
								<span>Mode</span>
								<span>{metadata.CampaignMode}</span>
								<span>Type</span>
								<span>{metadata.CampaignType}</span>
								<span>Difficulty</span>
								<span>{metadata.DifficultyLevel}</span>
								<span>First Time User Experience Enabled</span>
								<span>{metadata.NewPlayerIsFTUEEnabled ? "Yes" : "No"}</span>
							</div>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="mb-2 text-xl font-bold">Difficulty Options</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Allow Revert</span>
								<span>
									{sessionManager.DifficultyOptions.AllowRevert ? "Yes" : "No"}
								</span>
								<span>Allow Quick Load</span>
								<span>
									{sessionManager.DifficultyOptions.AllowQuickLoad
										? "Yes"
										: "No"}
								</span>
								<span>Include Stock Vessels</span>
								<span>
									{sessionManager.DifficultyOptions.IncludeStockVessels
										? "Yes"
										: "No"}
								</span>
								<span>Docking Tolerance</span>
								<span>{sessionManager.DifficultyOptions.DockingTolerance}</span>
								<span>CommNet Required</span>
								<span>
									{sessionManager.DifficultyOptions.CommNetRequired
										? "Yes"
										: "No"}
								</span>
								<span>Unbreakable Joints</span>
								<span>
									{sessionManager.DifficultyOptions.UnbreakableJoints
										? "Yes"
										: "No"}
								</span>
								<span>No Crash Damage</span>
								<span>
									{sessionManager.DifficultyOptions.NoCrashDamage
										? "Yes"
										: "No"}
								</span>
								<span>Infinite Fuel</span>
								<span>
									{sessionManager.DifficultyOptions.InfiniteFuel ? "Yes" : "No"}
								</span>
								<span>Infinite Electric Charge</span>
								<span>
									{sessionManager.DifficultyOptions.InfinitePower
										? "Yes"
										: "No"}
								</span>
							</div>
						</EuiPanel>
					</EuiFlexItem>
				</EuiFlexGrid>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
