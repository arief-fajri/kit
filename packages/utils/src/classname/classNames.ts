/**
 * Combine class names conditionally
 * @param classes - Class names (strings, objects, arrays, or undefined/null)
 * @returns Combined class string
 */
export function classNames(
	...classes: (
		| string
		| undefined
		| null
		| Record<string, boolean>
		| (string | undefined | null)[]
	)[]
): string {
	const result: string[] = [];

	for (const cls of classes) {
		if (!cls) continue;

		if (typeof cls === 'string') {
			result.push(cls);
		} else if (Array.isArray(cls)) {
			const filtered = cls.filter(Boolean);
			if (filtered.length > 0) {
				result.push(filtered.join(' '));
			}
		} else if (typeof cls === 'object') {
			for (const [key, value] of Object.entries(cls)) {
				if (value) {
					result.push(key);
				}
			}
		}
	}

	return result.join(' ').trim();
}

/**
 * Alias for classNames
 */
export const cn = classNames;
