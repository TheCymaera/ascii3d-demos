import { Matrix4, Vector3 } from "open-utilities/core/maths/mod.js";
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
import type { Camera, WaterOptions } from "./utilities.js";

const degreesToRadians = (degrees: number) => degrees * Math.PI / 180;
const radiansToDegrees = (radians: number) => radians * 180 / Math.PI;


export class CameraController {
	#angleXInput = document.querySelector("#cameraAngleXInput") as HTMLInputElement;
	#angleYInput = document.querySelector("#cameraAngleYInput") as HTMLInputElement;
	#distanceInput = document.querySelector("#cameraDistanceInput") as HTMLInputElement;

	constructor(public camera: Camera) {
		if (!this.#angleXInput) throw new Error(`Failed to initialize Camera as input does not exist.`);

		this.#angleXInput.addEventListener("input", ()=>this.change());
		this.#angleYInput.addEventListener("input", ()=>this.change());
		this.#distanceInput.addEventListener("input", ()=>this.change());

		this.change();
	}

	update(_elapsed: Duration) {
		// do nothing
	}

	change() {
		this.camera.lookAround(
			new Vector3(0,0,0), // target (center of cube)
			this.distance,      // distance to cube
			this.angleX,        // angle X of camera
			this.angleY,        // angle Y of camera
			new Vector3(0,1,0)  // up-vector
		);
	}

	get angleX() {
		return degreesToRadians(this.#angleXInput.valueAsNumber);
	}

	set angleX(value: number) {
		this.#angleXInput.valueAsNumber = radiansToDegrees(value);
	}

	get angleY() {
		return degreesToRadians(this.#angleYInput.valueAsNumber);
	}

	set angleY(value: number) {
		this.#angleYInput.valueAsNumber = radiansToDegrees(value);
	}

	get distance() {
		return this.#distanceInput.valueAsNumber;
	}

	set distance(value: number) {
		this.#distanceInput.valueAsNumber = value;
	}
}

export class CubeController {
	#rotateInput = document.querySelector("#rotateCubeInput") as HTMLInputElement;
	angleX = 0;
	angleY = 0;
	rotateX = 1;
	rotateY = 2;
	scale = 1;

	constructor(public cubeMatrix: Matrix4) {
		
	}

	get rotate() {
		return this.#rotateInput.checked;
	}

	set rotate(value: boolean) {
		this.#rotateInput.checked = value;
	}

	update(elapsed: Duration) {
		if (!this.rotate) return;

		this.angleX += this.rotateX * elapsed.seconds;
		this.angleY += this.rotateY * elapsed.seconds;

		this.change();
	}

	change() {
		this.cubeMatrix
		.identity()
		.rotateX(this.angleX)
		.rotateY(this.angleY)
		.scale(new Vector3(this.scale, this.scale, this.scale));
	}
}

export class WaterController {
	#renderInput = document.querySelector("#renderWaterInput") as HTMLInputElement;
	#animateInput = document.querySelector("#animateWaterInput") as HTMLInputElement;
	constructor(public waterOptions: WaterOptions) {
		if (!this.#renderInput) throw new Error(`Failed to initialize Water as input does not exist.`);
	}

	update(_elapsed: Duration) {
		if (this.animate) this.waterOptions.frame = performance.now();
		this.waterOptions.render = this.render;
	}

	get render() {
		return this.#renderInput.checked;
	}

	set render(value: boolean) {
		this.#renderInput.checked = value;
	}

	get animate() {
		return this.#animateInput.checked;
	}

	set animate(value: boolean) {
		this.#animateInput.checked = value;
	}
}