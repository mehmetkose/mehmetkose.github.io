export function formatDate(date: Date) {
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		// Frontmatter dates are parsed as UTC; keep them from shifting a day.
		timeZone: 'UTC',
	});
}
