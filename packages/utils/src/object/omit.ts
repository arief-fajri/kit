/**
 * Omit properties from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
