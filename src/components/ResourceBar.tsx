import { EuiProgress } from "@elastic/eui";
import React, { useMemo } from "react";
import { formatNumberAtMostTwoDecimals } from "../helpers/formatting";
import { getResourceStats } from "../helpers/rawStats";

export const ResourceBar: React.FC<{
	name: string;
	total: number;
	current: number;
}> = ({ name, total, current }) => {
	const resourceStats = useMemo(() => {
		return getResourceStats(name);
	}, [name]);

	return (
		<div>
			<EuiProgress
				label={resourceStats.name}
				size="m"
				color={resourceStats.barColor}
				max={total}
				value={current}
				valueText={`${formatNumberAtMostTwoDecimals(
					current
				)}/${formatNumberAtMostTwoDecimals(total)}${resourceStats.units}`}
			/>
		</div>
	);
};
