import {
	EuiComboBox,
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

type ReactionWheelData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		WheelAuthority: ValueWithContextKey<number>;
		WheelActuatorMode: ValueWithContextKey<string>;
		ToggleTorque: ValueWithContextKey<boolean>;
		WheelState: string;
		HasResourcesToOperate: boolean;
		HasPendingResourceActivity: boolean;
		InputSumForResource: number;
		HasPendingInputActivity: boolean;
	};
};

export const ReactionWheel: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const reactionWheelData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_ReactionWheel"
		) as ReactionWheelData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Reaction Wheel" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Wheel Authority"
					display="columnCompressed"
					isDisabled
				>
					<EuiRange
						compressed
						min={0}
						max={1}
						step={0.01}
						value={reactionWheelData.DataObject.WheelAuthority.storedValue}
						showLabels
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Wheel Actuator Mode"
					display="columnCompressed"
					isDisabled
				>
					<EuiComboBox
						compressed
						singleSelection={{ asPlainText: true }}
						isClearable={false}
						options={[{ value: "All", label: "All" }]}
						selectedOptions={[{ value: "All", label: "All" }]}
						isDisabled={true}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Toggle Torque"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="toggleTorque"
						label="Toggle Torque"
						showLabel={false}
						checked={reactionWheelData.DataObject.ToggleTorque.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				{/* <EuiFormRow label="Status Text" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={reactionWheelData.DataObject.StatusText.storedValue}
						readOnly
					/>
				</EuiFormRow> */}
				<EuiFormRow label="Wheel State" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={reactionWheelData.DataObject.WheelState}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
