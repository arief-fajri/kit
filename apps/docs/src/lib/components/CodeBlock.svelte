<script lang="ts">
	import { Button } from '@rief/kit';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getHighlighter, type Highlighter } from 'shiki';
	import { theme } from '../stores/theme';

	export let code: string = '';
	export let language: string = 'text';
	export let showCopyButton: boolean = true;
	export let showLineNumbers: boolean = false;
	export let maxHeight: string | undefined = undefined;

	let highlightedCode = '';
	let copied = false;
	let loading = true;
	let error: string | null = null;
	let highlighter: Highlighter | null = null;

	// Supported languages
	const supportedLanguages = [
		'svelte',
		'typescript',
		'javascript',
		'css',
		'json',
		'bash',
		'shell',
		'html',
		'markdown',
		'yaml',
		'text'
	] as const;

	// Normalize language
	$: normalizedLanguage = supportedLanguages.includes(language as any)
		? language
		: 'text';

	// Get theme based on current theme state
	function getTheme(): 'github-light' | 'github-dark' {
		if (!browser) return 'github-light';
		if ($theme === 'dark') return 'github-dark';
		if ($theme === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'github-dark'
				: 'github-light';
		}
		return 'github-light';
	}

	// Initialize highlighter
	async function initHighlighter() {
		if (!browser) {
			loading = false;
			return;
		}

		try {
			loading = true;
			error = null;

			highlighter = await getHighlighter({
				themes: ['github-light', 'github-dark'],
				langs: supportedLanguages as any
			});

			updateHighlight();
			loading = false;
		} catch (err) {
			console.error('Failed to initialize code highlighter:', err);
			error = 'Failed to load syntax highlighter';
			loading = false;
		}
	}

	// Update highlighted code
	function updateHighlight() {
		if (!highlighter || !code) {
			highlightedCode = '';
			return;
		}

		try {
			const currentTheme = getTheme();
			highlightedCode = highlighter.codeToHtml(code, {
				lang: normalizedLanguage,
				theme: currentTheme
			});
		} catch (err) {
			console.error('Failed to highlight code:', err);
			error = 'Failed to highlight code';
			highlightedCode = escapeHtml(code);
		}
	}

	// Escape HTML for fallback
	function escapeHtml(text: string): string {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	// Copy code to clipboard
	async function copyCode() {
		if (!browser || !code) return;

		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
			error = 'Failed to copy to clipboard';
		}
	}

	// Watch for code, language, and theme changes
	$: if (highlighter && code && normalizedLanguage) {
		updateHighlight();
	}

	// Watch for system theme changes
	let mediaQuery: MediaQueryList | null = null;
	let mediaQueryHandler: (() => void) | null = null;

	onMount(() => {
		initHighlighter();

		// Set up media query listener for system theme
		if (browser) {
			mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			mediaQueryHandler = () => {
				if ($theme === 'system' && highlighter) {
					updateHighlight();
				}
			};
			mediaQuery.addEventListener('change', mediaQueryHandler);
		}

		return () => {
			if (mediaQuery && mediaQueryHandler) {
				mediaQuery.removeEventListener('change', mediaQueryHandler);
			}
		};
	});

	// Update highlight when theme changes
	$: if (highlighter && $theme) {
		updateHighlight();
	}
</script>

<div class="relative group code-block">
	{#if showCopyButton && browser}
		<div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
			<Button
				label={copied ? 'Copied!' : 'Copy'}
				styling={{ variant: 'text', size: 'sm' }}
				behavior={{ disabled: loading || !!error }}
				on:click={copyCode}
				ariaLabel={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
			/>
		</div>
	{/if}

	<div
		class="code-block__container overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-4 {error
			? 'border border-red-300 dark:border-red-700'
			: ''}"
		style={maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : ''}
	>
		{#if loading && browser}
			<div class="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
		{:else if error}
			<div class="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>
			<pre class="m-0"><code class="text-sm">{code || '(empty)'}</code></pre>
		{:else if highlightedCode}
			{@html highlightedCode}
		{:else}
			<pre class="m-0"><code class="text-sm language-{normalizedLanguage}">{code || '(empty)'}</code></pre>
		{/if}
	</div>

	{#if showLineNumbers && !loading && !error}
		<!-- Line numbers can be added here if needed -->
	{/if}
</div>

<style>
	:global(.code-block pre) {
		@apply m-0;
		background: transparent !important;
	}

	:global(.code-block code) {
		@apply text-sm;
		font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
	}

	:global(.code-block .shiki) {
		@apply m-0;
		background: transparent !important;
	}
</style>
