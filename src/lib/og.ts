// Builds PNG images at build time: social preview cards (1200×630) and the
// apple-touch-icon. Satori turns text into vector paths, so the output looks
// the same on every machine; sharp converts the SVG to PNG.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): El => ({
	type,
	props: { style, children },
});

const fontDir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
function loadFonts() {
	fonts ??= Promise.all([
		readFile(join(fontDir, 'inter-latin-400-normal.woff')),
		readFile(join(fontDir, 'inter-latin-700-normal.woff')),
	]).then(([regular, bold]) => [
		{ name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
		{ name: 'Inter', data: bold, weight: 700 as const, style: 'normal' as const },
	]);
	return fonts;
}

async function toPng(node: El, width: number, height: number) {
	const svg = await satori(node as never, { width, height, fonts: await loadFonts() });
	return sharp(Buffer.from(svg)).png().toBuffer();
}

const COLORS = { bg: '#111214', text: '#f2f2f2', muted: '#a0a4a8', accent: '#8ab4f8' };

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({ title, eyebrow, footer }: { title: string; eyebrow?: string; footer: string }) {
	const titleSize = title.length > 60 ? 56 : title.length > 30 ? 68 : 84;
	const content = h(
		'div',
		// Padding goes on an inner box: Satori adds padding on top of a 100% size,
		// which would push the bottom row off the image.
		{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px' },
		[
			h('div', { display: 'flex', fontSize: 30, color: COLORS.accent }, eyebrow ?? ''),
			h('div', { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }, title),
			h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 28, color: COLORS.muted }, [
				h('div', { display: 'flex' }, footer),
				h('div', { display: 'flex' }, 'mehmetkose.github.io'),
			]),
		],
	);
	const card = h(
		'div',
		{ width: '100%', height: '100%', display: 'flex', background: COLORS.bg, color: COLORS.text, fontFamily: 'Inter' },
		[content],
	);
	return toPng(card, OG_SIZE.width, OG_SIZE.height);
}

export function renderIcon(size: number) {
	const icon = h(
		'div',
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#1a1a1a',
			color: '#ffffff',
			fontFamily: 'Inter',
			fontWeight: 700,
			fontSize: size * 0.46,
			letterSpacing: '-0.03em',
		},
		'mk',
	);
	return toPng(icon, size, size);
}
