/**
 * Strips matching braces from the beginning and end of a string
 * @param text - The text to strip braces from
 * @param bracesToStrip - Array of brace characters to strip
 * @returns Text with braces stripped
 */
export function stripAnyBraces(
	text: string,
	bracesToStrip: string[] = ['(', ')', '[', ']', '{', '}', '<', '>']
): string {
	let result = text;
	let changed = true;

	while (changed && result.length > 0) {
		changed = false;

		// Check first char
		if (bracesToStrip.includes(result[0])) {
			result = result.slice(1);
			changed = true;
		}

		// Check last char
		if (result.length > 0 && bracesToStrip.includes(result[result.length - 1])) {
			result = result.slice(0, -1);
			changed = true;
		}

		result = result.trim();
	}

	return result;
}
