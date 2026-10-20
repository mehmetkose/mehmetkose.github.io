// Structured data (JSON-LD) for Google rich results.
// Every page gets the WebSite + Person nodes; pages add their own nodes on top.
// Nodes point at each other with `@id` so Google sees one connected graph.

import { AUTHOR, SITE_DESCRIPTION, SITE_LANG, SITE_TITLE } from '../consts';

type Node = Record<string, unknown>;

export function ids(site: URL) {
	return {
		website: new URL('/#website', site).href,
		person: new URL('/#person', site).href,
		blog: new URL('/blog/#blog', site).href,
	};
}

export function personRef(site: URL): Node {
	return { '@type': 'Person', '@id': ids(site).person, name: AUTHOR.name, url: site.href };
}

export function baseGraph(site: URL): Node[] {
	const id = ids(site);
	return [
		{
			'@type': 'WebSite',
			'@id': id.website,
			url: site.href,
			name: SITE_TITLE,
			description: SITE_DESCRIPTION,
			inLanguage: SITE_LANG,
			publisher: { '@id': id.person },
		},
		{
			'@type': 'Person',
			'@id': id.person,
			name: AUTHOR.name,
			url: site.href,
			jobTitle: AUTHOR.jobTitle,
			homeLocation: { '@type': 'Place', name: AUTHOR.location },
			sameAs: AUTHOR.sameAs,
		},
	];
}

export function breadcrumbs(site: URL, items: { name: string; path: string }[]): Node {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: new URL(item.path, site).href,
		})),
	};
}

/** Serialize for a <script type="application/ld+json"> tag. */
export function toJsonLd(nodes: Node[]): string {
	// Escape `<` so content can never close the script tag early.
	return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
