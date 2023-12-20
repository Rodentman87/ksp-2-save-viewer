import { EuiEmptyPrompt, EuiPageTemplate } from "@elastic/eui";
import classNames from "classnames";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { useSaveFile } from "../SaveFileContext";
import { useTheme } from "../ThemeContext";
import { PartModuleCard } from "../components/PartModuleCards/PartModuleCard";
import { ResourceBar } from "../components/ResourceBar";
import { VesselStateTag } from "../components/VesselStateTag";
import {
	formatMeters,
	formatNumberAtMostTwoDecimals,
} from "../helpers/formatting";
import { getOrbitalStats } from "../helpers/orbitalHelpers";
import { Vessel } from "../save-helper/Vessel";
import { Vessel_0_1 } from "../types/vessel/VesselInfo-0-1";

export const VesselDetails: React.FC = () => {
	const { vesselId } = useParams<{ vesselId: string }>();

	const saveFile = useSaveFile();

	const vessel = useMemo(() => {
		if (!vesselId) return;
		return saveFile.getVesselByGuid(vesselId);
	}, [saveFile, vesselId]);

	const navigate = useNavigate();

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				breadcrumbs={[
					{
						text: "Vessels",
						href: "#/vessels",
						onClick: () => {
							navigate("/vessels");
						},
					},
					{
						text: vessel?.AssemblyDefinition.assemblyName ?? "Unknown Vessel",
					},
				]}
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
						<div className="grid grid-cols-3 gap-4">
							<VesselLocationCard vessel={vessel} />
							<ResourceCard vessel={vessel} />
							<MetadataCard vessel={vessel} />
						</div>
						<PartSelector vessel={vessel} />
					</>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};

const VesselLocationCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
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
		case "SubOrbital":
			innerPanelData = (
				<div>
					<p>
						Suborbital flight over{" "}
						{vessel.location.serializedOrbit.referenceBodyGuid}
					</p>
				</div>
			);
			break;
		case "PreLaunch":
			innerPanelData = (
				<div>
					<p>
						Pre-launch on {vessel.location.serializedOrbit.referenceBodyGuid}
					</p>
				</div>
			);
			break;
		case "Flying":
			innerPanelData = (
				<div>
					<p>Flying over {vessel.location.serializedOrbit.referenceBodyGuid}</p>
				</div>
			);
	}

	return (
		<Card className="relative">
			<CardHeader>
				<CardTitle>Location</CardTitle>
			</CardHeader>
			<div className="absolute top-4 right-4">
				<VesselStateTag state={vessel.vesselState.Situation} />
			</div>
			<CardContent>{innerPanelData}</CardContent>
		</Card>
	);
};

const ResourceCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
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
		<Card>
			<CardHeader>
				<CardTitle>Resources</CardTitle>
			</CardHeader>
			<CardContent>
				{resources.map(([resource, { current, total }]) => (
					<ResourceBar name={resource} current={current} total={total} />
				))}
			</CardContent>
		</Card>
	);
};

const MetadataCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
	const stats = useMemo(() => {
		return vessel.getTravelLogObject()?.Statistics;
	}, [vessel]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>General Info</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Launched From: {vessel.vesselState.launchLocation}</p>
				<p>Part count: {vessel.parts.length}</p>
				{stats && (
					<>
						<p>Distance Traveled: {formatMeters(stats.DistanceTravelled)}</p>
						<p>
							Highest G-Force:{" "}
							{formatNumberAtMostTwoDecimals(stats.MaxGeeForce)}g
						</p>
						<p>Highest Speed: {formatMeters(stats.MaxSpeed)}/s</p>
						<p>Highest Altitude: {formatMeters(stats.MaxAltitude)}</p>
					</>
				)}
			</CardContent>
		</Card>
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
		<div className="flex flex-row items-stretch w-full gap-2 mt-6">
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
									"bg-slate-700 text-white":
										index === selectedPartIndex && !light,
									"bg-slate-200 text-black":
										index === selectedPartIndex && light,
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
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Part JSON</CardTitle>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible>
							<AccordionItem value="json">
								<AccordionTrigger>Click to expand</AccordionTrigger>
								<AccordionContent>
									<pre>
										<code>{JSON.stringify(selectedPart, null, 2)}</code>
									</pre>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
