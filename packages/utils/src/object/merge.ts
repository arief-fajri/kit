import { isObject } from '../type-guards/isObject.js';

/**
 * Merge multiple objects deeply
 * @param objects - Objects to merge
 * @returns Merged object
 */
export function merge<T extends Record<string, unknown>>(...objects: T[]): T {
	const result: Record<string, unknown> = {};

	for (const obj of objects) {
		if (!isObject(obj)) continue;

		for (const [key, value] of Object.entries(obj)) {
			if (isObject(value) && isObject(result[key])) {
				result[key] = merge(result[key] as Record<string, unknown>, value);
			} else {
				result[key] = value;
			}
		}
	}

	return result as T;
}
