<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { safeUniqueId } from "@rief/utils";
  import type { RadioboxProps, RadioboxStyling, RadioboxBehavior, RadioboxEventDetail } from "./types.js";

  // Core props
  export let name: string = "radio";
  export let label: string = "";
  export let checked: boolean = false;
  export let id: string = "";
  export let radioRef: HTMLInputElement | undefined = undefined;

  // Generate unique ID if not provided (SSR-safe)
  let radioId: string = id || safeUniqueId("radio-");

  // Grouped props
  export let styling: RadioboxStyling = {};
  export let behavior: RadioboxBehavior = {};

  // Computed props with defaults
  $: computedStyling = {
    size: styling.size ?? "md",
    variant: styling.variant ?? "default",
    color: styling.color ?? "primary",
    wrapperClass: styling.wrapperClass ?? "",
    labelClass: styling.labelClass ?? "",
    radioClass: styling.radioClass ?? "",
    wrapperStyle: styling.wrapperStyle ?? ""
  };

  $: computedBehavior = {
    disabled: behavior.disabled ?? false,
    rtl: behavior.rtl ?? false,
    stopPropagation: behavior.stopPropagation ?? false
  };

  // Constants
  const dispatch = createEventDispatcher<{ change: RadioboxEventDetail }>();
  
  const sizeValues: Record<typeof computedStyling.size, string> = {
    xs: "0.625",
    sm: "0.75", 
    md: "1",
    lg: "1.25",
    xl: "1.5"
  };

  // Event handlers
  const handleChange = (event: Event) => {
    if (computedBehavior.disabled) return;
    if (computedBehavior.stopPropagation) event.stopPropagation();

    const target = event.target as HTMLInputElement;
    checked = target.checked;
    dispatch("change", {
      checked,
      originalEvent: event
    });
  };
</script>

<div
  class="radiobox-wrapper {computedStyling.wrapperClass}"
  class:radiobox-wrapper--rtl={computedBehavior.rtl}
  style="--radiobox-size: {sizeValues[computedStyling.size]}; {computedStyling.wrapperStyle}"
>
  <label class="radiobox-container {computedStyling.labelClass}" class:radiobox-container--rtl={computedBehavior.rtl}>
    <input 
      type="radio" 
      class="radiobox-input {computedStyling.radioClass}"
      id={radioId}
      bind:this={radioRef}
      disabled={computedBehavior.disabled} 
      {checked} 
      {name} 
      on:change={handleChange} 
      {...$$restProps} 
    />
    <span 
      class="radiobox-indicator radiobox-indicator--{computedStyling.variant} radiobox-indicator--{computedStyling.color}"
      class:radiobox-indicator--checked={checked}
      class:radiobox-indicator--disabled={computedBehavior.disabled}
    />
    <slot name="label">
      {#if label}
        <span class="radiobox-label">{label}</span>
      {/if}
    </slot>
  </label>
</div>

<style>
  .radiobox-wrapper {
    --radiobox-size: 1;
    --radiobox-indicator-size: calc(1.25rem * var(--radiobox-size));
    --radiobox-gap: 0.5rem;
    
    display: flex;
    align-items: center;
  }

  .radiobox-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--radiobox-gap);
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
  }

  .radiobox-container--rtl {
    flex-direction: row-reverse;
  }

  .radiobox-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  }

  .radiobox-indicator {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--radiobox-indicator-size);
    height: var(--radiobox-indicator-size);
    border: 2px solid var(--radiobox-border, var(--color-border, #d1d5db));
    border-radius: 50%;
    background-color: var(--radiobox-background, var(--color-surface, #ffffff));
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;
  }

  .radiobox-indicator::after {
    content: "";
    width: calc(var(--radiobox-indicator-size) * 0.4);
    height: calc(var(--radiobox-indicator-size) * 0.4);
    border-radius: 50%;
    background-color: var(--radiobox-background, var(--color-surface, #ffffff));
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease-in-out;
  }

  /* Color variants */
  .radiobox-indicator--primary {
    --current-color: var(--radiobox-primary, var(--color-primary, #3b82f6));
  }
  
  .radiobox-indicator--secondary {
    --current-color: var(--radiobox-secondary, var(--color-text-muted, #6b7280));
  }
  
  .radiobox-indicator--success {
    --current-color: var(--radiobox-success, var(--color-success, #10b981));
  }
  
  .radiobox-indicator--error {
    --current-color: var(--radiobox-error, var(--color-error, #ef4444));
  }
  
  .radiobox-indicator--warning {
    --current-color: var(--radiobox-warning, var(--color-warning, #f59e0b));
  }

  /* Checked state */
  .radiobox-indicator--checked {
    border-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
    background-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
  }

  .radiobox-indicator--checked::after {
    opacity: 1;
    transform: scale(1);
  }

  /* Variant styles */
  .radiobox-indicator--outlined {
    background-color: transparent;
  }

  .radiobox-indicator--outlined.radiobox-indicator--checked {
    background-color: transparent;
    border-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
  }

  .radiobox-indicator--outlined.radiobox-indicator--checked::after {
    background-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
  }

  .radiobox-indicator--filled {
    border-width: 0;
    background-color: var(--radiobox-border, var(--color-border, #d1d5db));
  }

  .radiobox-indicator--filled.radiobox-indicator--checked {
    background-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
  }

  /* Disabled state */
  .radiobox-indicator--disabled {
    border-color: var(--radiobox-disabled, var(--color-text-disabled, #9ca3af));
    background-color: var(--radiobox-disabled, var(--color-text-disabled, #9ca3af));
    cursor: not-allowed;
    opacity: 0.6;
  }

  .radiobox-container:has(.radiobox-input:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Hover state */
  .radiobox-container:hover:not(:has(.radiobox-input:disabled)) .radiobox-indicator:not(.radiobox-indicator--checked) {
    border-color: var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
  }

  /* Focus state */
  .radiobox-input:focus-visible + .radiobox-indicator {
    outline: 2px solid var(--current-color, var(--radiobox-primary, var(--color-primary, #3b82f6)));
    outline-offset: 2px;
  }

  .radiobox-label {
    color: inherit;
    font-size: inherit;
    line-height: 1.5;
  }
</style>
