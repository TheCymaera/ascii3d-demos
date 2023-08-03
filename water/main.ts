import infoHTML from "./info.html?raw";
import sidebarHTML from "./sidebar.html?raw";

document.querySelector("#INFO_CONTAINER")!.innerHTML = infoHTML;
document.querySelector("#SIDEBAR_CONTAINER")!.innerHTML = sidebarHTML;


import * as scene from "./scene.js";
import { KeyboardController } from "./keyboard.js";
import * as ascii3d from "ascii3d";
import { AnimationFrameScheduler } from "open-utilities/web/ui/mod.js";
import { CameraController, CubeController, WaterController } from "./ui.js";

console.log(`For debugging, see "window.app".`);

const cubeController = new CubeController(scene.cubeModelMatrix);
const cameraController = new CameraController(scene.playerCamera);
const waterController = new WaterController(scene.water);
const keyboard = new KeyboardController(cubeController, cameraController);

window["app"] = { scene, cubeController, cameraController, keyboard, ascii3d };

AnimationFrameScheduler.periodic(elapsed => {
	keyboard.update(elapsed);
	cubeController.update(elapsed);
	cameraController.update(elapsed);
	waterController.update(elapsed);

	scene.renderFrame();
});