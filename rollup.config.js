import typescript from "@rollup/plugin-typescript";
import node from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const route = (input, output)=>({
	input,
	output: {
		sourcemap: true,
		format: "es",
		file: output
	},
	plugins: [
		node(),
		typescript(),
		terser(),
	]
})

export default [
	route('src/rainbowTriangle/main.ts', "public/rainbow-triangle/dst/main.js"),
	route('src/rotatingCube/main.ts', "public/rotating-cube/dst/main.js"),
	route('src/water/main.ts', "public/water/dst/main.js"),
]