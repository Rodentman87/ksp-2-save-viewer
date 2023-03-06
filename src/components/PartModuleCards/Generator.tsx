import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type GeneratorData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		GeneratorOutput: ValueWithContextKey<number>;
		HeatGenerated: ValueWithContextKey<number>;
		DisplayStatus: ValueWithContextKey<string>;
		GeneratorEnabled: ValueWithContextKey<boolean>;
		DisplayLifetime: ValueWithContextKey<string>;
		GeneratorIsActive: boolean;
		IsDecaying: boolean;
		CurrentDecayLifetime: number;
		RequestConfig: {
			FlowResource: {
				Value: number;
			};
			FlowUnits: number;
			TargetUnits: number;
			FlowDirection: string;
			FlowModeOverride: string;
			FlowPriorityOffset: number;
			IngredientOverrides: null;
		};
	};
};

export const Generator: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const generatorData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_ModuleGenerator"
		) as GeneratorData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Generator" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow label="Output" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={generatorData.DataObject.GeneratorOutput.storedValue}
						readOnly
						append="EC/s"
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Heat Generated"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={generatorData.DataObject.HeatGenerated.storedValue}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow label="Status" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={generatorData.DataObject.DisplayStatus.storedValue}
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
						id="GeneratorEnabled"
						label="Enabled"
						showLabel={false}
						checked={generatorData.DataObject.GeneratorEnabled.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow label="Lifetime" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={generatorData.DataObject.DisplayLifetime.storedValue}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
