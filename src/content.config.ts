import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Every Markdown file in src/content/blog/ becomes /blog/<file-name>/
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Drafts show up in `npm run dev` but are left out of the built site.
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
