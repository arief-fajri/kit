<script lang="ts">
  import SortHeader from "./SortHeader.svelte";
  import Pagination from "../pagination/Pagination.svelte";
  import { createEventDispatcher } from "svelte";
  import { safeUniqueId, normalizeTableColumn, compareValues } from "@rief/utils";
  import type { TableColumn, TableRow, TableListingProps } from "../types";

  // Type for normalizeTableColumn input (includes index signature)
  type NormalizeTableColumnInput = { key?: string; field?: string; title?: string; label?: string; name?: string; alias?: string; sortable?: boolean; [key: string]: unknown };

  // Props with defaults
  export let columns: TableListingProps["columns"] = [];
  export let data: TableListingProps["data"] = [];
  export let sort: TableListingProps["sort"] = "";
  export let currentOffset: TableListingProps["currentOffset"] = 0;
  export let limit: TableListingProps["limit"] = 10;
  export let emptyMessage: TableListingProps["emptyMessage"] = "Tidak ada data";
  export let tableContainerClass: TableListingProps["tableContainerClass"] = "";
  export let headerClass: TableListingProps["headerClass"] = "";
  export let rowClass: TableListingProps["rowClass"] = "";
  export let cellClass: TableListingProps["cellClass"] = "";
  export let showPagination: TableListingProps["showPagination"] = true;
  export let paginationSize: TableListingProps["paginationSize"] = "md";
  export let paginationVariant: TableListingProps["paginationVariant"] = "default";
  export let paginationShowFirstLast: TableListingProps["paginationShowFirstLast"] = true;
  export let paginationShowPageInfo: TableListingProps["paginationShowPageInfo"] = false;
  export let autoResetOffsetOnSort: TableListingProps["autoResetOffsetOnSort"] = true;
  export let scrollToTopOnPageChange: TableListingProps["scrollToTopOnPageChange"] = true;
  export let customSortFn: TableListingProps["customSortFn"] = undefined;
  export let rowClickable: TableListingProps["rowClickable"] = false;
  export let loading: TableListingProps["loading"] = false;
  export let selectable: TableListingProps["selectable"] = false;
  export let selectedRows: TableListingProps["selectedRows"] = [];
  export let cssVariables: TableListingProps["cssVariables"] = {};
  export let enableHover: TableListingProps["enableHover"] = true;
  export let hoverColor: TableListingProps["hoverColor"] = undefined;
  export let tableId: TableListingProps["tableId"] = undefined;
  export let ariaLabel: TableListingProps["ariaLabel"] = undefined;
  export let tbodyClass: TableListingProps["tbodyClass"] = "";
  export let paginationClass: TableListingProps["paginationClass"] = "";
  export let draggable: TableListingProps["draggable"] = false;
  export let canDrop: TableListingProps["canDrop"] = undefined;
  export let serverSide: TableListingProps["serverSide"] = false;
  export let totalRows: TableListingProps["totalRows"] = undefined;

  const dispatch = createEventDispatcher<{
    sortChange: { sort: string };
    pageChange: { offset: number };
    rowClick: { row: TableRow; index: number };
    rowSelect: { row: TableRow; index: number; selected: boolean };
    dragStart: { row: TableRow; index: number };
    dragEnd: { row: TableRow; index: number };
    drop: { draggedRow: TableRow; targetRow: TableRow; draggedIndex: number; targetIndex: number };
  }>();

  // Generate unique table ID if not provided (SSR-safe)
  $: uniqueTableId = tableId || safeUniqueId("table-listing-");

  // Normalize columns using utility function
  $: normalizedColumns = columns.map((col) => normalizeTableColumn(col as NormalizeTableColumnInput)) as TableColumn[];

  // Default sort function
  const defaultSortFn = (dataToSort: TableRow[], sortKey: string, isDescending: boolean): TableRow[] => {
    const sorted = [...dataToSort];
    return sorted.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      return compareValues(valueA, valueB, isDescending);
    });
  };

  // Sorted data based on sort (skip if server-side)
  // Optimized: Only recalculates when sort, data, or loading actually changes
  $: sortedData = (() => {
    if (serverSide || !sort || data.length === 0 || loading) {
      return data;
    }

    const sortKey = sort.replace(/^[-+]/, "");
    const isDescending = sort.startsWith("-");

    if (customSortFn) {
      return customSortFn(data, sortKey, isDescending);
    }

    return defaultSortFn(data, sortKey, isDescending);
  })();

  // Total rows: use prop if provided (server-side), otherwise calculate from data
  $: computedTotalRows = totalRows ?? sortedData.length;

  // Paginated data (skip slicing if server-side)
  $: paginatedData = serverSide ? data : sortedData.slice(currentOffset ?? 0, (currentOffset ?? 0) + (limit ?? 10));

  // Reset offset when sort changes
  let previousSort = sort;
  $: {
    if (autoResetOffsetOnSort && previousSort !== sort && !loading) {
      currentOffset = 0;
      previousSort = sort;
    }
  }

  // Event handlers
  const handleSort = () => {
    dispatch("sortChange", { sort: sort ?? "" });
  };

  const handlePageChange = (event: CustomEvent<{ offset: number }>) => {
    dispatch("pageChange", { offset: event.detail.offset });
    if (scrollToTopOnPageChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRowClick = (row: TableRow, index: number) => {
    if (loading) return;
    dispatch("rowClick", { row, index });
  };

  const handleRowSelect = (row: TableRow, index: number, event: Event) => {
    if (loading || !selectable) return;
    event.stopPropagation();
    const rowId = (row as { id?: string | number }).id ?? index;
    const isSelected = selectedRows?.includes(rowId) ?? false;
    dispatch("rowSelect", { row, index, selected: !isSelected });
  };

  // Check if row is selected
  const isRowSelected = (row: TableRow, index: number): boolean => {
    if (!selectable) return false;
    const rowId = (row as { id?: string | number }).id ?? index;
    return selectedRows?.includes(rowId) ?? false;
  };

  // Get row class with all modifiers
  const getRowClass = (row: TableRow, index: number): string => {
    const classes: string[] = ["transition-colors"];

    if (enableHover && !loading) {
      classes.push("table-row--hoverable");
    }

    if (rowClickable && !loading) {
      classes.push("table-row--clickable");
    }

    if (selectable) {
      classes.push("table-row--selectable");
    }

    if (isRowSelected(row, index)) {
      classes.push("table-row--selected");
    }

    if (draggable && !loading) {
      classes.push("table-row--draggable");
    }

    if (draggedRowIndex === index) {
      classes.push("table-row--dragging");
    }

    if (dragOverRowIndex === index && draggedRowIndex !== index) {
      const isValidDrop = canDrop && draggedRowData ? canDrop(draggedRowData, row) : true;
      classes.push(isValidDrop ? "table-row--drag-over" : "table-row--drag-over-invalid");
    }

    if (typeof rowClass === "function") {
      const customClass = rowClass(row, index);
      if (customClass) classes.push(customClass);
    } else if (rowClass) {
      classes.push(rowClass);
    }

    return classes.filter(Boolean).join(" ");
  };

  // Get cell class with all modifiers
  const getCellClass = (column: TableColumn, row: TableRow): string => {
    const classes: string[] = ["p-4", "text-[--color-text]"];

    if (typeof cellClass === "function") {
      const customClass = cellClass(column, row);
      if (customClass) classes.push(customClass);
    } else if (cellClass) {
      classes.push(cellClass);
    }

    if (column.className) {
      classes.push(column.className);
    }

    return classes.filter(Boolean).join(" ");
  };

  // Get cell value with fallback
  const getCellValue = (column: TableColumn, row: TableRow): unknown => {
    const key = column.key || column.field || "";
    return row[key] ?? "-";
  };

  // Generate CSS variables string
  $: cssVarsString = Object.entries(cssVariables || {})
    .map(([key, value]) => `--${key}: ${value}`)
    .join("; ");

  // Generate hover style
  $: hoverStyle = hoverColor ? `background-color: ${hoverColor};` : undefined;

  // Drag and drop state
  let draggedRowIndex: number | null = null;
  let dragOverRowIndex: number | null = null;
  let draggedRowData: TableRow | null = null;

  // Drag handlers
  const handleDragStart = (event: DragEvent, row: TableRow, index: number) => {
    if (!draggable || loading) return;
    draggedRowIndex = index;
    draggedRowData = row;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", JSON.stringify({ index, row }));
    }

    dispatch("dragStart", { row, index });
  };

  const handleDragEnd = (event: DragEvent, row: TableRow, index: number) => {
    if (!draggable) return;
    draggedRowIndex = null;
    dragOverRowIndex = null;
    draggedRowData = null;
    dispatch("dragEnd", { row, index });
  };

  const handleDragOver = (event: DragEvent, row: TableRow, index: number) => {
    if (!draggable || loading || draggedRowIndex === null || draggedRowIndex === index) return;

    const isValidDrop = canDrop ? canDrop(draggedRowData!, row) : true;

    if (isValidDrop) {
      event.preventDefault();
      event.dataTransfer!.dropEffect = "move";
      dragOverRowIndex = index;
    }
  };

  const handleDragLeave = () => {
    if (!draggable) return;
    dragOverRowIndex = null;
  };

  const handleDrop = (event: DragEvent, targetRow: TableRow, targetIndex: number) => {
    if (!draggable || loading || draggedRowIndex === null) return;

    event.preventDefault();

    const isValidDrop = canDrop ? canDrop(draggedRowData!, targetRow) : true;

    if (isValidDrop && draggedRowData) {
      dispatch("drop", {
        draggedRow: draggedRowData,
        targetRow,
        draggedIndex: draggedRowIndex,
        targetIndex
      });
    }

    draggedRowIndex = null;
    dragOverRowIndex = null;
    draggedRowData = null;
  };
</script>

<div
  class="table-listing bg-[--color-surface] rounded-lg overflow-hidden border border-[--color-border] {tableContainerClass}"
  style={cssVarsString || undefined}
  id={uniqueTableId}
>
  <div class="table-listing__scroll-wrapper">
    <table
      class="table-listing__table"
      aria-label={ariaLabel}
      aria-rowcount={computedTotalRows}
      aria-colcount={normalizedColumns.length}
    >
      <thead
        class="table-listing__header bg-[--color-surface-secondary] border-b border-[--color-border] {headerClass}"
      >
        <tr>
          {#if selectable}
            <th scope="col" class="table-listing__checkbox-header p-4 w-12" aria-label="Select row">
              <slot name="header-checkbox">
                <!-- Checkbox column header -->
              </slot>
            </th>
          {/if}
          {#each normalizedColumns as column}
            <SortHeader
              name={column.title ?? ""}
              key={column.key ?? ""}
              bind:sort
              disable={!column.sortable || loading}
              on:sorting={handleSort}
              className={column.className ?? ""}
              colClass={column.colClass ?? ""}
            />
          {/each}
        </tr>
      </thead>
      <tbody class="table-listing__body divide-y divide-[--color-border] {tbodyClass}">
        {#if loading}
          <tr>
            <td colspan={normalizedColumns.length + (selectable ? 1 : 0)} class="px-6 py-12 text-center">
              <slot name="loading">
                <div style="height: 120px; display: flex; align-items: center; justify-content: center">
                  <p class="text-[--color-text-secondary]">Memuat data...</p>
                </div>
              </slot>
            </td>
          </tr>
        {:else if paginatedData.length === 0}
          <tr>
            <td
              colspan={normalizedColumns.length + (selectable ? 1 : 0)}
              style="padding: 16px; color: var(--color-text-secondary); height: 100%"
            >
              <slot name="empty">
                <div style="height: 120px; display: flex; align-items: center; justify-content: center">
                  <p class="text-center">{emptyMessage}</p>
                </div>
              </slot>
            </td>
          </tr>
        {:else}
          {#each paginatedData as row, rowIndex}
            {@const globalIndex = (currentOffset ?? 0) + rowIndex}
            {@const isSelected = isRowSelected(row, globalIndex)}
            <tr
              class={getRowClass(row, globalIndex)}
              draggable={draggable && !loading}
              on:click={() => rowClickable && handleRowClick(row, globalIndex)}
              on:dragstart={(e) => handleDragStart(e, row, globalIndex)}
              on:dragend={(e) => handleDragEnd(e, row, globalIndex)}
              on:dragover={(e) => handleDragOver(e, row, globalIndex)}
              on:dragleave={handleDragLeave}
              on:drop={(e) => handleDrop(e, row, globalIndex)}
              role={rowClickable ? "button" : undefined}
              tabindex={rowClickable ? 0 : undefined}
              aria-selected={selectable ? isSelected : undefined}
              aria-rowindex={globalIndex + 1}
            >
              {#if selectable}
                <td
                  class="table-listing__checkbox-cell p-4 w-12"
                  on:click={(e) => handleRowSelect(row, globalIndex, e)}
                  role="gridcell"
                >
                  <slot name="row-checkbox" {row} {rowIndex} {isSelected}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      class="cursor-pointer"
                      aria-label="Select row {globalIndex + 1}"
                      tabindex="-1"
                    />
                  </slot>
                </td>
              {/if}
              {#each normalizedColumns as column, colIndex}
                <td class={getCellClass(column, row)} style={column.style} role="gridcell" aria-label={column.title}>
                  <slot name="cell" {column} {row} {rowIndex} {colIndex} {globalIndex}>
                    {getCellValue(column, row)}
                  </slot>
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  {#if showPagination && computedTotalRows > 0 && !loading}
    <div class="table-listing__pagination px-4 py-4 border-t flex items-center justify-center {paginationClass}">
      <Pagination
        bind:currentOffset
        {limit}
        totalRows={computedTotalRows}
        size={paginationSize}
        variant={paginationVariant}
        showFirstLast={paginationShowFirstLast}
        showPageInfo={paginationShowPageInfo}
        on:pageChange={handlePageChange}
      />
    </div>
  {/if}
</div>

<style>
  .table-listing {
    --table-listing-hover-bg: var(--color-surface-hover, #f3f4f6);
    --table-listing-selected-bg: var(--color-surface-secondary, #f9fafb);
    --table-listing-transition: background-color 150ms ease-in-out;

    display: flex;
    flex-direction: column;
  }

  .table-listing__scroll-wrapper {
    overflow-x: auto;
    overflow-y: visible;
    /* Ensure the sticky header works relative to page scroll */
    /* Using contain: layout style paint to optimize but not block sticky */
    -webkit-overflow-scrolling: touch;
  }

  .table-listing__table {
    width: 100%;
    min-width: max-content;
  }

  .table-row--hoverable:hover {
    background-color: var(--table-listing-hover-bg);
  }

  .table-row--clickable {
    cursor: pointer;
  }

  .table-row--clickable:focus {
    outline: 2px solid var(--color-primary, #05ac69);
    outline-offset: -2px;
  }

  .table-row--selectable {
    cursor: default;
  }

  .table-row--selected {
    background-color: var(--table-listing-selected-bg);
  }

  .table-listing__checkbox-cell {
    cursor: pointer;
  }

  .table-listing__checkbox-cell input[type="checkbox"] {
    accent-color: var(--color-primary, #05ac69);
  }

  .table-row--draggable {
    cursor: grab;
  }

  .table-row--draggable:active {
    cursor: grabbing;
  }

  .table-row--dragging {
    opacity: 0.5;
  }

  .table-row--drag-over {
    background-color: var(--color-primary, #05ac69);
    background-color: color-mix(in srgb, var(--color-primary, #05ac69) 15%, transparent);
  }

  .table-row--drag-over-invalid {
    background-color: color-mix(in srgb, var(--color-error, #ef4444) 10%, transparent);
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .table-listing__wrapper {
      overflow-x: scroll;
    }
  }
</style>
