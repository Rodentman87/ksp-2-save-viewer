import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { DeployableData } from "./Deployable";
import { PartModuleCardBase } from "./PartModuleCard";

type SolarPanelData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		StellarExposure: ValueWithContextKey<string>;
		EnergyFlow: ValueWithContextKey<number>;
		SimBlockingBody: string;
		SimStarEnergyScale: number;
		// TODO figure out what this is and how I might use it
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

export const SolarPanel: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const solarPanelData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_SolarPanel"
		) as SolarPanelData;
	}, [partModuleState]);
	const deployableData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Deployable"
		) as DeployableData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Solar Panel" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Stellar Exposure"
					display="columnCompressed"
					isDisabled
					hasChildLabel
				>
					<EuiFieldText
						compressed
						value={solarPanelData.DataObject.StellarExposure.storedValue}
						readOnly
					/>
				</EuiFormRow>
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
