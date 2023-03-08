import { EuiForm, EuiFormRow, EuiRange, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type ProceduralPartData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		meshOptionIndex: number;
		sliderData: Record<string, number>;
		toggleData: Record<string, boolean>;
		visibleMeshData: {}; // TODO Figure out what this is
		MassModifierAmount: number;
		ResourceCostModifierAmount: number;
		MassModifier: number;
		ResourceCostModifier: number;
	};
};

export const ProceduralPart: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const proceduralPartData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_ProceduralPart"
		) as ProceduralPartData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase
			name="Procedural Part"
			partModuleState={partModuleState}
		>
			<EuiForm fullWidth>
				{Object.entries(proceduralPartData.DataObject.sliderData).map(
					([key, value]) => (
						<EuiFormRow
							label={key
								.split("_")
								.map(
									(word) =>
										word[0].toLocaleUpperCase() +
										word.slice(1).toLocaleLowerCase()
								)
								.join(" ")}
							display="columnCompressed"
							isDisabled
						>
							<EuiRange
								compressed
								min={0}
								max={1}
								step={0.001}
								value={value}
								showLabels
							/>
						</EuiFormRow>
					)
				)}
				{Object.entries(proceduralPartData.DataObject.toggleData).map(
					([key, value]) => (
						<EuiFormRow
							label={key}
							display="columnCompressedSwitch"
							isDisabled
							hasChildLabel
						>
							<EuiSwitch
								compressed
								id={key}
								label={key}
								showLabel={false}
								checked={value}
								disabled
								onChange={() => {}}
							/>
						</EuiFormRow>
					)
				)}
			</EuiForm>
		</PartModuleCardBase>
	);
};
