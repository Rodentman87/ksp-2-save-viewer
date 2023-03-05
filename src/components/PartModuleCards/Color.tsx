import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import { colorToRGBA } from "../../helpers/formatting";
import { Color } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type ColorData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		Base: ValueWithContextKey<Color>;
		Accent: ValueWithContextKey<Color>;
	};
};

export const ColorCard: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const { primary, accent } = useMemo(() => {
		const data = partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Color"
		) as ColorData;
		const primary = colorToRGBA(data.DataObject.Base.storedValue);
		const accent = colorToRGBA(data.DataObject.Accent.storedValue);
		return {
			primary,
			accent,
		};
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Color" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow label="Part Colors" display="columnCompressed" isDisabled>
					<EuiFieldText
						style={{
							background: `linear-gradient(100deg, ${primary} 0%,  ${primary} 50%, ${accent} 50%, ${accent} 100%)`,
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
