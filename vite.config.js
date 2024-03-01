import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base:"/S3-Scout-Interface",
	plugins: [sveltekit()]
});
