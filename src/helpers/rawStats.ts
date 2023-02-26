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

export function getBodyStat(name: string) {
	if (!(name in CelestialBodyStats)) {
		return {
			radius: 0,
		};
	} else {
		return CelestialBodyStats[name as keyof typeof CelestialBodyStats];
	}
}
