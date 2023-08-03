import { Duration } from "open-utilities/core/datetime/mod.js";
import type { CameraController, CubeController } from "./ui.js";

export const keys = {
	incCameraAngleX: "KeyA",
	decCameraAngleX: "KeyD",
	incCameraAngleY: "KeyW",
	decCameraAngleY: "KeyS",
	incCameraDistance: "KeyQ",
	decCameraDistance: "KeyE",
	toggleCubeRotation: "KeyR",
};

export const movementSpeed = {
	angleX: 200,
	angleY: 200,
	distance: 50,
}

const pressedKeys: Set<string> = new Set;

export class KeyboardController  {
	constructor(public cube: CubeController, public camera: CameraController) {
		window.addEventListener("keydown",(event)=>{
			if (event.repeat) return;
			if (event.code === keys.toggleCubeRotation) cube.rotate = !cube.rotate;
			pressedKeys.add(event.code);
		});
		window.addEventListener("keyup",(event)=>{
			if (event.repeat) return;
			pressedKeys.delete(event.code);
		});
	}

	update(elapsed: Duration) {
		const deltaAngleX 	= elapsed.seconds * movementSpeed.angleX;
		const deltaAngleY 	= elapsed.seconds * movementSpeed.angleY;
		const deltaDistance = elapsed.seconds * movementSpeed.distance;

		let cameraNeedsUpdate = false;
		if (pressedKeys.has(keys.incCameraAngleX)) {
			this.camera.angleX += deltaAngleX;
			cameraNeedsUpdate = true;
		}
		if (pressedKeys.has(keys.decCameraAngleX)) {
			this.camera.angleX -= deltaAngleX;
			cameraNeedsUpdate = true;
		}
		if (pressedKeys.has(keys.incCameraAngleY)) {
			this.camera.angleY += deltaAngleY;
			cameraNeedsUpdate = true;
		}
		if (pressedKeys.has(keys.decCameraAngleY)) {
			this.camera.angleY -= deltaAngleY;
			cameraNeedsUpdate = true;
		}
		
		if (pressedKeys.has(keys.incCameraDistance)) {
			this.camera.distance += deltaDistance;
			cameraNeedsUpdate = true;
		}
		if (pressedKeys.has(keys.decCameraDistance)) {
			this.camera.distance -= deltaDistance;
			cameraNeedsUpdate = true;
		}

		if (cameraNeedsUpdate) {
			this.camera.change();
		}
	}
}