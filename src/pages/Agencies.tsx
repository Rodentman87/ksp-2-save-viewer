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
		id: "colors",
		displayAsText: "Colors",
		isSortable: false,
	},
];

export const Agencies: React.FC = () => {
	const saveFile = useSaveFile();

	const [visibleColumns, setVisibleColumns] = useLocalStorageState(
		"agenciesVisibleColumns",
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
	>("agenciesSort", {
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
		"agenciesGridStyle",
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
				iconType="home"
				pageTitle="Agencies"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				{saveFile.agencies.length === 0 ? (
					<EuiEmptyPrompt
						title={<h2>No Agencies Found</h2>}
						body={<span>Now how did you manage that?</span>}
					/>
				) : (
					<EuiDataGrid
						color="dark"
						aria-label="Agencies"
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
						rowCount={saveFile.agencies.length}
						renderCellValue={({ rowIndex, columnId, setCellProps }) => {
							const agency = saveFile.agencies[rowIndex];

							switch (columnId) {
								case "name":
									return agency.AgencyName;
								case "colors":
									setCellProps({
										style: {
											background: agency.getColorsAsGradient(),
										},
									});
									return "";
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
