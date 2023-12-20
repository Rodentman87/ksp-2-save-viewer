import {
	EuiFlexGroup,
	EuiFlexItem,
	EuiPanel,
	EuiTimeline,
	EuiTimelineItemProps,
} from "@elastic/eui";
import { formatTime } from "helpers/formatting";
import { useMemo } from "react";
import { Save } from "save-helper/Save";
import { TravelLogFirstData } from "save-helper/TravelLog";
import { useSaveFile } from "../../SaveFileContext";

function firstToTimelineItem(
	event: TravelLogFirstData,
	save: Save,
	icon: string,
	nameFormatter: (name: string, time: string) => string
): EuiTimelineItemProps {
	const timeSince = save.getTimeSince(event.UT);

	return {
		icon: icon,
		children: nameFormatter(event.ObjectKey, formatTime(timeSince)),
	};
}

export function FirstsTab() {
	const saveFile = useSaveFile();

	const {
		soiItems,
		discoverableItems,
		cbLandedItems,
		walkedOnItems,
		cbLaunchedItems,
	} = useMemo(() => {
		return {
			soiItems: saveFile.travelLog.firsts.SOIReached.map((item) => {
				return firstToTimelineItem(
					item,
					saveFile,
					"globe",
					(name, time) => `Reached ${name} SOI - ${time} ago`
				);
			}),
			discoverableItems: saveFile.travelLog.firsts.DiscoverableReached.map(
				(item) => {
					return firstToTimelineItem(
						item,
						saveFile,
						"mapMarker",
						(name, time) => `Found discoverable ${name} - ${time} ago`
					);
				}
			),
			cbLandedItems: saveFile.travelLog.firsts.CBLanded.map((item) => {
				return firstToTimelineItem(
					item,
					saveFile,
					"mapMarker",
					(name, time) => `Landed on ${name} - ${time} ago`
				);
			}),
			walkedOnItems: saveFile.travelLog.firsts.WalkedOn.map((item) => {
				return firstToTimelineItem(
					item,
					saveFile,
					"mapMarker",
					(name, time) => `Walked on ${name} - ${time} ago`
				);
			}),
			cbLaunchedItems: saveFile.travelLog.firsts.CBLaunched.map((item) => {
				return firstToTimelineItem(
					item,
					saveFile,
					"launch",
					(name, time) => `Launched from ${name} - ${time} ago`
				);
			}),
		};
	}, [saveFile]);

	return (
		<EuiFlexGroup direction="column">
			<EuiFlexItem>
				<EuiPanel>
					<h2 className="text-lg font-bold">SOI Reached</h2>
					<EuiTimeline items={soiItems} />
				</EuiPanel>
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiPanel>
					<h2 className="text-lg font-bold">Discoverables Found</h2>
					<EuiTimeline items={discoverableItems} />
				</EuiPanel>
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiPanel>
					<h2 className="text-lg font-bold">Celestial Bodies Landed On</h2>
					<EuiTimeline items={cbLandedItems} />
				</EuiPanel>
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiPanel>
					<h2 className="text-lg font-bold">Celestial Bodies Walked On</h2>
					<EuiTimeline items={walkedOnItems} />
				</EuiPanel>
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiPanel>
					<h2 className="text-lg font-bold">Celestial Bodies Launched From</h2>
					<EuiTimeline items={cbLaunchedItems} />
				</EuiPanel>
			</EuiFlexItem>
		</EuiFlexGroup>
	);
}
