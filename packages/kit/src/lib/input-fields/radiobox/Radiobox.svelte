  <script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    // Props with defaults
    export let name: string = "radio";
    export let label: string = "";
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = "md";
    export let variant: 'default' | 'outlined' | 'filled' = "default";
    export let color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' = "primary";
    export let rtl: boolean = false;
    
    // CSS class props
    let className: string = "";
    export { className as class };
    export let labelClass: string = "";
    export let radioClass: string = "";
  
    // Constants
    const dispatch = createEventDispatcher<{ change: boolean }>();
    
    const sizeValues = {
      xs: "0.625",
      sm: "0.75", 
      md: "1",
      lg: "1.25",
      xl: "1.5"
    };
  
    // Event handlers
    const handleChange = (event: Event) => {
      if (disabled) return;
  
      const target = event.target as HTMLInputElement;
      checked = target.checked;
      dispatch("change", checked);
    };
  </script>
  
  <div
    class="radiobox-wrapper {className}"
    class:radiobox-wrapper--rtl={rtl}
    style="--radiobox-size: {sizeValues[size]};"
  >
    <label class="radiobox-container {labelClass}" class:radiobox-container--rtl={rtl}>
      <input 
        type="radio" 
        class="radiobox-input {radioClass}"
        {disabled} 
        {checked} 
        {name} 
        on:change={handleChange} 
        {...$$restProps} 
      />
      <span 
        class="radiobox-indicator radiobox-indicator--{variant} radiobox-indicator--{color}"
        class:radiobox-indicator--checked={checked}
        class:radiobox-indicator--disabled={disabled}
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
      --radiobox-primary: #3b82f6;
      --radiobox-secondary: #6b7280;
      --radiobox-success: #10b981;
      --radiobox-error: #ef4444;
      --radiobox-warning: #f59e0b;
      --radiobox-border: #d1d5db;
      --radiobox-disabled: #9ca3af;
      --radiobox-background: #ffffff;
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
      border: 2px solid var(--radiobox-border);
      border-radius: 50%;
      background-color: var(--radiobox-background);
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
    }
  
    .radiobox-indicator::after {
      content: "";
      width: calc(var(--radiobox-indicator-size) * 0.4);
      height: calc(var(--radiobox-indicator-size) * 0.4);
      border-radius: 50%;
      background-color: var(--radiobox-background);
      opacity: 0;
      transform: scale(0);
      transition: all 0.2s ease-in-out;
    }
  
    /* Color variants */
    .radiobox-indicator--primary {
      --current-color: var(--radiobox-primary);
    }
    
    .radiobox-indicator--secondary {
      --current-color: var(--radiobox-secondary);
    }
    
    .radiobox-indicator--success {
      --current-color: var(--radiobox-success);
    }
    
    .radiobox-indicator--error {
      --current-color: var(--radiobox-error);
    }
    
    .radiobox-indicator--warning {
      --current-color: var(--radiobox-warning);
    }
  
    /* Checked state */
    .radiobox-indicator--checked {
      border-color: var(--current-color, var(--radiobox-primary));
      background-color: var(--current-color, var(--radiobox-primary));
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
      border-color: var(--current-color, var(--radiobox-primary));
    }
  
    .radiobox-indicator--outlined.radiobox-indicator--checked::after {
      background-color: var(--current-color, var(--radiobox-primary));
    }
  
    .radiobox-indicator--filled {
      border-width: 0;
      background-color: var(--radiobox-border);
    }
  
    .radiobox-indicator--filled.radiobox-indicator--checked {
      background-color: var(--current-color, var(--radiobox-primary));
    }
  
    /* Disabled state */
    .radiobox-indicator--disabled {
      border-color: var(--radiobox-disabled);
      background-color: var(--radiobox-disabled);
      cursor: not-allowed;
      opacity: 0.6;
    }
  
    .radiobox-container:has(.radiobox-input:disabled) {
      cursor: not-allowed;
      opacity: 0.6;
    }
  
    /* Hover state */
    .radiobox-container:hover:not(:has(.radiobox-input:disabled)) .radiobox-indicator:not(.radiobox-indicator--checked) {
      border-color: var(--current-color, var(--radiobox-primary));
    }
  
    /* Focus state */
    .radiobox-input:focus-visible + .radiobox-indicator {
      outline: 2px solid var(--current-color, var(--radiobox-primary));
      outline-offset: 2px;
    }
  
    .radiobox-label {
      color: inherit;
      font-size: inherit;
      line-height: 1.5;
    }
  </style>
  