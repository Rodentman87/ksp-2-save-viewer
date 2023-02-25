import { EuiDataGrid, EuiDataGridColumn, EuiPageTemplate } from "@elastic/eui";
import React from "react";
import { useSaveFile } from "../SaveFileContext";

const columns: EuiDataGridColumn[] = [
	{
		id: "name",
		displayAsText: "Name",
	},
	{
		id: "colors",
		displayAsText: "Colors",
	},
];

export const Agencies: React.FC = () => {
	const saveFile = useSaveFile();

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header pageTitle="Agencies" restrictWidth={false} />
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiDataGrid
					color="dark"
					aria-label="Agencies"
					toolbarVisibility={false}
					columns={columns}
					columnVisibility={{
						visibleColumns: columns.map((c) => c.id),
						setVisibleColumns: () => {},
					}}
					rowCount={saveFile.Agencies.length}
					renderCellValue={({ rowIndex, columnId, setCellProps }) => {
						const agency = saveFile.Agencies[rowIndex];

						switch (columnId) {
							case "name":
								return agency.AgencyName;
							case "colors":
								const primary = saveFile.colorToRGBA(agency.ColorBase);
								const accent = saveFile.colorToRGBA(agency.ColorAccent);
								setCellProps({
									style: {
										background: `linear-gradient(100deg, ${primary} 0%,  ${primary} 50%, ${accent} 50%, ${accent} 100%)`,
									},
								});
								return "";
						}
					}}
					inMemory={{ level: "sorting" }}
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
