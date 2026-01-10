/**
 * Get form data from a form element
 * @param form - The form element
 * @returns FormData object
 */
export function getFormData(form: HTMLFormElement): FormData {
  return new FormData(form);
}
