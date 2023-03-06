import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type WheelBaseData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		isGrounded: boolean;
		AutoFriction: ValueWithContextKey<boolean>;
		FrictionMultiplier: ValueWithContextKey<number>;
	};
};

export const WheelBase: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const wheelBaseData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_WheelBase"
		) as WheelBaseData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Wheel Base" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Auto Friction Control"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="AutoFriction"
						label="Auto Friction Control"
						showLabel={false}
						checked={wheelBaseData.DataObject.AutoFriction.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Friction Multiplier"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={wheelBaseData.DataObject.FrictionMultiplier.storedValue}
						disabled
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
