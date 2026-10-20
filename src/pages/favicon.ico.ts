// Classic favicon, also fetched directly by feed readers and other tools.
import type { APIRoute } from 'astro';
import { renderIco } from '../lib/icons';

export const GET: APIRoute = async () => {
	const ico = await renderIco([16, 32, 48]);
	return new Response(new Uint8Array(ico), { headers: { 'Content-Type': 'image/x-icon' } });
};
