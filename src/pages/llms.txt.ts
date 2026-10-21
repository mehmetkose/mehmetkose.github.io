// /llms.txt: a plain Markdown map of the site for AI tools (https://llmstxt.org/).
// Built from the same data as the pages, so new posts and projects appear on their own.
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { APIRoute } from 'astro';
import { AUTHOR, FUPIO_URL, GITHUB_URL, PROJECTS, SITE_DESCRIPTION, SITE_TITLE, X_URL } from '../consts';
import { formatDate } from '../lib/format';
import { getPosts } from '../lib/posts';

const link = (title: string, url: string, notes?: string) =>
	`- [${title}](${url})${notes ? `: ${notes}` : ''}`;
const section = (heading: string, items: string[]) => (items.length ? [`## ${heading}`, '', ...items, ''] : []);

// Downloadable copies of a post's code blocks, kept in public/blog/<slug>/.
async function postFiles(slug: string) {
	try {
		const names = await readdir(join(process.cwd(), 'public/blog', slug));
		return names.filter((name) => /\.(md|txt)$/.test(name)).sort();
	} catch {
		return [];
	}
}

export const GET: APIRoute = async ({ site, url }) => {
	const abs = (path: string) => new URL(path, site ?? url).href;
	const posts = await getPosts();

	const projects = PROJECTS.flatMap((project) => [
		link(project.name, abs(project.url), project.description),
		...('llmsTxt' in project && project.llmsTxt
			? [link(`${project.name} llms.txt`, abs(project.llmsTxt), `Index of the ${project.name} documentation for AI tools.`)]
			: []),
	]);

	const postLinks = posts.map((post) =>
		link(post.data.title, abs(`/blog/${post.id}/`), `${formatDate(post.data.pubDate)}. ${post.data.description}`),
	);

	const files = (
		await Promise.all(
			posts.map(async (post) =>
				(await postFiles(post.id)).map((name) =>
					link(
						name,
						abs(`/blog/${post.id}/${name}`),
						`From "${post.data.title}". Fetch this file instead of copying the code from the rendered post.`,
					),
				),
			),
		)
	).flat();

	const text = [
		`# ${SITE_TITLE}`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		`Personal site of ${AUTHOR.name}, a ${AUTHOR.jobTitle.toLowerCase()} in ${AUTHOR.location}. Posts are listed newest first. Each project is a separate site on this domain with its own documentation.`,
		'',
		...section('Projects', projects),
		...section('Blog posts', postLinks),
		...section('Post files', files),
		...section('Optional', [
			link('GitHub', GITHUB_URL, 'Open-source code.'),
			link('X', X_URL),
			link('Fupio', FUPIO_URL),
			link('RSS feed', abs('/rss.xml'), 'All posts.'),
		]),
	].join('\n');

	return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
