import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

export type DeployableData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		toggleExtend: ValueWithContextKey<boolean>;
		statusTxt: ValueWithContextKey<string>;
		DeployLimit: ValueWithContextKey<number>;
		AnimationNormalizedTime: ValueWithContextKey<number>;
		CurrentDeployState: ValueWithContextKey<string>;
		rotationMode: string;
		AnimDeployStateKey: string;
		AnimSpeedMultiplierKey: string;
		AnimreverseStateTransitionTriggerKey: string;
		AnimDeployLimitKey: string;
		DefaultRetractedAnimSpeedValue: number;
		DefaultExtendedAnimSpeedValue: number;
		IsExtended: boolean;
		IsRetracted: boolean;
		IsRetracting: boolean;
		IsExtending: boolean;
		UseAnimation: boolean;
	};
};

export const Deployable: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const deployableData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Deployable"
		) as DeployableData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Deployable" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Status"
					display="columnCompressed"
					isDisabled
					hasChildLabel
				>
					<EuiFieldText
						compressed
						value={deployableData.DataObject.statusTxt.storedValue}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
