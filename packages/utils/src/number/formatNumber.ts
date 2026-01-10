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
