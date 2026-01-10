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
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.left = '-9999px';
		textarea.style.top = '-9999px';

		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();

		const success = document.execCommand('copy');
		document.body.removeChild(textarea);

		return success;
	} catch {
		return false;
	}
}
