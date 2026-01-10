/**
 * Checks if a value is valid JSON
 * @param item - Value to check
 * @returns True if value is valid JSON
 */
export function isJson(item: unknown): boolean {
	if (typeof item === 'string') {
		try {
			const parsed = JSON.parse(item);
			return typeof parsed === 'object' && parsed !== null;
		} catch {
			return false;
		}
	}

	try {
		JSON.stringify(item);
		return typeof item === 'object' && item !== null;
	} catch {
		return false;
	}
}
