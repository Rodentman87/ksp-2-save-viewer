import { EuiProgress } from "@elastic/eui";
import React, { useMemo } from "react";
import { formatNumberAtMostTwoDecimals } from "../helpers/formatting";
import { getResourceStats } from "../helpers/rawStats";
import { useTheme } from "../ThemeContext";

export const ResourceBar: React.FC<{
	name: string;
	total: number;
	current: number;
}> = ({ name, total, current }) => {
	const resourceStats = useMemo(() => {
		return getResourceStats(name);
	}, [name]);

	const theme = useTheme();

	const barColor = useMemo(() => {
		if (!theme.light && resourceStats.darkThemeBarColor)
			return resourceStats.darkThemeBarColor;
		return resourceStats.barColor;
	}, [theme, resourceStats]);

	return (
		<div>
			<EuiProgress
				label={resourceStats.name}
				size="m"
				color={barColor}
				max={total}
				value={current}
				valueText={`${formatNumberAtMostTwoDecimals(
					current
				)}/${formatNumberAtMostTwoDecimals(total)}${resourceStats.units}`}
			/>
		</div>
	);
};
