<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { safeUniqueId } from '@rief/utils';
	import type {
		CheckboxStyling,
		CheckboxBehavior,
		CheckboxEventDetail,
		FocusEventDetail
	} from './types.js';

	// Core props
	export let id: string | undefined = undefined;
	export let name: string = 'checkbox';
	export let checked: boolean = false;
	export let value: any = undefined;
	export let label: string = '';
	export let checkboxRef: HTMLInputElement | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	// Generate unique ID if not provided (SSR-safe)
	let checkboxId: string = id || safeUniqueId('checkbox-');

	// Grouped props
	export let styling: CheckboxStyling = {};
	export let behavior: CheckboxBehavior = {};

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
		readonly: behavior?.readonly ?? false,
		required: behavior?.required ?? false,
		stopPropagation: behavior?.stopPropagation ?? false
	};

	// Constants
	const dispatch = createEventDispatcher<{
		change: CheckboxEventDetail;
		focus: FocusEventDetail;
		blur: FocusEventDetail;
	}>();

	const sizes: Record<typeof computedStyling.size, string> = {
		xs: '0.75rem',
		sm: '1rem',
		md: '1.25rem',
		lg: '1.5rem',
		xl: '1.75rem'
	};

	// Event handlers
	const handleChange = (event: Event) => {
		if (computedBehavior.disabled || computedBehavior.readonly) return;
		if (computedBehavior.stopPropagation) event.stopPropagation();

		const target = event.target as HTMLInputElement;
		checked = target.checked;

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
	class="checkbox-wrapper {computedStyling.wrapperClass}"
	style="--checkbox-size: {sizes[computedStyling.size]}; {computedStyling.wrapperStyle}"
	on:click={(e) => {
		if (computedBehavior.stopPropagation) e.stopPropagation();
	}}
	role="presentation"
>
	<label class="checkbox-container {computedStyling.labelClass}" for={checkboxId}>
		<input
			type="checkbox"
			class={computedStyling.inputClass}
			id={checkboxId}
			bind:this={checkboxRef}
			{name}
			{checked}
			disabled={computedBehavior.disabled}
			required={computedBehavior.required}
			readonly={computedBehavior.readonly}
			{value}
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy ||
				($$slots.description ? `${checkboxId}-description` : undefined)}
			{...$$restProps}
		/>
		<span class="checkmark" data-variant={computedStyling.variant} />
		<slot name="label">
			{#if label}
				<span class="label-text">{label}</span>
			{/if}
		</slot>
	</label>
	{#if $$slots.description}
		<div id="{checkboxId}-description" class="description">
			<slot name="description" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.checkbox-wrapper {
		/* CSS Custom Properties */
		--checkbox-size: 1.25rem;
		--checkbox-border-width: 2px;
		--checkbox-border-radius: 0.25rem;
		--checkbox-transition: all 0.2s ease-in-out;
		--checkbox-gap: 0.5rem;

		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.checkbox-container {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--checkbox-gap);
		cursor: pointer;
		font-size: 1rem;
	}

	.checkbox-container input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.checkmark {
		flex-shrink: 0;
		position: relative;
		width: var(--checkbox-size);
		height: var(--checkbox-size);
		border: var(--checkbox-border-width) solid var(--checkbox-border-color, currentColor);
		border-radius: var(--checkbox-border-radius);
		background-color: var(--checkbox-background, transparent);
		transition: var(--checkbox-transition);
	}

	.checkmark::after {
		content: '';
		position: absolute;
		display: none;
		left: calc(var(--checkbox-size) * 0.25);
		top: calc(var(--checkbox-size) * 0.1);
		width: calc(var(--checkbox-size) * 0.25);
		height: calc(var(--checkbox-size) * 0.5);
		border: solid var(--checkbox-checkmark-color, currentColor);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.checkbox-container input:checked ~ .checkmark::after {
		display: block;
	}

	.checkbox-container input:focus-visible ~ .checkmark {
		outline: 2px solid var(--checkbox-focus-ring-color, var(--color-primary, #3b82f6));
		outline-offset: 2px;
	}

	.checkbox-container:hover input:not(:disabled):not(:checked) ~ .checkmark {
		border-color: var(--checkbox-focus-ring-color, var(--color-primary, #3b82f6));
	}

	.checkbox-container input:disabled ~ .checkmark {
		opacity: var(--checkbox-disabled-opacity, 0.5);
		cursor: not-allowed;
		background-color: #f3f4f6;
	}

	.checkbox-container input:disabled ~ .label-text {
		opacity: var(--checkbox-disabled-opacity, 0.5);
	}

	.label-text {
		user-select: none;
	}

	.description {
		font-size: 0.875rem;
		color: #6b7280;
		margin-left: calc(var(--checkbox-size) + var(--checkbox-gap));
	}

	/* Variants */
	.checkmark[data-variant='primary'] {
		--checkbox-border-color: var(--color-primary, #3b82f6);
		--checkbox-focus-ring-color: var(--color-primary, #3b82f6);
	}

	.checkmark[data-variant='success'] {
		--checkbox-border-color: var(--color-success, #10b981);
		--checkbox-focus-ring-color: var(--color-success, #10b981);
	}

	.checkmark[data-variant='error'] {
		--checkbox-border-color: var(--color-error, #ef4444);
		--checkbox-focus-ring-color: var(--color-error, #ef4444);
	}
</style>
