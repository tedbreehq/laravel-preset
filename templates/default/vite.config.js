import { defineConfig } from "laravel-vite";
import vue from "@vitejs/plugin-vue";

import legacy from '@vitejs/plugin-legacy';

export default defineConfig()
	.withPlugin(vue)
	.withPlugin(
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	);