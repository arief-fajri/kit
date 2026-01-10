<script lang="ts">
	export let text: string;
	export let label = 'Copy to clipboard';

	let copied = false;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;

			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				copied = false;
				timeoutId = null;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			copyToClipboard();
		}
	}
</script>

<button
	class="copy-button"
	class:copied
	on:click={copyToClipboard}
	on:keydown={handleKeydown}
	aria-label={copied ? 'Copied!' : label}
	title={copied ? 'Copied!' : label}
	type="button"
>
	{#if copied}
		<span class="icon" aria-hidden="true">✓</span>
		<span class="text">Copied</span>
	{:else}
		<span class="icon" aria-hidden="true">📋</span>
		<span class="text">Copy</span>
	{/if}
</button>

<style>
	.copy-button {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-surface-secondary, #f3f4f6);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.375rem;
		color: var(--color-text, #1f2937);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.copy-button:hover {
		background: var(--color-surface-hover, #e5e7eb);
		border-color: var(--color-border-hover, #d1d5db);
	}

	.copy-button:focus {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.copy-button.copied {
		background: var(--color-success, #10b981);
		border-color: var(--color-success, #10b981);
		color: white;
	}

	.icon {
		font-size: 1rem;
		line-height: 1;
	}

	.text {
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.copy-button .text {
			display: none;
		}

		.copy-button {
			padding: 0.5rem;
		}
	}
</style>
