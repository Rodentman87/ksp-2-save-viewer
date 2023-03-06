import { EuiFieldText, EuiForm, EuiFormRow, EuiRange } from "@elastic/eui";
import React, { useMemo } from "react";
import { GuidWithDebugName_0_1_0 } from "../../types/common/Common";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
	ValueWithContextKey,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

type DockingNodeData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		DockedPartId: GuidWithDebugName_0_1_0;
		PreviousDockedPartId: GuidWithDebugName_0_1_0;
		CurrentState: string;
		AcquireForcePercent: ValueWithContextKey<number>;
	};
};

export const DockingNode: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const dockingNodeData = useMemo(() => {
		return partModuleState.ModuleData.find(
			(dat) => dat.Name === "Data_DockingNode"
		) as DockingNodeData;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Docking Node" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Currently Docked"
					display="columnCompressed"
					isDisabled
				>
					<EuiFieldText
						compressed
						value={
							dockingNodeData.DataObject.DockedPartId.Guid !==
							"00000000-0000-0000-0000-000000000000"
								? "Yes"
								: "No"
						}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow label="Current State" display="columnCompressed" isDisabled>
					<EuiFieldText
						compressed
						value={dockingNodeData.DataObject.CurrentState}
						readOnly
					/>
				</EuiFormRow>
				<EuiFormRow
					label="Acquire Force Percent"
					display="columnCompressed"
					isDisabled
				>
					<EuiRange
						compressed
						min={0}
						max={1}
						step={0.01}
						value={dockingNodeData.DataObject.AcquireForcePercent.storedValue}
						showLabels
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
