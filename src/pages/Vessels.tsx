import {
	EuiButtonEmpty,
	EuiDataGrid,
	EuiDataGridColumn,
	EuiDataGridStyle,
	EuiEmptyPrompt,
	EuiPageTemplate,
} from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { formatMeters, formatSpeed, formatTime } from "../helpers/formatting";
import { getBodyStats } from "../helpers/rawStats";
import { useSaveFile } from "../SaveFileContext";

const columns: EuiDataGridColumn[] = [
	{
		id: "name",
		displayAsText: "Name",
	},
	{
		id: "ownedBy",
		displayAsText: "Owned By",
	},
	{
		id: "location",
		displayAsText: "Location",
		isSortable: false,
	},
	{
		id: "speed",
		displayAsText: "Speed",
	},
	{
		id: "missionTime",
		displayAsText: "Mission Time",
		schema: "numeric",
		isSortable: false,
	},
	{
		id: "partCount",
		displayAsText: "Part Count",
	},
	{
		id: "isDebris",
		displayAsText: "Is Debris",
		isSortable: false,
	},
];

export const Vessels: React.FC = () => {
	const saveFile = useSaveFile();
	const navigate = useNavigate();

	const [visibleColumns, setVisibleColumns] = useLocalStorageState(
		"vesselsVisibleColumns",
		{
			defaultValue: columns.map((c) => c.id),
			serializer: {
				stringify: (value) => JSON.stringify(value),
				parse: (value) => JSON.parse(value),
			},
		}
	);

	const [sort, setSort] = useLocalStorageState<
		{ id: string; direction: "asc" | "desc" }[]
	>("vesselsSort", {
		defaultValue: [
			{
				id: "name",
				direction: "asc",
			},
		],
		serializer: {
			stringify: (value) => JSON.stringify(value),
			parse: (value) => JSON.parse(value),
		},
	});

	const [storedStyle, setStoredStyle] = useLocalStorageState<EuiDataGridStyle>(
		"vesselsGridStyle",
		{
			defaultValue: {},
			serializer: {
				stringify: (value) => JSON.stringify(value),
				parse: (value) => JSON.parse(value),
			},
		}
	);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="launch"
				pageTitle="Vessels"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				{saveFile.vessels.length === 0 ? (
					<EuiEmptyPrompt
						title={<h2>No Active Vessels</h2>}
						body={<span>Go get flying!</span>}
					/>
				) : (
					<EuiDataGrid
						color="dark"
						aria-label="Vessels"
						gridStyle={{
							...storedStyle,
							onChange: (newStyle) => {
								setStoredStyle(newStyle);
							},
						}}
						columns={columns}
						columnVisibility={{
							visibleColumns,
							setVisibleColumns,
						}}
						rowCount={saveFile.vessels.length}
						renderCellValue={({ rowIndex, columnId }) => {
							const vessel = saveFile.vessels[rowIndex];
							const orbitedBodyStats = getBodyStats(
								vessel.location.serializedOrbit.referenceBodyGuid
							);

							switch (columnId) {
								case "name":
									return vessel.AssemblyDefinition.assemblyName;
								case "ownedBy":
									return saveFile.getPlayer(vessel.OwnerPlayerId)?.PlayerName;
								case "location":
									switch (vessel.vesselState.Situation) {
										case "PreLaunch":
											return `Pre-launch on ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										case "Landed":
											return `Landed on ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										case "Splashed":
											return `Splashed down on ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										case "Flying":
											return `Flying above ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										case "SubOrbital":
											return `Sub-orbital flight above ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										case "Orbiting":
											const apoapsis =
												vessel.location.serializedOrbit.semiMajorAxis *
													(1 + vessel.location.serializedOrbit.eccentricity) -
												orbitedBodyStats.radius;
											const periapsis =
												vessel.location.serializedOrbit.semiMajorAxis *
													(1 - vessel.location.serializedOrbit.eccentricity) -
												orbitedBodyStats.radius;
											return `Orbiting ${
												vessel.location.serializedOrbit.referenceBodyGuid
											} (${formatMeters(apoapsis)}, ${formatMeters(
												periapsis
											)})`;
										case "Escaping":
											return `Escaping ${vessel.location.serializedOrbit.referenceBodyGuid}`;
										default:
											return `Unknown flight situation (${vessel.vesselState.Situation}) above ${vessel.location.serializedOrbit.referenceBodyGuid}`;
									}
								case "speed":
									return formatSpeed(
										vessel.location.rigidbodyState.localVelocity
									);
								case "missionTime":
									return formatTime(
										saveFile.getTimeSince(vessel.vesselState.launchTime)
									);
								case "partCount":
									return vessel.parts.length;
								case "isDebris":
									return vessel.IsDebris ? "Yes" : "No";
							}
						}}
						inMemory={{ level: "sorting" }}
						sorting={{
							columns: sort,
							onSort: setSort,
						}}
						trailingControlColumns={[
							{
								id: "viewDetail",
								headerCellRender: () => <span></span>,
								rowCellRender: ({ rowIndex }) => {
									const vessel = saveFile.vessels[rowIndex];
									return (
										<EuiButtonEmpty
											onClick={() => {
												navigate(`/vessels/${vessel.Guid.Guid}`);
											}}
											iconType="search"
											color="text"
										/>
									);
								},
								width: 44,
							},
						]}
					/>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
