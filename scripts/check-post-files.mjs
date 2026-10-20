// Text files in public/blog/<slug>/ are downloadable copies of code blocks shown
// in src/content/blog/<slug>.md. Fail when a file and its post drift apart.
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';

const publicBlog = new URL('../public/blog/', import.meta.url);
const posts = new URL('../src/content/blog/', import.meta.url);
const textFile = /\.(md|txt)$/;

const errors = [];
const slugs = existsSync(publicBlog) ? await readdir(publicBlog, { withFileTypes: true }) : [];

for (const entry of slugs) {
	if (!entry.isDirectory()) continue;
	const slug = entry.name;
	const postUrl = new URL(`${slug}.md`, posts);
	if (!existsSync(postUrl)) {
		errors.push(`public/blog/${slug}/ has no post at src/content/blog/${slug}.md`);
		continue;
	}
	const post = await readFile(postUrl, 'utf8');
	for (const name of await readdir(new URL(`${slug}/`, publicBlog))) {
		if (!textFile.test(name)) continue;
		const file = await readFile(new URL(`${slug}/${name}`, publicBlog), 'utf8');
		if (!post.includes(file)) {
			errors.push(`public/blog/${slug}/${name} differs from its copy in src/content/blog/${slug}.md`);
		}
	}
}

if (errors.length) {
	for (const error of errors) console.error(error);
	process.exit(1);
}
console.log(`Post files match their posts (${slugs.filter((e) => e.isDirectory()).length} checked).`);
