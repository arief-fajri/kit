/**
 * Converts an object to JSON string
 * @param obj - The object to stringify
 * @returns JSON string or undefined
 */
export function objStringify(obj: Record<string, unknown> = {}): string | undefined {
  if (typeof obj !== "object" || obj === null) return;
  return JSON.stringify(obj);
}
