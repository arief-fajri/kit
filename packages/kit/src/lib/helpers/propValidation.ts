/**
 * Prop validation utilities for development mode
 */

/**
 * Validates that a required prop is provided
 * @param value - The prop value to validate
 * @param propName - The name of the prop (for error message)
 * @param componentName - The name of the component (for error message)
 * @throws Error in development mode if value is null or undefined
 */
export function validateRequiredProp<T>(
  value: T | null | undefined,
  propName: string,
  componentName: string
): asserts value is T {
  if (typeof window !== 'undefined' && import.meta.env?.DEV) {
    if (value === null || value === undefined) {
      console.error(
        `[${componentName}] Required prop "${propName}" is missing or undefined.`
      );
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
  if (typeof window !== 'undefined' && import.meta.env?.DEV) {
    if (value !== undefined && !allowedValues.includes(value)) {
      console.warn(
        `[${componentName}] Invalid value "${value}" for prop "${propName}". ` +
        `Allowed values: ${allowedValues.join(', ')}. Using default: "${defaultValue}".`
      );
      return defaultValue;
    }
  }
  return value ?? defaultValue;
}
