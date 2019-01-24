const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;

export default function kebabCase(str: string) {
	return str.replace(KEBAB_REGEX, function (match: string) {
		return '-' + match.toLowerCase();
	});
};

export const kebabReverse = function (str: string) {
	return str.replace(REVERSE_REGEX, function (match: string) {
		return match.slice(1).toUpperCase();
	});
};
