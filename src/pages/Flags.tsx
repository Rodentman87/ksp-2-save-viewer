import {
	EuiDataGrid,
	EuiDataGridColumn,
	EuiDataGridStyle,
	EuiEmptyPrompt,
	EuiPageTemplate,
} from "@elastic/eui";
import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSaveFile } from "../SaveFileContext";

const columns: EuiDataGridColumn[] = [
	{
		id: "name",
		displayAsText: "Name",
	},
	{
		id: "description",
		displayAsText: "Description",
	},
	{
		id: "celestialBody",
		displayAsText: "Celestial Body",
	},
];

export const Flags: React.FC = () => {
	const saveFile = useSaveFile();

	const [visibleColumns, setVisibleColumns] = useLocalStorageState(
		"flagsVisibleColumns",
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
	>("flagsSort", {
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
		"flagsGridStyle",
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
				iconType="flag"
				pageTitle="Flags"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				{saveFile.plantedFlags.length === 0 ? (
					<EuiEmptyPrompt
						iconType="flag"
						iconColor="danger"
						title={<h2>No Flags</h2>}
						body={<span>Go out and plant some!</span>}
					/>
				) : (
					<EuiDataGrid
						color="dark"
						aria-label="Flags"
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
						rowCount={saveFile.plantedFlags.length}
						renderCellValue={({ rowIndex, columnId }) => {
							const flag = saveFile.plantedFlags[rowIndex];

							switch (columnId) {
								case "name":
									return flag.FlagDefinition.LocationName;
								case "description":
									return flag.FlagDefinition.LocationDescription;
								case "celestialBody":
									return flag.Location.rigidbodyState.referenceTransformGuid;
							}
						}}
						inMemory={{ level: "sorting" }}
						sorting={{ columns: sort, onSort: setSort }}
					/>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
