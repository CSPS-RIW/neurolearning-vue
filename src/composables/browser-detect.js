// Detect Browser
export const browserInfo = (() => {
	const {userAgent} = navigator;
	let match =
		userAgent.match(
			/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
		) || [];
	let temp;
	if (/trident/i.test(match[1])) {
		temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
		return `IE ${temp[1] || ''}`;
	}
	if (match[1] === 'Chrome') {
		temp = userAgent.match(/\b(OPR|edge)\/(\d+)/);
		if (temp !== null) {
			return temp.slice(1).join(' ').replace('OPR', 'Opera');
		}
		temp = userAgent.match(/\b(edg)\/(\d+)/);
		if (temp !== null) {
			return temp.slice(1).join(' ').replace('edg', 'edge (Chromium)');
		}
	}
	match = match[2] && [match[1], match[2]];
	temp = userAgent.match(/version\/(\d+)/i);
	if (temp !== null) {
		match.splice(1, 1, temp[1]);
	}
	return {browser: match[0], version: match[1]};
})();
