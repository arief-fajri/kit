<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { slide } from "svelte/transition";
  import type { InputTextProps, InputTextStyling, InputTextValidation, InputTextBehavior, InputType } from "../../types.js";
  import { 
    applyMask, 
    removeMask, 
    getPatternLength, 
    getPatternSeparators,
    formatNumber,
    sanitizeNumericInput,
    shouldPreventInput
  } from "./utils.js";

  // Core props
  export let type: InputType = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let label: string = "";
  export let inputRef: HTMLInputElement | undefined = undefined;

  // Grouped props
  export let styling: InputTextStyling = {};
  export let validation: InputTextValidation = {};
  export let behavior: InputTextBehavior = {};

  // Computed props with defaults
  $: computedStyling = {
    size: styling.size || 'md',
    variant: styling.variant || 'default',
    inputClass: styling.inputClass || '',
    wrapperClass: styling.wrapperClass || '',
    labelClass: styling.labelClass || '',
    wrapperStyle: styling.wrapperStyle || ''
  };

  $: computedValidation = {
    required: validation.required ?? false,
    isError: validation.isError ?? false,
    errorMessage: validation.errorMessage || '',
    maxLength: validation.maxLength ?? null,
    pattern: validation.pattern || '',
    showMaxLengthCounter: validation.showMaxLengthCounter ?? false
  };

  $: computedBehavior = {
    disabled: behavior.disabled ?? false,
    readonly: behavior.readonly ?? false,
    autoFocus: behavior.autoFocus ?? false,
    clearable: behavior.clearable ?? false,
    useKeyup: behavior.useKeyup ?? true,
    useNumberFormat: behavior.useNumberFormat ?? true,
    autocomplete: behavior.autocomplete || ''
  };

  // Internal state
  let patternLength: number = 0;
  let oldValue: string = "";
  let localType: string = type;
  let firstLoad: boolean = false;
  let passwordView: boolean = false;
  let cursorPosition: number = 0;

  // Reactive statements
  $: {
    if (computedBehavior.useKeyup) {
      inputRef?.removeEventListener("input", handleInput);
      inputRef?.addEventListener("keyup", handleInput);
    } else {
      inputRef?.removeEventListener("keyup", handleInput);
      inputRef?.addEventListener("input", handleInput);
    }
  }

  $: if (value && !firstLoad) {
    firstLoad = true;
    if (type === "number" && computedBehavior.useNumberFormat) {
      value = formatNumber(value, "en-US", true);
    }
  }

  $: if (computedBehavior.autoFocus && inputRef) inputRef.focus();

  const dispatch = createEventDispatcher();

  const handleKeydown = (e: KeyboardEvent) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (!target) return;
    const { value: _value } = target;
    cursorPosition = target.selectionEnd || 0;
    oldValue = _value;

    dispatch("keydown", { key, event: e });

    if (shouldPreventInput(
      key, 
      _value, 
      computedValidation.maxLength, 
      computedValidation.pattern, 
      patternLength, 
      type, 
      e
    )) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    const pastedText = e.clipboardData?.getData("text") || "";
    const newValue = value + pastedText;
    if (computedValidation.maxLength && newValue.length > computedValidation.maxLength) {
      e.preventDefault();
    }
  };

  const handleInput = (e: Event) => {
    if (computedBehavior.disabled) return;

    const target = e.target as HTMLInputElement;
    const { value: _value } = target;
    const key = (e as KeyboardEvent).key || '';
    let newValue = value;

    if (!computedValidation.pattern) {
      if (type === "number") {
        const sanitized = sanitizeNumericInput(_value);
        const numValue = sanitized ? parseFloat(sanitized) : 0;
        if (computedBehavior.useNumberFormat) {
          newValue = formatNumber(numValue, "id-ID", true);
        } else {
          newValue = _value;
        }
      } else {
        newValue = _value;
      }
      value = newValue;
    } else {
      const temp = removeMask(_value);
      const separators = getPatternSeparators(computedValidation.pattern);

      if (temp.match(new RegExp(`^\\d{0,${patternLength}}$`, "g")) || key === separators[0]) {
        if (key !== separators[0]) {
          newValue = applyMask(temp, separators[0], computedValidation.pattern);
        } else {
          newValue = _value;
        }
        target.value = newValue || "";
      } else {
        target.value = oldValue;
      }
    }

    dispatch("targetKeyup", e);
    dispatch("keyup", key);
    if (!["Enter", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(key)) {
      dispatch("input", newValue);
    }
  };

  const toggleType = () => {
    if (localType === "password") {
      localType = "text";
    } else {
      localType = "password";
    }
  };

  onMount(() => {
    if (localType === "password") passwordView = true;

    if (computedBehavior.autoFocus && inputRef) inputRef.focus();

    if (computedValidation.pattern) {
      patternLength = getPatternLength(computedValidation.pattern);
    }
  });
</script>

<div class="input-text input-text--{computedStyling.variant} input-text--{computedStyling.size}">
  <slot name="label">
    {#if label}
      <label class="input-text__label {computedStyling.labelClass}" for="input-field">
        {label}
        {#if computedValidation.required}
          <span class="input-text__required">*</span>
        {/if}
      </label>
    {/if}
  </slot>
  
  <div class="input-text__container" class:input-text__container--error={computedValidation.isError}>
    <div 
      class="input-text__wrapper {computedStyling.wrapperClass}" 
      style={computedStyling.wrapperStyle} 
      class:input-text__wrapper--disabled={computedBehavior.disabled}
    >
      <slot name="prefix" />
      
      <input
        id="input-field"
        bind:this={inputRef}
        type={localType}
        class="input-text__field {computedStyling.inputClass}"
        value={value || ""}
        placeholder={placeholder}
        disabled={computedBehavior.disabled}
        readonly={computedBehavior.readonly}
        autocomplete={computedBehavior.autocomplete}
        aria-invalid={computedValidation.isError}
        aria-describedby={computedValidation.errorMessage ? 'error-message' : undefined}
        on:change
        on:keydown={handleKeydown}
        on:focus={() => dispatch("focus")}
        on:blur={() => dispatch("outFocus")}
        on:paste={handlePaste}
      />

      <slot name="suffix" />

      {#if computedBehavior.clearable && value}
        <button
          type="button"
          class="input-text__action-btn"
          aria-label="Clear input"
          on:click={() => {
            value = "";
            dispatch("input", value);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
            />
          </svg>
        </button>
      {/if}
      
      {#if passwordView}
        <button 
          type="button"
          class="input-text__action-btn" 
          aria-label={localType === "password" ? "Show password" : "Hide password"}
          on:click={toggleType}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            {#if localType === "password"}
              <path
                fill="currentColor"
                d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1M12.22 17c-4.31.1-7.12-3.59-8-5c1-1.61 3.61-4.9 7.61-5c4.29-.11 7.11 3.59 8 5c-1.03 1.61-3.61 4.9-7.61 5"
              />
              <path
                fill="currentColor"
                d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5m0 5a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5"
              />
            {:else}
              <path
                fill="currentColor"
                d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM12 13.5a1.5 1.5 0 0 1-1.5-1.5s0-.05 0-.07l1.56 1.56Z"
              />
              <path
                fill="currentColor"
                d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.74 7.74 0 0 1-1.7.25m9.65-5.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63a1 1 0 0 0-.04-1"
              />
            {/if}
          </svg>
        </button>
      {/if}
    </div>
    
    <slot name="helper">
      {#if computedValidation.showMaxLengthCounter && computedValidation.maxLength}
        <div class="input-text__counter">
          {value.length} / {computedValidation.maxLength}
        </div>
      {/if}
    </slot>
    
    <slot name="error">
      {#if computedValidation.isError && computedValidation.errorMessage}
        <div class="input-text__error" id="error-message" transition:slide>
          {computedValidation.errorMessage}
        </div>
      {/if}
    </slot>
  </div>
</div>

<style>
  /* CSS Custom Properties for theming */
  .input-text {
    --input-text-bg: var(--color-surface, #ffffff);
    --input-text-border: var(--color-border, #d1d5db);
    --input-text-border-focus: var(--color-primary, #3b82f6);
    --input-text-border-error: var(--color-error, #ef4444);
    --input-text-text: var(--color-text, #111827);
    --input-text-text-placeholder: var(--color-text-muted, #6b7280);
    --input-text-label: var(--color-text-secondary, #374151);
    --input-text-error-text: var(--color-error, #ef4444);
    --input-text-radius: var(--radius, 0.375rem);
    --input-text-shadow-focus: var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1));
    
    /* Size variables */
    --input-text-height-sm: 2rem;
    --input-text-height-md: 2.5rem;
    --input-text-height-lg: 3rem;
    --input-text-padding-x-sm: 0.5rem;
    --input-text-padding-x-md: 0.75rem;
    --input-text-padding-x-lg: 1rem;
    --input-text-font-size-sm: 0.875rem;
    --input-text-font-size-md: 1rem;
    --input-text-font-size-lg: 1.125rem;
    
    width: 100%;
    font-family: inherit;
  }

  /* Label */
  .input-text__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--input-text-label);
    margin-bottom: 0.25rem;
  }

  .input-text__required {
    color: var(--input-text-error-text);
    margin-left: 0.125rem;
  }

  /* Container */
  .input-text__container {
    position: relative;
  }

  /* Wrapper */
  .input-text__wrapper {
    display: flex;
    align-items: center;
    background: var(--input-text-bg);
    border: 1px solid var(--input-text-border);
    border-radius: var(--input-text-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    gap: 0.25rem;
    padding: 0 var(--input-text-padding-x-md);
    height: var(--input-text-height-md);
  }

  .input-text__wrapper:focus-within {
    border-color: var(--input-text-border-focus);
    box-shadow: var(--input-text-shadow-focus);
  }

  .input-text__wrapper--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-surface-disabled, #f9fafb);
  }

  .input-text__container--error .input-text__wrapper {
    border-color: var(--input-text-border-error);
  }

  .input-text__container--error .input-text__wrapper:focus-within {
    border-color: var(--input-text-border-error);
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }

  /* Input field */
  .input-text__field {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--input-text-text);
    font-size: var(--input-text-font-size-md);
    line-height: 1.5;
    padding: 0;
    width: 100%;
    min-width: 0;
  }

  .input-text__field::placeholder {
    color: var(--input-text-text-placeholder);
    font-style: italic;
  }

  .input-text__field:disabled {
    cursor: not-allowed;
  }

  /* Hide number input spinners */
  .input-text__field::-webkit-outer-spin-button,
  .input-text__field::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-text__field[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  /* Action buttons */
  .input-text__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--input-text-text-placeholder);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: calc(var(--input-text-radius) * 0.5);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  .input-text__action-btn:hover {
    color: var(--input-text-text);
    background: var(--color-surface-hover, #f3f4f6);
  }

  .input-text__action-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--input-text-border-focus);
  }

  /* Helper text and counter */
  .input-text__counter {
    font-size: 0.75rem;
    color: var(--input-text-text-placeholder);
    text-align: right;
    margin-top: 0.25rem;
  }

  /* Error message */
  .input-text__error {
    color: var(--input-text-error-text);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-style: italic;
  }

  /* Size variants */
  .input-text--sm .input-text__wrapper {
    height: var(--input-text-height-sm);
    padding: 0 var(--input-text-padding-x-sm);
  }

  .input-text--sm .input-text__field {
    font-size: var(--input-text-font-size-sm);
  }

  .input-text--lg .input-text__wrapper {
    height: var(--input-text-height-lg);
    padding: 0 var(--input-text-padding-x-lg);
  }

  .input-text--lg .input-text__field {
    font-size: var(--input-text-font-size-lg);
  }

  /* Style variants */
  .input-text--filled .input-text__wrapper {
    background: var(--color-surface-secondary, #f9fafb);
    border: 1px solid transparent;
  }

  .input-text--filled .input-text__wrapper:focus-within {
    background: var(--input-text-bg);
    border-color: var(--input-text-border-focus);
  }

  .input-text--outlined .input-text__wrapper {
    background: transparent;
    border: 2px solid var(--input-text-border);
  }

  .input-text--outlined .input-text__wrapper:focus-within {
    border-color: var(--input-text-border-focus);
  }
</style>
