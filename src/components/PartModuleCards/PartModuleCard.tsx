import { EuiPanel } from "@elastic/eui";
import React from "react";
import {
	PartModuleState_0_1,
	Part_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { CargoBay } from "./CargoBay";
import { ColorCard } from "./Color";
import { Command } from "./Command";
import { ControlSurface } from "./ControlSurface";
import { DataTransmitter } from "./DataTransmitter";
import { Deployable } from "./Deployable";
import { DockingNode } from "./DockingNode";
import { Drag } from "./Drag";
import { Engine } from "./Engine";
import { Generator } from "./Generator";
import { Gimbal } from "./Gimbal";
import { Light } from "./Light";
import { LitPart } from "./LitPart";
import { Parachute } from "./Parachute";
import { ProceduralPart } from "./ProceduralPart";
import { RCS } from "./RCS";
import { ReactionWheel } from "./ReactionWheel";
import { ResourceCapacities } from "./ResourceCapacities";
import { ResourceIntake } from "./ResourceIntake";
import { ScienceExperiment } from "./ScienceExperiment";
import { SolarPanel } from "./SolarPanel";
import { WheelBase } from "./WheelBase";
import { WheelBrakes } from "./WheelBrakes";
import { WheelSteering } from "./WheelSteering";
import { WheelSuspension } from "./WheelSuspension";

// TODO Maybe rework this into a plugin system?
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
		case "PartComponentModule_Color":
			return <ColorCard partModuleState={partModuleState} />;
		case "PartComponentModule_DataTransmitter":
			return <DataTransmitter partModuleState={partModuleState} />;
		case "PartComponentModule_Command":
			return <Command partModuleState={partModuleState} />;
		case "PartComponentModule_LitPart":
			return <LitPart partModuleState={partModuleState} />;
		case "PartComponentModule_Parachute":
			return <Parachute partModuleState={partModuleState} />;
		case "PartComponentModule_RCS":
			return <RCS partModuleState={partModuleState} />;
		case "PartComponentModule_DockingNode":
			return <DockingNode partModuleState={partModuleState} />;
		case "PartComponentModule_Generator":
			return <Generator partModuleState={partModuleState} />;
		case "PartComponentModule_Gimbal":
			return <Gimbal partModuleState={partModuleState} />;
		case "PartComponentModule_Deployable":
			return <Deployable partModuleState={partModuleState} />;
		case "PartComponentModule_Light":
			return <Light partModuleState={partModuleState} />;
		case "PartComponentModule_Engine":
			return <Engine partModuleState={partModuleState} />;
		case "PartComponentModule_WheelBase":
			return <WheelBase partModuleState={partModuleState} />;
		case "PartComponentModule_WheelSteering":
			return <WheelSteering partModuleState={partModuleState} />;
		case "PartComponentModule_WheelBrakes":
			return <WheelBrakes partModuleState={partModuleState} />;
		case "PartComponentModule_WheelSuspension":
			return <WheelSuspension partModuleState={partModuleState} />;
		case "PartComponentModule_SolarPanel":
			return <SolarPanel partModuleState={partModuleState} />;
		case "PartComponentModule_CargoBay":
			return <CargoBay partModuleState={partModuleState} />;
		case "PartComponentModule_ResourceIntake":
			return <ResourceIntake partModuleState={partModuleState} />;
		case "PartComponentModule_ControlSurface":
			return <ControlSurface partModuleState={partModuleState} />;
		case "PartComponentModule_ProceduralPart":
			return <ProceduralPart partModuleState={partModuleState} />;
		case "PartComponentModule_ScienceExperiment":
			return <ScienceExperiment partModuleState={partModuleState} />;

		// TODO local data for these parts doesn't seem to exist, may be able to get data from elsewhere
		case "PartComponentModule_CrewedInterior":
		case "PartComponentModule_ToggleCrossfeed":
		case "PartComponentModule_FuelLine":
		case "PartComponentModule_WheelLock":
		case "PartComponentModule_ReinforcedConnection":
		case "PartComponentModule_StatusLight":
			return null;
		// TODO these parts have local data, but not clear if/how to display it
		case "PartComponentModule_Fairing":
			return null;

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
