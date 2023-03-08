export const CelestialBodyStats = {
	Kerbin: {
		radius: 600000,
	},
	Moho: {
		radius: 250000,
	},
	Eve: {
		radius: 700000,
	},
	Gilly: {
		radius: 13000,
	},
	Mun: {
		radius: 200000,
	},
	Minmus: {
		radius: 60000,
	},
	Duna: {
		radius: 320000,
	},
	Ike: {
		radius: 130000,
	},
	Dres: {
		radius: 138000,
	},
	Jool: {
		radius: 6000000,
	},
	Laythe: {
		radius: 500000,
	},
	Vall: {
		radius: 300000,
	},
	Tylo: {
		radius: 600000,
	},
	Bop: {
		radius: 65000,
	},
	Pol: {
		radius: 44000,
	},
	Eeloo: {
		radius: 210000,
	},
};

export function getBodyStats(name: string) {
	if (!(name in CelestialBodyStats)) {
		return {
			radius: 0,
		};
	} else {
		return CelestialBodyStats[name as keyof typeof CelestialBodyStats];
	}
}

export const ResourceStats = {
	ElectricCharge: {
		name: "Electric Charge",
		abbreviation: "EC",
		units: "U",
		barColor: "#fff700",
	},
	MonoPropellant: {
		name: "Mono Propellant",
		abbreviation: "MP",
		units: "t",
		barColor: "#0051ff",
	},
	Methane: {
		name: "Methane",
		abbreviation: "LF",
		units: "t",
		barColor: "#00c3ff",
	},
	Oxidizer: {
		name: "Oxidizer",
		abbreviation: "Ox",
		units: "t",
		barColor: "#00fff7",
	},
	Xenon: {
		name: "Xenon Gas",
		abbreviation: "Xe",
		units: "t",
		barColor: "#722e97",
	},
	Hydrogen: {
		name: "Hydrogen",
		abbreviation: "H",
		units: "t",
		barColor: "#f884cc",
	},
	Ablator: {
		name: "Ablator",
		abbreviation: "Ab",
		units: "t",
		barColor: "#d5ae00",
	},
	IntakeAir: {
		name: "Intake Air",
		abbreviation: "IA",
		units: "t",
		barColor: "#ffffff",
	},
};

export function getResourceStats(name: string) {
	if (!(name in ResourceStats)) {
		return {
			name: name,
			abbreviation: name,
			units: "U",
			barColor: "#ff0000",
		};
	} else {
		return ResourceStats[name as keyof typeof ResourceStats];
	}
}
