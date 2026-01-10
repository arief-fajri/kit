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
