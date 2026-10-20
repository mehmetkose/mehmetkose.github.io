// Larger favicon for high-density screens and search results.
import type { APIRoute } from 'astro';
import { renderIcon } from '../lib/icons';

export const GET: APIRoute = async () => {
	const png = await renderIcon(192);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
