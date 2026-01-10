/**
 * Accessibility (ARIA) helper functions
 */

/**
 * Generates an aria-describedby attribute value
 * @param errorId - ID of the error message element
 * @param helperId - ID of the helper text element
 * @returns Space-separated string of IDs, or undefined if none provided
 */
export function getAriaDescribedBy(
  errorId?: string,
  helperId?: string
): string | undefined {
  const ids = [errorId, helperId].filter(Boolean) as string[];
  return ids.length > 0 ? ids.join(' ') : undefined;
}

/**
 * Generates a unique error message ID for a form field
 * @param fieldId - The ID of the form field
 * @returns The error message ID
 */
export function getErrorId(fieldId: string): string {
  return `${fieldId}-error`;
}

/**
 * Generates a unique helper text ID for a form field
 * @param fieldId - The ID of the form field
 * @returns The helper text ID
 */
export function getHelperId(fieldId: string): string {
  return `${fieldId}-helper`;
}
