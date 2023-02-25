import { GuidWithDebugName_0_1_0 } from "../common/Common";

export interface SymmetrySets_0_1 {
	Version: "0.1";
	SymmetryType: "Radial" | "Mirror"; // TODO confirm "Mirror" is correct
	Anchor: GuidWithDebugName_0_1_0;
	AllParts: GuidWithDebugName_0_1_0[];
}
