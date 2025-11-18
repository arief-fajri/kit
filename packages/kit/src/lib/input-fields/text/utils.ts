/**
 * Input masking and formatting utilities
 */

/**
 * Applies a mask pattern to a value
 * @param value - The input value to mask
 * @param separator - The separator character to insert
 * @param pattern - The pattern string (e.g., 'xxx-xxx-xxxx')
 * @returns The masked value
 */
export function applyMask(value: string, separator: string, pattern: string): string {
	const output: string[] = [];
	let pass = 0;

	for (let i = 0; i < value.length; i++) {
		if (i !== 0 && pattern[i + pass] !== 'x' && value[i] !== separator) {
			pass += 1;
			output.push(separator);
		}
		output.push(value[i]);
	}

	return output.join('');
}

/**
 * Removes all non-digit characters from a value
 * @param value - The value to unmask
 * @returns The unmasked value containing only digits
 */
export function removeMask(value: string): string {
	return value.replace(/[^\d]/g, '');
}

/**
 * Calculates the pattern length (number of 'x' characters)
 * @param pattern - The pattern string
 * @returns The number of allowed digits
 */
export function getPatternLength(pattern: string): number {
	const matches = pattern.match(/x/g);
	return matches ? matches.length : 0;
}

/**
 * Extracts separators from a pattern
 * @param pattern - The pattern string
 * @returns Array of separator characters
 */
export function getPatternSeparators(pattern: string): string[] {
	return pattern.split('').filter(char => char !== 'x');
}

/**
 * Formats a number value based on locale
 * @param value - The numeric value
 * @param locale - The locale string (default: 'en-US')
 * @param useFormatting - Whether to apply formatting
 * @returns The formatted number string
 */
export function formatNumber(value: number | string, locale: string = 'en-US', useFormatting: boolean = true): string {
	if (!useFormatting) return String(value);
	
	const numValue = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(numValue)) return '';
	
	return numValue.toLocaleString(locale);
}

/**
 * Sanitizes numeric input by removing non-numeric characters
 * @param value - The input value
 * @returns The sanitized numeric string
 */
export function sanitizeNumericInput(value: string): string {
	return value.replace(/[\D\s\_\-]+/g, '');
}

/**
 * Validates if a key should be allowed for numeric input
 * @param key - The pressed key
 * @param inputType - The input type
 * @returns Whether the key is valid
 */
export function isValidNumericKey(key: string, inputType: string): boolean {
	if (!['number', 'tel'].includes(inputType)) return true;
	return /^[0-9.-]+$/.test(key);
}

/**
 * Checks if input should be prevented based on validation rules
 * @param key - The pressed key
 * @param currentValue - Current input value
 * @param maxLength - Maximum allowed length
 * @param pattern - Input pattern
 * @param patternLength - Pattern length
 * @param inputType - Input type
 * @param event - The keyboard event
 * @returns Whether input should be prevented
 */
export function shouldPreventInput(
	key: string,
	currentValue: string,
	maxLength: number | null,
	pattern: string,
	patternLength: number,
	inputType: string,
	event: KeyboardEvent
): boolean {
	// Allow navigation and control keys
	if ([
		'Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
	].includes(key) || event.metaKey || event.ctrlKey) {
		return false;
	}

	// Check numeric input validation
	if (!isValidNumericKey(key, inputType)) return true;

	// Check max length
	if (maxLength && currentValue.length >= maxLength) return true;

	// Check pattern length
	if (pattern && removeMask(currentValue).length >= patternLength) return true;

	return false;
}
