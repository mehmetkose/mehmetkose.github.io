// Social preview images, generated at build time:
//   /og/home.png, /og/blog.png, /og/blog/<post-id>.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE_TAGLINE, SITE_TITLE } from '../../consts';
import { formatDate } from '../../lib/format';
import { renderOgImage } from '../../lib/og';
import { getPosts } from '../../lib/posts';

export const getStaticPaths = (async () => {
	const posts = await getPosts();
	return [
		{ params: { route: 'home' }, props: { eyebrow: 'Personal site', title: SITE_TITLE, footer: SITE_TAGLINE } },
		{ params: { route: 'blog' }, props: { eyebrow: SITE_TITLE, title: 'Blog', footer: SITE_TAGLINE } },
		...posts.map((post) => ({
			params: { route: `blog/${post.id}` },
			props: { eyebrow: `${SITE_TITLE} · Blog`, title: post.data.title, footer: formatDate(post.data.pubDate) },
		})),
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage(props as Parameters<typeof renderOgImage>[0]);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
