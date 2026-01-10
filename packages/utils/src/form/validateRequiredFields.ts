import { getFormData } from './getFormData.js';

/**
 * Validate required fields in a form
 * @param form - The form element
 * @param requiredFields - Array of required field names
 * @returns Validation result with isValid flag and errors object
 */
export function validateRequiredFields(
	form: HTMLFormElement,
	requiredFields: string[]
): { isValid: boolean; errors: Record<string, string> } {
	const formData = getFormData(form);
	const errors: Record<string, string> = {};

	for (const fieldName of requiredFields) {
		const value = formData.get(fieldName);
		if (!value || (typeof value === 'string' && value.trim() === '')) {
			errors[fieldName] = `${fieldName} is required`;
		}
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}
