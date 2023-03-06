import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type DataTransmitterData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		DataTransmissionInterval: number;
		DataPacketSize: number;
		ExtendWhileTransmitting: boolean;
	};
};

export const DataTransmitter: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const dataTransmitterData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Transmitter"
		) as DataTransmitterData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase
			name="Data Transmitter"
			partModuleState={partModuleState}
		>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Transmittion Interval"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={dataTransmitterData.DataObject.DataTransmissionInterval}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Data Packet Size"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={dataTransmitterData.DataObject.DataPacketSize}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Extended While Transmitting"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="extendWhileTransmitting"
						label="Extended While Transmitting"
						showLabel={false}
						checked={dataTransmitterData.DataObject.ExtendWhileTransmitting}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
