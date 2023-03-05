import { EuiProgress } from "@elastic/eui";
import React, { useMemo } from "react";
import { formatNumberAtMostTwoDecimals } from "../../helpers/formatting";
import { getResourceStats } from "../../helpers/rawStats";
import {
	PartModuleState_0_1,
	Part_0_1,
} from "../../types/vessel/VesselInfo-0-1";
import { PartModuleCardBase } from "./PartModuleCard";

export const ResourceCapacities: React.FC<{
	partModuleState: PartModuleState_0_1;
	part: Part_0_1;
}> = ({ partModuleState, part }) => {
	const resources = useMemo(() => {
		if (!part.partState.resources) return;
		return Object.keys(part.partState.resources).map((resource) => {
			return [resource, part.partState.resources[resource]] as const;
		});
	}, [part])!;

	return (
		<PartModuleCardBase
			name="Resource Storage"
			partModuleState={partModuleState}
		>
			{resources.map(([resource, { capacityUnits, storedUnits }]) => {
				const resourceStats = getResourceStats(resource);

				return (
					<div key={resource}>
						<EuiProgress
							label={resourceStats.name}
							size="m"
							color={resourceStats.barColor}
							max={capacityUnits}
							value={storedUnits}
							valueText={`${formatNumberAtMostTwoDecimals(
								storedUnits
							)}/${formatNumberAtMostTwoDecimals(capacityUnits)}${
								resourceStats.units
							}`}
						/>
					</div>
				);
			})}
		</PartModuleCardBase>
	);
};
