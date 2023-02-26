import { EuiDataGrid, EuiDataGridColumn, EuiPageTemplate } from "@elastic/eui";
import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { colorToRGBA } from "../helpers/formatting";
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

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="home"
				pageTitle="Agencies"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiDataGrid
					color="dark"
					aria-label="Agencies"
					columns={columns}
					columnVisibility={{
						visibleColumns,
						setVisibleColumns,
					}}
					rowCount={saveFile.Agencies.length}
					renderCellValue={({ rowIndex, columnId, setCellProps }) => {
						const agency = saveFile.Agencies[rowIndex];

						switch (columnId) {
							case "name":
								return agency.AgencyName;
							case "colors":
								const primary = colorToRGBA(agency.ColorBase);
								const accent = colorToRGBA(agency.ColorAccent);
								setCellProps({
									style: {
										background: `linear-gradient(100deg, ${primary} 0%,  ${primary} 50%, ${accent} 50%, ${accent} 100%)`,
									},
								});
								return "";
						}
					}}
					inMemory={{ level: "sorting" }}
					sorting={{ columns: sort, onSort: setSort }}
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
