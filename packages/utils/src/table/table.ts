/**
 * Table utility functions for sorting, filtering, and data manipulation
 */

/**
 * Check if a value is a date (string or Date object)
 * @param value - Value to check
 * @returns true if value is a date
 */
export function isDateValue(value: unknown): boolean {
  if (typeof value === 'string') {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}/) !== null;
  }
  return value instanceof Date;
}

/**
 * Compare two values for sorting
 * Handles dates, numbers, and strings
 * @param valueA - First value to compare
 * @param valueB - Second value to compare
 * @param isDescending - Whether to sort in descending order
 * @returns Comparison result (-1, 0, or 1)
 */
export function compareValues(valueA: unknown, valueB: unknown, isDescending: boolean): number {
  // Handle null/undefined
  if (valueA == null) valueA = '';
  if (valueB == null) valueB = '';

  // Handle dates
  if (isDateValue(valueA) || isDateValue(valueB)) {
    const dateA = new Date(valueA as string | Date).getTime();
    const dateB = new Date(valueB as string | Date).getTime();
    return isDescending ? dateB - dateA : dateA - dateB;
  }

  // Handle numeric values
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return isDescending ? valueB - valueA : valueA - valueB;
  }

  // Handle string values
  const strA = String(valueA).toLowerCase();
  const strB = String(valueB).toLowerCase();

  if (isDescending) {
    return strA > strB ? -1 : strA < strB ? 1 : 0;
  } else {
    return strA < strB ? -1 : strA > strB ? 1 : 0;
  }
}

/**
 * Normalize table column definition
 * Handles various field name aliases (key, field, title, label, name, alias)
 * @param col - Column definition
 * @returns Normalized column with key and title
 */
export function normalizeTableColumn<T = Record<string, unknown>>(
  col: { key?: string; field?: string; title?: string; label?: string; name?: string; alias?: string; sortable?: boolean; [key: string]: unknown }
): { key: string; title: string; sortable: boolean } & T {
  const key = (col.key || col.field || '') as string;
  const title = (col.title || col.label || col.name || col.alias || String(key)) as string;
  return {
    ...col,
    key,
    title,
    sortable: col.sortable ?? false
  } as { key: string; title: string; sortable: boolean } & T;
}
