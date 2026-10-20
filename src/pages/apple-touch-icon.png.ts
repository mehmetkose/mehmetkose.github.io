// Home-screen icon for iOS/iPadOS, generated at build time.
import type { APIRoute } from 'astro';
import { renderIcon } from '../lib/icons';

export const GET: APIRoute = async () => {
	const png = await renderIcon(180);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
