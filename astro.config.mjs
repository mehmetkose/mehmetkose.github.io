// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// This is a GitHub Pages *user* site, served from the domain root,
	// so no `base` is needed. Project repos (like react-websocket and lokal) live
	// at /<repo-name>/ and are deployed separately.
	site: 'https://mehmetkose.github.io',
	trailingSlash: 'always',
	// The post was renamed on 2026-10-20; keep old links working.
	redirects: {
		'/blog/plans-folder-for-claude-code/': '/blog/planner-for-claude-code/',
	},
	integrations: [sitemap()],
});
