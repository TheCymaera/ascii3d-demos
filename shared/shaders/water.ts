import { PixelData, type PixelShader, RenderBuffer, VertexData, type VertexShader } from "ascii3d";
import { Matrix4, Vector4 } from "open-utilities/core/maths/mod.js";

export interface Uniforms {
	transform: Matrix4,
	reflectionTexture: RenderBuffer,
	distortionFrame: number,
	distortionMagnitude: number,
	distortionRate: number,
	distortionPeriods: number,
	baseColor: [number, number, number, number],
	reflectionChar: number,
	reflectionOpacity: number,
	waterChar: number,
	radius: number,
}


export const uniforms: Uniforms = {
	transform: Matrix4.identity(),
	reflectionTexture: new RenderBuffer(1, 1),
	distortionFrame: 0,
	distortionMagnitude: 0.03,
	distortionRate: 2,
	distortionPeriods: 100,
	baseColor: [204/255,219/255,233/255,1],
	reflectionOpacity: 0.7,
	reflectionChar: "+".charCodeAt(0),
	waterChar: "w".charCodeAt(0),
	radius: 1,
};

export type WaterVertex = [number, number, number, number, number];


export const vertex: VertexShader = (vertex)=> {
	if (vertex.length !== 5) throw new Error("WaterVertex shader expects exactly 5 elements");
	const [x, y, z, u, v] = vertex as WaterVertex;

	const position = new Vector4(x,y,z,1).transformMatrix4(uniforms.transform);
	return new VertexData(position.toArray(), [u, v]);
}

export const pixel: PixelShader = (pixel) => {
	const [u, v] = pixel as [number, number];

	// if ((u - .5)**2 + (v - .5)**2 > (uniforms.radius/2)**2) return new PixelData(0, 0, 0, 0, 0);

	// add variation to U for distortion effect
	const uVariation = 
		uniforms.distortionMagnitude * 
		Math.sin(uniforms.distortionRate * uniforms.distortionFrame/1000) * 
		Math.sin(v * uniforms.distortionPeriods);
	
	// sample from reflection texture
	const reflection = uniforms.reflectionTexture!.sample2D(1-(u+uVariation), 1-v).pixel;

	// add tint to sample
	const fragColor = reflection.a ? [
		(uniforms.baseColor[0] * (1 - uniforms.reflectionOpacity) + reflection.r * uniforms.reflectionOpacity),
		(uniforms.baseColor[1] * (1 - uniforms.reflectionOpacity) + reflection.g * uniforms.reflectionOpacity),
		(uniforms.baseColor[2] * (1 - uniforms.reflectionOpacity) + reflection.b * uniforms.reflectionOpacity),
		1,
	] as const : uniforms.baseColor;

	// select character
	const char = reflection.charCode ? uniforms.reflectionChar : uniforms.waterChar;

	return new PixelData(char, fragColor[0], fragColor[1], fragColor[2], fragColor[3]);
}

