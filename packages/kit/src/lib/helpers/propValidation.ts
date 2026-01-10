/**
 * Prop validation utilities for development and production
 */

const isDev = typeof window !== 'undefined' && import.meta.env?.DEV;

/**
 * Validates that a required prop is provided
 * @param value - The prop value to validate
 * @param propName - The name of the prop (for error message)
 * @param componentName - The name of the component (for error message)
 * @throws Error if value is null or undefined (in dev mode, logs warning in prod)
 */
export function validateRequiredProp<T>(
	value: T | null | undefined,
	propName: string,
	componentName: string
): asserts value is T {
	if (value === null || value === undefined) {
		const message = `[${componentName}] Required prop "${propName}" is missing or undefined.`;
		if (isDev) {
			console.error(message);
			throw new Error(message);
		} else {
			console.warn(message);
		}
	}
}

/**
 * Validates that a prop value is within a set of allowed values
 * @param value - The prop value to validate
 * @param allowedValues - Array of allowed values
 * @param propName - The name of the prop (for error message)
 * @param componentName - The name of the component (for error message)
 * @param defaultValue - Default value to use if validation fails
 * @returns The validated value or default value
 */
export function validateEnumProp<T extends string>(
	value: T | undefined,
	allowedValues: readonly T[],
	propName: string,
	componentName: string,
	defaultValue: T
): T {
	if (value !== undefined && !allowedValues.includes(value)) {
		const message =
			`[${componentName}] Invalid value "${value}" for prop "${propName}". ` +
			`Allowed values: ${allowedValues.join(', ')}. Using default: "${defaultValue}".`;
		if (isDev) {
			console.warn(message);
		}
		return defaultValue;
	}
	return value ?? defaultValue;
}

/**
 * Validates a number is within a range
 * @param value - The number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param propName - The name of the prop
 * @param componentName - The name of the component
 * @param defaultValue - Default value to use if validation fails
 * @returns The validated value or default value
 */
export function validateNumberRange(
	value: number | undefined,
	min: number,
	max: number,
	propName: string,
	componentName: string,
	defaultValue: number
): number {
	if (value !== undefined && (value < min || value > max)) {
		const message =
			`[${componentName}] Invalid value ${value} for prop "${propName}". ` +
			`Must be between ${min} and ${max}. Using default: ${defaultValue}.`;
		if (isDev) {
			console.warn(message);
		}
		return defaultValue;
	}
	return value ?? defaultValue;
}
