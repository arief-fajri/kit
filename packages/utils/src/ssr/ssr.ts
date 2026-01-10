/**
 * SSR-safe utilities
 */

import { uniqueId } from '../id/uniqueId.js';

/**
 * Check if code is running in browser environment
 * @returns true if running in browser, false if SSR
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Generate a unique ID that's safe for SSR
 * Returns a placeholder ID during SSR and a real unique ID in browser
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export function safeUniqueId(prefix: string = 'id'): string {
	if (isBrowser) {
		return uniqueId(prefix);
	}
	// SSR-safe fallback: use timestamp + random to ensure uniqueness
	return `${prefix}-ssr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
