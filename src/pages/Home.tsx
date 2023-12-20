import { EuiPageTemplate } from "@elastic/eui";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "components/ui/card";
import { Label } from "components/ui/label";
import { Switch } from "components/ui/switch";
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
				<div className="grid grid-cols-3 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Save File</CardTitle>
							<CardDescription>
								Information about the file itself
							</CardDescription>
						</CardHeader>
						<CardContent>
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
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Campaign</CardTitle>
							<CardDescription>Campaign settings</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-1">
								<span>Universe Time</span>
								<span>{universeTime}</span>
								<span>Mode</span>
								<span>{metadata.GameMode}</span>
								<span>Type</span>
								<span>{metadata.CampaignType}</span>
								<span>First Time User Experience Enabled</span>
								<span>{metadata.NewPlayerIsFTUEEnabled ? "Yes" : "No"}</span>
								<span>Science Available</span>
								<span>{metadata.AvailableScience}</span>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Difficulty Options</CardTitle>
							<CardDescription>Difficulty options for the save</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-1">
								<div className="grid grid-cols-2">
									<span>Difficulty Level</span>
									<span>{sessionManager.DifficultyOptions.Difficulty}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.AllowRevert}
										disabled
										id="allow-revert"
									/>
									<Label htmlFor="allow-revert">Allow Revert</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.AllowQuickLoad}
										disabled
										id="quick-load"
									/>
									<Label htmlFor="quick-load">Allow Quick Load</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={
											sessionManager.DifficultyOptions.IncludeStockVessels
										}
										disabled
										id="include-stock"
									/>
									<Label htmlFor="include-stock">Include Stock Vessels</Label>
								</div>
								<div className="grid grid-cols-2">
									<span>Docking Tolerance</span>
									<span>
										{sessionManager.DifficultyOptions.DockingTolerance}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.CommNetRequired}
										disabled
										id="comm-net"
									/>
									<Label htmlFor="comm-net">CommNet Required</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.UnbreakableJoints}
										disabled
										id="unbreakable-joints"
									/>
									<Label htmlFor="unbreakable-joints">Unbreakable Joints</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.InfiniteFuel}
										disabled
										id="infinite-fuel"
									/>
									<Label htmlFor="infinite-fuel">Infinite Fuel</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.InfinitePower}
										disabled
										id="infinite-power"
									/>
									<Label htmlFor="infinite-power">Infinite Power</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={sessionManager.DifficultyOptions.HeatEnabled}
										disabled
										id="infinite-power"
									/>
									<Label htmlFor="infinite-power">Heat Enabled</Label>
								</div>
								<div className="grid grid-cols-2">
									<span>Heat Scaling</span>
									<span>{sessionManager.DifficultyOptions.HeatScaling}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={
											sessionManager.DifficultyOptions.HeatPartDestruction
										}
										disabled
										id="infinite-power"
									/>
									<Label htmlFor="infinite-power">Heat Part Desctruction</Label>
								</div>
								<div className="grid grid-cols-2">
									<span>Starting Science</span>
									<span>
										{sessionManager.DifficultyOptions.StartingScience}
									</span>
								</div>
								<div className="grid grid-cols-2">
									<span>Science Rewards</span>
									<span>{sessionManager.DifficultyOptions.ScienceRewards}</span>
								</div>
								<div className="grid grid-cols-2">
									<span>Mission Rewards</span>
									<span>{sessionManager.DifficultyOptions.MissionRewards}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
