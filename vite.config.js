// Plugins
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// Vite
import { defineConfig } from "vite";

// Nodejs
import path from "path";

export default defineConfig({
	base: "/",
	plugins: [react(), pluginRewriteAll()],
	build: {
		outDir: "build",
		assetsDir: "Assets",
	},
	resolve: {
		alias: [
			{
				find: "@Api",
				replacement: path.resolve(__dirname, "./src/Api"),
			},
			{
				find: "@Assets",
				replacement: path.resolve(__dirname, "./src/Assets"),
			},
			{
				find: "@Components",
				replacement: path.resolve(__dirname, "./src/Components"),
			},
			{
				find: "@Features",
				replacement: path.resolve(__dirname, "./src/Features"),
			},
			{
				find: "@Hooks",
				replacement: path.resolve(__dirname, "./src/Hooks"),
			},
			{
				find: "@Modals",
				replacement: path.resolve(__dirname, "./src/Modals"),
			},
			{
				find: "@Redux",
				replacement: path.resolve(__dirname, "./src/Redux"),
			},
			{
				find: "@Actions",
				replacement: path.resolve(__dirname, "./src/Redux/Actions"),
			},
			{
				find: "@Styles",
				replacement: path.resolve(__dirname, "./src/Styles"),
			},
			{
				find: "@Utils",
				replacement: path.resolve(__dirname, "./src/Utils"),
			},
		],
	},
});
