import { EuiPanel } from "@elastic/eui";
import React from "react";
import {
	PartModuleState_0_1,
	Part_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { ColorCard } from "./Color";
import { Drag } from "./Drag";
import { ReactionWheel } from "./ReactionWheel";
import { ResourceCapacities } from "./ResourceCapacities";

export const PartModuleCard: React.FC<{
	partModuleState: PartModuleState_0_1;
	part: Part_0_1;
}> = ({ partModuleState, part }) => {
	switch (partModuleState.Name) {
		case "PartComponentModule_ReactionWheel":
			return <ReactionWheel partModuleState={partModuleState} />;
		case "PartComponentModule_ResourceCapacities":
			return (
				<ResourceCapacities partModuleState={partModuleState} part={part} />
			);
		case "PartComponentModule_Drag":
			return <Drag partModuleState={partModuleState} />;
		case "PartComponentModule_CrewedInterior":
			return null;
		case "PartComponentModule_Color":
			return <ColorCard partModuleState={partModuleState} />;
		default:
			return (
				<PartModuleCardBase
					name={`Unknown Module (${partModuleState.Name})`}
					partModuleState={partModuleState}
				/>
			);
	}
};

export const PartModuleCardBase: React.FC<{
	name: string;
	children?: React.ReactNode;
	partModuleState: PartModuleState_0_1;
}> = ({ name, children, partModuleState }) => {
	return (
		<EuiPanel hasShadow={false} hasBorder className="flex flex-col gap-1">
			<h3 className="text-xl font-bold">{name}</h3>
			{children}
			<details>
				<summary>Module JSON</summary>
				<pre>
					<code>{JSON.stringify(partModuleState, null, 2)}</code>
				</pre>
			</details>
		</EuiPanel>
	);
};