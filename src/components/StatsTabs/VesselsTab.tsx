import {
	EuiFlexGrid,
	EuiFlexItem,
	EuiIcon,
	EuiPanel,
	EuiStat,
	EuiText,
} from "@elastic/eui";
import { useMemo } from "react";
import { useSaveFile } from "../../SaveFileContext";

export function VesselsTab() {
	const saveFile = useSaveFile();

	const launches = useMemo(() => {
		return saveFile.travelLog.events.filter((event) => {
			return event.EventKey === "vesselLaunched";
		}).length;
	}, [saveFile]);

	return (
		<div>
			<EuiFlexGrid columns={3}>
				<EuiFlexItem>
					<EuiPanel>
						<EuiStat
							titleColor="success"
							title={saveFile.vessels.length}
							description={
								<EuiText>
									<span>
										<EuiIcon type="launch" color="success" /> Active Vessels
									</span>
								</EuiText>
							}
							textAlign="center"
						/>
					</EuiPanel>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiPanel>
						<EuiStat
							titleColor="accent"
							title={launches}
							description={
								<EuiText>
									<span>
										<EuiIcon type="launch" color="accent" /> Launches
									</span>
								</EuiText>
							}
							textAlign="center"
						/>
					</EuiPanel>
				</EuiFlexItem>
			</EuiFlexGrid>
		</div>
	);
}
