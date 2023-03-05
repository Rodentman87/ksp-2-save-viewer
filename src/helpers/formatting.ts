import { Color, Vector3D } from "../types/common/Common";

export function formatSpeed(speed: Vector3D) {
	const fullSpeed = Math.sqrt(
		speed.x * speed.x + speed.y * speed.y + speed.z * speed.z
	);
	return `${fullSpeed.toFixed(2)}m/s`;
}

export function formatMeters(meters: number) {
	if (meters > 1000000) {
		return `${(meters / 1000000).toFixed(2)}Mm`;
	}
	if (meters > 1000) {
		return `${(meters / 1000).toFixed(2)}km`;
	}
	return `${meters.toFixed(0)}m`;
}

export function colorToRGBA(color: Color) {
	const r = Math.floor(color.r * 255);
	const g = Math.floor(color.g * 255);
	const b = Math.floor(color.b * 255);
	const a = Math.floor(color.a * 255);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function formatTime(time: number) {
	const seconds = Math.floor(time % 60);
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 3600) % 24;
	const days = Math.floor(time / 86400) % 365;
	const years = Math.floor(time / 31536000);
	if (years > 0) {
		return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
	}
	if (days > 0) {
		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}
	if (hours > 0) {
		return `${hours}h ${minutes}m ${seconds}s`;
	}
	if (minutes > 0) {
		return `${minutes}m ${seconds}s`;
	}
	return `${seconds}s`;
}

export function formatNumberAtMostTwoDecimals(number: number) {
	return number.toFixed(2).replace(/\.?0+$/, "");
}
