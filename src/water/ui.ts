import * as scene from "./scene.js";
import { Vector3 } from "open-utilities/core/maths/mod.js";
import { Duration } from "open-utilities/core/datetime/mod.js";
import {} from "helion/core.js";
import {} from "helion/LightTheme.js";
import {} from "helion/AppBar.js";
import {} from "helion/Panel.js";
import {} from "helion/Stack.js";
import {} from "helion/Intangible.js";
import {} from "helion/CircleButton.js";
import {} from "helion/StandardView.js";
import {} from "helion/SidebarView.js";
import {} from "helion/Checkbox.js";
import {} from "helion/Slider.js";
import {} from "helion/AspectRatio.js";

export const camera = {
	angleX: document.querySelector("#cameraAngleXInput") as HTMLInputElement,
	angleY: document.querySelector("#cameraAngleYInput") as HTMLInputElement,
	distance: document.querySelector("#cameraDistanceInput") as HTMLInputElement,
	update() {
		scene.playerCamera.lookAround(
			new Vector3(0,0,0),							// target (center of cube)
			camera.distance.valueAsNumber,				// distance to cube
			camera.angleX.valueAsNumber * Math.PI / 180,// angle X of camera
			camera.angleY.valueAsNumber * Math.PI / 180,// angle Y of camera
			new Vector3(0,1,0)							// up-vector
		);
	}
}

export const cube = {
	angleX: 0,
	angleY: 0,
	rotateX: 1,
	rotateY: 2,
	scale: 1,
	rotate: document.querySelector("#rotateCubeInput") as HTMLInputElement,
	update() {
		scene.cubeModelMatrix
		.identity()
		.rotateX(cube.angleX)
		.rotateY(cube.angleY)
		.scale(new Vector3(cube.scale, cube.scale, cube.scale));
	}
}

export const water = {
	updateFrame: true,
	render: document.querySelector("#renderWaterInput") as HTMLInputElement,
}

export function update(elapsed: Duration) {
	// rotate cube
	if (cube.rotate.checked) {
		cube.angleX += cube.rotateX * elapsed.seconds;
		cube.angleY += cube.rotateY * elapsed.seconds;
		cube.update();
	}
	
	// water
	if (water.updateFrame) scene.water.frame = performance.now();
	scene.water.render = water.render.checked;

	// render scene
	scene.renderFrame();
}


cube.update();
camera.update();
camera.angleX.addEventListener("input",camera.update);
camera.angleY.addEventListener("input",camera.update);
camera.distance.addEventListener("input",camera.update);

export const downloadImageSettings = {
	name: "ascii3d-water.png",
	format: "image/png",
	quality: undefined
};

export function downloadCanvasAsImage(settings = downloadImageSettings) {
	const anchor = document.createElement("a");
	anchor.href = scene.canvas.toDataURL(settings.format, settings.quality);
	anchor.download = settings.name;
	anchor.click();
}

export const shareData = {
	title: document.title,
	text: (document.head.querySelector(`meta[name="description"]`) as HTMLMetaElement)?.content || document.title,
	url: location.href,
}

export async function share(data: ShareData = shareData) {
	try {
		await navigator.share(data);
		return true;
	} catch(e) {
		console.error(e);
		alert(`Failed to share.`);
		return false;
	}
}