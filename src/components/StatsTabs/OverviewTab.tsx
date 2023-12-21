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
import { formatMeters, formatSpeed } from "../../helpers/formatting";

export function OverviewTab() {
	const saveFile = useSaveFile();

	const {
		totalDistance,
		highestSpeed,
		highestGroundSpeed,
		celestialBodiesLandedOn,
		discoverablesFound,
	} = useMemo(() => {
		let totalDistance = 0;
		let highestSpeed = 0;
		let highestGroundSpeed = 0;
		saveFile.travelLog.objects.forEach((travelLogObject) => {
			totalDistance += travelLogObject.Statistics.DistanceTravelled;
			if (travelLogObject.Statistics.MaxSpeed > highestSpeed) {
				highestSpeed = travelLogObject.Statistics.MaxSpeed;
			}
			if (travelLogObject.Statistics.MaxGroundSpeed > highestGroundSpeed) {
				highestGroundSpeed = travelLogObject.Statistics.MaxGroundSpeed;
			}
		});
		return {
			totalDistance,
			highestSpeed,
			highestGroundSpeed,
			celestialBodiesLandedOn: saveFile.travelLog.firsts.CBLanded.length,
			discoverablesFound: saveFile.travelLog.firsts.DiscoverableReached.length,
		};
	}, [saveFile]);

	return (
		<div>
			<EuiFlexGrid columns={3}>
				<EuiFlexItem>
					<EuiPanel>
						<EuiStat
							titleColor="primary"
							title={formatMeters(totalDistance)}
							description={
								<EuiText>
									<span>
										<EuiIcon type="globe" color="primary" /> Total Distance
										Travelled
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
							titleColor="success"
							title={formatSpeed(highestSpeed)}
							description={
								<EuiText>
									<span>
										<EuiIcon type="launch" color="success" /> Highest Speed
										Achieved
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
							titleColor="success"
							title={formatSpeed(highestGroundSpeed)}
							description={
								<EuiText>
									<span>
										<EuiIcon type="clock" color="success" /> Highest Ground
										Speed Achieved
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
							titleColor="success"
							title={celestialBodiesLandedOn}
							description={
								<EuiText>
									<span>
										<EuiIcon type="globe" color="success" /> Celestial Bodies
										Landed On
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
							titleColor="success"
							title={discoverablesFound}
							description={
								<EuiText>
									<span>
										<EuiIcon type="mapMarker" color="success" /> Discoverables
										Found
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
