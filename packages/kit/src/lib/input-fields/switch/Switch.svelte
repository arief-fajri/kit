<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { safeUniqueId } from '@rief/utils';
	import type {
		SwitchProps,
		SwitchStyling,
		SwitchBehavior,
		SwitchEventDetail,
		FocusEventDetail
	} from './types.js';

	// Core props
	export let id: string | undefined = undefined;
	export let name: string = 'switch';
	export let checked: boolean = false;
	export let value: any = undefined;
	export let label: string = '';
	export let switchRef: HTMLInputElement | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	// Generate unique ID if not provided (SSR-safe)
	let switchId: string = id || safeUniqueId('switch-');

	// Grouped props
	export let styling: SwitchStyling = {};
	export let behavior: SwitchBehavior = {};

	// Computed props with defaults
	$: computedStyling = {
		size: styling?.size ?? 'md',
		variant: styling?.variant ?? 'default',
		wrapperClass: styling?.wrapperClass ?? '',
		labelClass: styling?.labelClass ?? '',
		inputClass: styling?.inputClass ?? '',
		wrapperStyle: styling?.wrapperStyle ?? ''
	};

	$: computedBehavior = {
		disabled: behavior?.disabled ?? false,
		required: behavior?.required ?? false,
		stopPropagation: behavior?.stopPropagation ?? false
	};

	// Constants
	const dispatch = createEventDispatcher<{
		change: SwitchEventDetail;
		focus: FocusEventDetail;
		blur: FocusEventDetail;
	}>();

	const sizeValues: Record<typeof computedStyling.size, string> = {
		xs: '0.75',
		sm: '0.875',
		md: '1',
		lg: '1.125',
		xl: '1.25'
	};

	// Event handlers
	const handleChange = (event: Event) => {
		if (computedBehavior.disabled) return;
		if (computedBehavior.stopPropagation) event.stopPropagation();

		dispatch('change', {
			checked,
			value: value || checked,
			originalEvent: event
		});
	};

	const handleFocus = (event: FocusEvent) => {
		dispatch('focus', { originalEvent: event });
	};

	const handleBlur = (event: FocusEvent) => {
		dispatch('blur', { originalEvent: event });
	};
</script>

<div
	class="switch-wrapper {computedStyling.wrapperClass}"
	style="--switch-size: {sizeValues[computedStyling.size]}; {computedStyling.wrapperStyle}"
	on:click={(e) => {
		if (computedBehavior.stopPropagation) e.stopPropagation();
	}}
	role="presentation"
>
	<label class="switch-container {computedStyling.labelClass}" for={switchId}>
		<input
			type="checkbox"
			role="switch"
			class={computedStyling.inputClass}
			id={switchId}
			bind:this={switchRef}
			{name}
			bind:checked
			disabled={computedBehavior.disabled}
			required={computedBehavior.required}
			{value}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-checked={checked}
			aria-disabled={computedBehavior.disabled}
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
			{...$$restProps}
		/>
		<span class="switch-slider" data-variant={computedStyling.variant} />
		<slot name="label">
			{#if label}
				<span class="switch-label">{label}</span>
			{/if}
		</slot>
	</label>
</div>

<style>
	.switch-wrapper {
		--switch-size: 1;
		--switch-width-base: 32px;
		--switch-height-base: 18px;
		--switch-slider-size-base: 14px;
		--switch-slider-offset: 2px;
		--switch-transition-duration: 0.4s;
		--switch-transition-timing: ease;
		--switch-focus-ring-width: 2px;
		--switch-focus-ring-offset: 2px;
		--switch-gap: 0.5rem;

		display: inline-flex;
		align-items: center;
	}

	.switch-container {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--switch-gap);
		cursor: pointer;
		user-select: none;
	}

	.switch-container input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		padding: 0;
	}

	.switch-slider {
		position: relative;
		display: inline-block;
		width: calc(var(--switch-width-base) * var(--switch-size));
		height: calc(var(--switch-height-base) * var(--switch-size));
		background-color: var(--switch-bg-unchecked, var(--color-text-muted, #888888));
		border-radius: 9999px;
		transition: background-color var(--switch-transition-duration) var(--switch-transition-timing);
		flex-shrink: 0;
	}

	.switch-slider::before {
		position: absolute;
		content: '';
		width: calc(var(--switch-slider-size-base) * var(--switch-size));
		height: calc(var(--switch-slider-size-base) * var(--switch-size));
		left: var(--switch-slider-offset);
		bottom: var(--switch-slider-offset);
		background-color: var(--switch-slider-color, var(--color-surface, white));
		border-radius: 50%;
		transition: transform var(--switch-transition-duration) var(--switch-transition-timing);
	}

	.switch-container:hover input:not(:disabled):not(:checked) + .switch-slider {
		background-color: var(--switch-bg-unchecked-hover, var(--color-text-secondary, #4f4f4f));
	}

	.switch-container input:checked + .switch-slider {
		background-color: var(--switch-bg-checked, var(--color-text, #1b1c21));
	}

	.switch-container input:checked + .switch-slider::before {
		transform: translateX(
			calc(
				(
						var(--switch-width-base) - var(--switch-slider-size-base) -
							var(--switch-slider-offset) * 2
					) *
					var(--switch-size)
			)
		);
	}

	.switch-container input:focus-visible + .switch-slider {
		outline: var(--switch-focus-ring-width) solid
			var(--switch-focus-ring-color, var(--color-primary, #3b82f6));
		outline-offset: var(--switch-focus-ring-offset);
	}

	.switch-container input:disabled + .switch-slider {
		opacity: var(--switch-disabled-opacity, 0.5);
		cursor: not-allowed;
	}

	.switch-container:has(input:disabled) {
		cursor: not-allowed;
		opacity: var(--switch-disabled-opacity, 0.5);
	}

	.switch-label {
		color: inherit;
		font-size: 1rem;
		line-height: 1.5;
		user-select: none;
	}

	/* Variant styles */
	.switch-slider[data-variant='primary'] {
		--switch-bg-checked: var(--switch-color-primary, var(--color-primary, #3b82f6));
	}

	.switch-slider[data-variant='success'] {
		--switch-bg-checked: var(--switch-color-success, var(--color-success, #10b981));
	}

	.switch-slider[data-variant='error'] {
		--switch-bg-checked: var(--switch-color-error, var(--color-error, #ef4444));
	}

	.switch-slider[data-variant='warning'] {
		--switch-bg-checked: var(--switch-color-warning, var(--color-warning, #f59e0b));
	}
</style>
