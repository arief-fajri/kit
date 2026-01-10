/**
 * @rief/utils - Shared utility functions for Svelte components
 */

/**
 * Debounce function - delays execution until after wait time has passed
 * @param fn - Function to debounce
 * @param delay - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced;
}

/**
 * Throttle function - limits execution to once per wait time
 * @param func - Function to throttle
 * @param wait - Wait time in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }
  };
}

/**
 * Combine class names conditionally
 * @param classes - Class names (strings, objects, arrays, or undefined/null)
 * @returns Combined class string
 */
export function classNames(
  ...classes: (string | undefined | null | Record<string, boolean> | (string | undefined | null)[])[]
): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string') {
      result.push(cls);
    } else if (Array.isArray(cls)) {
      const filtered = cls.filter(Boolean);
      if (filtered.length > 0) {
        result.push(filtered.join(' '));
      }
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ').trim();
}

/**
 * Alias for classNames
 */
export const cn = classNames;

/**
 * No-op function - does nothing
 */
export function noop(): void {
  // Intentionally empty
}

/**
 * Type guard to check if value is a function
 * @param value - Value to check
 * @returns True if value is a function
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * Type guard to check if value is an object (and not null/array)
 * @param value - Value to check
 * @returns True if value is a plain object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Omit properties from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Pick properties from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only picked keys
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Merge multiple objects deeply
 * @param objects - Objects to merge
 * @returns Merged object
 */
export function merge<T extends Record<string, any>>(...objects: T[]): T {
  const result: Record<string, any> = {};

  for (const obj of objects) {
    if (!isObject(obj)) continue;

    for (const [key, value] of Object.entries(obj)) {
      if (isObject(value) && isObject(result[key])) {
        result[key] = merge(result[key], value);
      } else {
        result[key] = value;
      }
    }
  }

  return result as T;
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function uniqueId(prefix: string = ''): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
}

/**
 * Sleep/delay utility
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Svelte action to portal an element to document.body
 * @param node - The element to portal
 * @returns Action object with destroy method
 */
export function portal(node: HTMLElement): { destroy(): void } {
  const target = document.body;
  
  function update(): void {
    if (node.parentNode !== target) {
      target.appendChild(node);
    }
  }
  
  function destroy(): void {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  
  update();
  
  return {
    destroy
  };
}

/**
 * Svelte action to detect clicks outside an element
 * @param node - The element to detect outside clicks for
 * @returns Action object with destroy method
 */
export function clickOutside(node: HTMLElement): { destroy(): void } {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick', { detail: event }));
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

/**
 * Converts an object to JSON string
 * @param obj - The object to stringify
 * @returns JSON string or undefined
 */
export function objStringify(obj: Record<string, any> = {}): string | undefined {
  if (typeof obj !== "object") return;
  return JSON.stringify(obj);
}

/**
 * Converts a string to snake_case format
 * @param input - The string to convert
 * @returns The snake_case string
 */
export function toSnakeCase(input: string = ''): string {
  return (
    input
      .trim()
      // Convert camelCase / PascalCase → snake_case
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      // Replace spaces & symbols → underscore
      .replace(/[\s\-]+/g, "_")
      // Remove non-alphanumeric characters except underscore
      .replace(/[^a-zA-Z0-9_]/g, "")
      // Convert to lowercase
      .toLowerCase()
  );
}

/**
 * Converts snake_case string to Title Case readable format
 * @param {string} str - The snake_case string to format
 * @returns {string} The formatted string in Title Case
 * @example
 * formatSnakeCase('user_name') // returns 'User Name'
 */
export function fromSnakeCase(str: string = '') {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Parses a value as JSON if it's a JSON string, otherwise returns the value
 * @param value - Value to parse
 * @returns Parsed JSON or original value
 */
export function parseIfJSON(value: any): any {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  const firstChar = trimmed[0];

  if (firstChar !== "[" && firstChar !== "{" && firstChar !== '"') {
    return value;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return value; // Not valid JSON, return as-is
  }
}

/**
 * Svelte action to detect when an element enters or leaves the viewport
 * @param node - The element to observe
 * @returns Action object with destroy method
 */
export function intersect(node: HTMLElement): { destroy(): void } {
  const options = { threshold: 0 };
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const eventName = entry.isIntersecting ? "inViewport" : "outViewport";
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  }, options);

  intersectionObserver.observe(node);

  return {
    destroy() {
      intersectionObserver.unobserve(node);
      intersectionObserver.disconnect();
    }
  };
}

/**
 * Checks if a value is valid JSON
 * @param item - Value to check
 * @returns True if value is valid JSON
 */
export function isJson(item: any): boolean {
  if (typeof item === "string") {
    try {
      const parsed = JSON.parse(item);
      return typeof parsed === "object" && parsed !== null;
    } catch {
      return false;
    }
  }
  
  try {
    JSON.stringify(item);
    return typeof item === "object" && item !== null;
  } catch {
    return false;
  }
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch (err) {
    console.error("Copy failed", err);
    return false;
  }
}

/**
 * Sanitizes HTML by removing dangerous elements and attributes
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string = ""): string {
  if (typeof document === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  // Remove <script> tags
  template.content.querySelectorAll("script").forEach((el) => el.remove());

  // Remove dangerous attributes
  template.content.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      // Remove event handlers (onclick, onerror, etc.)
      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
      }

      // Remove suspicious href or src (javascript: protocol)
      if ((name === "href" || name === "src") && value.startsWith("javascript:")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return template.innerHTML;
}

/**
 * Strips matching braces from the beginning and end of a string
 * @param text - The text to strip braces from
 * @param bracesToStrip - Array of brace characters to strip
 * @returns Text with braces stripped
 */
export function stripAnyBraces(
  text: string,
  bracesToStrip: string[] = ["(", ")", "[", "]", "{", "}", "<", ">"]
): string {
  let result = text;
  let changed = true;

  while (changed && result.length > 0) {
    changed = false;

    // Check first char
    if (bracesToStrip.includes(result[0])) {
      result = result.slice(1);
      changed = true;
    }

    // Check last char
    if (result.length > 0 && bracesToStrip.includes(result[result.length - 1])) {
      result = result.slice(0, -1);
      changed = true;
    }

    result = result.trim();
  }

  return result;
}

/**
 * Formats a number with custom separators and precision
 * @param value - Number or string to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  value: number | string,
  options: {
    decimalSeparator?: string;
    thousandSeparator?: string;
    precision?: number;
    prefix?: string;
    suffix?: string;
  } = {}
): string {
  const {
    decimalSeparator = ",", // Decimal separator can be "," or "."
    thousandSeparator = ".", // Thousand separator can be "." or ","
    precision = 0, // Decimal precision
    prefix = "", // Prefix (e.g., "Rp ")
    suffix = "" // Suffix (e.g., " IDR")
  } = options;

  if (typeof value === "string") {
    // Replace comma with dot if string contains decimal with comma
    value = value.replace(",", ".");
  }

  // Convert to number
  const number = parseFloat(String(value));

  if (isNaN(number)) return String(value); // If not a number, return as-is without formatting

  // Format number with specified precision (toFixed always uses ".")
  const numberString = number.toFixed(precision);

  // Split integer and decimal parts (toFixed always uses ".")
  const [integerPart, decimalPart] = numberString.split(".");

  // Add thousand separator
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  // Combine with custom decimal separator
  const formattedNumber = decimalPart
    ? formattedInteger + decimalSeparator + decimalPart
    : formattedInteger;

  // Add prefix & suffix
  return prefix + formattedNumber + suffix;
}

/**
 * Formats a number in compact notation (e.g., 1.5K, 2.3M)
 * @param num - Number to format
 * @param lookup - Custom lookup table for units
 * @param digits - Number of decimal digits
 * @returns Formatted compact number string
 */
export function formatNumberCompact(
  num: number,
  lookup: Array<{ value: number; symbol: string }> = [],
  digits: number = 2
): string {
  const defaultLookup = [
    { value: 1, symbol: "B" },
    { value: 1e3, symbol: "KB" },
    { value: 1e6, symbol: "MB" },
    { value: 1e9, symbol: "GB" },
    { value: 1e12, symbol: "TB" },
    { value: 1e15, symbol: "PB" },
    { value: 1e18, symbol: "EB" }
  ];

  const lookupTable = lookup?.length ? lookup : defaultLookup;

  const item = lookupTable
    .slice()
    .reverse()
    .find((item) => Math.abs(num) >= item.value);

  let comp = item ? (Math.abs(num) / item.value).toFixed(digits).replace(".", ",") : "0";
  const split = comp.split(",");
  if (isNaN(Number(split[1])) || Number(split[1]) === 0) {
    comp = split[0];
  }

  const formattedNum = item ? comp + item.symbol : "0";
  return num < 0 ? `-${formattedNum}` : formattedNum;
}

/**
 * Converts a localized number string to a JavaScript number
 * @param value - Number string to convert
 * @param locale - Locale identifier (e.g., "id-ID")
 * @returns Parsed number or null if invalid
 */
export function convertNumber(value: string | number = "", locale: string = "id-ID"): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value !== "string") {
    value = String(value);
  }

  value = value.trim();
  if (!value) return null;

  // Keep only digits, decimal separators, and negative sign
  let normalized = value.replace(/[^\d.,-]/g, "");

  // Handle negative sign - only allow at start
  const isNegative = normalized.startsWith("-");
  normalized = (isNegative ? "-" : "") + normalized.replace(/-/g, "");

  // For id-ID: . is thousands separator, , is decimal separator
  const lastComma = normalized.lastIndexOf(",");
  let decimalIndex = -1;

  if (locale === "id-ID") {
    // Only treat comma as decimal if it has at least one digit before it
    if (lastComma >= 0 && lastComma > 0 && /\d/.test(normalized[lastComma - 1])) {
      decimalIndex = lastComma;
    }
  }

  let integerPart = "";
  let decimalPart = "";

  if (decimalIndex >= 0) {
    integerPart = normalized.slice(0, decimalIndex).replace(/[^\d-]/g, "");
    decimalPart = normalized.slice(decimalIndex + 1).replace(/[^\d]/g, "");
  } else {
    integerPart = normalized.replace(/[^\d-]/g, "");
  }

  const intDigits = integerPart.replace(/[^\d]/g, "");

  // Build numeric string using "." as JS decimal separator
  const numericString =
    (isNegative ? "-" : "") + intDigits + (decimalPart ? "." + decimalPart : "");

  if (
    !numericString ||
    numericString === "-" ||
    numericString === "." ||
    numericString === ","
  ) {
    return null;
  }

  const parsed = parseFloat(numericString);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}