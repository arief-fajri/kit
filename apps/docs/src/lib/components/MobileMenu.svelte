<script lang="ts">
	import { Button } from '@rief/kit';
	import type { NavigationSection } from '../types/navigation';

	export let navigation: NavigationSection[];
	export let open = false;
	export let onClose: () => void;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if open}
	<div
		class="mobile-menu-backdrop"
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Navigation menu"
	>
		<div
			class="mobile-menu"
			on:click|stopPropagation
			on:keydown={(e) => e.key === 'Escape' && onClose()}
			role="none"
		>
			<nav class="mobile-menu-nav">
				<div class="mobile-menu-header">
					<h2 class="mobile-menu-title">@rief/kit</h2>
					<Button variant="text" size="sm" on:click={onClose} aria-label="Close menu">✕</Button>
				</div>
				<div class="mobile-menu-content">
					{#each navigation as section}
						<div class="mobile-nav-section">
							<h3 class="mobile-nav-section-title">{section.title}</h3>
							<ul class="mobile-nav-list">
								{#each section.items as item}
									<li>
										<a href={item.href} class="mobile-nav-link" on:click={onClose}>
											{item.title}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</nav>
		</div>
	</div>
{/if}

<style>
	.mobile-menu-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		animation: fadeIn 0.2s ease;
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 280px;
		max-width: 85vw;
		background: var(--color-surface, #ffffff);
		border-right: 1px solid var(--color-border, #e5e7eb);
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		animation: slideIn 0.3s ease;
		overflow-y: auto;
	}

	.mobile-menu-nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.mobile-menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--color-border, #e5e7eb);
	}

	.mobile-menu-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary, #3b82f6);
		margin: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.mobile-menu-content {
		flex: 1;
		padding: 1rem 0;
		overflow-y: auto;
	}

	.mobile-nav-section {
		margin-bottom: 2rem;
	}

	.mobile-nav-section-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary, #6b7280);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem 0;
		padding: 0 1.5rem;
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-nav-link {
		display: block;
		padding: 0.75rem 1.5rem;
		color: var(--color-text-secondary, #6b7280);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s;
		border-left: 3px solid transparent;
	}

	.mobile-nav-link:hover {
		color: var(--color-primary, #3b82f6);
		background-color: var(--color-surface-hover, #f8fafc);
		border-left-color: var(--color-primary, #3b82f6);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@media (min-width: 769px) {
		.mobile-menu-backdrop {
			display: none;
		}
	}
</style>
