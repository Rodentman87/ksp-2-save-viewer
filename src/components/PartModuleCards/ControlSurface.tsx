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

type ControlSurfaceData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		LiftDragRatioParent: ValueWithContextKey<number>;
		Deploy: ValueWithContextKey<boolean>;
		DeployAngle: ValueWithContextKey<number>;
		InvertControl: ValueWithContextKey<boolean>;
		IsAdvancedSettingsShown: ValueWithContextKey<boolean>;
		EnablePitch: ValueWithContextKey<boolean>;
		EnableYaw: ValueWithContextKey<boolean>;
		EnableRoll: ValueWithContextKey<boolean>;
		AuthorityLimiter: ValueWithContextKey<number>;
		LiftScalarParent: ValueWithContextKey<number>;
		DragScalarParent: ValueWithContextKey<number>;
		AoAParent: ValueWithContextKey<number>;
		LiftScalar: ValueWithContextKey<number>;
		DragScalar: ValueWithContextKey<number>;
		AoA: ValueWithContextKey<number>;
		IsCtrlSurfaceActive: boolean;
		LiftingCtrlSurfaceArea: number;
		CoPressureCtrlSurfaceOffset: Vector3;
		CtrlSurfacePivotOffset: Vector3;
		CtrlSurfaceArea: number;
		MirrorDeploy: boolean;
	};
};

export const ControlSurface: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const controlSurfaceData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_ControlSurface"
		) as ControlSurfaceData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase
			name="Control Surface"
			partModuleState={partModuleState}
		>
			<EuiForm fullWidth>
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
						checked={
							controlSurfaceData.DataObject.IsAdvancedSettingsShown.storedValue
						}
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
						checked={controlSurfaceData.DataObject.EnablePitch.storedValue}
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
						checked={controlSurfaceData.DataObject.EnableYaw.storedValue}
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
						checked={controlSurfaceData.DataObject.EnableRoll.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
