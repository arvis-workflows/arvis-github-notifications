const arvish = require('arvish');

// Script to run on changing input
(async () => {
	const flags = arvish.input.split(' ');
	const all = flags.includes('a')
	const participating = flags.includes('p')
	const apiLink = `https://api.github.com/notifications?access_token=${process.env.access_token}${all ? '&all=1' : ''}${participating ? '&participating=1' : ''}`
	const data = await arvish.fetch(apiLink)
	const items = data.map(event => {
		const targetUrl = event.subject.url ? event.subject.url.split('/').splice(4).join('/') : undefined;

		return {
			title: `${event.subject.title}`,
			subtitle: targetUrl ? `${event.reason} - ${targetUrl}` : undefined,
			arg: targetUrl ? `https://github.com/${targetUrl}` : 'https://github.com/notifications',
		}
	});

	// Throw the final list of items
	const blankItem = [{
		title: 'No notifications found',
		subtitle: 'Click/Enter to goto your notifications',
		arg: 'https://github.com/notifications',
	}]
	arvish.output(items.length ? items : blankItem)
})();
