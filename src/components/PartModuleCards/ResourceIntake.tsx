import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type ResourceIntakeData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		toggleResourceIntake: ValueWithContextKey<boolean>;
		flowRate: ValueWithContextKey<number>;
		statusTxt: ValueWithContextKey<string>;
	};
};

export const ResourceIntake: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const resourceIntakeData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_ResourceIntake"
		) as ResourceIntakeData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase
			name="Resource Intake"
			partModuleState={partModuleState}
		>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Enabled"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="isEnabled"
						label="Enabled"
						showLabel={false}
						checked={
							resourceIntakeData.DataObject.toggleResourceIntake.storedValue
						}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow label="Flow Rate" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={resourceIntakeData.DataObject.flowRate.storedValue}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
