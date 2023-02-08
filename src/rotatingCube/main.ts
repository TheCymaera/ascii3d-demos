import { RenderBuffer } from "ascii3d";
import * as cube from "../models/cube.js";
import * as rgbaShader from "../shaders/rgba.js";
import { Matrix4, Vector3 } from "open-utilities/core/maths/mod.js";
import { AnimationFrameScheduler } from "open-utilities/web/ui/mod.js";

// canvas dimensions (in letters), font size, and letter spacing
const width = 50, height = 50, fontSize = 32, letterSpacing = fontSize * 0.8;

// prepare canvas
const myCanvas = document.querySelector("canvas")!;
myCanvas.width = width*letterSpacing;
myCanvas.height = height*letterSpacing;

// prepare rendering context
const ctx = myCanvas.getContext("2d")!;
ctx.font = `${fontSize}px monospace`;

// create render buffer
const renderBuffer = new RenderBuffer(width,height);

// Create matrices: model * view * projection = transformation
const model = Matrix4.identity();
const view = Matrix4.identity().lookAt(new Vector3(0, 0, -8), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
const projection = Matrix4.identity().perspective(Math.PI/4, 1, 0.1, 1000.0);

AnimationFrameScheduler.periodic((elapsed) => {
	const angleChange = elapsed.seconds / 6 * 2 * Math.PI;
	
	// rotate model matrix
	model.rotateY(angleChange).rotateX(angleChange/4);
	
	// transformation = model * view * projection
	rgbaShader.uniforms.transform.copy(model).multiply(view).multiply(projection);
	
	// clear buffer
	renderBuffer.clear();

	// draw triangles to buffer
	renderBuffer.drawTriangles(cube.vertices, cube.indices, rgbaShader.vertex, rgbaShader.pixel, true);

	// render the buffer to an HTML canvas
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	renderBuffer.renderToCanvas(
		ctx, 			// CanvasRenderingContext2D
		letterSpacing, 	// letter spacing
		0, 0 			// optional: start position (from bottom left)
	);
});

console.log(`For debugging, see "renderBuffer"`)
window["renderBuffer"] = renderBuffer;