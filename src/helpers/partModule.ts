export const PartModuleMappings = {
	PartComponentModule_CrewedInterior: {
		name: "Crewed Interior",
	},
	PartComponentModule_ReactionWheel: {
		name: "Reaction Wheel",
	},
};

export const PartModuleDataTypeMappings = {
	Data_CrewedInterior: {
		attributes: [],
	},
	Data_ModuleActions: {
		attributes: [],
	},
	Data_ReactionWheel: {
		attributes: [
			{
				name: "Wheel Authority",
				key: "WheelAuthority",
			},
			{
				name: "Wheel Actuator Mode",
				key: "WheelActuatorMode",
			},
			{
				name: "Toggle Torque",
				key: "ToggleTorque",
			},
			{
				name: "Status Text",
				key: "StatusText",
			},
			{
				name: "Wheel State",
				key: "WheelState",
			},
		],
	},
} satisfies Record<string, { attributes: { name: string; key: string }[] }>;

export function getPartModuleInfo(name: string) {
	if (!(name in PartModuleMappings)) {
		return;
	} else {
		return PartModuleMappings[name as keyof typeof PartModuleMappings];
	}
}

export function getPartModuleDataTypeInfo(name: string) {
	if (!(name in PartModuleDataTypeMappings)) {
		return;
	} else {
		return PartModuleDataTypeMappings[
			name as keyof typeof PartModuleDataTypeMappings
		];
	}
}
