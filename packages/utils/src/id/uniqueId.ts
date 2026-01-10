/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function uniqueId(prefix: string = ''): string {
	return `${prefix}${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36)}`;
}
