<script lang="ts">
	import type { ComponentStatus } from '../types/navigation';

	export let status: ComponentStatus;
	export let showTooltip = false;

	const statusConfig: Record<
		ComponentStatus,
		{ label: string; color: string; description: string }
	> = {
		stable: {
			label: 'Stable',
			color: 'var(--color-success, #10b981)',
			description: 'This component is stable and production-ready'
		},
		beta: {
			label: 'Beta',
			color: 'var(--color-warning, #f59e0b)',
			description: 'This component is in beta and may have breaking changes'
		},
		experimental: {
			label: 'Experimental',
			color: 'var(--color-info, #3b82f6)',
			description: 'This component is experimental and subject to change'
		},
		deprecated: {
			label: 'Deprecated',
			color: 'var(--color-error, #ef4444)',
			description: 'This component is deprecated and will be removed in a future version'
		}
	};

	$: config = statusConfig[status];
</script>

<span
	class="status-badge"
	class:tooltip={showTooltip}
	style="--status-color: {config.color};"
	title={showTooltip ? config.description : undefined}
	role="status"
	aria-label="{config.label}: {config.description}"
>
	<span class="status-dot"></span>
	<span class="status-label">{config.label}</span>
</span>

<style>
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.625rem;
		font-weight: 600;
		background-color: var(--status-color);
		color: white;
		line-height: 1;
		flex-shrink: 0;
	}

	.status-dot {
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 50%;
		background-color: currentColor;
		opacity: 0.9;
	}

	.status-label {
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tooltip {
		cursor: help;
	}
</style>
