import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type CommandData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		controlStatus: ValueWithContextKey<string>;
		isCommandEnabled: ValueWithContextKey<boolean>;
		activeControlName: ValueWithContextKey<string>;
		hibernate: ValueWithContextKey<boolean>;
		hibernateInWarp: ValueWithContextKey<boolean>;
		RequestConfigs: null; // TODO figure out what this is
	};
};

export const Command: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const commandData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Command"
		) as CommandData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Command" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Control Status"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={commandData.DataObject.controlStatus.storedValue}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Is Command Enabled"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="isCommandEnabled"
						label="Is Command Enabled"
						showLabel={false}
						checked={commandData.DataObject.isCommandEnabled.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
