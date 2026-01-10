/**
 * Type guard to check if value is an object (and not null/array)
 * @param value - Value to check
 * @returns True if value is a plain object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}
