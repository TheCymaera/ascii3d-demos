import { Duration } from "open-utilities/core/datetime/mod.js";
import * as ui from "./ui.js";

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
window.addEventListener("keydown",(event)=>{
	if (event.repeat) return;
	if (event.code === keys.toggleCubeRotation) ui.cube.rotate.checked = !ui.cube.rotate.checked;
	pressedKeys.add(event.code);
});
window.addEventListener("keyup",(event)=>{
	if (event.repeat) return;
	pressedKeys.delete(event.code);
});

export function update(elapsed: Duration) {
	const deltaAngleX 	= elapsed.seconds * movementSpeed.angleX;
	const deltaAngleY 	= elapsed.seconds * movementSpeed.angleY;
	const deltaDistance = elapsed.seconds * movementSpeed.distance;

	let cameraNeedsUpdate = false;
	if (pressedKeys.has(keys.incCameraAngleX)) {
		ui.camera.angleX.valueAsNumber = (ui.camera.angleX.valueAsNumber + deltaAngleX + 360) % 360;
		cameraNeedsUpdate = true;
	}
	if (pressedKeys.has(keys.decCameraAngleX)) {
		ui.camera.angleX.valueAsNumber = (ui.camera.angleX.valueAsNumber - deltaAngleX + 360) % 360;
		cameraNeedsUpdate = true;
	}
	if (pressedKeys.has(keys.incCameraAngleY)) {
		ui.camera.angleY.valueAsNumber += deltaAngleY;
		cameraNeedsUpdate = true;
	}
	if (pressedKeys.has(keys.decCameraAngleY)) {
		ui.camera.angleY.valueAsNumber -= deltaAngleY;
		cameraNeedsUpdate = true;
	}
	
	if (pressedKeys.has(keys.incCameraDistance)) {
		ui.camera.distance.valueAsNumber += deltaDistance;
		cameraNeedsUpdate = true;
	}
	if (pressedKeys.has(keys.decCameraDistance)) {
		ui.camera.distance.valueAsNumber -= deltaDistance;
		cameraNeedsUpdate = true;
	}

	if (cameraNeedsUpdate) {
		ui.camera.update();
	}
}