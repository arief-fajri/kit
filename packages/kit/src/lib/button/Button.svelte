<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ButtonVariant, ButtonSize, ButtonState, ButtonSemantic, IconPosition, ButtonProps } from "../types.js";

  // Props with defaults
  export let variant: ButtonProps["variant"] = "filled";
  export let semantic: ButtonProps["semantic"] = undefined;
  export let size: ButtonProps["size"] = "md";
  export let state: ButtonProps["state"] = undefined;
  export let label: ButtonProps["label"] = "";
  export let fullRounded: ButtonProps["fullRounded"] = false;
  export let className: ButtonProps["className"] = "";
  export let customStyle: ButtonProps["className"] = "";
  export let disabled: ButtonProps["disabled"] = false;
  export let loading: ButtonProps["loading"] = false;
  export let loadingMessage: ButtonProps["loadingMessage"] = "Loading...";
  export let stopPropagation: ButtonProps["stopPropagation"] = false;
  export let fillColor: ButtonProps["fillColor"] = undefined;
  export let textColor: ButtonProps["textColor"] = undefined;
  export let outlineColor: ButtonProps["outlineColor"] = undefined;
  export let href: ButtonProps["href"] = undefined;
  export let target: ButtonProps["target"] = undefined;
  export let rel: ButtonProps["rel"] = undefined;
  export let iconPosition: ButtonProps["iconPosition"] = "left";
  export let ariaLabel: ButtonProps["ariaLabel"] = undefined;

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
    dragstart: { event: DragEvent };
    focus: FocusEvent;
    blur: FocusEvent;
    keydown: KeyboardEvent;
  }>();

  // Determine actual state
  $: actualState = state || "default";

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
    if (semantic) styles.push(`--btn-semantic-name: ${semantic}`);
    if (fillColor) styles.push(`--btn-bg: ${fillColor}`);
    if (textColor) styles.push(`--btn-text: ${textColor}`);
    if (outlineColor) styles.push(`--btn-border: ${outlineColor}`);
    if (customStyle) {
      styles.push(customStyle);
    }
    return styles.join("; ");
  })();

  // Hover state
  let hovering = false;
  const handleMouseEnter = () => {
    hovering = true;
  };
  const handleMouseLeave = () => {
    hovering = false;
  };

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

  // Compute semantic class name dynamically
  $: semanticClass = semantic ? `btn--semantic-${semantic}` : "";

  $: elementAttributes =
    elementTag === "a"
      ? {
          href,
          rel: linkRel,
          target: linkTarget
        }
      : {
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
  aria-pressed={elementTag === "button" && actualState === "active" ? true : undefined}
  class="btn btn--{variant} btn--{size} {semanticClass} {className}"
  class:btn--full-rounded={fullRounded}
  class:btn--disabled={disabled || isLoading}
  class:btn--state-active={actualState === "active"}
  class:btn--state-selected={actualState === "selected"}
  class:btn--state-highlight={actualState === "highlight"}
  {...$$restProps}
  style={customStyles || undefined}
  data-icon-position={iconPosition}
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
    <!-- <div class="btn__content" data-icon-position={iconPosition}>
    </div> -->
    {#if iconPosition === "left" || iconPosition === "only"}
      <slot name="icon" />
    {/if}
    {#if iconPosition !== "only"}
      <slot {hovering}>
        {#if label}
          <span class="btn__label">{label}</span>
        {/if}
      </slot>
    {:else}
      <slot name="icon" />
    {/if}
    {#if iconPosition === "right"}
      <slot name="icon" />
    {/if}
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
    --btn-font-weight: 400;
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
    /* min-height: var(--btn-min-height); */

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

    padding: calc(var(--btn-padding-y) - 2px) var(--btn-padding-x);
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

  /* Semantic color schemes - override colors while preserving variant behavior */

  /* Primary semantic */
  .btn--semantic-primary {
    --btn-bg-filled: var(--btn-semantic-primary-bg, #3b82f6);
    --btn-bg-filled-hover: var(--btn-semantic-primary-bg-hover, #2563eb);
    --btn-bg-filled-active: var(--btn-semantic-primary-bg-active, #1d4ed8);
    --btn-text-filled: var(--btn-semantic-primary-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-primary-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-primary-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-primary-border, #3b82f6);
    --btn-border-outlined-hover: var(--btn-semantic-primary-border-hover, #2563eb);
    --btn-border-outlined-active: var(--btn-semantic-primary-border-active, #1d4ed8);
    --btn-bg-outlined-hover: var(--btn-semantic-primary-bg-outlined-hover, rgba(59, 130, 246, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-primary-bg-outlined-active, rgba(59, 130, 246, 0.1));
    --btn-text-outlined: var(--btn-semantic-primary-text-outlined, #3b82f6);
    --btn-text-outlined-hover: var(--btn-semantic-primary-text-outlined-hover, #2563eb);
    --btn-text-outlined-active: var(--btn-semantic-primary-text-outlined-active, #1d4ed8);

    --btn-bg-text-hover: var(--btn-semantic-primary-bg-text-hover, rgba(59, 130, 246, 0.05));
    --btn-bg-text-active: var(--btn-semantic-primary-bg-text-active, rgba(59, 130, 246, 0.1));
    --btn-text-text: var(--btn-semantic-primary-text-text, #3b82f6);
    --btn-text-text-hover: var(--btn-semantic-primary-text-text-hover, #2563eb);
    --btn-text-text-active: var(--btn-semantic-primary-text-text-active, #1d4ed8);

    --btn-text-link: var(--btn-semantic-primary-text-link, #3b82f6);
    --btn-text-link-hover: var(--btn-semantic-primary-text-link-hover, #2563eb);
    --btn-text-link-active: var(--btn-semantic-primary-text-link-active, #1d4ed8);
  }

  /* Secondary semantic */
  .btn--semantic-secondary {
    --btn-bg-filled: var(--btn-semantic-secondary-bg, #6b7280);
    --btn-bg-filled-hover: var(--btn-semantic-secondary-bg-hover, #4b5563);
    --btn-bg-filled-active: var(--btn-semantic-secondary-bg-active, #374151);
    --btn-text-filled: var(--btn-semantic-secondary-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-secondary-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-secondary-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-secondary-border, #6b7280);
    --btn-border-outlined-hover: var(--btn-semantic-secondary-border-hover, #4b5563);
    --btn-border-outlined-active: var(--btn-semantic-secondary-border-active, #374151);
    --btn-bg-outlined-hover: var(--btn-semantic-secondary-bg-outlined-hover, rgba(107, 114, 128, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-secondary-bg-outlined-active, rgba(107, 114, 128, 0.1));
    --btn-text-outlined: var(--btn-semantic-secondary-text-outlined, #6b7280);
    --btn-text-outlined-hover: var(--btn-semantic-secondary-text-outlined-hover, #4b5563);
    --btn-text-outlined-active: var(--btn-semantic-secondary-text-outlined-active, #374151);

    --btn-bg-text-hover: var(--btn-semantic-secondary-bg-text-hover, rgba(107, 114, 128, 0.05));
    --btn-bg-text-active: var(--btn-semantic-secondary-bg-text-active, rgba(107, 114, 128, 0.1));
    --btn-text-text: var(--btn-semantic-secondary-text-text, #6b7280);
    --btn-text-text-hover: var(--btn-semantic-secondary-text-text-hover, #4b5563);
    --btn-text-text-active: var(--btn-semantic-secondary-text-text-active, #374151);

    --btn-text-link: var(--btn-semantic-secondary-text-link, #6b7280);
    --btn-text-link-hover: var(--btn-semantic-secondary-text-link-hover, #4b5563);
    --btn-text-link-active: var(--btn-semantic-secondary-text-link-active, #374151);
  }

  /* Success semantic */
  .btn--semantic-success {
    --btn-bg-filled: var(--btn-semantic-success-bg, #10b981);
    --btn-bg-filled-hover: var(--btn-semantic-success-bg-hover, #059669);
    --btn-bg-filled-active: var(--btn-semantic-success-bg-active, #047857);
    --btn-text-filled: var(--btn-semantic-success-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-success-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-success-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-success-border, #10b981);
    --btn-border-outlined-hover: var(--btn-semantic-success-border-hover, #059669);
    --btn-border-outlined-active: var(--btn-semantic-success-border-active, #047857);
    --btn-bg-outlined-hover: var(--btn-semantic-success-bg-outlined-hover, rgba(16, 185, 129, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-success-bg-outlined-active, rgba(16, 185, 129, 0.1));
    --btn-text-outlined: var(--btn-semantic-success-text-outlined, #10b981);
    --btn-text-outlined-hover: var(--btn-semantic-success-text-outlined-hover, #059669);
    --btn-text-outlined-active: var(--btn-semantic-success-text-outlined-active, #047857);

    --btn-bg-text-hover: var(--btn-semantic-success-bg-text-hover, rgba(16, 185, 129, 0.05));
    --btn-bg-text-active: var(--btn-semantic-success-bg-text-active, rgba(16, 185, 129, 0.1));
    --btn-text-text: var(--btn-semantic-success-text-text, #10b981);
    --btn-text-text-hover: var(--btn-semantic-success-text-text-hover, #059669);
    --btn-text-text-active: var(--btn-semantic-success-text-text-active, #047857);

    --btn-text-link: var(--btn-semantic-success-text-link, #10b981);
    --btn-text-link-hover: var(--btn-semantic-success-text-link-hover, #059669);
    --btn-text-link-active: var(--btn-semantic-success-text-link-active, #047857);
  }

  /* Danger semantic */
  .btn--semantic-danger {
    --btn-bg-filled: var(--btn-semantic-danger-bg, #ef4444);
    --btn-bg-filled-hover: var(--btn-semantic-danger-bg-hover, #dc2626);
    --btn-bg-filled-active: var(--btn-semantic-danger-bg-active, #b91c1c);
    --btn-text-filled: var(--btn-semantic-danger-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-danger-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-danger-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-danger-border, #ef4444);
    --btn-border-outlined-hover: var(--btn-semantic-danger-border-hover, #dc2626);
    --btn-border-outlined-active: var(--btn-semantic-danger-border-active, #b91c1c);
    --btn-bg-outlined-hover: var(--btn-semantic-danger-bg-outlined-hover, rgba(239, 68, 68, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-danger-bg-outlined-active, rgba(239, 68, 68, 0.1));
    --btn-text-outlined: var(--btn-semantic-danger-text-outlined, #ef4444);
    --btn-text-outlined-hover: var(--btn-semantic-danger-text-outlined-hover, #dc2626);
    --btn-text-outlined-active: var(--btn-semantic-danger-text-outlined-active, #b91c1c);

    --btn-bg-text-hover: var(--btn-semantic-danger-bg-text-hover, rgba(239, 68, 68, 0.05));
    --btn-bg-text-active: var(--btn-semantic-danger-bg-text-active, rgba(239, 68, 68, 0.1));
    --btn-text-text: var(--btn-semantic-danger-text-text, #ef4444);
    --btn-text-text-hover: var(--btn-semantic-danger-text-text-hover, #dc2626);
    --btn-text-text-active: var(--btn-semantic-danger-text-text-active, #b91c1c);

    --btn-text-link: var(--btn-semantic-danger-text-link, #ef4444);
    --btn-text-link-hover: var(--btn-semantic-danger-text-link-hover, #dc2626);
    --btn-text-link-active: var(--btn-semantic-danger-text-link-active, #b91c1c);
  }

  /* Warning semantic */
  .btn--semantic-warning {
    --btn-bg-filled: var(--btn-semantic-warning-bg, #f59e0b);
    --btn-bg-filled-hover: var(--btn-semantic-warning-bg-hover, #d97706);
    --btn-bg-filled-active: var(--btn-semantic-warning-bg-active, #b45309);
    --btn-text-filled: var(--btn-semantic-warning-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-warning-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-warning-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-warning-border, #f59e0b);
    --btn-border-outlined-hover: var(--btn-semantic-warning-border-hover, #d97706);
    --btn-border-outlined-active: var(--btn-semantic-warning-border-active, #b45309);
    --btn-bg-outlined-hover: var(--btn-semantic-warning-bg-outlined-hover, rgba(245, 158, 11, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-warning-bg-outlined-active, rgba(245, 158, 11, 0.1));
    --btn-text-outlined: var(--btn-semantic-warning-text-outlined, #f59e0b);
    --btn-text-outlined-hover: var(--btn-semantic-warning-text-outlined-hover, #d97706);
    --btn-text-outlined-active: var(--btn-semantic-warning-text-outlined-active, #b45309);

    --btn-bg-text-hover: var(--btn-semantic-warning-bg-text-hover, rgba(245, 158, 11, 0.05));
    --btn-bg-text-active: var(--btn-semantic-warning-bg-text-active, rgba(245, 158, 11, 0.1));
    --btn-text-text: var(--btn-semantic-warning-text-text, #f59e0b);
    --btn-text-text-hover: var(--btn-semantic-warning-text-text-hover, #d97706);
    --btn-text-text-active: var(--btn-semantic-warning-text-text-active, #b45309);

    --btn-text-link: var(--btn-semantic-warning-text-link, #f59e0b);
    --btn-text-link-hover: var(--btn-semantic-warning-text-link-hover, #d97706);
    --btn-text-link-active: var(--btn-semantic-warning-text-link-active, #b45309);
  }

  /* Info semantic */
  .btn--semantic-info {
    --btn-bg-filled: var(--btn-semantic-info-bg, #06b6d4);
    --btn-bg-filled-hover: var(--btn-semantic-info-bg-hover, #0891b2);
    --btn-bg-filled-active: var(--btn-semantic-info-bg-active, #0e7490);
    --btn-text-filled: var(--btn-semantic-info-text, #ffffff);
    --btn-text-filled-hover: var(--btn-semantic-info-text-hover, #ffffff);
    --btn-text-filled-active: var(--btn-semantic-info-text-active, #ffffff);

    --btn-border-outlined: var(--btn-semantic-info-border, #06b6d4);
    --btn-border-outlined-hover: var(--btn-semantic-info-border-hover, #0891b2);
    --btn-border-outlined-active: var(--btn-semantic-info-border-active, #0e7490);
    --btn-bg-outlined-hover: var(--btn-semantic-info-bg-outlined-hover, rgba(6, 182, 212, 0.05));
    --btn-bg-outlined-active: var(--btn-semantic-info-bg-outlined-active, rgba(6, 182, 212, 0.1));
    --btn-text-outlined: var(--btn-semantic-info-text-outlined, #06b6d4);
    --btn-text-outlined-hover: var(--btn-semantic-info-text-outlined-hover, #0891b2);
    --btn-text-outlined-active: var(--btn-semantic-info-text-outlined-active, #0e7490);

    --btn-bg-text-hover: var(--btn-semantic-info-bg-text-hover, rgba(6, 182, 212, 0.05));
    --btn-bg-text-active: var(--btn-semantic-info-bg-text-active, rgba(6, 182, 212, 0.1));
    --btn-text-text: var(--btn-semantic-info-text-text, #06b6d4);
    --btn-text-text-hover: var(--btn-semantic-info-text-text-hover, #0891b2);
    --btn-text-text-active: var(--btn-semantic-info-text-text-active, #0e7490);

    --btn-text-link: var(--btn-semantic-info-text-link, #06b6d4);
    --btn-text-link-hover: var(--btn-semantic-info-text-link-hover, #0891b2);
    --btn-text-link-active: var(--btn-semantic-info-text-link-active, #0e7490);
  }

  /* Custom semantic support - allows any semantic name via CSS custom properties */
  /* To define a custom semantic, add a CSS class .btn--semantic-{name} with custom properties */
  /* See component documentation for the full pattern to follow */

  /* Generic pattern matcher for custom semantic classes */
  /* This allows any btn--semantic-* class to work if CSS custom properties are defined */
  [class*="btn--semantic-"] {
    /* Custom semantic classes will inherit the variant behavior */
    /* Users must define the CSS custom properties for their custom semantic */
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
