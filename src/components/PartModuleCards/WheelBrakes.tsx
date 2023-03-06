import { EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type WheelBrakesData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		BrakeTweakable: ValueWithContextKey<number>;
		BrakeInput: number;
		IsBraking: ValueWithContextKey<boolean>;
	};
};

export const WheelBrakes: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const wheelBrakesData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_WheelBrakes"
		) as WheelBrakesData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Wheel Brakes" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Is Braking"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="IsBraking"
						label="Is Braking"
						showLabel={false}
						checked={wheelBrakesData.DataObject.IsBraking.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
