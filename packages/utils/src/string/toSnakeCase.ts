/**
 * Converts a string to snake_case format
 * @param input - The string to convert
 * @returns The snake_case string
 */
export function toSnakeCase(input: string = ''): string {
	return (
		input
			.trim()
			// Convert camelCase / PascalCase → snake_case
			.replace(/([a-z0-9])([A-Z])/g, '$1_$2')
			// Replace spaces & symbols → underscore
			.replace(/[\s\-]+/g, '_')
			// Remove non-alphanumeric characters except underscore
			.replace(/[^a-zA-Z0-9_]/g, '')
			// Convert to lowercase
			.toLowerCase()
	);
}
