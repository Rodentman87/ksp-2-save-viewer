import React from "react";
import { VesselSituations } from "../types/vessel/VesselInfo-0-1";

export const VesselStateTag: React.FC<{ state: VesselSituations }> = ({
	state,
}) => {
	switch (state) {
		case "PreLaunch":
			return (
				<span className="rounded-md bg-orange-300 px-1 text-black text-sm">
					Pre-Launch
				</span>
			);
		case "Landed":
			return (
				<span className="rounded-md bg-green-300 px-1 text-black text-sm">
					Landed
				</span>
			);
		case "Splashed":
			return (
				<span className="rounded-md bg-blue-300 px-1 text-black text-sm">
					Splashed
				</span>
			);
		case "Flying":
			return (
				<span className="rounded-md bg-yellow-300 px-1 text-black text-sm">
					Flying
				</span>
			);
		case "SubOrbital":
			return (
				<span className="rounded-md bg-yellow-300 px-1 text-black text-sm">
					Flying
				</span>
			);
		case "Orbiting":
			return (
				<span className="rounded-md bg-purple-300 px-1 text-black text-sm">
					Orbiting
				</span>
			);
		case "Escaping":
			return (
				<span className="rounded-md bg-red-300 px-1 text-black text-sm">
					Escaping
				</span>
			);
		default:
			return (
				<span className="rounded-md bg-gray-300 px-1 text-black text-sm">
					Unknown
				</span>
			);
	}
};
