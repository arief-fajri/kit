/**
 * Error handling utilities for components
 */

export interface ComponentError {
	message: string;
	component: string;
	prop?: string;
	value?: unknown;
}

/**
 * Creates a standardized error object
 */
export function createComponentError(
	message: string,
	component: string,
	prop?: string,
	value?: unknown
): ComponentError {
	return { message, component, prop, value };
}

/**
 * Logs component errors in a consistent format
 */
export function logComponentError(error: ComponentError, isDev = false): void {
	const errorMessage = `[${error.component}]${error.prop ? ` Prop "${error.prop}":` : ''} ${error.message}${error.value !== undefined ? ` (value: ${JSON.stringify(error.value)})` : ''}`;
	
	if (isDev) {
		console.error(errorMessage);
	} else {
		console.warn(errorMessage);
	}
}

/**
 * Safe HTML sanitization wrapper
 * Note: In production, use a proper sanitization library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
	if (typeof window === 'undefined') {
		return html;
	}
	
	// Basic XSS prevention - remove script tags and event handlers
	// For production, replace with DOMPurify or similar
	const div = document.createElement('div');
	div.textContent = html;
	return div.innerHTML;
}

/**
 * Validates and sanitizes HTML content for safe rendering
 */
export function safeHtmlContent(content: string | undefined): string {
	if (!content) return '';
	
	// In development, warn about potentially unsafe content
	if (import.meta.env?.DEV) {
		const dangerousPatterns = [
			/<script/i,
			/on\w+\s*=/i,
			/javascript:/i,
			/data:text\/html/i
		];
		
		const hasDangerousContent = dangerousPatterns.some(pattern => pattern.test(content));
		if (hasDangerousContent) {
			console.warn('[Component] Potentially unsafe HTML content detected. Consider using sanitizeHtml() or a proper sanitization library.');
		}
	}
	
	return sanitizeHtml(content);
}
