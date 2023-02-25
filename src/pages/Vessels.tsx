import { EuiDataGrid, EuiDataGridColumn, EuiPageTemplate } from "@elastic/eui";
import React from "react";
import useLocalStorageState from "use-local-storage-state";
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
	},
	{
		id: "isDebris",
		displayAsText: "Is Debris",
		isSortable: false,
	},
];

export const Vessels: React.FC = () => {
	const saveFile = useSaveFile();

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

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header pageTitle="Vessels" restrictWidth={false} />
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiDataGrid
					color="dark"
					aria-label="Vessels"
					columns={columns}
					columnVisibility={{
						visibleColumns,
						setVisibleColumns,
					}}
					rowCount={saveFile.Vessels.length}
					renderCellValue={({ rowIndex, columnId }) => {
						const vessel = saveFile.Vessels[rowIndex];

						switch (columnId) {
							case "name":
								return vessel.AssemblyDefinition.assemblyName;
							case "ownedBy":
								return saveFile.getPlayer(vessel.OwnerPlayerId)?.PlayerName;
							case "location":
								if (vessel.vesselState.Situation === "Landed") {
									return `Landed on ${vessel.location.serializedOrbit.referenceBodyGuid}`;
								} else {
									return `In orbit around ${vessel.location.serializedOrbit.referenceBodyGuid}`;
								}
							case "speed":
								return saveFile.formatSpeed(
									vessel.location.rigidbodyState.localVelocity
								);
							case "missionTime":
								return saveFile.formatTime(
									saveFile.getTimeSince(vessel.vesselState.launchTime)
								);
							case "isDebris":
								return vessel.IsDebris ? "Yes" : "No";
						}
					}}
					inMemory={{ level: "sorting" }}
					sorting={{
						columns: sort,
						onSort: setSort,
					}}
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
