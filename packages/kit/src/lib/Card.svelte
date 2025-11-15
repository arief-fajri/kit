<script lang="ts">
	import type { CardProps } from './types.js';

	export let title: CardProps['title'];
	export let subtitle: CardProps['subtitle'];
</script>

<div class="card" {...$$restProps}>
	{#if title || subtitle}
		<div class="card-header">
			{#if title}
				<h3 class="card-title">{title}</h3>
			{/if}
			{#if subtitle}
				<p class="card-subtitle">{subtitle}</p>
			{/if}
		</div>
	{/if}
	<div class="card-body">
		<slot />
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		padding: 1.5rem 1.5rem 0.75rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #111827;
	}

	.card-subtitle {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: #6b7280;
	}

	.card-body {
		padding: 1.5rem;
		flex: 1;
	}
</style>

