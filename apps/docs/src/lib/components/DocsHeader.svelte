<script lang="ts">
	import { Button } from '@rief/kit';
	import { theme } from '../stores/theme';
	import MobileMenu from './MobileMenu.svelte';
	import type { NavigationSection } from '../types/navigation';

	export let navigation: NavigationSection[];

	let mobileMenuOpen = false;
	let searchFocused = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		// Prevent body scroll when menu is open
		if (mobileMenuOpen && typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		} else if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			(event.target as HTMLInputElement).blur();
		}
		// TODO: Implement search functionality in Phase 2
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			// Open search modal
		}
	}
</script>

<header class="docs-header">
	<div class="header-container">
		<div class="header-left">
			<button
				class="mobile-menu-button"
				on:click={toggleMobileMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				<span class="hamburger-icon" aria-hidden="true">☰</span>
			</button>
			<a href="/" class="header-logo">
				<span class="logo-text">@rief/kit</span>
			</a>
		</div>

		<div class="header-center">
			<div class="search-wrapper">
				<input
					type="search"
					class="search-input"
					placeholder="Search components... (Ctrl+K)"
					on:focus={() => (searchFocused = true)}
					on:blur={() => (searchFocused = false)}
					on:keydown={handleSearchKeydown}
					readonly
					aria-label="Search components"
				/>
				<span class="search-icon" aria-hidden="true">🔍</span>
			</div>
		</div>

		<div class="header-right">
			<Button
				variant="text"
				size="sm"
				on:click={() => theme.toggle()}
				aria-label="Toggle theme"
				title="Toggle theme ({$theme})"
			>
				<span class="theme-icon" aria-hidden="true">
					{$theme === 'dark' ? '☀️' : '🌙'}
				</span>
				<span class="theme-text">{$theme === 'dark' ? 'Light' : 'Dark'}</span>
			</Button>
		</div>
	</div>
</header>

<MobileMenu {navigation} open={mobileMenuOpen} onClose={closeMobileMenu} />

<style>
	.docs-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-surface, #ffffff);
		border-bottom: 1px solid var(--color-border, #e5e7eb);
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.header-container {
		max-width: 100%;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.mobile-menu-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: transparent;
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.375rem;
		color: var(--color-text, #1f2937);
		cursor: pointer;
		transition: all 0.2s;
	}

	.mobile-menu-button:hover {
		background: var(--color-surface-hover, #f8fafc);
		border-color: var(--color-border-hover, #d1d5db);
	}

	.mobile-menu-button:focus {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.hamburger-icon {
		font-size: 1.25rem;
		line-height: 1;
	}

	.header-logo {
		text-decoration: none;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary, #3b82f6);
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.header-center {
		flex: 1;
		max-width: 500px;
		margin: 0 auto;
	}

	.search-wrapper {
		position: relative;
		width: 100%;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem 2.5rem 0.5rem 1rem;
		background: var(--color-surface-secondary, #f3f4f6);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.5rem;
		color: var(--color-text, #1f2937);
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.search-input:focus {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 0;
		background: var(--color-surface, #ffffff);
		border-color: var(--color-primary, #3b82f6);
	}

	.search-input::placeholder {
		color: var(--color-text-muted, #9ca3af);
	}

	.search-icon {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
		color: var(--color-text-muted, #9ca3af);
		pointer-events: none;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.theme-icon {
		font-size: 1rem;
		line-height: 1;
	}

	.theme-text {
		margin-left: 0.375rem;
	}

	@media (min-width: 769px) {
		.mobile-menu-button {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.header-container {
			padding: 0.75rem 1rem;
		}

		.header-center {
			display: none;
		}

		.theme-text {
			display: none;
		}
	}
</style>
