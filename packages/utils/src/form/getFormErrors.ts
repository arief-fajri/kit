/**
 * Get all form errors from validation
 * @param form - The form element
 * @returns Object with field names as keys and error messages as values
 */
export function getFormErrors(form: HTMLFormElement): Record<string, string> {
	const errors: Record<string, string> = {};
	const inputs = form.querySelectorAll<HTMLElement>("[aria-invalid='true']");

	inputs.forEach((input) => {
		const name = input.getAttribute('name');
		const errorElement = form.querySelector(`#${input.getAttribute('aria-describedby')}`);
		if (name && errorElement) {
			errors[name] = errorElement.textContent || '';
		}
	});

	return errors;
}
