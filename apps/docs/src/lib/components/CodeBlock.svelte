<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	export let code: string;
	export let language = 'typescript';
	export let showCopyButton = true;
</script>

<div class="code-block-wrapper">
	{#if showCopyButton}
		<div class="code-block-header">
			<span class="language-label">{language}</span>
			<CopyButton text={code} />
		</div>
	{/if}
	<pre class="code-block"><code>{code}</code></pre>
</div>

<style>
	.code-block-wrapper {
		position: relative;
		margin: 1.5rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		background: #1f2937;
		border: 1px solid var(--color-border, #374151);
	}

	.code-block-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		background: #111827;
		border-bottom: 1px solid var(--color-border, #374151);
	}

	.language-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text-secondary, #9ca3af);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.code-block {
		margin: 0;
		padding: 1.5rem;
		overflow-x: auto;
		background: #1f2937;
		color: #f9fafb;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.code-block code {
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		background: transparent;
		padding: 0;
		border: none;
	}

	:global([data-theme='dark'] .code-block-wrapper) {
		background: #0f172a;
		border-color: #1e293b;
	}

	:global([data-theme='dark'] .code-block-header) {
		background: #020617;
		border-bottom-color: #1e293b;
	}

	:global([data-theme='dark'] .code-block) {
		background: #0f172a;
	}
</style>
