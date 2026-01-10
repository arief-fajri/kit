/**
 * Parses a value as JSON if it's a JSON string, otherwise returns the value
 * @param value - Value to parse
 * @returns Parsed JSON or original value
 */
export function parseIfJSON(value: unknown): unknown {
	if (typeof value !== 'string') return value;

	const trimmed = value.trim();
	const firstChar = trimmed[0];

	if (firstChar !== '[' && firstChar !== '{' && firstChar !== '"') {
		return value;
	}

	try {
		return JSON.parse(trimmed);
	} catch {
		return value; // Not valid JSON, return as-is
	}
}
