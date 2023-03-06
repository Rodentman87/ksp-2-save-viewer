import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type ParachuteData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		deploymentSafetyState: ValueWithContextKey<string>;
		minAirPressureToOpen: ValueWithContextKey<number>;
		deployAltitude: ValueWithContextKey<number>;
		spreadAngle: ValueWithContextKey<number>;
		armedToggle: ValueWithContextKey<boolean>;
		deployState: ValueWithContextKey<string>;
		DeploymentMode: ValueWithContextKey<string>;
		IsDeploySettingsShown: ValueWithContextKey<boolean>;
		chuteTemp: number;
		minimumSpeedToDeploy: number;
	};
};

export const Parachute: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const parachuteData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Parachute"
		) as ParachuteData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Parachute" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Safe To Deploy?"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={parachuteData.DataObject.deploymentSafetyState.storedValue}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Min Air Pressure"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={parachuteData.DataObject.minAirPressureToOpen.storedValue}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Deploy Altitude"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={parachuteData.DataObject.deployAltitude.storedValue}
						readOnly
						append="m"
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Armed"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="armedToggle"
						label="Armed"
						showLabel={false}
						checked={parachuteData.DataObject.armedToggle.storedValue}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Deployment State"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={parachuteData.DataObject.deployState.storedValue}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
