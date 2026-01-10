<script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    // Types
    type Size = "xs" | "sm" | "md" | "lg" | "xl";
    type Variant = "default" | "primary" | "success" | "error";
    
    interface CheckboxEventDetail {
      checked: boolean;
      value: any;
      originalEvent: Event;
    }
    
    interface FocusEventDetail {
      originalEvent: FocusEvent;
    }
  
    // Core props
    export let id: string | undefined = undefined;
    export let name: string = "checkbox";
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let readonly: boolean = false;
    export let value: any = undefined;
    
    // Content props
    export let label: string = "";
    
    // Layout props
    export let size: Size = "md";
    export let variant: Variant = "default";
    
    // Styling props
    let className: string = "";
    export { className as class };
    
    // Behavior props
    export let stopPropagation: boolean = false;
  
    // Constants
    const dispatch = createEventDispatcher<{
      change: CheckboxEventDetail;
      focus: FocusEventDetail;
      blur: FocusEventDetail;
    }>();
    
    const sizes: Record<Size, string> = {
      xs: "0.75rem",
      sm: "1rem", 
      md: "1.25rem",
      lg: "1.5rem",
      xl: "1.75rem"
    };
  
    // Event handlers
    const handleChange = (event: Event) => {
      if (disabled || readonly) return;
  
      const target = event.target as HTMLInputElement;
      checked = target.checked;
      
      dispatch("change", {
        checked,
        value: value || checked,
        originalEvent: event
      });
    };

    const handleFocus = (event: FocusEvent) => {
      dispatch("focus", { originalEvent: event });
    };

    const handleBlur = (event: FocusEvent) => {
      dispatch("blur", { originalEvent: event });
    };
  </script>
  
  <div
    class="checkbox-wrapper {className}"
    style="--checkbox-size: {sizes[size]};"
    on:click={(e) => {
      if (stopPropagation) e.stopPropagation();
    }}
    role="presentation"
  >
    <label class="checkbox-container" for={id}>
      <input 
        type="checkbox" 
        {id}
        {name}
        {checked} 
        {disabled}
        {required}
        {readonly}
        {value}
        on:change={handleChange}
        on:focus={handleFocus}
        on:blur={handleBlur}
        aria-describedby={$$slots.description ? `${id}-description` : undefined}
        {...$$restProps} 
      />
      <span class="checkmark" data-variant={variant} />
      <slot name="label">
        {#if label}
          <span class="label-text">{label}</span>
        {/if}
      </slot>
    </label>
    {#if $$slots.description}
      <div id="{id}-description" class="description">
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
      content: "";
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
    .checkmark[data-variant="primary"] {
      --checkbox-border-color: var(--color-primary, #3b82f6);
      --checkbox-focus-ring-color: var(--color-primary, #3b82f6);
    }

    .checkmark[data-variant="success"] {
      --checkbox-border-color: var(--color-success, #10b981);
      --checkbox-focus-ring-color: var(--color-success, #10b981);
    }

    .checkmark[data-variant="error"] {
      --checkbox-border-color: var(--color-error, #ef4444);
      --checkbox-focus-ring-color: var(--color-error, #ef4444);
    }
  </style>
  