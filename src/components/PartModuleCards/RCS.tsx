import {
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiRange,
	EuiSwitch,
} from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type RCSData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		ThrustStatus: ValueWithContextKey<string>;
		isEnabled: ValueWithContextKey<boolean>;
		thrustPercentage: ValueWithContextKey<number>;
		IsAdvancedSettingsShown: ValueWithContextKey<boolean>;
		enablePitch: ValueWithContextKey<boolean>;
		enableYaw: ValueWithContextKey<boolean>;
		enableRoll: ValueWithContextKey<boolean>;
		enableX: ValueWithContextKey<boolean>;
		enableY: ValueWithContextKey<boolean>;
		enableZ: ValueWithContextKey<boolean>;
		forByThrottle: ValueWithContextKey<boolean>;
		fullThrust: ValueWithContextKey<number>;
	};
};

export const RCS: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const rcsData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_RCS"
		) as RCSData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="RCS" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow label="Thrust Status" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={rcsData.DataObject.ThrustStatus.storedValue}
						readOnly
					/>
				</EuiFormRow>
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
						checked={rcsData.DataObject.isEnabled.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Thrust Percentage"
					display="columnCompressed"
					isDisabled
				>
					<EuiRange
						compressed
						min={0}
						max={1}
						step={0.01}
						value={rcsData.DataObject.thrustPercentage.storedValue}
						showLabels
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
						checked={rcsData.DataObject.IsAdvancedSettingsShown.storedValue}
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
						checked={rcsData.DataObject.enablePitch.storedValue}
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
						checked={rcsData.DataObject.enableYaw.storedValue}
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
						checked={rcsData.DataObject.enableRoll.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="X"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enableX"
						label="X"
						showLabel={false}
						checked={rcsData.DataObject.enableX.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Y"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enableY"
						label="Y"
						showLabel={false}
						checked={rcsData.DataObject.enableY.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Z"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="enableZ"
						label="Z"
						showLabel={false}
						checked={rcsData.DataObject.enableZ.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
