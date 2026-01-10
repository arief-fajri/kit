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
	return pattern.split('').filter((char) => char !== 'x');
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
	return /^[0-9.,-]+$/.test(key);
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
	if (
		['Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key) ||
		event.metaKey ||
		event.ctrlKey
	) {
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

/**
 * Formats a number value based on locale
 * @param value - The numeric value
 * @param locale - The locale string (default: 'en-US')
 * @param useFormatting - Whether to apply formatting
 * @returns The formatted number string
 */
export function formatNumberLocale(
	value: number | string,
	locale: string = 'en-US',
	useFormatting: boolean = true
): string {
	if (!useFormatting) return String(value);

	if (typeof value === 'string' && value.trim() === '') return '';

	const numValue = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(numValue) || !isFinite(numValue)) return '';

	return numValue.toLocaleString(locale);
}

/**
 * Parses number input and formats it according to locale
 * Handles both . and , as decimal separators, normalizes to locale format
 * @param value - The raw input value
 * @param locale - The locale string (default: 'id-ID')
 * @returns Object with display value, raw numeric value, and cursor adjustment
 */
export function parseAndFormatNumber(
	value: string,
	locale: string = 'id-ID'
): { display: string; numeric: number | null; cursorAdjustment: number } {
	if (!value || value.trim() === '') {
		return { display: '', numeric: null, cursorAdjustment: 0 };
	}

	// Keep only digits, decimal separators, and negative sign
	let normalized = value.replace(/[^\d.,-]/g, '');

	// Handle negative sign - only allow at start
	const isNegative = normalized.startsWith('-');
	normalized = (isNegative ? '-' : '') + normalized.replace(/-/g, '');

	// Extract all digits to understand the actual number structure
	const allDigits = normalized.replace(/[^\d]/g, '');

	// For id-ID: . is thousands separator, , is decimal separator
	// Strategy: comma is always decimal separator, dots are always thousands separators
	const lastComma = normalized.lastIndexOf(',');
	let decimalIndex = -1;
	let decimalChar = '';

	// For id-ID locale: comma is always decimal separator if present
	// Only treat it as decimal if it has at least one digit before it
	if (lastComma >= 0 && lastComma > 0 && normalized[lastComma - 1]?.match(/\d/)) {
		decimalIndex = lastComma;
		decimalChar = ',';
	}
	// For id-ID, if there's no comma, all dots are thousands separators
	// We don't treat dots as decimal separators for id-ID locale

	// Split into integer and decimal parts
	let integerPart = '';
	let decimalPart = '';

	if (decimalIndex >= 0) {
		// Has decimal separator (comma for id-ID)
		// Extract integer part: everything before the comma, removing dots (thousands separators)
		integerPart = normalized.slice(0, decimalIndex).replace(/[^\d-]/g, '');
		decimalPart = normalized.slice(decimalIndex + 1).replace(/[^\d]/g, '');
	} else {
		// No decimal separator found, treat everything as integer part
		// Remove all dots/commas (they're thousands separators or invalid)
		integerPart = normalized.replace(/[^\d-]/g, '');
	}

	// Extract digits from integer part (remove negative sign and separators)
	const intDigits = integerPart.replace(/[^\d]/g, '');

	// Format integer part with thousands separator (only if 4+ digits)
	let formattedInt = '';
	if (intDigits.length > 0) {
		const numInt = parseInt(intDigits, 10);
		if (!isNaN(numInt) && numInt >= 0) {
			// Only apply thousands formatting if there are 4+ digits
			if (intDigits.length >= 4) {
				formattedInt = numInt.toLocaleString(locale, {
					useGrouping: true,
					maximumFractionDigits: 0
				});
			} else {
				// No thousands separator needed for small numbers
				formattedInt = intDigits;
			}
		} else if (intDigits.length > 0) {
			// Preserve partial input
			formattedInt = intDigits;
		}
	}

	// Build display value
	let display = (isNegative ? '-' : '') + formattedInt;

	// Add decimal separator and decimal part (only if user explicitly typed it)
	if (decimalIndex >= 0) {
		// For id-ID, decimal separator is comma
		const decimalSeparator = locale === 'id-ID' ? ',' : '.';
		display += decimalSeparator + decimalPart;
	}

	// Calculate numeric value (for validation/events)
	const numericString =
		(isNegative ? '-' : '') + intDigits + (decimalPart ? '.' + decimalPart : '');
	let numeric: number | null = null;

	if (numericString && numericString !== '-' && numericString !== '.' && numericString !== ',') {
		const parsed = parseFloat(numericString);
		if (!isNaN(parsed) && isFinite(parsed)) {
			numeric = parsed;
		}
	}

	// Calculate cursor adjustment
	const originalLength = value.length;
	const formattedLength = display.length;
	const cursorAdjustment = formattedLength - originalLength;

	return { display, numeric, cursorAdjustment };
}
