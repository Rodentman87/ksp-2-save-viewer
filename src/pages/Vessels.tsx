import { EuiDataGrid, EuiDataGridColumn, EuiPageTemplate } from "@elastic/eui";
import React from "react";
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
	},
	{
		id: "speed",
		displayAsText: "Speed",
	},
	{
		id: "missionTime",
		displayAsText: "Mission Time",
	},
	{
		id: "isDebris",
		displayAsText: "Is Debris",
	},
];

export const Vessels: React.FC = () => {
	const saveFile = useSaveFile();

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header pageTitle="Vessels" restrictWidth={false} />
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiDataGrid
					color="dark"
					aria-label="Vessels"
					toolbarVisibility={false}
					columns={columns}
					columnVisibility={{
						visibleColumns: columns.map((c) => c.id),
						setVisibleColumns: () => {},
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
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
