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
