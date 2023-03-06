import { EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type GimbalData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		isEnabled: ValueWithContextKey<boolean>;
		gimbalLimiter: ValueWithContextKey<number>;
		IsAdvancedSettingsShown: ValueWithContextKey<boolean>;
		enablePitch: ValueWithContextKey<boolean>;
		enableYaw: ValueWithContextKey<boolean>;
		enableRoll: ValueWithContextKey<boolean>;
	};
};

export const Gimbal: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const gimbalData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Gimbal"
		) as GimbalData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Gimbal" partModuleState={partModuleState}>
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
						checked={gimbalData.DataObject.isEnabled.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Advanced Settings"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="IsAdvancedSettingsShown"
						label="Advanced Settings"
						showLabel={false}
						checked={gimbalData.DataObject.IsAdvancedSettingsShown.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Pitch"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enablePitch"
						label="Pitch"
						showLabel={false}
						checked={gimbalData.DataObject.enablePitch.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Yaw"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enableYaw"
						label="Yaw"
						showLabel={false}
						checked={gimbalData.DataObject.enableYaw.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Roll"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enableRoll"
						label="Roll"
						showLabel={false}
						checked={gimbalData.DataObject.enableRoll.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
