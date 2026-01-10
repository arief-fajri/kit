/**
 * Utility functions for handling code examples safely
 */

/**
 * Escapes HTML entities in code strings to prevent Svelte preprocessor issues
 * Particularly useful for code containing <script> tags
 */
export function escapeCodeForTemplate(code: string): string {
	return code
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Unescapes HTML entities back to original characters
 * Use this when you need to display the code in a code block
 */
export function unescapeCodeFromTemplate(escaped: string): string {
	return escaped
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

/**
 * Sanitizes code string by replacing problematic patterns
 * Specifically handles <script> tags that cause Svelte preprocessor issues
 */
export function sanitizeCodeString(code: string): string {
	// Replace <script> with a placeholder that won't confuse the preprocessor
	return code.replace(/<script>/gi, '<' + 'script>').replace(/<\/script>/gi, '</' + 'script>');
}

/**
 * Creates a safe code string for use in template literals
 * This is the recommended way to store code examples in Svelte files
 */
export function createSafeCodeString(code: string): string {
	// Use HTML entities for script tags to avoid preprocessor issues
	return code
		.replace(/<script>/gi, '&lt;script&gt;')
		.replace(/<\/script>/gi, '&lt;/script&gt;');
}

/**
 * Restores code string from safe format for display
 */
export function restoreCodeString(safeCode: string): string {
	return safeCode
		.replace(/&lt;script&gt;/gi, '<script>')
		.replace(/&lt;\/script&gt;/gi, '</script>');
}

/**
 * Validates that a code string is safe to use
 */
export function isCodeStringSafe(code: string): boolean {
	// Check for unescaped script tags that might cause issues
	const scriptTagPattern = /<script[^>]*>/i;
	return !scriptTagPattern.test(code);
}
