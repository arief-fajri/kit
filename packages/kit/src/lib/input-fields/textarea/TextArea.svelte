<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { slide } from "svelte/transition";
  import type { TextAreaStyling, TextAreaValidation, TextAreaBehavior, TextAreaLayout } from "../../types.js";

  // Core props
  export let value: string = "";
  export let placeholder: string = "";
  export let label: string = "";
  export let textareaRef: HTMLTextAreaElement | undefined = undefined;

  // Grouped props
  export let styling: TextAreaStyling = {};
  export let validation: TextAreaValidation = {};
  export let behavior: TextAreaBehavior = {};
  export let layout: TextAreaLayout = {};

  // Computed props with defaults
  $: computedStyling = {
    size: styling.size || "md",
    variant: styling.variant || "default",
    inputClass: styling.inputClass || "",
    wrapperClass: styling.wrapperClass || "",
    labelClass: styling.labelClass || "",
    wrapperStyle: styling.wrapperStyle || ""
  };

  $: computedValidation = {
    required: validation.required ?? false,
    isError: validation.isError ?? false,
    errorMessage: validation.errorMessage || "",
    maxLength: validation.maxLength ?? null,
    showMaxLengthCounter: validation.showMaxLengthCounter ?? false
  };

  $: computedBehavior = {
    disabled: behavior.disabled ?? false,
    readonly: behavior.readonly ?? false,
    autoFocus: behavior.autoFocus ?? false,
    clearable: behavior.clearable ?? false,
    autocomplete: behavior.autocomplete || "",
    excludedKeys: behavior.excludedKeys || []
  };

  $: computedLayout = {
    rows: layout.rows ?? 4,
    fixedHeight: layout.fixedHeight ?? true,
    maxHeight: layout.maxHeight ?? null,
    autoResize: layout.autoResize ?? !layout.fixedHeight
  };

  const dispatch = createEventDispatcher();

  const handleKeydown = (e: KeyboardEvent) => {
    const { key } = e;
    const target = e.target as HTMLTextAreaElement;
    if (!target) return;

    dispatch("keydown", { key, event: e });

    // Handle excluded keys
    if (computedBehavior.excludedKeys.length && computedBehavior.excludedKeys.includes(key)) {
      e.preventDefault();
      return;
    }

    // Handle max length for non-navigation keys
    if (!["Enter", "Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) {
      if (computedValidation.maxLength && value.length >= computedValidation.maxLength) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    const pastedText = e.clipboardData?.getData("text") || "";
    const newValue = value + pastedText;
    if (computedValidation.maxLength && newValue.length > computedValidation.maxLength) {
      e.preventDefault();
      dispatch("paste-rejected", {
        reason: "exceeds-max-length",
        maxLength: computedValidation.maxLength
      });
    }
  };

  const handleInput = (e: Event) => {
    if (computedBehavior.disabled) return;

    const target = e.target as HTMLTextAreaElement;
    const { value: newValue } = target;

    // Handle auto-resize
    if (computedLayout.autoResize && !computedLayout.fixedHeight) {
      const parent = target.parentNode as HTMLElement;
      if (parent) {
        parent.dataset.value = newValue;
      }
    }

    value = newValue;
    dispatch("input", newValue);
  };

  const clearValue = () => {
    value = "";
    dispatch("input", value);
    dispatch("clear");
    textareaRef?.focus();
  };

  onMount(() => {
    if (computedBehavior.autoFocus && textareaRef) {
      textareaRef.focus();
    }

    // Initialize auto-resize if needed
    if (value && computedLayout.autoResize && !computedLayout.fixedHeight && textareaRef) {
      const parent = textareaRef.parentNode as HTMLElement;
      if (parent) {
        parent.dataset.value = value;
      }
    }
  });
</script>

<div class="textarea textarea--{computedStyling.variant} textarea--{computedStyling.size}">
  <slot name="label">
    {#if label}
      <label class="textarea__label {computedStyling.labelClass}" for="textarea-field">
        {label}
        {#if computedValidation.required}
          <span class="textarea__required">*</span>
        {/if}
      </label>
    {/if}
  </slot>

  <div class="textarea__container" class:textarea__container--error={computedValidation.isError}>
    <div
      class="textarea__wrapper {computedStyling.wrapperClass}"
      style={computedStyling.wrapperStyle}
      class:textarea__wrapper--disabled={computedBehavior.disabled}
      class:textarea__wrapper--auto-resize={computedLayout.autoResize && !computedLayout.fixedHeight}
    >
      <slot name="prefix" />

      <textarea
        id="textarea-field"
        bind:this={textareaRef}
        class="textarea__field {computedStyling.inputClass}"
        value={value || ""}
        {placeholder}
        rows={computedLayout.rows}
        disabled={computedBehavior.disabled}
        readonly={computedBehavior.readonly}
        autocomplete={computedBehavior.autocomplete}
        style={computedLayout.maxHeight ? `max-height: ${computedLayout.maxHeight}px` : ""}
        aria-invalid={computedValidation.isError}
        aria-describedby={computedValidation.errorMessage ? "error-message" : undefined}
        on:input={handleInput}
        on:keydown={handleKeydown}
        on:focus={() => dispatch("focus")}
        on:blur={() => dispatch("outFocus")}
        on:change={() => dispatch("change", value)}
        on:paste={handlePaste}
      />

      <slot name="suffix" />

      {#if computedBehavior.clearable && value}
        <button type="button" class="textarea__action-btn" aria-label="Clear textarea" on:click={clearValue}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
            />
          </svg>
        </button>
      {/if}
    </div>

    <slot name="helper">
      {#if computedValidation.showMaxLengthCounter && computedValidation.maxLength}
        <div class="textarea__counter">
          {value.length} / {computedValidation.maxLength}
        </div>
      {/if}
    </slot>

    <slot name="error">
      {#if computedValidation.isError && computedValidation.errorMessage}
        <div class="textarea__error" id="error-message" transition:slide>
          {computedValidation.errorMessage}
        </div>
      {/if}
    </slot>
  </div>
</div>

<style>
  .textarea {
    width: 100%;
    font-family: inherit;
  }

  /* Label */
  .textarea__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--textarea-label, var(--color-text-secondary, #374151));
    margin-bottom: 0.25rem;
  }

  .textarea__required {
    color: var(--textarea-error-text, var(--color-error, #ef4444));
    margin-left: 0.125rem;
  }

  /* Container */
  .textarea__container {
    position: relative;
  }

  /* Wrapper */
  .textarea__wrapper {
    display: flex;
    background: var(--textarea-bg, var(--color-surface, #ffffff));
    border: 1px solid var(--textarea-border, var(--color-border, #d1d5db));
    border-radius: var(--textarea-radius, var(--radius, 0.375rem));
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    gap: 0.25rem;
    padding: var(--textarea-padding-y-md, 0.5rem) var(--textarea-padding-x-md, 0.75rem);
    position: relative;
  }

  .textarea__wrapper:focus-within {
    border-color: var(--textarea-border-focus, var(--color-primary, #3b82f6));
    box-shadow: var(--textarea-shadow-focus, var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1)));
  }

  .textarea__wrapper--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-surface-disabled, #f9fafb);
  }

  .textarea__container--error .textarea__wrapper {
    border-color: var(--textarea-border-error, var(--color-error, #ef4444));
  }

  .textarea__container--error .textarea__wrapper:focus-within {
    border-color: var(--textarea-border-error, var(--color-error, #ef4444));
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }

  /* Auto-resize wrapper */
  .textarea__wrapper--auto-resize {
    display: grid;
    align-items: stretch;
  }

  .textarea__wrapper--auto-resize::after,
  .textarea__wrapper--auto-resize .textarea__field {
    grid-area: 1/1;
    font: inherit;
    padding: 0;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    outline: none;
  }

  .textarea__wrapper--auto-resize::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  /* Textarea field */
  .textarea__field {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--textarea-text, var(--color-text, #111827));
    font-size: var(--textarea-font-size-md, 1rem);
    line-height: 1.5;
    resize: vertical;
    width: 100%;
    min-width: 0;
    font-family: inherit;
    resize: none;
  }

  .textarea__field::placeholder {
    color: var(--textarea-text-placeholder, var(--color-text-muted, #6b7280));
    font-style: italic;
  }

  .textarea__field:disabled {
    cursor: not-allowed;
  }

  .textarea__wrapper--auto-resize .textarea__field {
    resize: none;
  }

  /* Action buttons */
  .textarea__action-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--textarea-text-placeholder, var(--color-text-muted, #6b7280));
    cursor: pointer;
    padding: 0.25rem;
    border-radius: calc(var(--textarea-radius, var(--radius, 0.375rem)) * 0.5);
    transition:
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;
    margin-top: 0.125rem;
  }

  .textarea__action-btn:hover {
    color: var(--textarea-text, var(--color-text, #111827));
    background: var(--color-surface-hover, #f3f4f6);
  }

  .textarea__action-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--textarea-border-focus, var(--color-primary, #3b82f6));
  }

  /* Helper text and counter */
  .textarea__counter {
    font-size: 0.75rem;
    color: var(--textarea-text-placeholder, var(--color-text-muted, #6b7280));
    text-align: right;
    margin-top: 0.25rem;
  }

  /* Error message */
  .textarea__error {
    color: var(--textarea-error-text, var(--color-error, #ef4444));
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-style: italic;
  }

  /* Size variants */
  .textarea--sm .textarea__wrapper {
    padding: var(--textarea-padding-y-sm, 0.375rem) var(--textarea-padding-x-sm, 0.5rem);
  }

  .textarea--sm .textarea__field {
    font-size: var(--textarea-font-size-sm, 0.875rem);
  }

  .textarea--lg .textarea__wrapper {
    padding: var(--textarea-padding-y-lg, 0.625rem) var(--textarea-padding-x-lg, 1rem);
  }

  .textarea--lg .textarea__field {
    font-size: var(--textarea-font-size-lg, 1.125rem);
  }

  /* Style variants */
  .textarea--filled .textarea__wrapper {
    background: var(--color-surface-secondary, #f9fafb);
    border: 1px solid transparent;
  }

  .textarea--filled .textarea__wrapper:focus-within {
    background: var(--textarea-bg, var(--color-surface, #ffffff));
    border-color: var(--textarea-border-focus, var(--color-primary, #3b82f6));
  }

  .textarea--outlined .textarea__wrapper {
    background: transparent;
    border: 2px solid var(--textarea-border, var(--color-border, #d1d5db));
  }

  .textarea--outlined .textarea__wrapper:focus-within {
    border-color: var(--textarea-border-focus, var(--color-primary, #3b82f6));
  }
</style>
