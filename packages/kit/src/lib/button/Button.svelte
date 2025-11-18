<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { ButtonVariant, ButtonSize, ButtonState, IconPosition, ButtonProps } from '../types.js';

	// Props with defaults
	export let variant: ButtonProps['variant'] = "filled";
	export let size: ButtonProps['size'] = "md";
	export let state: ButtonProps['state'] = undefined;
	export let label: ButtonProps['label'] = "";
	export let fullRounded: ButtonProps['fullRounded'] = false;
	export let className: ButtonProps['className'] = "";
	export let disabled: ButtonProps['disabled'] = false;
	export let loading: ButtonProps['loading'] = false;
	export let loadingMessage: ButtonProps['loadingMessage'] = "Loading...";
	export let stopPropagation: ButtonProps['stopPropagation'] = false;
	export let fillColor: ButtonProps['fillColor'] = undefined;
	export let textColor: ButtonProps['textColor'] = undefined;
	export let outlineColor: ButtonProps['outlineColor'] = undefined;
	export let href: ButtonProps['href'] = undefined;
	export let target: ButtonProps['target'] = undefined;
	export let rel: ButtonProps['rel'] = undefined;
	export let iconPosition: ButtonProps['iconPosition'] = "left";
	export let ariaLabel: ButtonProps['ariaLabel'] = undefined;


	const dispatch = createEventDispatcher<{
		click: MouseEvent;
		dragstart: { event: DragEvent };
		focus: FocusEvent;
		blur: FocusEvent;
		keydown: KeyboardEvent;
	}>();

	// Determine actual state
	$: actualState = state || 'default';

	// Determine if loading
	$: isLoading = loading;
	$: loadingMsg = loadingMessage;

	// Determine element type
	const httpRegex = /^((http|https):\/\/)/;
	$: isExternal = !!href && httpRegex.test(href);
	$: elementTag = href ? "a" : "button";
	$: linkTarget = target || (isExternal ? "_blank" : undefined);
	$: linkRel = rel || (isExternal ? "noopener noreferrer" : undefined);

	// Generate CSS custom properties for style overrides
	$: customStyles = (() => {
		const styles: string[] = [];
		if (fillColor) styles.push(`--btn-bg: ${fillColor}`);
		if (textColor) styles.push(`--btn-text: ${textColor}`);
		if (outlineColor) styles.push(`--btn-border: ${outlineColor}`);
		return styles.join("; ");
	})();

	// Hover state
	let hovering = false;
	const handleMouseEnter = () => { hovering = true; };
	const handleMouseLeave = () => { hovering = false; };

	// Event handlers
	const handleClick = (e: MouseEvent) => {
		if (disabled || isLoading) return;
		if (stopPropagation) e.stopPropagation();
		dispatch("click", e);
	};

	const handleDragStart = (e: DragEvent) => {
		dispatch("dragstart", { event: e });
	};

	$: computedAriaLabel = ariaLabel;

	$: elementAttributes = elementTag === 'a' ? {
		href,
		rel: linkRel,
		target: linkTarget
	} : {
		disabled: disabled || isLoading
	};
</script>

<!-- svelte-ignore a11y-unknown-attribute -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={elementTag}
	{...elementAttributes}
	aria-label={computedAriaLabel}
	aria-busy={isLoading}
	aria-disabled={disabled || isLoading}
	aria-pressed={elementTag === 'button' && actualState === 'active' ? true : undefined}
	class="btn btn--{variant} btn--{size} {className}"
	class:btn--full-rounded={fullRounded}
	class:btn--disabled={disabled || isLoading}
	class:btn--state-active={actualState === 'active'}
	class:btn--state-selected={actualState === 'selected'}
	class:btn--state-highlight={actualState === 'highlight'}
	style={customStyles}
	{...$$restProps}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:click={handleClick}
	on:dragstart={handleDragStart}
	on:focus={(e) => dispatch("focus", e)}
	on:blur={(e) => dispatch("blur", e)}
	on:keydown={(e) => dispatch("keydown", e)}
>
	{#if isLoading}
		<slot name="loading" {loadingMsg}>
			<div class="btn__loading">
				<svg 
					class="btn__spinner" 
					xmlns="http://www.w3.org/2000/svg" 
					width="24" 
					height="24" 
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path 
						fill="currentColor" 
						d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0m0-2a9.001 9.001 0 0 1 17.89 0h-2.016A7.002 7.002 0 0 0 5.07 11z"
					/>
				</svg>
				{#if loadingMsg}
					<span class="btn__loading-message">{loadingMsg}</span>
				{/if}
			</div>
		</slot>
	{:else}
		<div class="btn__content" data-icon-position={iconPosition}>
			{#if iconPosition === 'left' || iconPosition === 'only'}
				<slot name="icon" />
			{/if}
			{#if iconPosition !== 'only'}
				<slot {hovering}>
					{#if label}
						<span class="btn__label">{label}</span>
					{/if}
				</slot>
			{:else}
				<slot name="icon" />
			{/if}
			{#if iconPosition === 'right'}
				<slot name="icon" />
			{/if}
		</div>
	{/if}
</svelte:element>

<style lang="postcss">
	/* CSS Custom Properties - Design Tokens */
	.btn {
		/* Layout */
		--btn-display: flex;
		--btn-align-items: center;
		--btn-justify-content: center;
		--btn-gap: var(--btn-gap-md, 0.5rem);
		--btn-position: relative;
		
		/* Spacing */
		--btn-padding-x: var(--btn-padding-x-md, 1rem);
		--btn-padding-y: var(--btn-padding-y-md, 0.5rem);
		--btn-min-height: var(--btn-min-height-md, 2.5rem);
		
		/* Typography */
		--btn-font-size: var(--btn-font-size-md, 1rem);
		--btn-font-weight: 500;
		--btn-line-height: 1.5;
		--btn-white-space: nowrap;
		
		/* Appearance */
		--btn-border-radius: var(--btn-border-radius-md, 0.5rem);
		--btn-border-width: 0;
		--btn-border-style: solid;
		--btn-border-color: transparent;
		
		/* Colors - Default (can be overridden by variant or props) */
		--btn-bg: var(--btn-bg-default, #1b1c21);
		--btn-bg-hover: var(--btn-bg-hover-default, #2a2b30);
		--btn-bg-active: var(--btn-bg-active-default, #0f1012);
		--btn-bg-disabled: var(--btn-bg-disabled-default, #e5e7eb);
		
		--btn-text: var(--btn-text-default, #ffffff);
		--btn-text-hover: var(--btn-text-hover-default, #ffffff);
		--btn-text-active: var(--btn-text-active-default, #ffffff);
		--btn-text-disabled: var(--btn-text-disabled-default, #9ca3af);
		
		--btn-border: var(--btn-border-default, transparent);
		--btn-border-hover: var(--btn-border-hover-default, transparent);
		--btn-border-active: var(--btn-border-active-default, transparent);
		--btn-border-disabled: var(--btn-border-disabled-default, #d1d5db);
		
		/* Focus */
		--btn-focus-ring-width: 2px;
		--btn-focus-ring-offset: 2px;
		--btn-focus-ring-color: var(--btn-focus-ring-color-default, #3b82f6);
		
		/* Transitions */
		--btn-transition-duration: 0.2s;
		--btn-transition-timing: ease-in-out;
		
		/* Base styles */
		display: var(--btn-display);
		align-items: var(--btn-align-items);
		justify-content: var(--btn-justify-content);
		gap: var(--btn-gap);
		position: var(--btn-position);
		
		padding: var(--btn-padding-y) var(--btn-padding-x);
		min-height: var(--btn-min-height);
		
		font-size: var(--btn-font-size);
		font-weight: var(--btn-font-weight);
		line-height: var(--btn-line-height);
		white-space: var(--btn-white-space);
		
		border-radius: var(--btn-border-radius);
		border: var(--btn-border-width) var(--btn-border-style) var(--btn-border);
		
		background-color: var(--btn-bg);
		color: var(--btn-text);
		
		cursor: pointer;
		text-decoration: none;
		user-select: none;
		
		transition:
			background-color var(--btn-transition-duration) var(--btn-transition-timing),
			color var(--btn-transition-duration) var(--btn-transition-timing),
			border-color var(--btn-transition-duration) var(--btn-transition-timing),
			box-shadow var(--btn-transition-duration) var(--btn-transition-timing),
			transform var(--btn-transition-duration) var(--btn-transition-timing);
	}

	/* Size variants */
	.btn--sm {
		--btn-padding-x: var(--btn-padding-x-sm, 0.75rem);
		--btn-padding-y: var(--btn-padding-y-sm, 0.375rem);
		--btn-min-height: var(--btn-min-height-sm, 2rem);
		--btn-font-size: var(--btn-font-size-sm, 0.875rem);
		--btn-gap: var(--btn-gap-sm, 0.375rem);
		--btn-border-radius: var(--btn-border-radius-sm, 0.375rem);
	}

	.btn--md {
		--btn-padding-x: var(--btn-padding-x-md, 1rem);
		--btn-padding-y: var(--btn-padding-y-md, 0.5rem);
		--btn-min-height: var(--btn-min-height-md, 2.5rem);
		--btn-font-size: var(--btn-font-size-md, 1rem);
		--btn-gap: var(--btn-gap-md, 0.5rem);
		--btn-border-radius: var(--btn-border-radius-md, 0.5rem);
	}

	.btn--lg {
		--btn-padding-x: var(--btn-padding-x-lg, 1.25rem);
		--btn-padding-y: var(--btn-padding-y-lg, 0.625rem);
		--btn-min-height: var(--btn-min-height-lg, 3rem);
		--btn-font-size: var(--btn-font-size-lg, 1.125rem);
		--btn-gap: var(--btn-gap-lg, 0.625rem);
		--btn-border-radius: var(--btn-border-radius-lg, 0.625rem);
	}

	.btn--xl {
		--btn-padding-x: var(--btn-padding-x-xl, 1.5rem);
		--btn-padding-y: var(--btn-padding-y-xl, 0.75rem);
		--btn-min-height: var(--btn-min-height-xl, 3.5rem);
		--btn-font-size: var(--btn-font-size-xl, 1.25rem);
		--btn-gap: var(--btn-gap-xl, 0.75rem);
		--btn-border-radius: var(--btn-border-radius-xl, 0.75rem);
	}

	/* Variant styles */
	.btn--filled {
		--btn-bg: var(--btn-bg-filled, #1b1c21);
		--btn-bg-hover: var(--btn-bg-filled-hover, #2a2b30);
		--btn-bg-active: var(--btn-bg-filled-active, #0f1012);
		--btn-text: var(--btn-text-filled, #ffffff);
		--btn-text-hover: var(--btn-text-filled-hover, #ffffff);
		--btn-text-active: var(--btn-text-filled-active, #ffffff);
	}

	.btn--outlined {
		--btn-bg: transparent;
		--btn-bg-hover: var(--btn-bg-outlined-hover, rgba(27, 28, 33, 0.05));
		--btn-bg-active: var(--btn-bg-outlined-active, rgba(27, 28, 33, 0.1));
		--btn-border-width: 2px;
		--btn-border: var(--btn-border-outlined, #1b1c21);
		--btn-border-hover: var(--btn-border-outlined-hover, #2a2b30);
		--btn-border-active: var(--btn-border-outlined-active, #0f1012);
		--btn-text: var(--btn-text-outlined, #1b1c21);
		--btn-text-hover: var(--btn-text-outlined-hover, #1b1c21);
		--btn-text-active: var(--btn-text-outlined-active, #1b1c21);
	}

	.btn--text {
		--btn-bg: transparent;
		--btn-bg-hover: var(--btn-bg-text-hover, rgba(27, 28, 33, 0.05));
		--btn-bg-active: var(--btn-bg-text-active, rgba(27, 28, 33, 0.1));
		--btn-text: var(--btn-text-text, #1b1c21);
		--btn-text-hover: var(--btn-text-text-hover, #1b1c21);
		--btn-text-active: var(--btn-text-text-active, #1b1c21);
	}

	.btn--link {
		--btn-bg: transparent;
		--btn-bg-hover: transparent;
		--btn-bg-active: transparent;
		--btn-text: var(--btn-text-link, #3b82f6);
		--btn-text-hover: var(--btn-text-link-hover, #2563eb);
		--btn-text-active: var(--btn-text-link-active, #1d4ed8);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* State modifiers */
	.btn--state-active {
		--btn-bg: var(--btn-bg-active);
		--btn-text: var(--btn-text-active);
		--btn-border: var(--btn-border-active);
	}

	.btn--state-selected {
		--btn-bg: var(--btn-bg-selected, var(--btn-bg-hover));
		--btn-text: var(--btn-text-selected, var(--btn-text-hover));
		--btn-border: var(--btn-border-selected, var(--btn-border-hover));
	}

	.btn--state-highlight {
		--btn-bg: var(--btn-bg-highlight, #fef3c7);
		--btn-text: var(--btn-text-highlight, #92400e);
		--btn-border: var(--btn-border-highlight, #fbbf24);
	}

	/* Full rounded */
	.btn--full-rounded {
		--btn-border-radius: 9999px !important;
	}

	/* Interactive states */
	.btn:not(.btn--disabled):hover {
		background-color: var(--btn-bg-hover);
		color: var(--btn-text-hover);
		border-color: var(--btn-border-hover);
	}

	.btn:not(.btn--disabled):active {
		background-color: var(--btn-bg-active);
		color: var(--btn-text-active);
		border-color: var(--btn-border-active);
		transform: scale(0.98);
	}

	.btn:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--btn-focus-ring-width) var(--btn-focus-ring-color),
			0 0 0 calc(var(--btn-focus-ring-width) + var(--btn-focus-ring-offset)) transparent;
	}

	/* Disabled state */
	.btn--disabled,
	.btn--disabled:hover,
	.btn--disabled:active,
	.btn--disabled:focus-visible {
		cursor: not-allowed;
		opacity: 0.6;
		background-color: var(--btn-bg-disabled);
		color: var(--btn-text-disabled);
		border-color: var(--btn-border-disabled);
		transform: none;
		box-shadow: none;
	}

	/* Content layout */
	.btn__content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: inherit;
		width: 100%;
	}

	.btn__content[data-icon-position="only"] {
		width: auto;
	}

	.btn__label {
		white-space: nowrap;
	}

	/* Loading state */
	.btn__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--btn-gap);
		width: 100%;
	}

	.btn__spinner {
		width: 1em;
		height: 1em;
		animation: btn-spin 1s linear infinite;
	}

	.btn__loading-message {
		font-style: italic;
		opacity: 0.9;
	}

	@keyframes btn-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
