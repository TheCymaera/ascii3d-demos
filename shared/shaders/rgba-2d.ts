import { type PixelShader, PixelData, type VertexShader, VertexData, type ClipspacePosition } from "ascii3d";

export type RGBAVertex = [number, number, number, number, number, number];
export type RGBAFragment = [number, number, number, number];

export const vertex: VertexShader = (vertex)=>{
	if (vertex.length !== 6) throw new Error("RGBAVertex shader expects exactly 6 elements");
	const [x, y, r, g, b, charCode] = vertex as RGBAVertex;
	const position = [x, y, 0, 1] as ClipspacePosition;
	const pixel = [charCode, r, g, b] as RGBAFragment;
	return new VertexData(position, pixel);
}

export const pixel: PixelShader = (pixel)=>{
	const [charCode, r, g, b] = pixel as RGBAFragment;
	return new PixelData(charCode, r, g, b, 1);
}