import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type CargoBayData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		IsSealed: boolean;
	};
};

export const CargoBay: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const cargoBayData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_CargoBay"
		) as CargoBayData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Cargo Bay" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow label="Sealed" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={cargoBayData.DataObject.IsSealed ? "Sealed" : "Unsealed"}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
