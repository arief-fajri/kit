/**
 * Converts snake_case string to Title Case readable format
 * @param str - The snake_case string to format
 * @returns The formatted string in Title Case
 * @example
 * fromSnakeCase('user_name') // returns 'User Name'
 */
export function fromSnakeCase(str: string = ''): string {
	if (!str || typeof str !== 'string') {
		return '';
	}

	return str
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}
