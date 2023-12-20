import { EuiForm, EuiFormRow, EuiRange } from "@elastic/eui";
import React, { useMemo } from "react";
import { Vector3 } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type EngineData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		IndependentThrottle: ValueWithContextKey<boolean>;
		IndependentThrottlePercentage: ValueWithContextKey<number>;
		activeEngineMode: ValueWithContextKey<string>;
		EngineStatePriorChangeMode: string;
		EngingeChangingToMode: number;
		EngineAutoSwitchMode: ValueWithContextKey<boolean>;
		thrustPercentage: ValueWithContextKey<number>;
		FinalThrustValue: number;
		RealISPValue: number;
		stagingOn: ValueWithContextKey<boolean>;
		staged: boolean;
		Flameout: boolean;
		EngineIgnited: boolean;
		EngineShutdown: boolean;
		currentThrottle: number;
		thrustCurveDisplay: number;
		thrustCurveRatio: number;
		EngineSpool: number;
		ThrustDirRelativePartWorldSpace: Vector3;
		currentEngineModeIndex: number;
		State: string;
		IsOperational: boolean;
	};
};

export const Engine: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const engineData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Engine"
		) as EngineData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Engine" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				{/* <EuiFormRow label="State" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={engineData.DataObject.StatusString.storedValue}
						readOnly
					/>
				</EuiFormRow> */}
				<EuiFormRow
					label="Current Throttle"
					display="columnCompressed"
					isDisabled
				>
					<EuiRange
						compressed
						min={0}
						max={1}
						step={0.01}
						value={engineData.DataObject.currentThrottle}
						showLabels
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
