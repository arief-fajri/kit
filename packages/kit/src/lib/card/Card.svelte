<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CardVariant, CardSize, CardPadding, CardProps } from "../types.js";

  // Props with defaults
  export let variant: CardProps["variant"] = "default";
  export let size: CardProps["size"] = "md";
  export let padding: CardProps["padding"] = "md";
  export let className: CardProps["className"] = "";
  export let customStyle: CardProps["customStyle"] = "";
  export let interactive: CardProps["interactive"] = false;
  export let clickable: CardProps["clickable"] = false;
  export let backgroundColor: CardProps["backgroundColor"] = undefined;
  export let borderColor: CardProps["borderColor"] = undefined;
  export let shadowColor: CardProps["shadowColor"] = undefined;
  export let rounded: CardProps["rounded"] = true;
  export let borderRadius: CardProps["borderRadius"] = undefined;
  export let disabled: CardProps["disabled"] = false;
  export let ariaLabel: CardProps["ariaLabel"] = undefined;

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
    mouseenter: MouseEvent;
    mouseleave: MouseEvent;
    focus: FocusEvent;
    blur: FocusEvent;
  }>();

  // Generate CSS custom properties for style overrides
  $: customStyles = (() => {
    const styles: string[] = [];
    if (backgroundColor) styles.push(`--card-bg: ${backgroundColor}`);
    if (borderColor) styles.push(`--card-border: ${borderColor}`);
    if (shadowColor) styles.push(`--card-shadow-color: ${shadowColor}`);
    if (borderRadius) styles.push(`--card-border-radius: ${borderRadius}`);
    if (customStyle) styles.push(customStyle);
    return styles.join("; ");
  })();

  // Event handlers
  const handleClick = (e: MouseEvent) => {
    if (disabled || !clickable) return;
    dispatch("click", e);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    dispatch("mouseenter", e);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    dispatch("mouseleave", e);
  };

  // Determine element type
  $: elementTag = clickable ? "button" : "div";
  $: elementAttributes =
    elementTag === "button"
      ? {
          disabled: disabled,
          type: "button"
        }
      : {};

  // Compute classes
  $: cardClasses = `card card--${variant} card--${size} card--padding-${padding} ${className}`;
  $: cardClassesWithModifiers = `${cardClasses} ${rounded ? "card--rounded" : ""} ${interactive ? "card--interactive" : ""} ${clickable ? "card--clickable" : ""} ${disabled ? "card--disabled" : ""}`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={elementTag}
  {...elementAttributes}
  aria-label={ariaLabel}
  class={cardClassesWithModifiers}
  style={customStyles || undefined}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={(e) => dispatch("focus", e)}
  on:blur={(e) => dispatch("blur", e)}
  {...$$restProps}
>
  <slot />
</svelte:element>

<style lang="postcss">
  /* CSS Custom Properties - Design Tokens */
  .card {
    /* Layout */
    --card-display: flex;
    --card-flex-direction: column;
    --card-position: relative;
    --card-box-sizing: border-box;
    --card-gap: 1rem;
    --card-align-items: center;
    --card-justify-content: center;

    /* Spacing */
    --card-padding: var(--card-padding-md, 1rem);

    /* Appearance */
    --card-border-radius: var(--card-border-radius-md, 0.5rem);
    --card-border-width: 1px;
    --card-border-style: solid;
    --card-border-color: var(--card-border-default, #e5e7eb);

    /* Colors */
    --card-bg: var(--card-bg-default, #ffffff);
    --card-bg-hover: var(--card-bg-hover-default, #f9fafb);
    --card-text: var(--card-text-default, #1f2937);

    /* Shadow */
    --card-shadow: none;
    --card-shadow-hover: none;
    --card-shadow-color: rgba(0, 0, 0, 0.1);

    /* Transitions */
    --card-transition-duration: 0.2s;
    --card-transition-timing: ease-in-out;

    /* Base styles */
    display: var(--card-display);
    flex-direction: var(--card-flex-direction);
    gap: var(--card-gap);
    position: var(--card-position);
    box-sizing: var(--card-box-sizing);
    align-items: var(--card-align-items);
    justify-content: var(--card-justify-content);

    padding: var(--card-padding);

    background-color: var(--card-bg);
    color: var(--card-text);

    border: var(--card-border-width) var(--card-border-style) var(--card-border-color);
    border-radius: var(--card-border-radius);

    box-shadow: var(--card-shadow);

    transition:
      background-color var(--card-transition-duration) var(--card-transition-timing),
      border-color var(--card-transition-duration) var(--card-transition-timing),
      box-shadow var(--card-transition-duration) var(--card-transition-timing),
      transform var(--card-transition-duration) var(--card-transition-timing);

    width: 100%;
  }

  /* Size variants */
  .card--sm {
    --card-padding: var(--card-padding-sm, 0.75rem);
    --card-border-radius: var(--card-border-radius-sm, 0.375rem);
  }

  .card--md {
    --card-padding: var(--card-padding-md, 1rem);
    --card-border-radius: var(--card-border-radius-md, 0.5rem);
  }

  .card--lg {
    --card-padding: var(--card-padding-lg, 1.5rem);
    --card-border-radius: var(--card-border-radius-lg, 0.75rem);
  }

  /* Padding variants */
  .card--padding-none {
    --card-padding: 0;
  }

  .card--padding-sm {
    --card-padding: var(--card-padding-sm, 0.75rem);
  }

  .card--padding-md {
    --card-padding: var(--card-padding-md, 1rem);
  }

  .card--padding-lg {
    --card-padding: var(--card-padding-lg, 1.5rem);
  }

  .card--padding-xl {
    --card-padding: var(--card-padding-xl, 2rem);
  }

  /* Variant styles */
  .card--default {
    --card-bg: var(--card-bg-default, #ffffff);
    --card-bg-hover: var(--card-bg-hover-default, #f9fafb);
    --card-border-color: var(--card-border-default, #e5e7eb);
    --card-shadow: none;
    --card-shadow-hover: none;
  }

  .card--outlined {
    --card-bg: var(--card-bg-outlined, transparent);
    --card-bg-hover: var(--card-bg-outlined-hover, #f9fafb);
    --card-border-color: var(--card-border-outlined, #e5e7eb);
    --card-border-width: 2px;
    --card-shadow: none;
    --card-shadow-hover: none;
  }

  .card--elevated {
    --card-bg: var(--card-bg-elevated, #ffffff);
    --card-bg-hover: var(--card-bg-elevated-hover, #ffffff);
    --card-border-color: var(--card-border-elevated, transparent);
    --card-shadow: 0 1px 3px 0 var(--card-shadow-color), 0 1px 2px -1px var(--card-shadow-color);
    --card-shadow-hover: 0 4px 6px -1px var(--card-shadow-color), 0 2px 4px -2px var(--card-shadow-color);
  }

  .card--filled {
    --card-bg: var(--card-bg-filled, #f9fafb);
    --card-bg-hover: var(--card-bg-filled-hover, #f3f4f6);
    --card-border-color: var(--card-border-filled, transparent);
    --card-shadow: none;
    --card-shadow-hover: none;
  }

  /* Rounded modifier */
  .card--rounded {
    border-radius: var(--card-border-radius);
  }

  /* Interactive modifier */
  .card--interactive {
    cursor: pointer;
  }

  .card--interactive:not(.card--disabled):hover {
    background-color: var(--card-bg-hover);
    box-shadow: var(--card-shadow-hover);
  }

  /* Clickable modifier */
  .card--clickable {
    cursor: pointer;
    user-select: none;
  }

  .card--clickable:not(.card--disabled):hover {
    background-color: var(--card-bg-hover);
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-1px);
  }

  .card--clickable:not(.card--disabled):active {
    transform: translateY(0);
    box-shadow: var(--card-shadow);
  }

  .card--clickable:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--card-focus-ring-color, #3b82f6),
      var(--card-shadow-hover);
  }

  /* Disabled state */
  .card--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Reset button styles when card is clickable */
  button.card {
    background: inherit;
    color: inherit;
    font: inherit;
    text-align: inherit;
    margin: 0;
    padding: var(--card-padding);
    border: var(--card-border-width) var(--card-border-style) var(--card-border-color);
    border-radius: var(--card-border-radius);
    width: 100%;
  }
</style>
