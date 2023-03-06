import { EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import { Vector3 } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type WheelSuspensionData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		suspensionPos: Vector3;
		suspensionDefaultPos: Vector3;
		autoSpringDamper: ValueWithContextKey<boolean>;
		autoBoost: number;
		springTweakable: ValueWithContextKey<number>;
		damperTweakable: ValueWithContextKey<number>;
	};
};

export const WheelSuspension: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const wheelSuspensionData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_WheelSuspension"
		) as WheelSuspensionData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase
			name="Wheel Suspension"
			partModuleState={partModuleState}
		>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Auto Spring Damper"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="autoSpringDamper"
						label="Auto Spring Damper"
						showLabel={false}
						checked={
							wheelSuspensionData.DataObject.autoSpringDamper.storedValue
						}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
