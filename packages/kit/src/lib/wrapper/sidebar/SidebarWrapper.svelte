<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import DragLine from "../../drag-line/DragLine.svelte";
  import type { SidebarWrapperProps, SidebarResizeEventDetail, SidebarDragEventDetail } from '../../types.js';

  const dispatch = createEventDispatcher<{
    resize: SidebarResizeEventDetail;
    dragstart: SidebarDragEventDetail;
    dragend: SidebarDragEventDetail;
  }>();

  // Props
  export let collapsed: SidebarWrapperProps['collapsed'] = false;
  export let collapseWidth: SidebarWrapperProps['collapseWidth'] = "0";
  export let isDraggable: SidebarWrapperProps['isDraggable'] = false;
  export let defaultWidth: SidebarWrapperProps['defaultWidth'] = 321;
  export let draglinePosition: SidebarWrapperProps['draglinePosition'] = "left";
  export let minWidth: SidebarWrapperProps['minWidth'] = 320;
  export let maxWidth: SidebarWrapperProps['maxWidth'] = "25%";
  export let persistWidth: SidebarWrapperProps['persistWidth'] = false;
  export let storageKey: SidebarWrapperProps['storageKey'] = "sidebar-width";
  export let sidebarClassName: SidebarWrapperProps['sidebarClassName'] = "";
  export let sidebarStyle: SidebarWrapperProps['sidebarStyle'] = "";
  export let ariaLabel: SidebarWrapperProps['ariaLabel'] = undefined;
  export let sidebarElm: SidebarWrapperProps['sidebarElm'] = undefined;
  
  // Ensure minWidth has a value
  $: minWidthValue = minWidth ?? 320;

  let classes: string = "";
  export { classes as class };

  // Internal state
  let sidebarElem: HTMLElement;
  let initialWidth = 0;
  let sidebarWidth: string | null = null;
  let isDragging = false;

  // Width validation utility
  function validateWidth(widthPx: number): number {
    if (widthPx < minWidthValue) {
      return minWidthValue;
    }
    
    if (maxWidth && typeof window !== "undefined") {
      const maxWidthValue = parseMaxWidth(maxWidth, sidebarElem?.parentElement);
      if (maxWidthValue && widthPx > maxWidthValue) {
        return maxWidthValue;
      }
    }
    
    return widthPx;
  }

  function parseMaxWidth(maxWidthStr: string, parent?: HTMLElement | null): number | null {
    if (maxWidthStr.endsWith("px")) {
      return Number(maxWidthStr.replace("px", ""));
    }
    if (maxWidthStr.endsWith("%") && parent) {
      const parentWidth = parent.offsetWidth;
      return (Number(maxWidthStr.replace("%", "")) / 100) * parentWidth;
    }
    return null;
  }

  // Load persisted width from localStorage
  onMount(() => {
    if (persistWidth && typeof window !== "undefined" && storageKey) {
      const key = storageKey;
      const savedWidth = localStorage.getItem(key);
      if (savedWidth) {
        const widthNum = Number(savedWidth);
        if (!isNaN(widthNum) && widthNum >= minWidthValue) {
          sidebarWidth = widthNum + "px";
        }
      }
    }
  });

  // Save width to localStorage
  function saveWidth(width: number): void {
    if (persistWidth && typeof window !== "undefined" && storageKey) {
      const key = storageKey;
      localStorage.setItem(key, width.toString());
    }
  }
  
  // Update sidebarElm reference when sidebarElem changes
  $: if (sidebarElem) {
    sidebarElm = sidebarElem;
  }

  // Reactive width update
  $: if (sidebarWidth && sidebarElem) {
    const pos = draglinePosition ?? "left";
    if (["left", "right"].includes(pos)) {
      const widthStr = sidebarWidth.replace("px", "");
      const widthNum = Number(widthStr);
      if (!isNaN(widthNum)) {
        const validatedWidth = validateWidth(widthNum);
        const finalWidth = validatedWidth + "px";
        sidebarElem.style.width = finalWidth;
        
        dispatch("resize", {
          width: validatedWidth,
          widthPx: finalWidth
        });
      }
    }
  }

  // Handle drag start
  function handleDragStart(): void {
    isDragging = true;
    const pos = draglinePosition ?? "left";
    if (["left", "right"].includes(pos) && sidebarElem) {
      initialWidth = sidebarElem.offsetWidth;
      dispatch("dragstart", { initialWidth });
    }
  }

  // Handle dragging
  function handleDragging(e: CustomEvent<{ diffX: number; diffY: number }>): void {
    const pos = draglinePosition ?? "left";
    if (pos === "left") {
      sidebarWidth = initialWidth - e.detail.diffX + "px";
    } else if (pos === "right") {
      sidebarWidth = initialWidth + e.detail.diffX + "px";
    }
  }

  // Handle drag stop
  function handleDragStop(): void {
    isDragging = false;
    if (sidebarElem) {
      const finalWidth = sidebarElem.offsetWidth;
      saveWidth(finalWidth);
      dispatch("dragend", { initialWidth, finalWidth });
    }
  }

  // Computed styles
  $: computedStyle = `
    ${maxWidth && isDraggable ? `max-width: ${maxWidth};` : ''}
    ${collapsed 
      ? `width: ${collapseWidth};` 
      : sidebarWidth 
        ? `width: ${sidebarWidth};` 
        : `width: ${defaultWidth}px;`
    }
    ${sidebarStyle}
  `;
</script>

<aside
  bind:this={sidebarElem}
  class="sidebar {classes} {sidebarClassName}"
  class:sidebar--collapsed={collapsed}
  class:sidebar--draggable={isDraggable}
  style={computedStyle}
  aria-label={ariaLabel}
>
  <slot />

  {#if isDragging}
    <div class="sidebar__drag-overlay"></div>
  {/if}

  {#if isDraggable && !collapsed}
    <div class="sidebar__drag-handle sidebar__drag-handle--{draglinePosition}">
      <DragLine
        on:dragstart={handleDragStart}
        on:dragging={handleDragging}
        on:dragstop={handleDragStop}
      >
        <div
          class="sidebar__drag-handle-indicator"
          style={draglinePosition === "left" ? "left: calc(50% - 4px);" : "right: calc(-50% - 4px);"}
        >
          <div class="sidebar__drag-handle-visual">
            <div class="sidebar__drag-handle-line" />
          </div>
        </div>
      </DragLine>
    </div>
  {/if}
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex: none;
    position: relative;
    transition: width var(--sidebar-transition-duration, 300ms);
    background: var(--sidebar-bg, var(--color-surface, #ffffff));
    border-right: 1px solid var(--sidebar-border-color, var(--color-border, #d1d5db));
  }

  .sidebar--collapsed {
    overflow: hidden;
  }

  .sidebar__drag-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--sidebar-drag-overlay-z-index, 100);
  }

  .sidebar__drag-handle {
    position: absolute;
    top: 0;
    width: var(--sidebar-drag-handle-width, 8px);
    height: 100%;
    z-index: var(--sidebar-drag-handle-z-index, 10);
    user-select: none;
    transition: var(--sidebar-drag-handle-transition, opacity 0.3s);
  }

  .sidebar__drag-handle:hover {
    opacity: var(--sidebar-drag-handle-hover-opacity, 1);
  }

  .sidebar__drag-handle--left {
    left: 0;
  }

  .sidebar__drag-handle--right {
    right: 0;
  }

  .sidebar__drag-handle-indicator {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .sidebar__drag-handle-visual {
    padding-left: 2.5px;
    padding-right: 2.5px;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    border-radius: 0.25rem;
    position: relative;
    background: var(--sidebar-drag-handle-bg, #ffffff);
    border: var(--sidebar-drag-handle-border, 1px solid var(--sidebar-drag-handle-border-color, var(--color-primary-200, rgba(59, 130, 246, 0.2))));
  }

  .sidebar__drag-handle-line {
    width: 1px;
    height: 28px;
    background: var(--sidebar-drag-handle-line-color, var(--color-primary-200, rgba(59, 130, 246, 0.2)));
  }
</style>
