<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from "lucide-svelte";
  import type { PaginationProps, PaginationEvents, PaginationSize, PaginationVariant } from "../../types.js";

  // ============================================
  // PROPS - Organized by category
  // ============================================

  // Core pagination props
  export let currentOffset: PaginationProps["currentOffset"] = 0;
  export let limit: PaginationProps["limit"] = 10;
  export let totalRows: PaginationProps["totalRows"] = 0;
  export let visiblePages: PaginationProps["visiblePages"] = 5;

  // Appearance props
  export let size: PaginationSize = "md";
  export let variant: PaginationVariant = "default";
  export let className: PaginationProps["className"] = "";
  export let disabled: PaginationProps["disabled"] = false;

  // Display control props
  export let showFirstLast: PaginationProps["showFirstLast"] = true;
  export let showPreviousNext: PaginationProps["showPreviousNext"] = true;
  export let showEllipsis: PaginationProps["showEllipsis"] = true;
  export let showPageInfo: PaginationProps["showPageInfo"] = false;

  // Customization props
  export let backgroundColor: PaginationProps["backgroundColor"] = undefined;
  export let textColor: PaginationProps["textColor"] = undefined;
  export let borderColor: PaginationProps["borderColor"] = undefined;
  export let activeBackgroundColor: PaginationProps["activeBackgroundColor"] = undefined;
  export let activeTextColor: PaginationProps["activeTextColor"] = undefined;
  export let borderRadius: PaginationProps["borderRadius"] = undefined;
  export let gap: PaginationProps["gap"] = undefined;

  // Content props
  export let pageInfoFormatter: PaginationProps["pageInfoFormatter"] = undefined;
  export let ariaLabel: PaginationProps["ariaLabel"] = "Pagination navigation";

  // ============================================
  // EVENT DISPATCHER
  // ============================================
  const dispatch = createEventDispatcher<PaginationEvents>();

  // ============================================
  // COMPUTED VALUES - Normalized with defaults
  // ============================================
  $: safeCurrentOffset = currentOffset ?? 0;
  $: safeLimit = limit ?? 10;
  $: safeTotalRows = totalRows ?? 0;
  $: safeVisiblePages = visiblePages ?? 5;

  // ============================================
  // PAGINATION STATE CALCULATIONS
  // ============================================
  $: currentPage = Math.floor(safeCurrentOffset / safeLimit) + 1;
  $: totalPages = Math.ceil(safeTotalRows / safeLimit);
  $: isFirstPage = safeCurrentOffset <= 0;
  $: isLastPage = safeCurrentOffset + safeLimit >= safeTotalRows || totalPages === 0;
  $: hasPages = totalPages > 0;

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  /**
   * Calculate visible page numbers with ellipsis support
   * Returns an object with pages array and ellipsis flags
   */
  function calculatePageNumbers(
    current: number,
    total: number,
    visible: number,
    showEllipsisFlag: boolean
  ): { pages: number[]; showStartEllipsis: boolean; showEndEllipsis: boolean } {
    if (total === 0) {
      return { pages: [], showStartEllipsis: false, showEndEllipsis: false };
    }

    const pages: number[] = [];
    const halfVisible = Math.floor(visible / 2);

    let startPage = Math.max(1, current - halfVisible);
    let endPage = Math.min(total, startPage + visible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < visible - 1) {
      startPage = Math.max(1, endPage - visible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const showStartEllipsis = showEllipsisFlag && startPage > 1;
    const showEndEllipsis = showEllipsisFlag && endPage < total;

    return { pages, showStartEllipsis, showEndEllipsis };
  }

  /**
   * Format page info text
   */
  function formatPageInfo(
    offset: number,
    limit: number,
    total: number,
    formatter?: (currentPage: number, totalPages: number, totalRows: number) => string
  ): string {
    const current = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    if (formatter) {
      return formatter(current, totalPages, total);
    }

    const start = total === 0 ? 0 : offset + 1;
    const end = Math.min(offset + limit, total);
    return `Showing ${start}-${end} of ${total}`;
  }

  /**
   * Generate CSS custom properties for style overrides
   */
  function generateCustomStyles(): string {
    const styles: string[] = [];
    if (backgroundColor) styles.push(`--pagination-bg: ${backgroundColor}`);
    if (textColor) styles.push(`--pagination-text: ${textColor}`);
    if (borderColor) styles.push(`--pagination-border: ${borderColor}`);
    if (activeBackgroundColor) styles.push(`--pagination-active-bg: ${activeBackgroundColor}`);
    if (activeTextColor) styles.push(`--pagination-active-text: ${activeTextColor}`);
    if (borderRadius) styles.push(`--pagination-border-radius: ${borderRadius}`);
    if (gap !== undefined) styles.push(`--pagination-gap: ${gap}`);
    return styles.join("; ");
  }

  /**
   * Unified page change handler
   */
  function changePage(page: number, eventType: keyof PaginationEvents = "pageChange"): void {
    if (disabled || page < 1 || page > totalPages) return;

    const newOffset = (page - 1) * safeLimit;
    const eventData = { offset: newOffset, page };

    dispatch(eventType, eventData);
    if (eventType !== "pageChange") {
      dispatch("pageChange", eventData);
    }
  }

  // ============================================
  // COMPUTED VALUES
  // ============================================

  $: pageNumbers = calculatePageNumbers(currentPage, totalPages, safeVisiblePages, showEllipsis ?? false);
  $: customStyles = generateCustomStyles();
  $: pageInfo = showPageInfo ? formatPageInfo(safeCurrentOffset, safeLimit, safeTotalRows, pageInfoFormatter) : "";

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleFirstPage = () => changePage(1, "firstPage");
  const handlePreviousPage = () => changePage(currentPage - 1, "previousPage");
  const handleNextPage = () => changePage(currentPage + 1, "nextPage");
  const handleLastPage = () => changePage(totalPages, "lastPage");
  const handlePageClick = (page: number) => changePage(page);

  // ============================================
  // CLASS COMPUTATION
  // ============================================
  $: baseClasses = `pagination pagination--${size} pagination--${variant}`;
  $: paginationClasses = `${baseClasses} ${className || ""}`.trim();
  $: paginationClassesWithModifiers = `${paginationClasses}${disabled ? " pagination--disabled" : ""}`.trim();
</script>

<nav class={paginationClassesWithModifiers} style={customStyles || undefined} aria-label={ariaLabel} {...$$restProps}>
  <div class="pagination__container">
    {#if showFirstLast}
      <button
        type="button"
        class="pagination__button pagination__button--first"
        disabled={disabled || isFirstPage}
        aria-label="Go to first page"
        aria-disabled={disabled || isFirstPage}
        on:click={handleFirstPage}
      >
        <slot name="first-icon" {isFirstPage} {disabled}>
          <ChevronsLeft class="pagination__icon" />
        </slot>
      </button>
    {/if}

    {#if showPreviousNext}
      <button
        type="button"
        class="pagination__button pagination__button--previous"
        disabled={disabled || isFirstPage}
        aria-label="Go to previous page"
        aria-disabled={disabled || isFirstPage}
        on:click={handlePreviousPage}
      >
        <slot name="previous-icon" {isFirstPage} {disabled}>
          <ChevronLeft class="pagination__icon" />
        </slot>
      </button>
    {/if}

    <div class="pagination__pages">
      {#if pageNumbers.showStartEllipsis}
        <button
          type="button"
          class="pagination__button pagination__button--page"
          {disabled}
          aria-label="Go to page 1"
          on:click={() => handlePageClick(1)}
        >
          <slot name="page" pageNum={1} {currentPage} {totalPages}>1</slot>
        </button>
        <span class="pagination__ellipsis" aria-hidden="true">
          <slot name="ellipsis-start" {currentPage} {totalPages}>…</slot>
        </span>
      {/if}

      {#each pageNumbers.pages as pageNum}
        <button
          type="button"
          class="pagination__button pagination__button--page"
          class:pagination__button--active={pageNum === currentPage}
          {disabled}
          aria-label="Go to page {pageNum}"
          aria-current={pageNum === currentPage ? "page" : undefined}
          on:click={() => handlePageClick(pageNum)}
        >
          <slot name="page" {pageNum} {currentPage} {totalPages}>
            {pageNum}
          </slot>
        </button>
      {/each}

      {#if pageNumbers.showEndEllipsis}
        <span class="pagination__ellipsis" aria-hidden="true">
          <slot name="ellipsis-end" {currentPage} {totalPages}>…</slot>
        </span>
        <button
          type="button"
          class="pagination__button pagination__button--page"
          {disabled}
          aria-label="Go to page {totalPages}"
          on:click={() => handlePageClick(totalPages)}
        >
          <slot name="page" pageNum={totalPages} {currentPage} {totalPages}>
            {totalPages}
          </slot>
        </button>
      {/if}
    </div>

    {#if showPreviousNext}
      <button
        type="button"
        class="pagination__button pagination__button--next"
        disabled={disabled || isLastPage}
        aria-label="Go to next page"
        aria-disabled={disabled || isLastPage}
        on:click={handleNextPage}
      >
        <slot name="next-icon" {isLastPage} {disabled}>
          <ChevronRight class="pagination__icon" />
        </slot>
      </button>
    {/if}

    {#if showFirstLast}
      <button
        type="button"
        class="pagination__button pagination__button--last"
        disabled={disabled || isLastPage}
        aria-label="Go to last page"
        aria-disabled={disabled || isLastPage}
        on:click={handleLastPage}
      >
        <slot name="last-icon" {isLastPage} {disabled}>
          <ChevronsRight class="pagination__icon" />
        </slot>
      </button>
    {/if}
  </div>

  {#if showPageInfo && pageInfo}
    <div class="pagination__info" role="status" aria-live="polite">
      <slot
        name="page-info"
        {currentPage}
        {totalPages}
        totalRows={safeTotalRows}
        offset={safeCurrentOffset}
        limit={safeLimit}
      >
        {pageInfo}
      </slot>
    </div>
  {/if}
</nav>

<style lang="postcss">
  /* ============================================
     PAGINATION CSS VARIABLES - DESIGN TOKENS
     ============================================
     
     These variables can be customized globally or per-instance:
     
     Global override:
     :root {
       --pagination-bg-default: #ffffff;
       --pagination-active-bg-default: var(--color-primary, #3b82f6);
       --pagination-gap: 0.5rem;
     }
     
     Per-instance override:
     .custom-pagination {
       --pagination-bg: #custom-color;
       --pagination-border-radius: 0.5rem;
     }
     
     Dark theme is automatically handled via [data-theme="dark"]
  */

  .pagination {
    /* Layout */
    --pagination-display: flex;
    --pagination-flex-direction: column;
    --pagination-gap: var(--pagination-gap-default, 0.25rem);
    --pagination-align-items: center;
    --pagination-justify-content: center;
    --pagination-width: 100%;

    /* Colors - Background */
    --pagination-bg: var(--pagination-bg-default, var(--color-surface, #ffffff));
    --pagination-bg-hover: var(--pagination-bg-hover-default, var(--color-surface-hover, #f3f4f6));
    --pagination-bg-active: var(--pagination-bg-active-default, var(--color-surface-active, #e5e7eb));

    /* Colors - Text */
    --pagination-text: var(--pagination-text-default, var(--color-text, #374151));
    --pagination-text-hover: var(--pagination-text-hover-default, var(--color-text, #111827));
    --pagination-text-disabled: var(--pagination-text-disabled-default, var(--color-text-muted, #9ca3af));

    /* Colors - Active State */
    --pagination-active-bg: var(--pagination-active-bg-default, var(--color-primary-500, #3b82f6));
    --pagination-active-text: var(--pagination-active-text-default, var(--color-primary-text, #ffffff));
    --pagination-active-bg-hover: var(--pagination-active-bg-hover-default, var(--color-primary-600, #2563eb));

    /* Colors - Border */
    --pagination-border: var(--pagination-border-default, var(--color-border, #e5e7eb));
    --pagination-border-hover: var(--pagination-border-hover-default, var(--color-border, #d1d5db));
    --pagination-border-active: var(--pagination-border-active-default, var(--color-primary-500, #3b82f6));

    /* Spacing */
    --pagination-padding-x: var(--pagination-padding-x-md, 0.5rem);
    --pagination-padding-y: var(--pagination-padding-y-md, 0.5rem);
    --pagination-container-gap: var(--pagination-gap-default, 0.25rem);
    --pagination-pages-gap: var(--pagination-gap-default, 0.25rem);

    /* Button sizes */
    --pagination-button-size: var(--pagination-button-size-md, 1.75rem);
    --pagination-button-min-width: var(--pagination-button-size-md, 1.75rem);
    --pagination-button-padding-x: var(--pagination-padding-x-md, 0.5rem);

    /* Border & Radius */
    --pagination-border-radius: var(--pagination-border-radius-md, 0.375rem);
    --pagination-border-width: 1px;
    --pagination-border-style: solid;

    /* Typography */
    --pagination-font-size: var(--pagination-font-size-md, 0.875rem);
    --pagination-font-weight: 500;
    --pagination-line-height: 1.5;
    --pagination-font-family: inherit;

    /* Transitions */
    --pagination-transition-duration: 150ms;
    --pagination-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
    --pagination-transition-property: background-color, color, border-color, transform, opacity;

    /* Icon sizes */
    --pagination-icon-size: var(--pagination-icon-size-md, 1rem);
    --pagination-icon-stroke-width: 2;

    /* Focus & Outline */
    --pagination-focus-outline-width: 2px;
    --pagination-focus-outline-offset: 2px;
    --pagination-focus-outline-color: var(--pagination-active-bg);

    /* Shadow */
    --pagination-shadow: none;
    --pagination-shadow-hover: none;
    --pagination-shadow-active: none;

    /* Base styles */
    display: var(--pagination-display);
    flex-direction: var(--pagination-flex-direction);
    gap: var(--pagination-gap);
    align-items: var(--pagination-align-items);
    justify-content: var(--pagination-justify-content);
    width: var(--pagination-width);
    box-sizing: border-box;
  }

  .pagination__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--pagination-container-gap);
    flex-wrap: wrap;
    width: 100%;
  }

  .pagination__pages {
    display: flex;
    align-items: center;
    gap: var(--pagination-pages-gap);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pagination__button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--pagination-button-min-width);
    height: var(--pagination-button-size);
    padding: 0 var(--pagination-button-padding-x);
    font-size: var(--pagination-font-size);
    font-weight: var(--pagination-font-weight);
    font-family: var(--pagination-font-family);
    line-height: var(--pagination-line-height);
    color: var(--pagination-text);
    background-color: var(--pagination-bg);
    border: var(--pagination-border-width) var(--pagination-border-style) var(--pagination-border);
    border-radius: var(--pagination-border-radius);
    box-shadow: var(--pagination-shadow);
    cursor: pointer;
    transition-property: var(--pagination-transition-property);
    transition-duration: var(--pagination-transition-duration);
    transition-timing-function: var(--pagination-transition-timing);
    user-select: none;
    outline: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  .pagination__button:focus-visible {
    outline: var(--pagination-focus-outline-width) solid var(--pagination-focus-outline-color);
    outline-offset: var(--pagination-focus-outline-offset);
  }

  .pagination__button:not(:disabled):hover {
    background-color: var(--pagination-bg-hover);
    color: var(--pagination-text-hover);
    border-color: var(--pagination-border-hover);
    box-shadow: var(--pagination-shadow-hover);
  }

  .pagination__button:not(:disabled):active {
    background-color: var(--pagination-bg-active);
    transform: scale(0.95);
  }

  .pagination__button:disabled,
  .pagination__button[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--pagination-text-disabled);
    pointer-events: none;
  }

  .pagination__button--active {
    background-color: var(--pagination-active-bg);
    color: var(--pagination-active-text);
    border-color: var(--pagination-border-active);
    box-shadow: var(--pagination-shadow-active);
  }

  .pagination__button--active:not(:disabled):hover {
    background-color: var(--pagination-active-bg-hover);
    border-color: var(--pagination-border-active);
  }

  .pagination__button--active:not(:disabled):active {
    background-color: var(--pagination-active-bg-hover);
    transform: scale(0.95);
  }

  .pagination__icon {
    width: var(--pagination-icon-size);
    height: var(--pagination-icon-size);
    flex-shrink: 0;
    stroke-width: var(--pagination-icon-stroke-width);
  }

  .pagination__ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--pagination-button-min-width);
    height: var(--pagination-button-size);
    padding: 0 var(--pagination-padding-x);
    color: var(--pagination-text);
    user-select: none;
  }

  .pagination__info {
    text-align: center;
    font-size: var(--pagination-font-size);
    font-family: var(--pagination-font-family);
    color: var(--pagination-text);
    padding-top: var(--pagination-padding-y);
    line-height: var(--pagination-line-height);
  }

  /* Size variants */
  .pagination--sm {
    --pagination-button-size: var(--pagination-button-size-sm, 1.5rem);
    --pagination-button-min-width: var(--pagination-button-size-sm, 1.5rem);
    --pagination-font-size: var(--pagination-font-size-sm, 0.75rem);
    --pagination-border-radius: var(--pagination-border-radius-sm, 0.25rem);
    --pagination-icon-size: var(--pagination-icon-size-sm, 0.875rem);
    --pagination-padding-x: var(--pagination-padding-x-sm, 0.375rem);
    --pagination-padding-y: var(--pagination-padding-y-sm, 0.375rem);
  }

  .pagination--md {
    --pagination-button-size: var(--pagination-button-size-md, 1.75rem);
    --pagination-button-min-width: var(--pagination-button-size-md, 1.75rem);
    --pagination-font-size: var(--pagination-font-size-md, 0.875rem);
    --pagination-border-radius: var(--pagination-border-radius-md, 0.375rem);
    --pagination-icon-size: var(--pagination-icon-size-md, 1rem);
    --pagination-padding-x: var(--pagination-padding-x-md, 0.5rem);
    --pagination-padding-y: var(--pagination-padding-y-md, 0.5rem);
  }

  .pagination--lg {
    --pagination-button-size: var(--pagination-button-size-lg, 2rem);
    --pagination-button-min-width: var(--pagination-button-size-lg, 2rem);
    --pagination-font-size: var(--pagination-font-size-lg, 1rem);
    --pagination-border-radius: var(--pagination-border-radius-lg, 0.5rem);
    --pagination-icon-size: var(--pagination-icon-size-lg, 1.125rem);
    --pagination-padding-x: var(--pagination-padding-x-lg, 0.75rem);
    --pagination-padding-y: var(--pagination-padding-y-lg, 0.75rem);
  }

  /* Variant styles */
  .pagination--default {
    /* Uses default styles defined above */
  }

  .pagination--outlined .pagination__button {
    --pagination-border-width: 2px;
  }

  .pagination--outlined .pagination__button--active {
    --pagination-border-width: 2px;
  }

  .pagination--minimal .pagination__button {
    --pagination-border-width: 0;
    --pagination-bg: transparent;
  }

  .pagination--minimal .pagination__button:not(:disabled):hover {
    --pagination-bg: var(--pagination-bg-hover);
  }

  .pagination--minimal .pagination__button--active {
    --pagination-bg: var(--pagination-active-bg);
    --pagination-text: var(--pagination-active-text);
  }

  /* Disabled state */
  .pagination--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .pagination--disabled .pagination__button {
    cursor: not-allowed;
  }
</style>
