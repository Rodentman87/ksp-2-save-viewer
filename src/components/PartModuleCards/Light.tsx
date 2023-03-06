import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import { colorToRGBA } from "../../helpers/formatting";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type LightData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		isLightEnabled: ValueWithContextKey<boolean>;
		lightColorR: ValueWithContextKey<number>;
		lightColorG: ValueWithContextKey<number>;
		lightColorB: ValueWithContextKey<number>;
		castLight: ValueWithContextKey<boolean>;
		isBlinkEnabled: ValueWithContextKey<boolean>;
		blinkRate: ValueWithContextKey<number>;
		rotationAngle: ValueWithContextKey<number>;
		pitchAngle: ValueWithContextKey<number>;
		IsAdvancedControlsShown: ValueWithContextKey<boolean>;
		HasResourcesToOperate: boolean;
	};
};

export const Light: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const { lightData, color } = useMemo(() => {
		const lightData = partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Light"
		) as LightData;
		return {
			lightData,
			color: colorToRGBA({
				r: lightData.DataObject.lightColorR.storedValue,
				g: lightData.DataObject.lightColorG.storedValue,
				b: lightData.DataObject.lightColorB.storedValue,
				a: 1,
			}),
		};
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Lit Part" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Has Enough Resources"
					display="columnCompressedSwitch"
					isDisabled
					hasChildLabel
				>
					<EuiSwitch
						compressed
						id="HasEnoughResources"
						label="Has Enough Resources"
						showLabel={false}
						checked={lightData.DataObject.HasResourcesToOperate}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow label="Light Color" display="columnCompressed" isDisabled>
					<EuiFieldText
						style={{
							backgroundColor: color,
						}}
						compressed
						value={""}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
