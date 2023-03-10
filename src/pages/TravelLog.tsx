import {
	EuiPageTemplate,
	EuiTimeline,
	EuiTimelineItemProps,
} from "@elastic/eui";
import React, { useMemo } from "react";
import { formatTime } from "../helpers/formatting";
import { Save } from "../save-helper/Save";
import { TravelLogEvent } from "../save-helper/TravelLog";
import { useSaveFile } from "../SaveFileContext";

function eventToTimelineItem(
	event: TravelLogEvent,
	save: Save
): EuiTimelineItemProps {
	const timeSince = save.getTimeSince(event.UT);

	const vessels = event.TravelObjectIds.map((id) => save.getVesselByGuid(id));

	switch (event.EventKey) {
		case "vesselLaunched":
			return {
				icon: "launch",
				children: `Vessel ${
					vessels[0]
						? vessels[0].AssemblyDefinition.assemblyName
						: "unknown vessel"
				} launched from ${event.FlightReportArgs[0]} - ${formatTime(
					timeSince
				)} ago`,
			};
		case "vesselLanded":
			return {
				icon: "mapMarker",
				children: `Vessel ${
					vessels[0]
						? vessels[0].AssemblyDefinition.assemblyName
						: "unknown vessel"
				} landed on ${event.FlightReportArgs[0]} - ${formatTime(
					timeSince
				)} ago`,
			};
		case "vesselSOIEntered":
			return {
				icon: "globe",
				children: `Vessel ${
					vessels[0]
						? vessels[0].AssemblyDefinition.assemblyName
						: "unknown vessel"
				} moved from ${event.FlightReportArgs[1]} SOI to ${
					event.FlightReportArgs[0]
				} SOI - ${formatTime(timeSince)} ago`,
			};
		case "vesselDestroyed":
			return {
				icon: "trash",
				children: `Vessel ${
					vessels[0]
						? vessels[0].AssemblyDefinition.assemblyName
						: "unknown vessel"
				} destroyed - ${formatTime(timeSince)} ago`,
			};
		case "vesselRecovered":
			return {
				icon: "checkInCircleFilled",
				children: `Vessel ${
					vessels[0]
						? vessels[0].AssemblyDefinition.assemblyName
						: "unknown vessel"
				} recovered - ${formatTime(timeSince)} ago`,
			};
		case "partCrashed":
			return {
				icon: "securitySignalDetected",
				children: `Part crashed (${event.FlightReportArgs[0]}) - ${formatTime(
					timeSince
				)} ago`,
			};
		case "partExploded":
			return {
				icon: "securitySignalDetected",
				children: `Part exploded (${event.FlightReportArgs[0]}) - ${formatTime(
					timeSince
				)} ago`,
			};
		case "partExplodedOverheat":
			return {
				icon: "temperature",
				children: `Part exploded due to overheating (${
					event.FlightReportArgs[0]
				}) - ${formatTime(timeSince)} ago`,
			};
		case "partJointBroken":
			return {
				icon: "securitySignalDetected",
				children: `Part joint broke (${
					event.FlightReportArgs[0]
				}) - ${formatTime(timeSince)} ago`,
			};
	}
	return {
		icon: "questionInCircle",
		children: (
			<>
				Unknown event - {formatTime(timeSince)} ago
				<details>
					<summary>Event JSON</summary>
					<pre>{JSON.stringify(event.serialize(), null, 2)}</pre>
				</details>
			</>
		),
	};
}

export const TravelLog: React.FC = () => {
	const saveFile = useSaveFile();

	const items = useMemo(() => {
		return [...saveFile.travelLog.events]
			.reverse()
			.map((e) => eventToTimelineItem(e, saveFile));
	}, [saveFile]);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="article"
				pageTitle="Travel Log"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiTimeline items={items} />
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
