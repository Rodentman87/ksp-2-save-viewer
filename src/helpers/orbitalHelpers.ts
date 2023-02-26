import { Vessel_0_1 } from "../types/vessel/VesselInfo-0-1";
import { getBodyStats } from "./rawStats";

export function getOrbitalStats(vessel: Vessel_0_1) {
	const orbitedBodyStats = getBodyStats(
		vessel.location.serializedOrbit.referenceBodyGuid
	);

	const apoapsis =
		vessel.location.serializedOrbit.semiMajorAxis *
			(1 + vessel.location.serializedOrbit.eccentricity) -
		orbitedBodyStats.radius;

	const periapsis =
		vessel.location.serializedOrbit.semiMajorAxis *
			(1 - vessel.location.serializedOrbit.eccentricity) -
		orbitedBodyStats.radius;

	// const semiMajorAU = metersToAu(vessel.location.serializedOrbit.semiMajorAxis);

	// const orbitalPeriodYears = Math.sqrt(semiMajorAU ** 3);
	// const orbitalPeriodSeconds = orbitalPeriodYears * 365.25 * 24 * 60 * 60;

	return {
		apoapsis: apoapsis,
		periapsis: periapsis,
		// orbitalPeriodSeconds,
	};
}

export function metersToAu(meters: number) {
	return meters / 149597870.7;
}
