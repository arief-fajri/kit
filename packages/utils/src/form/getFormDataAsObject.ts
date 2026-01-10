import { getFormData } from './getFormData.js';

/**
 * Get form data as a plain object
 * @param form - The form element
 * @returns Plain object with form data
 */
export function getFormDataAsObject(form: HTMLFormElement): Record<string, FormDataEntryValue> {
  const formData = getFormData(form);
  const object: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    object[key] = value;
  }
  return object;
}
