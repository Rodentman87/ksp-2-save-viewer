import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import { Vector3 } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type DragData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		DragForceDirection: ValueWithContextKey<Vector3>;
		DragForceMagnitude: ValueWithContextKey<number>;
		LiftForceDirection: ValueWithContextKey<Vector3>;
		LiftForceMagnitude: ValueWithContextKey<number>;
		ReferenceArea: ValueWithContextKey<number>;
		ExposedArea: ValueWithContextKey<number>;
		TotalArea: ValueWithContextKey<number>;
	};
};

export const Drag: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const dragData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_Drag"
		) as DragData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Drag" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow label="Drag Force" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={dragData.DataObject.DragForceMagnitude.storedValue}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow label="Lift Force" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={dragData.DataObject.LiftForceMagnitude.storedValue}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
