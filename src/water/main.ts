import * as scene from "./scene.js";
import * as ui from "./ui.js";
import * as keyboard from "./keyboard.js";
import * as ascii3d from "ascii3d";
import { AnimationFrameScheduler } from "open-utilities/web/ui/mod.js";

console.log(`For debugging, see "window.app".`);
window["app"] = { scene, ui, keyboard, ascii3d };

AnimationFrameScheduler.periodic(elapsed => {
	keyboard.update(elapsed);
	ui.update(elapsed);
})