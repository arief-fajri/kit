<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { clickOutside } from "@rief/utils";
  import DropdownWrapper from "../../wrapper/dropdown/DropdownWrapper.svelte";
  import Button from "../../button/Button.svelte";
  import InputText from "../text/InputText.svelte";
  import type {
    SelectOptionProps,
    SelectOptionItem,
    SelectOptionStyling,
    SelectOptionValidation,
    SelectOptionBehavior,
    FetchQuery
  } from "../../types.js";

  // Core props
  export let options: SelectOptionItem[] = [];
  export let value: SelectOptionItem | SelectOptionItem[] | null = null;
  export let defaultValue: SelectOptionItem | SelectOptionItem[] | null = null;
  export let label: string = "";
  export let name: string = "";
  export let id: string = "";
  export let fetchFn:
    | ((query: FetchQuery, callback: (result: SelectOptionItem[], total?: number) => void) => void)
    | null = null;
  export let limit: number = 15;
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedBy: string | undefined = undefined;

  // Grouped props
  export let styling: SelectOptionStyling = {};
  export let validation: SelectOptionValidation = {};
  export let behavior: SelectOptionBehavior = {};

  // Computed props with defaults
  $: computedStyling = {
    size: styling.size || "md",
    variant: styling.variant || "default",
    wrapperClass: styling.wrapperClass || "",
    inputClass: styling.inputClass || "",
    labelClass: styling.labelClass || "",
    wrapperStyle: styling.wrapperStyle || ""
  };

  $: computedValidation = {
    required: validation.required ?? false,
    isError: validation.isError ?? false,
    errorMessage: validation.errorMessage || ""
  };

  $: computedBehavior = {
    disabled: behavior.disabled ?? false,
    isMultiOption: behavior.isMultiOption ?? false,
    isSearchable: behavior.isSearchable ?? true,
    closeOnSelect: behavior.closeOnSelect ?? true,
    debounceMs: behavior.debounceMs ?? 300,
    maxHeight: behavior.maxHeight ?? 240,
    placeholder: behavior.placeholder || "Select an option",
    emptyMessage: behavior.emptyMessage || "No items found",
    loading: behavior.loading ?? false,
    placement: behavior.placement ?? "bottom-start",
    dropdownClass: behavior.dropdownClass ?? "",
    isFullAnchorWidth: behavior.isFullAnchorWidth ?? true
  };

  const dispatch = createEventDispatcher<{
    update: SelectOptionItem | SelectOptionItem[] | null;
    select: { option: SelectOptionItem; isMulti: boolean };
    deselect: { option: SelectOptionItem };
    search: { query: string };
    open: void;
    close: void;
    clear: void;
  }>();

  // Internal state
  let openDropdown = false;
  let inputSearch = "";
  let listOptions: SelectOptionItem[] = [];
  let listValueSelected: SelectOptionItem[] = [];
  let parentWidth = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let triggerElement: HTMLElement | null = null;
  let inputRef: HTMLInputElement | undefined = undefined;
  let focusedIndex = -1;

  // Fetch state
  let _options: SelectOptionItem[] = [];
  let offset = 0;
  let total = 0;
  let loading = false;
  let hasAttemptedLoad = false;

  // Initialize with defaultValue or value
  // Track if we're updating internally to avoid reactive loop
  let isInternalUpdate = false;
  let previousValueKey: string | null = null;

  // Helper to get a unique key for a value
  function getValueKey(val: SelectOptionItem | SelectOptionItem[] | null): string {
    if (val === null || val === undefined) return "null";
    const arr = Array.isArray(val) ? val : [val];
    return arr
      .map((v) => String(v.value))
      .sort()
      .join("|");
  }

  $: {
    // Skip if this is an internal update
    if (!isInternalUpdate) {
      // Handle defaultValue only on initial mount when listValueSelected is empty
      if (defaultValue !== null && listValueSelected.length === 0) {
        listValueSelected = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        previousValueKey = getValueKey(defaultValue);
      }

      // Only update listValueSelected if value prop has actually changed
      const currentValueKey = getValueKey(value);
      if (value !== null && currentValueKey !== previousValueKey) {
        listValueSelected = Array.isArray(value) ? value : [value];
        previousValueKey = currentValueKey;
      } else if (value === null && previousValueKey !== "null") {
        // Clear selection when value becomes null
        listValueSelected = [];
        previousValueKey = "null";
      }
    } else {
      // Reset the flag after skipping
      isInternalUpdate = false;
    }
  }

  // Get display text for selected values (optimized)
  $: displayText = listValueSelected.length > 0
    ? listValueSelected.map((item) => item.label || String(item.value)).join(", ")
    : computedBehavior.placeholder;

  // Get option label
  function getOptionLabel(option: SelectOptionItem): string {
    return option.label || String(option.value);
  }

  // Filter options based on search
  function filterOptions(query: string): SelectOptionItem[] {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((option) => {
      const label = getOptionLabel(option).toLowerCase();
      const value = String(option.value).toLowerCase();
      return label.includes(lowerQuery) || value.includes(lowerQuery);
    });
  }

  // Load options (fetch or filter)
  function loadOptions() {
    if (fetchFn) {
      // Prevent multiple simultaneous loads
      if (loading) return;
      loading = true;
      hasAttemptedLoad = true;
      const isInitialLoad = offset === 0;
      fetchFn({ search: inputSearch, offset, limit }, (result, totalCount?: number) => {
        _options = isInitialLoad ? result : [..._options, ...result];
        total = totalCount || 0;
        loading = false;
        listOptions = _options;
      });
    } else {
      listOptions = filterOptions(inputSearch);
    }
  }

  // Handle search input
  function handleSearch(input: string) {
    inputSearch = input;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (fetchFn) {
        offset = 0;
        _options = [];
        total = 0;
        hasAttemptedLoad = false;
        loadOptions();
      } else {
        listOptions = filterOptions(inputSearch);
      }
      dispatch("search", { query: inputSearch });
    }, computedBehavior.debounceMs);
  }

  // Handle option selection
  function handleSelect(option: SelectOptionItem) {
    if (computedBehavior.disabled || option.disabled) return;

    // Mark as internal update to prevent reactive statement from overwriting
    isInternalUpdate = true;

    const found = listValueSelected.find((item) => item.value === option.value);

    if (found) {
      // Deselect
      listValueSelected = listValueSelected.filter((item) => item.value !== option.value);
      dispatch("deselect", { option });
    } else {
      // Select
      if (computedBehavior.isMultiOption) {
        listValueSelected = [...listValueSelected, option];
      } else {
        listValueSelected = [option];
        if (computedBehavior.closeOnSelect) {
          openDropdown = false;
        }
      }
      dispatch("select", { option, isMulti: computedBehavior.isMultiOption });
    }

    const updateValue = computedBehavior.isMultiOption ? listValueSelected : listValueSelected[0] || null;
    dispatch("update", updateValue);

    // Update previousValueKey to match the new state
    previousValueKey = getValueKey(updateValue);
  }

  // Handle clear
  function handleClear() {
    // Mark as internal update to prevent reactive statement from overwriting
    isInternalUpdate = true;
    inputSearch = "";
    listValueSelected = [];
    offset = 0;
    _options = [];
    total = 0;
    hasAttemptedLoad = false;
    if (fetchFn) {
      loadOptions();
    } else {
      listOptions = options;
    }
    dispatch("clear");
    const updateValue = computedBehavior.isMultiOption ? [] : null;
    dispatch("update", updateValue);
    previousValueKey = getValueKey(updateValue);
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (computedBehavior.disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        if (openDropdown && focusedIndex >= 0 && listOptions[focusedIndex]) {
          event.preventDefault();
          handleSelect(listOptions[focusedIndex]);
        } else if (!openDropdown) {
          event.preventDefault();
          openDropdown = true;
        }
        break;
      case "Escape":
        if (openDropdown) {
          event.preventDefault();
          openDropdown = false;
          focusedIndex = -1;
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!openDropdown) {
          openDropdown = true;
        } else {
          focusedIndex = Math.min(focusedIndex + 1, listOptions.length - 1);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (openDropdown) {
          focusedIndex = Math.max(focusedIndex - 1, -1);
        }
        break;
      case "Tab":
        if (openDropdown) {
          openDropdown = false;
        }
        break;
    }
  }

  // Watch for options prop changes (only when not using fetchFn)
  $: if (!fetchFn && options) {
    if (openDropdown) {
      listOptions = filterOptions(inputSearch);
    } else {
      listOptions = options;
    }
  }

  // Watch for dropdown state changes - only trigger load on openDropdown change, not on other dependencies
  let previousOpenDropdown = false;
  $: {
    if (openDropdown !== previousOpenDropdown) {
      previousOpenDropdown = openDropdown;
      if (openDropdown) {
        if (fetchFn && _options.length === 0 && !loading && !hasAttemptedLoad) {
          loadOptions();
        } else if (!fetchFn) {
          listOptions = filterOptions(inputSearch);
        }
        dispatch("open");
      } else {
        dispatch("close");
        inputSearch = "";
        if (!fetchFn) {
          listOptions = options;
        }
        focusedIndex = -1;
        // Reset hasAttemptedLoad when dropdown closes to allow retry on next open
        if (fetchFn) {
          hasAttemptedLoad = false;
        }
      }
    }
  }

  onMount(() => {
    if (fetchFn) {
      hasAttemptedLoad = false;
      loadOptions();
    } else {
      listOptions = options;
    }
  });
</script>

<div
  class="select-option select-option--{computedStyling.variant} select-option--{computedStyling.size}"
  class:select-option--error={computedValidation.isError}
  class:select-option--disabled={computedBehavior.disabled}
>
  <slot name="label">
    {#if label}
      <label class="select-option__label {computedStyling.labelClass}" for={id || name}>
        {label}
        {#if computedValidation.required}
          <span class="select-option__required">*</span>
        {/if}
      </label>
    {/if}
  </slot>

  <div
    class="select-option__container {computedStyling.wrapperClass}"
    style={computedStyling.wrapperStyle}
    bind:clientWidth={parentWidth}
  >
    <!-- svelte-ignore a11y-unknown-attribute -->
    <div
      class="select-option__wrapper"
      bind:this={triggerElement}
      on:keydown={handleKeydown}
      role="combobox"
      aria-expanded={openDropdown}
      aria-haspopup="listbox"
      aria-controls={id ? `${id}-listbox` : undefined}
      aria-label={ariaLabel || label || computedBehavior.placeholder}
      aria-invalid={computedValidation.isError}
      aria-describedby={ariaDescribedBy || (computedValidation.isError && id ? `${id}-error` : undefined)}
      tabindex={computedBehavior.disabled ? -1 : 0}
    >
      {#if openDropdown && computedBehavior.isSearchable}
        <InputText
          value={inputSearch}
          placeholder={computedBehavior.placeholder}
          styling={{
            size: computedStyling.size,
            variant: computedStyling.variant,
            inputClass: `select-option__search-input ${computedStyling.inputClass}`,
            wrapperClass: "select-option__search-wrapper",
            wrapperStyle: computedStyling.wrapperStyle
          }}
          behavior={{
            autoFocus: true,
            disabled: computedBehavior.disabled
          }}
          bind:inputRef
          on:input={(e) => handleSearch(e.detail)}
        >
          <div slot="suffix" class="select-option__actions">
            {#if inputSearch?.length}
              <button
                type="button"
                class="select-option__clear-btn"
                aria-label="Clear search"
                on:click={handleClear}
                tabindex="-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6m0-6 6 6" />
                </svg>
              </button>
            {/if}
            <button
              type="button"
              class="select-option__chevron"
              class:select-option__chevron--open={openDropdown}
              aria-label="Toggle dropdown"
              on:click|stopPropagation={() => {
                if (!computedBehavior.disabled) {
                  openDropdown = !openDropdown;
                }
              }}
              tabindex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </InputText>
      {:else}
        <button
          type="button"
          class="select-option__trigger"
          disabled={computedBehavior.disabled}
          on:click={() => {
            if (!computedBehavior.disabled) {
              openDropdown = !openDropdown;
            }
          }}
          aria-label={ariaLabel || label || computedBehavior.placeholder}
        >
          <slot>
            <div class="select-option__trigger-content">
              <slot name="prefix" />
              <span
                class="select-option__trigger-text"
                class:select-option__trigger-text--placeholder={!listValueSelected.length}
              >
                {displayText}
              </span>
            </div>
            <span class="select-option__chevron" class:select-option__chevron--open={openDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </slot>
        </button>
      {/if}

      <DropdownWrapper
        bind:visible={openDropdown}
        class={computedBehavior.dropdownClass}
        anchor={triggerElement}
        placement={computedBehavior.placement}
        size={computedStyling.size === "sm" ? "sm" : computedStyling.size === "lg" ? "lg" : "md"}
        closeOnClickOutside={true}
        closeOnEscape={true}
        isFullAnchorWidth={computedBehavior.isFullAnchorWidth}
        on:close={() => {
          openDropdown = false;
        }}
      >
        <div
          class="select-option__dropdown"
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          aria-label={label || "Options"}
          style={`max-height: ${computedBehavior.maxHeight}px;`}
        >
          {#if (computedBehavior.loading || loading) && offset === 0 && _options.length === 0}
            <slot name="loading">
              <div class="select-option__loading">
                {#each { length: 3 } as _}
                  <div class="select-option__skeleton"></div>
                {/each}
              </div>
            </slot>
          {:else if listOptions?.length}
            {#each listOptions as item, index}
              <slot name="option" {item} isSelected={listValueSelected.some((sel) => sel.value === item.value)}>
                <div
                  class="select-option__item"
                  class:select-option__item--focused={focusedIndex === index}
                  class:select-option__item--disabled={item.disabled}
                  class:select-option__item--selected={listValueSelected.some((sel) => sel.value === item.value)}
                >
                  <button
                    class="select-option__item-button"
                    disabled={item.disabled}
                    on:click={() => {
                      if (item.disabled) return;
                      handleSelect(item);
                    }}
                  >
                    <span class="select-option__item-label">{getOptionLabel(item)}</span>
                    {#if listValueSelected.some((sel) => sel.value === item.value)}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="select-option__check-icon"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    {/if}
                  </button>
                  <!-- <Button
                    variant="text"
                    semantic="secondary"
                    state={listValueSelected.some((sel) => sel.value === item.value) ? "selected" : "default"}
                    className="select-option__item-button"
                    customStyle="width: 100%; text-align: left"
                    disabled={item.disabled}
                    on:click={() => handleSelect(item)}
                  >
                    <span class="select-option__item-label">{getOptionLabel(item)}</span>
                    {#if listValueSelected.some((sel) => sel.value === item.value)}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="select-option__check-icon"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    {/if}
                  </Button> -->
                </div>
              </slot>
            {/each}
            {#if loading && offset > 0}
              <div class="select-option__load-more-loader">
                <div class="select-option__skeleton"></div>
              </div>
            {:else if !loading && total > _options.length && fetchFn}
              <button
                type="button"
                class="select-option__load-more"
                on:click={() => {
                  offset += limit;
                  loadOptions();
                }}
              >
                <span>Load More</span>
                <span class="select-option__load-more-count">{_options.length} of {total}</span>
              </button>
            {/if}
          {:else}
            <slot name="empty">
              <div class="select-option__empty">
                <p>{computedBehavior.emptyMessage}</p>
              </div>
            </slot>
          {/if}
        </div>
      </DropdownWrapper>
    </div>

    <slot name="error">
      {#if computedValidation.isError && computedValidation.errorMessage}
        <div class="select-option__error" id={id ? `${id}-error` : undefined}>
          {computedValidation.errorMessage}
        </div>
      {/if}
    </slot>
  </div>
</div>

<style lang="postcss">
  .select-option {
    width: 100%;
    font-family: inherit;
  }

  /* Label */
  .select-option__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--select-option-label, var(--color-text-secondary, #374151));
    margin-bottom: 0.25rem;
  }

  .select-option__required {
    color: var(--select-option-error-text, var(--color-error, #ef4444));
    margin-left: 0.125rem;
  }

  /* Container */
  .select-option__container {
    position: relative;
    width: 100%;
  }

  /* Wrapper */
  .select-option__wrapper {
    position: relative;
    width: 100%;
  }

  /* Trigger Button */
  .select-option__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    padding: var(--select-option-padding-y-md, 0.5rem) var(--select-option-padding-x-md, 0.75rem);
    height: var(--select-option-height-md, 2.5rem);
    font-size: var(--select-option-font-size-md, 1rem);
    background: var(--select-option-bg, var(--color-surface, #ffffff));
    border: var(--select-option-border-width, 1px) solid var(--select-option-border, var(--color-border, #e5e7eb));
    border-radius: var(--select-option-border-radius, var(--radius, 0.375rem));
    color: var(--select-option-text, var(--color-text, #111827));
    text-align: left;
    cursor: pointer;
    transition: var(--select-option-transition, all 0.15s ease-in-out);
  }

  .select-option__trigger-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .select-option__trigger:focus-visible {
    outline: none;
    border-color: var(--select-option-border-focus, var(--color-primary, #3b82f6));
    box-shadow: var(--select-option-shadow-focus, var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1)));
  }

  .select-option__trigger:hover:not(:disabled) {
    background: var(--select-option-bg-hover, var(--color-surface-hover, #f9fafb));
  }

  .select-option__trigger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-surface-disabled, #f9fafb);
  }

  .select-option__trigger-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-option__trigger-text--placeholder {
    color: var(--select-option-text-placeholder, var(--color-text-muted, #9ca3af));
    font-style: italic;
  }

  /* Search Wrapper */
  .select-option__search-wrapper {
    padding: 0 !important;
  }

  .select-option__search-input {
    padding: 0 var(--select-option-padding-x-md, 0.75rem) !important;
  }

  /* Actions */
  .select-option__actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .select-option__clear-btn,
  .select-option__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--select-option-text-placeholder, var(--color-text-muted, #9ca3af));
    cursor: pointer;
    padding: 0.25rem;
    transition: var(--select-option-transition, all 0.15s ease-in-out);
  }

  .select-option__clear-btn:hover,
  .select-option__chevron:hover {
    color: var(--select-option-text, var(--color-text, #111827));
  }

  .select-option__chevron {
    transition: transform 0.2s ease-in-out;
  }

  .select-option__chevron--open {
    transform: rotate(180deg);
  }

  /* Dropdown */
  .select-option__dropdown {
    width: 100%;
    overflow-y: auto;
    padding: 0.25rem;
  }

  .select-option__dropdown > * + * {
    margin-top: 0.25rem; /* 4px */
  }

  /* Option Item */
  .select-option__item {
    width: 100%;
    justify-content: space-between;
    text-align: left;
    padding: var(--select-option-padding-y-sm, 0.375rem) var(--select-option-padding-x-md, 0.75rem) !important;
    border-radius: var(--select-option-border-radius, var(--radius, 0.375rem)) !important;
  }

  .select-option__item:hover {
    background: var(--select-option-bg-selected, var(--color-surface-hover, #f9fafb));
  }
  .select-option__item--focused {
    background: var(--select-option-bg-hover, var(--color-surface-hover, #f9fafb));
  }

  .select-option__item--selected {
    background: var(--select-option-bg-selected, var(--color-surface-hover, #f9fafb));
  }

  .select-option__item--selected .select-option__item-label {
    color: var(--select-option-text-selected, var(--color-text, #111827));
  }

  .select-option__item--selected .select-option__item-button {
    background: var(--select-option-bg-selected, var(--color-surface-hover, #f9fafb));
    color: var(--select-option-text-selected, var(--color-text, #111827));
  }

  .select-option__item-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 0.5rem 0;
  }

  .select-option__item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select-option__item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--select-option-text, var(--color-text, #111827));
  }

  .select-option__check-icon {
    width: 1rem;
    height: 1rem;
    color: var(--select-option-check-color, var(--color-primary, #3b82f6));
    flex-shrink: 0;
  }

  /* Loading */
  .select-option__loading {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .select-option__skeleton {
    height: 1rem;
    background: linear-gradient(
      90deg,
      var(--color-surface-hover, #f3f4f6) 25%,
      var(--color-surface, #ffffff) 50%,
      var(--color-surface-hover, #f3f4f6) 75%
    );
    background-size: 200% 100%;
    animation: select-option-skeleton 1.5s ease-in-out infinite;
    border-radius: 0.25rem;
  }

  @keyframes select-option-skeleton {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Empty State */
  .select-option__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: var(--select-option-text-placeholder, var(--color-text-muted, #9ca3af));
    font-style: italic;
    text-align: center;
  }

  /* Load More */
  .select-option__load-more {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-top: 1px solid var(--select-option-border, var(--color-border, #e5e7eb));
    background: transparent;
    color: var(--select-option-text, var(--color-text, #111827));
    cursor: pointer;
    transition: var(--select-option-transition, all 0.15s ease-in-out);
    font-size: 0.875rem;
  }

  .select-option__load-more:hover {
    background: var(--select-option-bg-hover, var(--color-surface-hover, #f9fafb));
  }

  .select-option__load-more-count {
    font-size: 0.75rem;
    color: var(--select-option-text-placeholder, var(--color-text-muted, #9ca3af));
  }

  .select-option__load-more-loader {
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--select-option-border, var(--color-border, #e5e7eb));
  }

  .select-option__load-more-loader .select-option__skeleton {
    width: 100%;
    height: 0.75rem;
  }

  /* Error Message */
  .select-option__error {
    color: var(--select-option-error-text, var(--color-error, #ef4444));
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-style: italic;
  }

  /* Error State */
  .select-option--error .select-option__trigger,
  .select-option--error .select-option__search-wrapper {
    border-color: var(--select-option-border-error, var(--color-error, #ef4444));
  }

  .select-option--error .select-option__trigger:focus-visible {
    border-color: var(--select-option-border-error, var(--color-error, #ef4444));
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }

  /* Disabled State */
  .select-option--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* Size Variants */
  .select-option--sm .select-option__trigger {
    height: var(--select-option-height-sm, 2rem);
    padding: var(--select-option-padding-y-sm, 0.375rem) var(--select-option-padding-x-sm, 0.5rem);
    font-size: var(--select-option-font-size-sm, 0.875rem);
  }

  .select-option--lg .select-option__trigger {
    height: var(--select-option-height-lg, 3rem);
    padding: var(--select-option-padding-y-lg, 0.625rem) var(--select-option-padding-x-lg, 1rem);
    font-size: var(--select-option-font-size-lg, 1.125rem);
  }

  /* Variant Styles */
  .select-option--filled .select-option__trigger {
    background: var(--color-surface-secondary, #f9fafb);
    border-color: transparent;
  }

  .select-option--filled .select-option__trigger:focus-visible {
    background: var(--select-option-bg, var(--color-surface, #ffffff));
    border-color: var(--select-option-border-focus, var(--color-primary, #3b82f6));
  }

  .select-option--outlined .select-option__trigger {
    background: transparent;
    border-width: 2px;
  }
</style>
