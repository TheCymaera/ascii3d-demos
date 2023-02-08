import { VertexShader, ClipspacePosition, VertexData, PixelShader, PixelData } from "ascii3d";
import { Matrix4, Vector4 } from "open-utilities/core/maths/mod.js";

export interface Uniforms {
	transform: Matrix4,
}

export const uniforms: Uniforms = {
	transform: Matrix4.identity(),
};

export type RGBAVertex = [number, number, number, number, number, number, number];
export type RGBAFragment = [number, number, number, number];

export const vertex: VertexShader = (vertex)=> {
	if (vertex.length !== 7) throw new Error("RGBAVertex shader expects exactly 7 elements");

	const [x, y, z, r, g, b, charCode] = vertex as RGBAVertex;
	
	const position = new Vector4(x,y,z,1).transformMatrix4(uniforms.transform);
	return new VertexData(position.toArray(), [charCode, r, g, b]);
}

export const pixel: PixelShader = (pixel)=> {
	const [charCode, r, g, b] = pixel as RGBAFragment;
	return new PixelData(charCode, r, g, b, 1);
}