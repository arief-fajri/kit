<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { uniqueId } from "@rief/utils";
	import type { [ComponentName]Variant, [ComponentName]Size, [ComponentName]State, [ComponentName]Props } from '../types.js';

	// Props with defaults
	export let variant: [ComponentName]Props['variant'] = "[default-variant]";
	export let size: [ComponentName]Props['size'] = "md";
	export let state: [ComponentName]Props['state'] = undefined;
	export let [primaryProp]: [ComponentName]Props['[primaryProp]'] = "[default-value]";
	export let className: [ComponentName]Props['className'] = "";
	export let customStyle: [ComponentName]Props['customStyle'] = "";
	export let disabled: [ComponentName]Props['disabled'] = false;
	export let loading: [ComponentName]Props['loading'] = false;
	export let loadingMessage: [ComponentName]Props['loadingMessage'] = "Loading...";
	export let [customProp1]: [ComponentName]Props['[customProp1]'] = undefined;
	export let [customProp2]: [ComponentName]Props['[customProp2]'] = undefined;
	export let [customProp3]: [ComponentName]Props['[customProp3]'] = false;

	const dispatch = createEventDispatcher<{
		[primaryEvent]: [EventType];
		[secondaryEvent]: [EventType];
		[tertiaryEvent]: [EventType];
		[specialEvent]: { [eventData]: [DataType] };
	}>();

	// Determine actual state
	$: actualState = state || 'default';

	// Determine if loading
	$: isLoading = loading;

	// Generate unique ID if not provided (SSR-safe)
	let [componentId]: string = "";
	onMount(() => {
		if (![componentId]) {
			[componentId] = uniqueId("[component-prefix]-");
		}
	});

	// Generate CSS custom properties for style overrides
	$: customStyles = (() => {
		const styles: string[] = [];
		if ([customProp1]) styles.push(`--[component-prefix]-[property]: ${[customProp1]}`);
		if ([customProp2]) styles.push(`--[component-prefix]-[property]: ${[customProp2]}`);
		if (customStyle) styles.push(customStyle);
		return styles.join("; ");
	})();

	// Component state
	let [internalState] = false;

	// Event handlers
	const [handlePrimaryEvent] = (e: [EventType]) => {
		if (disabled || isLoading) return;
		dispatch("[primaryEvent]", e);
	};

	const [handleSecondaryEvent] = (e: [EventType]) => {
		dispatch("[secondaryEvent]", e);
	};

	const [handleSpecialEvent] = ([eventParam]: [ParamType]) => {
		dispatch("[specialEvent]", { [eventData]: [eventParam] });
	};

	// Computed properties
	$: [computedProperty] = [computation];
</script>

<div
	class="[component-class] [component-class]--{variant} [component-class]--{size} {className}"
	class:[component-class]--disabled={disabled || isLoading}
	class:[component-class]--loading={isLoading}
	class:[component-class]--state-{actualState}={actualState !== 'default'}
	style={customStyles || undefined}
	{...$$restProps}
	on:[primaryEvent]={[handlePrimaryEvent]}
	on:[secondaryEvent]={[handleSecondaryEvent]}
	on:[tertiaryEvent]={(e) => dispatch("[tertiaryEvent]", e)}
>
	{#if isLoading}
		<slot name="loading" let:[loadingData]>
			<div class="[component-class]__loading">
				<svg 
					class="[component-class]__spinner" 
					xmlns="http://www.w3.org/2000/svg" 
					width="24" 
					height="24" 
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path 
						fill="currentColor" 
						d="[spinner-path-data]"
					/>
				</svg>
				{#if [loadingMessage]}
					<span class="[component-class]__loading-message">{[loadingMessage]}</span>
				{/if}
			</div>
		</slot>
	{:else}
		<div class="[component-class]__content" data-[attribute]="{[value]}">
			{#if [condition]}
				<slot name="[slot-name]" />
			{/if}
			
			<slot {[slotProp1]} {[slotProp2]}>
				{#if [primaryProp]}
					<span class="[component-class]__[element]">{[primaryProp]}</span>
				{/if}
			</slot>
			
			{#if [anotherCondition]}
				<slot name="[another-slot]" />
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	/* CSS Custom Properties - Design Tokens */
	.[component-class] {
		/* Layout */
		--[component-prefix]-display: [display-value];
		--[component-prefix]-align-items: [alignment];
		--[component-prefix]-justify-content: [justification];
		--[component-prefix]-gap: var(--[component-prefix]-gap-md, [default-gap]);
		--[component-prefix]-position: [position-value];
		
		/* Spacing */
		--[component-prefix]-padding-x: var(--[component-prefix]-padding-x-md, [default-padding-x]);
		--[component-prefix]-padding-y: var(--[component-prefix]-padding-y-md, [default-padding-y]);
		--[component-prefix]-min-height: var(--[component-prefix]-min-height-md, [default-height]);
		
		/* Typography */
		--[component-prefix]-font-size: var(--[component-prefix]-font-size-md, [default-font-size]);
		--[component-prefix]-font-weight: [default-font-weight];
		--[component-prefix]-line-height: [default-line-height];
		
		/* Appearance */
		--[component-prefix]-border-radius: var(--[component-prefix]-border-radius-md, [default-radius]);
		--[component-prefix]-border-width: [default-border-width];
		--[component-prefix]-border-style: solid;
		--[component-prefix]-border-color: transparent;
		
		/* Colors - Default (can be overridden by variant or props) */
		--[component-prefix]-bg: var(--[component-prefix]-bg-default, [default-bg]);
		--[component-prefix]-bg-hover: var(--[component-prefix]-bg-hover-default, [default-bg-hover]);
		--[component-prefix]-bg-active: var(--[component-prefix]-bg-active-default, [default-bg-active]);
		--[component-prefix]-bg-disabled: var(--[component-prefix]-bg-disabled-default, [default-bg-disabled]);
		
		--[component-prefix]-text: var(--[component-prefix]-text-default, [default-text]);
		--[component-prefix]-text-hover: var(--[component-prefix]-text-hover-default, [default-text-hover]);
		--[component-prefix]-text-active: var(--[component-prefix]-text-active-default, [default-text-active]);
		--[component-prefix]-text-disabled: var(--[component-prefix]-text-disabled-default, [default-text-disabled]);
		
		--[component-prefix]-border: var(--[component-prefix]-border-default, transparent);
		--[component-prefix]-border-hover: var(--[component-prefix]-border-hover-default, transparent);
		--[component-prefix]-border-active: var(--[component-prefix]-border-active-default, transparent);
		--[component-prefix]-border-disabled: var(--[component-prefix]-border-disabled-default, [default-border-disabled]);
		
		/* Focus */
		--[component-prefix]-focus-ring-width: [focus-ring-width];
		--[component-prefix]-focus-ring-offset: [focus-ring-offset];
		--[component-prefix]-focus-ring-color: var(--[component-prefix]-focus-ring-color-default, [default-focus-color]);
		
		/* Transitions */
		--[component-prefix]-transition-duration: [transition-duration];
		--[component-prefix]-transition-timing: [transition-timing];
		
		/* Base styles */
		display: var(--[component-prefix]-display);
		align-items: var(--[component-prefix]-align-items);
		justify-content: var(--[component-prefix]-justify-content);
		gap: var(--[component-prefix]-gap);
		position: var(--[component-prefix]-position);
		
		padding: var(--[component-prefix]-padding-y) var(--[component-prefix]-padding-x);
		min-height: var(--[component-prefix]-min-height);
		
		font-size: var(--[component-prefix]-font-size);
		font-weight: var(--[component-prefix]-font-weight);
		line-height: var(--[component-prefix]-line-height);
		
		border-radius: var(--[component-prefix]-border-radius);
		border: var(--[component-prefix]-border-width) var(--[component-prefix]-border-style) var(--[component-prefix]-border);
		
		background-color: var(--[component-prefix]-bg);
		color: var(--[component-prefix]-text);
		
		cursor: [cursor-type];
		user-select: none;
		
		transition:
			background-color var(--[component-prefix]-transition-duration) var(--[component-prefix]-transition-timing),
			color var(--[component-prefix]-transition-duration) var(--[component-prefix]-transition-timing),
			border-color var(--[component-prefix]-transition-duration) var(--[component-prefix]-transition-timing),
			box-shadow var(--[component-prefix]-transition-duration) var(--[component-prefix]-transition-timing),
			transform var(--[component-prefix]-transition-duration) var(--[component-prefix]-transition-timing);
	}

	/* Size variants */
	.[component-class]--sm {
		--[component-prefix]-padding-x: var(--[component-prefix]-padding-x-sm, [sm-padding-x]);
		--[component-prefix]-padding-y: var(--[component-prefix]-padding-y-sm, [sm-padding-y]);
		--[component-prefix]-min-height: var(--[component-prefix]-min-height-sm, [sm-height]);
		--[component-prefix]-font-size: var(--[component-prefix]-font-size-sm, [sm-font-size]);
		--[component-prefix]-gap: var(--[component-prefix]-gap-sm, [sm-gap]);
		--[component-prefix]-border-radius: var(--[component-prefix]-border-radius-sm, [sm-radius]);
	}

	.[component-class]--md {
		--[component-prefix]-padding-x: var(--[component-prefix]-padding-x-md, [md-padding-x]);
		--[component-prefix]-padding-y: var(--[component-prefix]-padding-y-md, [md-padding-y]);
		--[component-prefix]-min-height: var(--[component-prefix]-min-height-md, [md-height]);
		--[component-prefix]-font-size: var(--[component-prefix]-font-size-md, [md-font-size]);
		--[component-prefix]-gap: var(--[component-prefix]-gap-md, [md-gap]);
		--[component-prefix]-border-radius: var(--[component-prefix]-border-radius-md, [md-radius]);
	}

	.[component-class]--lg {
		--[component-prefix]-padding-x: var(--[component-prefix]-padding-x-lg, [lg-padding-x]);
		--[component-prefix]-padding-y: var(--[component-prefix]-padding-y-lg, [lg-padding-y]);
		--[component-prefix]-min-height: var(--[component-prefix]-min-height-lg, [lg-height]);
		--[component-prefix]-font-size: var(--[component-prefix]-font-size-lg, [lg-font-size]);
		--[component-prefix]-gap: var(--[component-prefix]-gap-lg, [lg-gap]);
		--[component-prefix]-border-radius: var(--[component-prefix]-border-radius-lg, [lg-radius]);
	}

	.[component-class]--xl {
		--[component-prefix]-padding-x: var(--[component-prefix]-padding-x-xl, [xl-padding-x]);
		--[component-prefix]-padding-y: var(--[component-prefix]-padding-y-xl, [xl-padding-y]);
		--[component-prefix]-min-height: var(--[component-prefix]-min-height-xl, [xl-height]);
		--[component-prefix]-font-size: var(--[component-prefix]-font-size-xl, [xl-font-size]);
		--[component-prefix]-gap: var(--[component-prefix]-gap-xl, [xl-gap]);
		--[component-prefix]-border-radius: var(--[component-prefix]-border-radius-xl, [xl-radius]);
	}

	/* Variant styles */
	.[component-class]--[variant1] {
		--[component-prefix]-bg: var(--[component-prefix]-bg-[variant1], [variant1-bg]);
		--[component-prefix]-bg-hover: var(--[component-prefix]-bg-[variant1]-hover, [variant1-bg-hover]);
		--[component-prefix]-bg-active: var(--[component-prefix]-bg-[variant1]-active, [variant1-bg-active]);
		--[component-prefix]-text: var(--[component-prefix]-text-[variant1], [variant1-text]);
		--[component-prefix]-text-hover: var(--[component-prefix]-text-[variant1]-hover, [variant1-text-hover]);
		--[component-prefix]-text-active: var(--[component-prefix]-text-[variant1]-active, [variant1-text-active]);
	}

	.[component-class]--[variant2] {
		--[component-prefix]-bg: transparent;
		--[component-prefix]-bg-hover: var(--[component-prefix]-bg-[variant2]-hover, [variant2-bg-hover]);
		--[component-prefix]-bg-active: var(--[component-prefix]-bg-[variant2]-active, [variant2-bg-active]);
		--[component-prefix]-border-width: [variant2-border-width];
		--[component-prefix]-border: var(--[component-prefix]-border-[variant2], [variant2-border]);
		--[component-prefix]-border-hover: var(--[component-prefix]-border-[variant2]-hover, [variant2-border-hover]);
		--[component-prefix]-border-active: var(--[component-prefix]-border-[variant2]-active, [variant2-border-active]);
		--[component-prefix]-text: var(--[component-prefix]-text-[variant2], [variant2-text]);
		--[component-prefix]-text-hover: var(--[component-prefix]-text-[variant2]-hover, [variant2-text-hover]);
		--[component-prefix]-text-active: var(--[component-prefix]-text-[variant2]-active, [variant2-text-active]);
	}

	.[component-class]--[variant3] {
		--[component-prefix]-bg: transparent;
		--[component-prefix]-bg-hover: var(--[component-prefix]-bg-[variant3]-hover, [variant3-bg-hover]);
		--[component-prefix]-bg-active: var(--[component-prefix]-bg-[variant3]-active, [variant3-bg-active]);
		--[component-prefix]-text: var(--[component-prefix]-text-[variant3], [variant3-text]);
		--[component-prefix]-text-hover: var(--[component-prefix]-text-[variant3]-hover, [variant3-text-hover]);
		--[component-prefix]-text-active: var(--[component-prefix]-text-[variant3]-active, [variant3-text-active]);
	}

	/* State modifiers */
	.[component-class]--state-[state1] {
		--[component-prefix]-bg: var(--[component-prefix]-bg-[state1]);
		--[component-prefix]-text: var(--[component-prefix]-text-[state1]);
		--[component-prefix]-border: var(--[component-prefix]-border-[state1]);
	}

	.[component-class]--state-[state2] {
		--[component-prefix]-bg: var(--[component-prefix]-bg-[state2], var(--[component-prefix]-bg-hover));
		--[component-prefix]-text: var(--[component-prefix]-text-[state2], var(--[component-prefix]-text-hover));
		--[component-prefix]-border: var(--[component-prefix]-border-[state2], var(--[component-prefix]-border-hover));
	}

	/* Interactive states */
	.[component-class]:not(.[component-class]--disabled):hover {
		background-color: var(--[component-prefix]-bg-hover);
		color: var(--[component-prefix]-text-hover);
		border-color: var(--[component-prefix]-border-hover);
	}

	.[component-class]:not(.[component-class]--disabled):active {
		background-color: var(--[component-prefix]-bg-active);
		color: var(--[component-prefix]-text-active);
		border-color: var(--[component-prefix]-border-active);
		transform: [active-transform];
	}

	.[component-class]:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--[component-prefix]-focus-ring-width) var(--[component-prefix]-focus-ring-color),
			0 0 0 calc(var(--[component-prefix]-focus-ring-width) + var(--[component-prefix]-focus-ring-offset)) transparent;
	}

	/* Disabled state */
	.[component-class]--disabled,
	.[component-class]--disabled:hover,
	.[component-class]--disabled:active,
	.[component-class]--disabled:focus-visible {
		cursor: not-allowed;
		opacity: [disabled-opacity];
		background-color: var(--[component-prefix]-bg-disabled);
		color: var(--[component-prefix]-text-disabled);
		border-color: var(--[component-prefix]-border-disabled);
		transform: none;
		box-shadow: none;
	}

	/* Content layout */
	.[component-class]__content {
		display: [content-display];
		align-items: [content-alignment];
		justify-content: [content-justification];
		gap: inherit;
		width: 100%;
	}

	.[component-class]__[element] {
		[element-styles];
	}

	/* Loading state */
	.[component-class]__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--[component-prefix]-gap);
		width: 100%;
	}

	.[component-class]__spinner {
		width: 1em;
		height: 1em;
		animation: [component-prefix]-spin 1s linear infinite;
	}

	.[component-class]__loading-message {
		font-style: italic;
		opacity: 0.9;
	}

	@keyframes [component-prefix]-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
