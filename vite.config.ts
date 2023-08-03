import { defineConfig } from "vite";

export default defineConfig({
	base: "./",
	build: {
		modulePreload: {
			polyfill: false,
		},

		rollupOptions: {
			input: {
				"index": "index.html",
				"water": "water/index.html",
				"rotating-cube": "rotating-cube/index.html",
				"rainbow-triangle": "rainbow-triangle/index.html",
			}
		}
	},
});