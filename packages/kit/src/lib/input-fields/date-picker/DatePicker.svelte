<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";

  import CalendarGrid from "./CalendarGrid.svelte";
  import type {
    DatePickerProps,
    DatePickerChangeEvent,
    DatePickerMode,
    DateValue,
    DateRangeValue,
    DateMultipleValue
  } from "./types.js";
  import { DEFAULT_LABELS, SHORT_MONTH_NAMES } from "./constants.js";
  import { toDate, datesEqual, normalizeRange, formatDate } from "./composables/useDateUtils.js";
  import { useDateValidation } from "./composables/useDateValidation.js";

  type DisplayMode = "calendar" | "month" | "year";

  const dispatch = createEventDispatcher<{ change: DatePickerChangeEvent }>();

  import type { DatePickerProps, DatePickerStyling, DatePickerBehavior } from "./types.js";

  // Core props
  export let value: DatePickerProps["value"] = null;
  export let rangeValue: DatePickerProps["rangeValue"] = [null, null];
  export let multipleValue: DatePickerProps["multipleValue"] = [];
  export let styling: DatePickerProps["styling"] = {};
  export let behavior: DatePickerProps["behavior"] = {};
  export let ariaLabel: DatePickerProps["ariaLabel"] = undefined;
  export let ariaDescribedBy: DatePickerProps["ariaDescribedBy"] = undefined;

  // Computed props with defaults
  $: computedStyling = {
    variant: styling.variant ?? "default",
    size: styling.size ?? "md",
    className: styling.className ?? "",
    style: styling.style ?? ""
  };

  $: computedBehavior = {
    mode: behavior.mode ?? "single",
    disabled: behavior.disabled ?? false,
    loading: behavior.loading ?? false,
    minDate: behavior.minDate ?? null,
    maxDate: behavior.maxDate ?? null,
    disabledDates: behavior.disabledDates ?? undefined,
    firstDayOfWeek: behavior.firstDayOfWeek ?? 0,
    showWeekNumbers: behavior.showWeekNumbers ?? false,
    showToday: behavior.showToday ?? true,
    showClear: behavior.showClear ?? true,
    closeOnSelect: behavior.closeOnSelect ?? true,
    labels: behavior.labels ?? {},
    locale: behavior.locale ?? "en-US"
  };

  // Generate CSS custom properties for style overrides - memoized
  $: customStyles = "";

  // Merge labels with defaults - memoized
  $: mergedLabels = { ...DEFAULT_LABELS, ...computedBehavior.labels };

  // Internal state
  let display: DisplayMode = "calendar";
  let height = 0;
  let month = 0;
  let year = 0;

  // Date validation
  $: validation = useDateValidation({ minDate: computedBehavior.minDate, maxDate: computedBehavior.maxDate, disabledDates: computedBehavior.disabledDates });

  // Current date for navigation
  $: currentDate = (() => {
    if (computedBehavior.mode === "single" && value) {
      const date = toDate(value);
      return date || new Date();
    }
    if (computedBehavior.mode === "range" && rangeValue && rangeValue[0]) {
      const date = toDate(rangeValue[0]);
      return date || new Date();
    }
    if (computedBehavior.mode === "multiple" && multipleValue && multipleValue.length > 0) {
      const date = toDate(multipleValue[0]);
      return date || new Date();
    }
    return new Date();
  })();

  // Update month/year based on current date
  $: {
    month = currentDate.getMonth();
    year = currentDate.getFullYear();
  }

  // Years for year picker
  $: years = Array.from({ length: 12 }, (_, i) => year - 5 + i);

  // Handle date selection
  const handleDateChange = (event: CustomEvent<{ date: Date; type: "select" | "range-start" | "range-end" }>) => {
    if (computedBehavior.disabled || computedBehavior.loading) return;

    const { date, type } = event.detail;

    if (computedBehavior.mode === "single") {
      const changeEvent: DatePickerChangeEvent = {
        value: date,
        mode: "single",
        formatted: formatDate(date, computedBehavior.locale)
      };
      dispatch("change", changeEvent);
    } else if (computedBehavior.mode === "range") {
      let newRange: DateRangeValue;

      if (type === "range-start" || !rangeValue || !rangeValue[0] || (rangeValue[0] && rangeValue[1])) {
        newRange = [date, null];
      } else {
        newRange = normalizeRange([rangeValue[0], date]);
      }

      const changeEvent: DatePickerChangeEvent = {
        value: newRange,
        mode: "range",
        formatted: newRange.map((d) => formatDate(toDate(d), computedBehavior.locale))
      };
      dispatch("change", changeEvent);
    } else if (computedBehavior.mode === "multiple") {
      const currentMultiple = [...(multipleValue || [])];
      const existingIndex = currentMultiple.findIndex((d) => {
        const existing = toDate(d);
        return existing && datesEqual(existing, date);
      });

      let newMultiple: DateMultipleValue;
      if (existingIndex >= 0) {
        // Remove if already selected
        newMultiple = currentMultiple.filter((_, i) => i !== existingIndex);
      } else {
        // Add to selection
        newMultiple = [...currentMultiple, date];
      }

      const changeEvent: DatePickerChangeEvent = {
        value: newMultiple,
        mode: "multiple",
        formatted: newMultiple.map((d) => formatDate(toDate(d), computedBehavior.locale))
      };
      dispatch("change", changeEvent);
    }
  };

  // Navigation handlers
  const next = () => {
    if (display === "calendar") {
      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
    } else if (display === "year") {
      year += 12;
    }
  };

  const prev = () => {
    if (display === "calendar") {
      if (month === 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
    } else if (display === "year") {
      year -= 12;
    }
  };

  // Today button handler
  const goToToday = () => {
    if (computedBehavior.disabled || computedBehavior.loading) return;

    const today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    display = "calendar";

    // Dispatch change event based on mode
    let changeEvent: DatePickerChangeEvent;

    if (computedBehavior.mode === "single") {
      changeEvent = {
        value: today,
        mode: "single",
        formatted: formatDate(today, computedBehavior.locale)
      };
    } else if (computedBehavior.mode === "range") {
      // Set today as start date (replace existing range)
      changeEvent = {
        value: [today, null],
        mode: "range",
        formatted: [formatDate(today, computedBehavior.locale), ""]
      };
    } else {
      // Multiple mode: add today to selection (or toggle if exists)
      const currentMultiple = [...(multipleValue || [])];
      const existingIndex = currentMultiple.findIndex((d) => {
        const existing = toDate(d);
        return existing && datesEqual(existing, today);
      });

      let newMultiple: DateMultipleValue;
      if (existingIndex >= 0) {
        // Remove if already selected
        newMultiple = currentMultiple.filter((_, i) => i !== existingIndex);
      } else {
        // Add to selection
        newMultiple = [...currentMultiple, today];
      }

      changeEvent = {
        value: newMultiple,
        mode: "multiple",
        formatted: newMultiple.map((d) => formatDate(toDate(d), computedBehavior.locale))
      };
    }

    dispatch("change", changeEvent);
  };

  // Clear button handler
  const clearSelection = () => {
    if (computedBehavior.disabled || computedBehavior.loading) return;

    let changeEvent: DatePickerChangeEvent;

    if (computedBehavior.mode === "single") {
      changeEvent = { value: null, mode: "single", formatted: "" };
    } else if (computedBehavior.mode === "range") {
      changeEvent = { value: [null, null], mode: "range", formatted: ["", ""] };
    } else {
      changeEvent = { value: [], mode: "multiple", formatted: [] };
    }

    dispatch("change", changeEvent);
  };

  // Root CSS classes
  $: rootClasses = ["date-picker", `date-picker--${computedStyling.variant}`, `date-picker--${computedStyling.size}`, computedStyling.className]
    .filter(Boolean)
    .join(" ");
</script>

<div
  class={rootClasses}
  class:date-picker--disabled={computedBehavior.disabled}
  class:date-picker--loading={computedBehavior.loading}
  style={customStyles || computedStyling.style || undefined}
  role="application"
  aria-label={ariaLabel || "Date picker"}
  aria-describedby={ariaDescribedBy}
  aria-live="polite"
  aria-atomic="true"
  {...$$restProps}
>
  {#if computedBehavior.loading}
    <div class="date-picker__loading">
      <svg
        class="date-picker__spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
        />
        <path
          fill="currentColor"
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        />
      </svg>
    </div>
  {:else}
    <div class="date-picker__header">
      <div class="date-picker__navigation">
        {#if display === "calendar"}
          <button
            class="date-picker__nav-button date-picker__nav-button--month"
            type="button"
            on:click={() => (display = "month")}
            aria-label={mergedLabels.selectMonth}
            disabled={computedBehavior.disabled}
          >
            {mergedLabels.months[month]}
          </button>
        {/if}
        <button
          class="date-picker__nav-button date-picker__nav-button--year"
          type="button"
          on:click={() => (display = "year")}
          aria-label={mergedLabels.selectYear}
          disabled={computedBehavior.disabled}
        >
          {year}
        </button>
      </div>

      <div class="date-picker__controls">
        {#if computedBehavior.showToday}
          <button
            class="date-picker__control-button date-picker__control-button--today"
            type="button"
            on:click={goToToday}
            disabled={computedBehavior.disabled}
          >
            {mergedLabels.today}
          </button>
        {/if}

        {#if computedBehavior.showClear}
          <button
            class="date-picker__control-button date-picker__control-button--clear"
            type="button"
            on:click={clearSelection}
            disabled={computedBehavior.disabled}
          >
            {mergedLabels.clear}
          </button>
        {/if}

        <button
          class="date-picker__nav-button date-picker__nav-button--prev"
          type="button"
          on:click={prev}
          aria-label={mergedLabels.prev}
          disabled={computedBehavior.disabled}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M9.5 3.5 5.5 8l4 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          class="date-picker__nav-button date-picker__nav-button--next"
          type="button"
          on:click={next}
          aria-label={mergedLabels.next}
          disabled={computedBehavior.disabled}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M6.5 3.5 10.5 8l-4 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="date-picker__content transition-container" bind:clientHeight={height}>
      {#if display === "calendar"}
        <div transition:scale class="date-picker__calendar">
          <CalendarGrid
            {month}
            {year}
            {value}
            {rangeValue}
            {multipleValue}
            mode={computedBehavior.mode}
            isAllowed={validation.isAllowed}
            firstDayOfWeek={computedBehavior.firstDayOfWeek}
            showWeekNumbers={computedBehavior.showWeekNumbers}
            weekdayLabels={mergedLabels.weekdays}
            on:datechange={handleDateChange}
          />
        </div>
      {:else if display === "month"}
        <div class="date-picker__month-grid" transition:scale>
          {#each SHORT_MONTH_NAMES as monthName, i}
            <button
              class="date-picker__month-button"
              class:date-picker__month-button--selected={month === i}
              type="button"
              on:click={() => {
                month = i;
                display = "calendar";
              }}
              disabled={computedBehavior.disabled}
            >
              {monthName}
            </button>
          {/each}
        </div>
      {:else if display === "year"}
        <div class="date-picker__year-grid" transition:scale>
          {#each years as y}
            <button
              class="date-picker__year-button"
              class:date-picker__year-button--selected={year === y}
              type="button"
              on:click={() => {
                year = y;
                display = "calendar";
              }}
              disabled={computedBehavior.disabled}
            >
              {y}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* CSS Custom Properties - Design Tokens */
  .date-picker {
    /* Layout */
    --dp-display: block;
    --dp-position: relative;
    --dp-width: 100%;

    /* Spacing */
    --dp-padding: var(--dp-padding-md, 0.5rem);
    --dp-gap: var(--dp-gap-md, 0.5rem);
    --dp-cell-size: var(--dp-cell-size-md, 2.5rem);
    --dp-cell-gap: 1px;

    /* Typography */
    --dp-font-family: inherit;
    --dp-font-size: var(--dp-font-size-md, 1rem);
    --dp-font-size-sm: 0.875rem;
    --dp-font-weight-normal: 400;
    --dp-font-weight-medium: 500;
    --dp-line-height: 1.5;

    /* Colors - Default */
    --dp-bg: var(--dp-bg-default, #ffffff);
    --dp-text-color: var(--dp-text-default, #374151);
    --dp-text-muted: var(--dp-text-muted-default, #6b7280);
    --dp-text-disabled: var(--dp-text-disabled-default, #9ca3af);

    --dp-border-color: var(--dp-border-default, #e5e7eb);
    --dp-border-radius: var(--dp-border-radius-md, 0.375rem);
    --dp-border-width: 1px;

    --dp-primary-color: var(--dp-primary-default, #3b82f6);
    --dp-primary-hover: var(--dp-primary-hover-default, #2563eb);
    --dp-primary-text: var(--dp-primary-text-default, #ffffff);

    --dp-secondary-bg: var(--dp-secondary-default, #f3f4f6);
    --dp-secondary-hover: var(--dp-secondary-hover-default, #e5e7eb);

    --dp-cell-hover-bg: rgba(59, 130, 246, 0.1);
    --dp-cell-hover-color: #1d4ed8;
    --dp-range-bg: rgba(59, 130, 246, 0.1);
    --dp-range-color: #1d4ed8;
    --dp-today-color: #ef4444;

    /* Focus */
    --dp-focus-ring-color: var(--dp-focus-ring-default, #3b82f6);
    --dp-focus-ring-width: 2px;
    --dp-focus-ring-offset: 2px;

    /* Transitions */
    --dp-transition: all 0.2s ease-in-out;

    /* Disabled */
    --dp-disabled-opacity: 0.5;

    /* Base styles */
    display: var(--dp-display);
    position: var(--dp-position);
    width: var(--dp-width);
    font-family: var(--dp-font-family);
    font-size: var(--dp-font-size);
    line-height: var(--dp-line-height);
    background-color: var(--dp-bg);
    color: var(--dp-text-color);
    border-radius: var(--dp-border-radius);
  }

  /* Size variants */
  .date-picker--sm {
    --dp-padding: var(--dp-padding-sm, 0.375rem);
    --dp-gap: var(--dp-gap-sm, 0.375rem);
    --dp-cell-size: var(--dp-cell-size-sm, 2rem);
    --dp-font-size: var(--dp-font-size-sm, 0.875rem);
    --dp-border-radius: var(--dp-border-radius-sm, 0.25rem);
  }

  .date-picker--md {
    --dp-padding: var(--dp-padding-md, 0.5rem);
    --dp-gap: var(--dp-gap-md, 0.5rem);
    --dp-cell-size: var(--dp-cell-size-md, 2.5rem);
    --dp-font-size: var(--dp-font-size-md, 1rem);
    --dp-border-radius: var(--dp-border-radius-md, 0.375rem);
  }

  .date-picker--lg {
    --dp-padding: var(--dp-padding-lg, 0.75rem);
    --dp-gap: var(--dp-gap-lg, 0.75rem);
    --dp-cell-size: var(--dp-cell-size-lg, 3rem);
    --dp-font-size: var(--dp-font-size-lg, 1.125rem);
    --dp-border-radius: var(--dp-border-radius-lg, 0.5rem);
  }

  /* Variant styles */
  .date-picker--default {
    border: var(--dp-border-width) solid var(--dp-border-color);
  }

  .date-picker--minimal {
    --dp-bg: transparent;
    border: none;
  }

  .date-picker--rounded {
    --dp-border-radius: 1rem;
  }

  .date-picker--bordered {
    border: 2px solid var(--dp-primary-color);
  }

  /* State modifiers */
  .date-picker--disabled {
    opacity: var(--dp-disabled-opacity);
    pointer-events: none;
  }

  .date-picker--loading {
    pointer-events: none;
  }

  /* Header */
  .date-picker__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--dp-padding);
    border-bottom: var(--dp-border-width) solid var(--dp-border-color);
    /* margin-bottom: var(--dp-gap); */
  }

  .date-picker__navigation {
    display: flex;
    align-items: center;
    gap: var(--dp-gap);
  }

  .date-picker__controls {
    display: flex;
    align-items: center;
    gap: var(--dp-gap);
  }

  /* Navigation buttons */
  .date-picker__nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: var(--dp-border-width) solid var(--dp-border-color);
    border-radius: var(--dp-border-radius);
    background: var(--dp-bg);
    color: var(--dp-text-color);
    font-size: var(--dp-font-size-sm);
    font-weight: var(--dp-font-weight-medium);
    cursor: pointer;
    transition: var(--dp-transition);
    min-height: 2rem;
  }

  .date-picker__nav-button:hover:not(:disabled) {
    background-color: var(--dp-secondary-hover);
    border-color: var(--dp-primary-color);
    color: var(--dp-primary-color);
  }

  .date-picker__nav-button:focus-visible {
    outline: var(--dp-focus-ring-width) solid var(--dp-focus-ring-color);
    outline-offset: var(--dp-focus-ring-offset);
  }

  .date-picker__nav-button:disabled {
    opacity: var(--dp-disabled-opacity);
    cursor: not-allowed;
  }

  .date-picker__nav-button--prev,
  .date-picker__nav-button--next {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0;
  }

  .date-picker__nav-button svg {
    width: 1rem;
    height: 1rem;
  }

  /* Control buttons */
  .date-picker__control-button {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: var(--dp-border-radius);
    background: transparent;
    color: var(--dp-text-muted);
    font-size: var(--dp-font-size-sm);
    cursor: pointer;
    transition: var(--dp-transition);
  }

  .date-picker__control-button:hover:not(:disabled) {
    background-color: var(--dp-secondary-hover);
    color: var(--dp-primary-color);
  }

  .date-picker__control-button:focus-visible {
    outline: var(--dp-focus-ring-width) solid var(--dp-focus-ring-color);
    outline-offset: var(--dp-focus-ring-offset);
  }

  /* Content area */
  .date-picker__content {
    /* padding: 0 var(--dp-padding) var(--dp-padding); */
    /* padding: 0.25rem; */
    min-width: 360px;
    min-height: 260px;
    position: relative;
  }

  .date-picker__calendar {
    width: 100%;
    height: 100%;
  }

  /* Month grid */
  .date-picker__month-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--dp-gap);
    height: 100%;
    padding: 0.25rem;
  }

  .date-picker__month-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dp-gap);
    border: var(--dp-border-width) solid var(--dp-border-color);
    border-radius: var(--dp-border-radius);
    background: var(--dp-bg);
    color: var(--dp-text-color);
    font-size: var(--dp-font-size-sm);
    font-weight: var(--dp-font-weight-medium);
    cursor: pointer;
    transition: var(--dp-transition);
  }

  .date-picker__month-button:hover:not(:disabled) {
    background-color: var(--dp-cell-hover-bg);
    color: var(--dp-cell-hover-color);
  }

  .date-picker__month-button--selected {
    background-color: var(--dp-primary-color);
    color: var(--dp-primary-text);
    border-color: var(--dp-primary-color);
  }

  .date-picker__month-button--selected:hover {
    background-color: var(--dp-primary-hover);
  }

  /* Year grid */
  .date-picker__year-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--dp-gap);
    height: 100%;
    padding: 0.25rem;
  }

  .date-picker__year-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dp-gap);
    border: var(--dp-border-width) solid var(--dp-border-color);
    border-radius: var(--dp-border-radius);
    background: var(--dp-bg);
    color: var(--dp-text-color);
    font-size: var(--dp-font-size-sm);
    font-weight: var(--dp-font-weight-medium);
    cursor: pointer;
    transition: var(--dp-transition);
  }

  .date-picker__year-button:hover:not(:disabled) {
    background-color: var(--dp-cell-hover-bg);
    color: var(--dp-cell-hover-color);
  }

  .date-picker__year-button--selected {
    background-color: var(--dp-primary-color);
    color: var(--dp-primary-text);
    border-color: var(--dp-primary-color);
  }

  .date-picker__year-button--selected:hover {
    background-color: var(--dp-primary-hover);
  }

  /* Loading state */
  .date-picker__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dp-padding);
    min-height: 200px;
  }

  .date-picker__spinner {
    width: 2rem;
    height: 2rem;
    animation: dp-spin 1s linear infinite;
  }

  @keyframes dp-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .transition-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  .transition-container > * {
    grid-row: 1;
    grid-column: 1;
  }
</style>
