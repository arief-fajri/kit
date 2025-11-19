<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import type { AccordionStyling, AccordionBehavior, AccordionContent } from "../types.js";

  // Props with defaults
  export let expanded: boolean | undefined = undefined;
  export let defaultExpanded: boolean = false;
  export let styling: AccordionStyling = {};
  export let behavior: AccordionBehavior = {};
  export let content: AccordionContent = {};

  const dispatch = createEventDispatcher<{
    expand: { expanded: boolean };
    collapse: { expanded: boolean };
    toggle: { expanded: boolean; previousState: boolean };
    click: boolean;
  }>();

  // Internal state for uncontrolled mode
  let internalExpanded = defaultExpanded;
  let contentId = `accordion-content-${Math.random().toString(36).substring(2, 11)}`;
  let buttonId = `accordion-button-${Math.random().toString(36).substring(2, 11)}`;

  // Computed props with defaults
  $: computedStyling = {
    size: styling.size || 'md',
    variant: styling.variant || 'default',
    className: styling.className || '',
    headerWrapperClass: styling.headerWrapperClass || '',
    headerButtonClass: styling.headerButtonClass || '',
    contentClass: styling.contentClass || '',
    iconClass: styling.iconClass || '',
    wrapperStyle: styling.wrapperStyle || ''
  };

  $: computedBehavior = {
    disabled: behavior.disabled ?? false,
    showIcon: behavior.showIcon ?? true,
    iconPosition: behavior.iconPosition || 'right',
    transitionDuration: behavior.transitionDuration ?? 300,
    titleUnderline: behavior.titleUnderline ?? false
  };

  $: computedContent = {
    item: content.item,
    title: content.title || content.item?.title || '',
    subtitle: content.subtitle || content.item?.subtitle,
    content: content.content || content.item?.content
  };

  // Determine actual expanded state (controlled vs uncontrolled)
  // If expanded prop is provided, use it (controlled), otherwise use internal state (uncontrolled)
  $: isExpanded = expanded !== undefined ? expanded : internalExpanded;

  // Handle toggle
  function handleToggle() {
    if (computedBehavior.disabled) return;
    
    const previousState = isExpanded;
    const newState = !isExpanded;
    
    // Update internal state only if uncontrolled
    if (expanded === undefined) {
      internalExpanded = newState;
    }
    
    if (newState) {
      dispatch("expand", { expanded: true });
    } else {
      dispatch("collapse", { expanded: false });
    }
    
    dispatch("toggle", { expanded: newState, previousState });
    dispatch("click", newState);
  }

  // Handle keyboard
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }
</script>

<div
  class="accordion accordion--{computedStyling.size} accordion--variant-{computedStyling.variant} {computedStyling.className}"
  class:accordion--expanded={isExpanded}
  class:accordion--disabled={computedBehavior.disabled}
  style={computedStyling.wrapperStyle}
  {...$$restProps}
>
  <div class="accordion__header-wrapper {computedStyling.headerWrapperClass}">
    <button
      id={buttonId}
      class="accordion__header {computedStyling.headerButtonClass}"
      class:accordion__header--underline={computedBehavior.titleUnderline && isExpanded}
      disabled={computedBehavior.disabled}
      aria-expanded={isExpanded}
      aria-controls={contentId}
      aria-disabled={computedBehavior.disabled}
      on:click={handleToggle}
      on:keydown={handleKeydown}
    >
      {#if computedBehavior.showIcon && computedBehavior.iconPosition === 'left'}
        <div class="accordion__icon {computedStyling.iconClass}" class:accordion__icon--rotated={isExpanded}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      {/if}

      <slot name="header" {isExpanded} disabled={computedBehavior.disabled}>
        <div class="accordion__header-content">
          <p class="accordion__title" class:accordion__title--bold={isExpanded}>
            {computedContent.title}
          </p>
          {#if computedContent.subtitle}
            <p class="accordion__subtitle">{computedContent.subtitle}</p>
          {/if}
        </div>
      </slot>

      {#if computedBehavior.showIcon && computedBehavior.iconPosition === 'right'}
        <div class="accordion__icon {computedStyling.iconClass}" class:accordion__icon--rotated={isExpanded}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      {/if}
    </button>
  </div>

  {#if isExpanded}
    <div
      id={contentId}
      class="accordion__content {computedStyling.contentClass}"
      role="region"
      aria-labelledby={buttonId}
      transition:slide={{ duration: computedBehavior.transitionDuration }}
    >
      <slot name="content" {isExpanded}>
        {#if computedContent.content}
          {@html computedContent.content}
        {/if}
      </slot>
    </div>
  {/if}
</div>

<style lang="postcss">
  /* CSS Custom Properties - Design Tokens */
  .accordion {
    /* Layout */
    --accordion-display: flex;
    --accordion-flex-direction: column;
    --accordion-align-items: center;
    --accordion-justify-content: center;
    --accordion-width: 100%;
    
    /* Spacing */
    --accordion-padding-x-sm: 0.5rem;
    --accordion-padding-x-md: 0.5rem;
    --accordion-padding-x-lg: 0.75rem;
    --accordion-padding-y-sm: 0.25rem;
    --accordion-padding-y-md: 0.5rem;
    --accordion-padding-y-lg: 0.75rem;
    --accordion-gap: 0;
    
    /* Typography */
    --accordion-font-size-sm: 0.875rem;
    --accordion-font-size-md: 1rem;
    --accordion-font-size-lg: 1.125rem;
    --accordion-font-weight: 400;
    --accordion-font-weight-bold: 500;
    --accordion-line-height: 1.5;
    
    /* Colors - Default */
    --accordion-bg: transparent;
    --accordion-bg-hover: var(--color-surface-hover, #f9fafb);
    --accordion-text: var(--color-text, #111827);
    --accordion-text-hover: var(--color-primary, #3b82f6);
    --accordion-text-subtitle: var(--color-text-muted, #6b7280);
    --accordion-border-color: var(--color-border, #d1d5db);
    --accordion-icon-color: var(--color-text, #111827);
    --accordion-icon-color-hover: var(--color-primary, #3b82f6);
    
    /* Transitions */
    --accordion-transition-duration: 300ms;
    --accordion-transition-easing: ease;
    
    /* Border */
    --accordion-border-radius: var(--radius-md, 0.375rem);
    --accordion-border-width: 1px;
    
    display: var(--accordion-display);
    flex-direction: var(--accordion-flex-direction);
    align-items: var(--accordion-align-items);
    justify-content: var(--accordion-justify-content);
    width: var(--accordion-width);
    transition: all var(--accordion-transition-duration) var(--accordion-transition-easing);
  }

  /* Size variants */
  .accordion--sm {
    --accordion-padding-x: var(--accordion-padding-x-sm);
    --accordion-padding-y: var(--accordion-padding-y-sm);
    --accordion-font-size: var(--accordion-font-size-sm);
  }

  .accordion--md {
    --accordion-padding-x: var(--accordion-padding-x-md);
    --accordion-padding-y: var(--accordion-padding-y-md);
    --accordion-font-size: var(--accordion-font-size-md);
  }

  .accordion--lg {
    --accordion-padding-x: var(--accordion-padding-x-lg);
    --accordion-padding-y: var(--accordion-padding-y-lg);
    --accordion-font-size: var(--accordion-font-size-lg);
  }

  /* Variant styles */
  .accordion--variant-filled {
    --accordion-bg: var(--color-surface, #ffffff);
    --accordion-bg-hover: var(--color-surface-hover, #f3f4f6);
  }

  .accordion--variant-outlined {
    --accordion-border-width: 1px;
    --accordion-border-color: var(--color-border, #d1d5db);
  }

  /* Header wrapper */
  .accordion__header-wrapper {
    width: 100%;
    padding: var(--accordion-padding-y, var(--accordion-padding-y-md)) 0;
  }

  /* Header button */
  .accordion__header {
    padding: var(--accordion-padding-x, var(--accordion-padding-x-md)) var(--accordion-padding-x, var(--accordion-padding-x-md));
    border: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    color: var(--accordion-text);
    font-size: var(--accordion-font-size, var(--accordion-font-size-md));
    font-weight: var(--accordion-font-weight);
    line-height: var(--accordion-line-height);
    transition: color var(--accordion-transition-duration) var(--accordion-transition-easing);
  }

  .accordion__header:hover:not(:disabled) {
    color: var(--accordion-text-hover);
  }

  .accordion__header:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .accordion__header--underline {
    border-bottom: var(--accordion-border-width) solid var(--accordion-border-color);
  }

  /* Header content */
  .accordion__header-content {
    flex: 1;
    width: 100%;
  }

  /* Title */
  .accordion__title {
    margin: 0;
    font-size: var(--accordion-font-size, var(--accordion-font-size-md));
    font-weight: var(--accordion-font-weight);
    line-height: var(--accordion-line-height);
    color: var(--accordion-text);
    transition: font-weight var(--accordion-transition-duration) var(--accordion-transition-easing);
  }

  .accordion__title--bold {
    font-weight: var(--accordion-font-weight-bold);
  }

  /* Subtitle */
  .accordion__subtitle {
    margin: 0.25rem 0 0 0;
    font-size: 0.8rem;
    font-style: italic;
    line-height: var(--accordion-line-height);
    color: var(--accordion-text-subtitle);
  }

  /* Icon */
  .accordion__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accordion-icon-color);
    transition: transform var(--accordion-transition-duration) var(--accordion-transition-easing),
                color var(--accordion-transition-duration) var(--accordion-transition-easing);
  }

  .accordion__header:hover:not(:disabled) .accordion__icon {
    color: var(--accordion-icon-color-hover);
  }

  .accordion__icon--rotated {
    transform: rotate(180deg);
  }

  .accordion__icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Content */
  .accordion__content {
    width: 100%;
    color: var(--accordion-text);
  }

  /* Disabled state */
  .accordion--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* Expanded state */
  .accordion--expanded {
    /* Additional styles for expanded state if needed */
  }
</style>
