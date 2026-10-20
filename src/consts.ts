// Site-wide settings. Import these from anywhere in the site.

export const SITE_TITLE = 'Mehmet Kose';
export const SITE_TAGLINE = 'Software developer in Dublin, Ireland';
export const SITE_DESCRIPTION =
	'Software developer based in Dublin, Ireland. Blog posts and open-source projects, including react-websocket.';
export const SITE_LANG = 'en';
export const SITE_LOCALE = 'en_IE';

export const GITHUB_URL = 'https://github.com/mehmetkose';
export const X_URL = 'https://x.com/mehmetkose';
export const X_HANDLE = '@mehmetkose';

// Used for structured data (rich results) and the visible byline.
export const AUTHOR = {
	name: SITE_TITLE,
	jobTitle: 'Software Developer',
	location: 'Dublin, Ireland',
	// Profiles that belong to you. Google uses these to connect them to this site.
	sameAs: [GITHUB_URL, X_URL],
};

// Google Search Console → Add property → URL prefix → https://mehmetkose.github.io/
// → "HTML tag" method. Paste only the value of `content="..."` here, deploy,
// then click Verify. Leave empty to skip the tag.
export const GOOGLE_SITE_VERIFICATION = 'C_3KdlQ3Tgqhf2pte8wWptCNjsT_nLo50GPIMcgM-hc';

// Shown on the home page. Add more entries as you publish them.
export const PROJECTS = [
	{
		name: 'react-websocket',
		url: '/react-websocket/',
		description:
			'WebSocket hook and real-time toolkit for React: shared connections, auto-reconnect, a send queue and typed messages. Zero dependencies.',
	},
];
