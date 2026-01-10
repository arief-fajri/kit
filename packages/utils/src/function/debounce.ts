/**
 * Debounce function - delays execution until after wait time has passed
 * @param fn - Function to debounce
 * @param delay - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
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
