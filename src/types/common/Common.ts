export interface GuidWithDebugName_0_1_0 {
	Guid: string;
	DebugName: null | string; // TODO not 100% sure on this type
}

export interface FlightControlState_0_1_0 {
	mainThrottle: number;
	roll: number;
	yaw: number;
	pitch: number;
	rollTrim: number;
	yawTrim: number;
	pitchTrim: number;
	inputRoll: number;
	inputYaw: number;
	inputPitch: number;
	wheelSteer: number;
	wheelSteerTrim: number;
	wheelThrottle: number;
	wheelThrottleTrim: number;
	X: number;
	Y: number;
	Z: number;
	killRot: boolean;
	gearUp: boolean;
	gearDown: boolean;
	headlight: boolean;
	stage: boolean;
	brakes: boolean;
	prelaunchInitiated: boolean;
}

export interface Location_0_1 {
	LocationType: string; // TODO enum?
	serializedOrbit: Orbit_0_1;
	surfaceLocation: null; // TODO figure out this type
	rigidbodyState: RigidbodyState_0_1;
	originatingSimObject: GuidWithDebugName_0_1_0;
}

export interface Orbit_0_1 {
	/**
	 * This is not actually a Guid
	 */
	referenceBodyGuid: string;
	inclination: number;
	eccentricity: number;
	semiMajorAxis: number;
	latitudeOfAscendingNode: number;
	argumentOfPeriapsis: number;
	meanAnomalyAtEpoch: number;
	epoch: number;
}

export interface RigidbodyState_0_1 {
	/**
	 * Also not actually a Guid
	 */
	referenceTransformGuid: string;
	referenceFrameType: string; // TODO enum?
	localVelocity: Vector3D;
	localAngularVelocity: Vector3D;
	localPosition: Vector3D;
	localRotation: Quaternion;
	PhysicsMode: string; // TODO enum?
}

export interface Vector3D {
	x: number;
	y: number;
	z: number;
}

export interface Quaternion {
	x: number;
	y: number;
	z: number;
	w: number;
}

/**
 * A color in the save file, RGBA values are floats between 0 and 1.
 */
export interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}
