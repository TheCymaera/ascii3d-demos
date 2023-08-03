import { RenderBuffer } from "ascii3d";
import * as rgbShader from "../shared/shaders/rgba-2d.js";

// config
const width = 50, height = 50, fontSize = 32, letterSpacing = fontSize * 0.8;

// prepare canvas
const myCanvas = document.querySelector("canvas")!;
myCanvas.width = width*letterSpacing;
myCanvas.height = height*letterSpacing;

// prepare rendering context
const ctx = myCanvas.getContext("2d")!;
ctx.font = `${fontSize}px monospace`;

const vertices: rgbShader.RGBAVertex[] = [
	[0.0, 0.5, 1.0, 1.0, 0.0, "A".charCodeAt(0)],
	[-.5, -.5, 0.7, 0.0, 1.0, "G".charCodeAt(0)],
	[0.5, -.5, 0.1, 1.0, 0.6, "Y".charCodeAt(0)]
]
const indices = [0,1,2];

const renderBuffer = new RenderBuffer(width,height);
renderBuffer.drawTriangles(vertices, indices, rgbShader.vertex, rgbShader.pixel);

renderBuffer.renderToCanvas(
	ctx, 			// CanvasRenderingContext2D
	letterSpacing, 	// letter spacing
	0, 0 			// optional: start position (from bottom left)
);

console.log(`For debugging, see "renderBuffer"`)
window["renderBuffer"] = renderBuffer;