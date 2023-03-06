import { EuiFieldText, EuiForm, EuiFormRow, EuiSwitch } from "@elastic/eui";
import React, { useMemo } from "react";
import { colorToRGBA } from "../../helpers/formatting";
import { Quaternion } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type LitPartData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		LightToggle: ValueWithContextKey<boolean>;
		HasEnoughResources: boolean;
		ColorGradientColors: [Quaternion, Quaternion];
		ColorGradientTimes: [number, number];
		CurrentLightIntensity: number;
		TargetLightIntensity: number;
		DurationMultiplier: number;
		IsTransitioning: boolean;
		Interpolation: number;
		LightStateOnBlackout: boolean;
	};
};

export const LitPart: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const { litPartData, gradient } = useMemo(() => {
		const litPartData = partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_LitPart"
		) as LitPartData;
		const colors = litPartData.DataObject.ColorGradientColors.map((color) =>
			colorToRGBA({
				r: color.x,
				g: color.y,
				b: color.z,
				a: color.w,
			})
		);
		const gradient = `linear-gradient(90deg, ${colors
			.map(
				(c, i) => `${c} ${litPartData.DataObject.ColorGradientTimes[i] * 100}%`
			)
			.join(", ")})`;
		return {
			litPartData,
			gradient,
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
						checked={litPartData.DataObject.HasEnoughResources}
						disabled
						onChange={() => {}}
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Light Gradient"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						style={{
							background: gradient,
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
