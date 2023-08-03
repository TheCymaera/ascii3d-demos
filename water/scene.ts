import { RenderBuffer } from "ascii3d";
import { Camera, type WaterOptions } from "./utilities.js";
import * as rgbaShader from "../shared/shaders/rgba.js";
import * as waterShader from "../shared/shaders/water.js";
import * as cubeModel from "../shared/models/cube.js";
import * as waterModel from "../shared/models/water.js";
import { Matrix4, Vector3 } from "open-utilities/core/maths/mod.js";

export const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;

export const renderBuffer = new RenderBuffer;
export const reflectionTexture = new RenderBuffer;

export const playerCamera = new Camera(Math.PI/4);
export const reflectionCamera = new Camera(Math.PI/2);
reflectionCamera.lookAt(
	new Vector3(0,-5,0),	// camera position (at water surface)
	new Vector3(0,0,0),		// cube position
	new Vector3(0,0,-1),	// up vector
)
export const cubeModelMatrix = Matrix4.identity();

export const water: WaterOptions = {
	frame: 0,
	render: true,
}

export const renderSettings = {
	width: 50, 
	height: 50, 
	resolution: 16, 
	fontSize: 1,
	update() {
		canvas.width = this.width * this.resolution;
		canvas.height = this.height * this.resolution;
		ctx.font = `${this.resolution * this.fontSize}px monospace`;
	
		renderBuffer.resize(this.width, this.height);
		reflectionTexture.resize(this.width, this.height);
	}
}
renderSettings.update();

export function renderFrame() {
	renderBuffer.clear();

	if (water.render) {
		reflectionTexture.clear();

		// draw cube to reflection texture using the reflection camera
		rgbaShader.uniforms.transform = reflectionCamera.getTransform(cubeModelMatrix);
		reflectionTexture.drawTriangles(
			cubeModel.vertices,
			cubeModel.indices,
			rgbaShader.vertex,
			rgbaShader.pixel,
		);


		// draw water to render buffer using reflection texture
		waterShader.uniforms.transform = playerCamera.getTransform();
		waterShader.uniforms.reflectionTexture = reflectionTexture;
		waterShader.uniforms.distortionFrame = water.frame;
		renderBuffer.drawTriangles(
			waterModel.vertices,
			waterModel.indices,
			waterShader.vertex,
			waterShader.pixel,
		);
	}

	// draw cube
	rgbaShader.uniforms.transform = playerCamera.getTransform(cubeModelMatrix);
	renderBuffer.drawTriangles(
		cubeModel.vertices,
		cubeModel.indices,
		rgbaShader.vertex,
		rgbaShader.pixel,
	);

	// use canvas to display render buffer
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	renderBuffer.renderToCanvas(ctx, renderSettings.resolution);
}