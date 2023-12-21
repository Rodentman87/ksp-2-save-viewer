import { EuiFieldText, EuiForm, EuiFormRow } from "@elastic/eui";
import React, { useMemo } from "react";
import {
	DataObject_0_1,
	ModuleData_0_1,
	PartModuleState_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

interface Location {
	RequiresRegion: boolean;
	BodyName: string;
	ScienceSituation: string;
	ScienceRegion: string;
	ResearchLocationId: string;
}

interface ExperimentStanding {
	ExperimentId: string;
	CurrentRunningTime: number;
	ConditionMet: boolean;
	CurrentExperimentState: string;
	PreviousExperimentState: string;
	CurrentExperimentContext: string;
	CurrentSituationIsValid: boolean;
	RegionRequired: boolean;
	ExperimentLocation: Location;
	HasEnoughResources: boolean;
}

interface ValidSituation {
	CelestialBodyScalar: number;
	ScienceRegionScalar: number;
	SituationScalar: number;
	ResearchLocation: Location;
}

type ScienceExperimentData = ModuleData_0_1 & {
	DataObject: DataObject_0_1 & {
		ExperimentStandings: ExperimentStanding[];
		LastKnownValidSituation: ValidSituation;
	};
};

export const ScienceExperiment: React.FC<{
	partModuleState: PartModuleState_0_1;
}> = ({ partModuleState }) => {
	const { ExperimentStandings } = useMemo(() => {
		return (
			partModuleState.ModuleData.find(
				(dat) => dat.Name === "Data_ScienceExperiment"
			) as ScienceExperimentData
		).DataObject;
	}, [partModuleState]);

	return (
		<PartModuleCardBase name="Solar Panel" partModuleState={partModuleState}>
			<EuiForm fullWidth>
				<EuiFormRow
					label="Has Enough Resources to Run"
					display="columnCompressed"
					isDisabled
					hasChildLabel
				>
					<EuiFieldText
						compressed
						value={
							ExperimentStandings.some((e) => e.HasEnoughResources)
								? "Yes"
								: "No"
						}
						readOnly
					/>
				</EuiFormRow>
			</EuiForm>
		</PartModuleCardBase>
	);
};
