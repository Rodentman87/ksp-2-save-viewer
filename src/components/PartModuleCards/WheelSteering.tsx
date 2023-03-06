import { EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type WheelSteeringData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		SteeringRange: number;
		SteeringEnabled: ValueWithContextKey<boolean>;
		SteeringInvert: ValueWithContextKey<boolean>;
		AutoSterringAdjust: ValueWithContextKey<boolean>;
		AngleTweakable: ValueWithContextKey<number>;
		ResponseTweakable: ValueWithContextKey<number>;
	};
};

export const WheelSteering: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const wheelSteeringData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_WheelSteering"
		) as WheelSteeringData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Wheel Steering" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Steering Enabled"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="SteeringEnabled"
						label="Steering Enabled"
						showLabel={false}
						checked={wheelSteeringData.DataObject.SteeringEnabled.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
