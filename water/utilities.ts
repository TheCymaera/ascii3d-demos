import { Matrix4, Vector3 } from "open-utilities/core/maths/mod.js";

export class Camera {
	readonly foxy: number;
	readonly view = Matrix4.identity();
	readonly projection = Matrix4.identity();

	constructor(foxy: number) {
		this.projection.perspective(foxy, 1, 0.1, 1000.0);
	}

	getTransform(model?: Matrix4): Matrix4 {
		return (model ? model.clone() : Matrix4.identity()).multiply(this.view).multiply(this.projection);
	}

	lookAt(position: Vector3, target: Vector3, up: Vector3) {
		this.view.lookAt(position,target,up);
	}
	
	lookAround(target: Vector3, distance: number, angleX: number, angleY: number, up: Vector3) {
		const relativePos = new Vector3(distance, 0, 0).rotateZ(angleY).rotateY(angleX);
		const cameraPos = target.clone().add(relativePos);
		this.view.lookAt(cameraPos,target,up);
	}
}

export type Color = [number, number, number, number];

export function mixColors(base: Color, add: Color): Color {
	const A = 1 - (1 - add[3]) * (1 - base[3]);
	const R = add[0] * add[3] / A + base[0] * base[3] * (1 - add[3]) / A;
	const G = add[1] * add[3] / A + base[1] * base[3] * (1 - add[3]) / A;
	const B = add[2] * add[3] / A + base[2] * base[3] * (1 - add[3]) / A;

	return [R,G,B,A];
}

export interface WaterOptions {
	render: boolean;
	frame: number;
}