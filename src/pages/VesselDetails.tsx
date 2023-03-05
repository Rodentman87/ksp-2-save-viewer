import {
	EuiEmptyPrompt,
	EuiFlexGrid,
	EuiFlexItem,
	EuiPageTemplate,
	EuiPanel,
	EuiProgress,
} from "@elastic/eui";
import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { PartModuleCard } from "../components/PartModuleCards/PartModuleCard";
import { VesselStateTag } from "../components/VesselStateTag";
import {
	formatMeters,
	formatNumberAtMostTwoDecimals,
} from "../helpers/formatting";
import { getOrbitalStats } from "../helpers/orbitalHelpers";
import { getResourceStats } from "../helpers/rawStats";
import { useSaveFile } from "../SaveFileContext";
import { useTheme } from "../ThemeContext";
import { Vessel_0_1 } from "../types/vessel/VesselInfo-0-1";

export const VesselDetails: React.FC = () => {
	const { vesselId } = useParams<{ vesselId: string }>();

	const saveFile = useSaveFile();

	const vessel = useMemo(() => {
		if (!vesselId) return;
		return saveFile.getVesselByGuid(vesselId);
	}, [saveFile, vesselId]);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="launch"
				pageTitle={vessel?.AssemblyDefinition.assemblyName ?? "Unknown Vessel"}
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				{vessel === undefined && (
					<EuiEmptyPrompt
						title={<h2>Vessel not found</h2>}
						body={<p>There is no vessel with the ID {vesselId}</p>}
					/>
				)}
				{vessel && (
					<>
						<EuiFlexGrid columns={3}>
							<EuiFlexItem>
								<VesselLocationCard vessel={vessel} />
							</EuiFlexItem>
							<EuiFlexItem>
								<ResourceCard vessel={vessel} />
							</EuiFlexItem>
							<EuiFlexItem>
								<MetadataCard vessel={vessel} />
							</EuiFlexItem>
						</EuiFlexGrid>
						<PartSelector vessel={vessel} />
					</>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

const VesselLocationCard: React.FC<{ vessel: Vessel_0_1 }> = ({ vessel }) => {
	let innerPanelData;

	switch (vessel.vesselState.Situation) {
		case "Landed":
			innerPanelData = (
				<div>
					<p>Landed on {vessel.location.serializedOrbit.referenceBodyGuid}</p>
				</div>
			);
			break;
		case "Orbiting":
			const { apoapsis, periapsis } = getOrbitalStats(vessel);
			innerPanelData = (
				<div className="flex flex-col gap-1">
					<p>Orbiting {vessel.location.serializedOrbit.referenceBodyGuid}</p>
					<p>Apoapsis: {formatMeters(apoapsis)}</p>
					<p>Periapsis: {formatMeters(periapsis)}</p>
					{/* <p>Orbital Period: {formatTime(orbitalPeriodSeconds)}</p> */}
				</div>
			);
			break;
	}

	return (
		<EuiPanel className="relative">
			<h2 className="text-xl font-bold">Location</h2>
			<div className="absolute top-4 right-4">
				<VesselStateTag state={vessel.vesselState.Situation} />
			</div>
			{innerPanelData}
		</EuiPanel>
	);
};

const ResourceCard: React.FC<{ vessel: Vessel_0_1 }> = ({ vessel }) => {
	const resources = useMemo(() => {
		const resourcesMap = new Map<string, { total: number; current: number }>();
		for (const part of vessel.parts) {
			for (const resource in part.partState.resources) {
				if (resourcesMap.has(resource)) {
					resourcesMap.get(resource)!.current +=
						part.partState.resources[resource].storedUnits;
					resourcesMap.get(resource)!.total +=
						part.partState.resources[resource].capacityUnits;
				} else {
					resourcesMap.set(resource, {
						current: part.partState.resources[resource].storedUnits,
						total: part.partState.resources[resource].capacityUnits,
					});
				}
			}
		}
		return Array.from(resourcesMap.entries());
	}, [vessel.parts]);

	return (
		<EuiPanel className="flex flex-col gap-1">
			<h2 className="text-xl font-bold">Resources</h2>
			{resources.map(([resource, { current, total }]) => {
				const resourceStats = getResourceStats(resource);

				return (
					<div key={resource}>
						<EuiProgress
							label={resourceStats.name}
							size="m"
							color={resourceStats.barColor}
							max={total}
							value={current}
							valueText={`${formatNumberAtMostTwoDecimals(
								current
							)}/${formatNumberAtMostTwoDecimals(total)}${resourceStats.units}`}
						/>
					</div>
				);
			})}
		</EuiPanel>
	);
};

const MetadataCard: React.FC<{ vessel: Vessel_0_1 }> = ({ vessel }) => {
	return (
		<EuiPanel className="flex flex-col gap-1">
			<h2 className="text-xl font-bold">General Info</h2>
			<p>Part count: {vessel.parts.length}</p>
		</EuiPanel>
	);
};

const PartSelector: React.FC<{ vessel: Vessel_0_1 }> = ({ vessel }) => {
	const [selectedPartIndex, setSelectedPartIndex] = useState(0);
	const selectedPart = useMemo(
		() => vessel.parts[selectedPartIndex],
		[selectedPartIndex, vessel.parts]
	);

	const { light } = useTheme();

	return (
		<div className="w-full mt-6 flex flex-row gap-2 items-stretch">
			<div className="flex flex-col">
				<FixedSizeList
					height={600}
					itemCount={vessel.parts.length}
					itemSize={48}
					width={384}
				>
					{({ index, style }) => {
						const part = vessel.parts[index];
						return (
							<button
								onClick={() => setSelectedPartIndex(index)}
								style={style}
								className={classNames("w-96 h-12 p-4 rounded-md text-left", {
									"bg-slate-400 text-black": index === selectedPartIndex,
								})}
							>
								{part.partName}
							</button>
						);
					}}
				</FixedSizeList>
			</div>
			<div
				className={classNames(
					"grow rounded-md p-4 grid grid-cols-2 auto-rows-min gap-2 overflow-y-auto",
					{
						"bg-zinc-900": !light,
						"bg-gray-200": light,
					}
				)}
				style={{
					height: 600,
				}}
			>
				<div className="col-span-2">
					<h3 className="text-2xl font-bold">
						Part Info: {selectedPart.partName}
					</h3>
				</div>
				{selectedPart.PartModulesState.map((mod) => {
					return (
						<PartModuleCard
							key={mod.Name}
							partModuleState={mod}
							part={selectedPart}
						/>
					);
				})}
				<EuiPanel
					hasShadow={false}
					hasBorder
					className="flex flex-col gap-1 col-span-2"
				>
					<h2 className="text-xl font-bold">Part JSON</h2>
					<details>
						<summary>Click to expand</summary>
						<pre>
							<code>{JSON.stringify(selectedPart, null, 2)}</code>
						</pre>
					</details>
				</EuiPanel>
			</div>
		</div>
	);
};
