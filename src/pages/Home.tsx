import {
	EuiFlexGrid,
	EuiFlexItem,
	EuiPageTemplate,
	EuiPanel,
} from "@elastic/eui";
import React, { useMemo } from "react";
import { useSaveFile } from "../SaveFileContext";

export const Home: React.FC = () => {
	const saveFile = useSaveFile();

	const createdDate = useMemo(() => {
		return new Date(saveFile.Metadata.SaveCreatedTime);
	}, [saveFile.Metadata.SaveCreatedTime]);

	const universeTime = useMemo(() => {
		const time = saveFile.Metadata.UniverseTime;
		const days = Math.floor(time / 21600);
		const hours = Math.floor((time % 21600) / 900);
		const minutes = Math.floor((time % 900) / 15);
		const seconds = Math.floor((time % 15) / 0.25);

		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}, [saveFile.Metadata.UniverseTime]);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header pageTitle="Save Data" restrictWidth={false} />
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiFlexGrid columns={3}>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="text-xl font-bold mb-2">Save File</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Name</span>
								<span>{saveFile.Metadata.Name}</span>
								<span>Description</span>
								<span>{saveFile.Metadata.Description}</span>
								<span>Version</span>
								<span>{saveFile.Metadata.VersionString}</span>
								<span>Created</span>
								<span>{createdDate.toLocaleString()}</span>
								<span>Save Type</span>
								<span>{saveFile.Metadata.SavedGameType}</span>
							</div>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="text-xl font-bold mb-2">Campaign</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Universe Time</span>
								<span>{universeTime}</span>
								<span>Mode</span>
								<span>{saveFile.Metadata.CampaignMode}</span>
								<span>Type</span>
								<span>{saveFile.Metadata.CampaignType}</span>
								<span>Difficulty</span>
								<span>{saveFile.Metadata.DifficultyLevel}</span>
								<span>First Time User Experience Enabled</span>
								<span>
									{saveFile.Metadata.NewPlayerIsFTUEEnabled ? "Yes" : "No"}
								</span>
							</div>
						</EuiPanel>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel>
							<h2 className="text-xl font-bold mb-2">Difficulty Options</h2>
							<div className="grid grid-cols-2 gap-1">
								<span>Allow Revert</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.AllowRevert
										? "Yes"
										: "No"}
								</span>
								<span>Allow Quick Load</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.AllowQuickLoad
										? "Yes"
										: "No"}
								</span>
								<span>Include Stock Vessels</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.IncludeStockVessels
										? "Yes"
										: "No"}
								</span>
								<span>Docking Tolerance</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.DockingTolerance}
								</span>
								<span>CommNet Required</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.CommNetRequired
										? "Yes"
										: "No"}
								</span>
								<span>Unbreakable Joints</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.UnbreakableJoints
										? "Yes"
										: "No"}
								</span>
								<span>No Crash Damage</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.NoCrashDamage
										? "Yes"
										: "No"}
								</span>
								<span>Infinite Fuel</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.InfiniteFuel
										? "Yes"
										: "No"}
								</span>
								<span>Infinite Electric Charge</span>
								<span>
									{saveFile.Metadata.DifficultyOptions.InfinitePower
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
