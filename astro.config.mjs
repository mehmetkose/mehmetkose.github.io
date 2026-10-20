// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// This is a GitHub Pages *user* site, served from the domain root,
	// so no `base` is needed. Project repos (like react-websocket) live
	// at /<repo-name>/ and are deployed separately.
	site: 'https://mehmetkose.github.io',
	trailingSlash: 'always',
	integrations: [sitemap()],
});
