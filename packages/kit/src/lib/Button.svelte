<script lang="ts">
	import type { ButtonProps } from './types.js';

	export let label: ButtonProps['label'] = 'Click me';
	export let variant: ButtonProps['variant'] = 'primary';
	export let size: ButtonProps['size'] = 'md';
	export let disabled: ButtonProps['disabled'] = false;

	let classes = `btn btn-${variant} btn-${size}`;
</script>

<button
	class={classes}
	{disabled}
	on:click={onclick}
	{...$$restProps}
>
	<slot>{label}</slot>
</button>

<style>
	.btn {
		font-family: inherit;
		font-weight: 500;
		border-radius: 0.375rem;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}

	.btn-md {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}

	.btn-lg {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}

	.btn-primary {
		background-color: #3b82f6;
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: #2563eb;
	}

	.btn-secondary {
		background-color: #6b7280;
		color: white;
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: #4b5563;
	}

	.btn-outline {
		background-color: transparent;
		color: #3b82f6;
		border: 1px solid #3b82f6;
	}

	.btn-outline:hover:not(:disabled) {
		background-color: #3b82f6;
		color: white;
	}
</style>

