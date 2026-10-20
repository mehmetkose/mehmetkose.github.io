// Builds the favicons and apple-touch-icon at build time from one source
// image, so replacing src/assets/avatar.png updates every icon.

import { join } from 'node:path';
import sharp from 'sharp';

const SOURCE = join(process.cwd(), 'src/assets/avatar.png');

export function renderIcon(size: number) {
	return sharp(SOURCE).resize(size, size).png().toBuffer();
}

/** A .ico file holding one PNG per size (supported by all current browsers). */
export async function renderIco(sizes: number[]) {
	const pngs = await Promise.all(sizes.map(renderIcon));
	const header = Buffer.alloc(6 + 16 * sizes.length);
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(sizes.length, 4);
	let offset = header.length;
	sizes.forEach((size, i) => {
		const entry = 6 + 16 * i;
		header.writeUInt8(size >= 256 ? 0 : size, entry); // width; 0 means 256
		header.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
		header.writeUInt16LE(1, entry + 4); // colour planes
		header.writeUInt16LE(32, entry + 6); // bits per pixel
		header.writeUInt32LE(pngs[i].length, entry + 8);
		header.writeUInt32LE(offset, entry + 12);
		offset += pngs[i].length;
	});
	return Buffer.concat([header, ...pngs]);
}
