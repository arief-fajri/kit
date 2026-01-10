/**
 * Pick properties from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only picked keys
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
	obj: T,
	keys: K[]
): Pick<T, K> {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}
	return result;
}
