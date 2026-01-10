<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { sineOut } from "svelte/easing";
  import { portal } from "@rief/utils";

  // Types
  type Placement = "bottom-start" | "bottom-end" | "top-start" | "top-end" | "auto";
  type Variant = "default" | "minimal" | "elevated" | "outlined";
  type Size = "sm" | "md" | "lg" | "xl";

  // Core props
  export let visible: boolean = false;
  export let anchor: HTMLElement | null = null;

  // Positioning
  export let placement: Placement = "bottom-start";
  export let offset: { x: number; y: number } = { x: 0, y: 4 };

  // Styling
  export let variant: Variant = "default";
  export let size: Size = "md";

  // Behavior
  export let closeOnClickOutside: boolean = true;
  export let closeOnEscape: boolean = true;
  export let isFullAnchorWidth: boolean = true;

  // Custom styling
  let classes: string = "";
  export { classes as class };

  let dropdownEl: HTMLElement;
  const dispatch = createEventDispatcher<{
    open: void;
    close: void;
    positionChange: { placement: Placement; top: number; left: number };
  }>();

  const grow = (_: HTMLElement) => ({
    duration: 200,
    easing: sineOut,
    css: (t: number) => `transform: scaleY(${t}) ; opacity: ${t}`
  });

  // Size configurations
  const sizeConfig: Record<Size, { minWidth: string; maxWidth: string }> = {
    sm: { minWidth: "120px", maxWidth: "200px" },
    md: { minWidth: "160px", maxWidth: "280px" },
    lg: { minWidth: "200px", maxWidth: "360px" },
    xl: { minWidth: "240px", maxWidth: "480px" }
  };

  const composeStyle = (): string => {
    const config = sizeConfig[size] || sizeConfig.md;
    return `--dropdown-min-width: ${config.minWidth}; --dropdown-max-width: ${config.maxWidth};`;
  };

  const positionDropdown = (): void => {
    if (typeof window === "undefined" || !anchor || !dropdownEl) return;

    const anchorRect = anchor.getBoundingClientRect();
    const dropdownRect = dropdownEl.getBoundingClientRect();
    const viewport = {
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };

    let finalPlacement: Placement = placement;
    let top: number, left: number, origin: string;

    // Auto placement detection
    if (placement === "auto") {
      const spaceBelow = viewport.height - anchorRect.bottom;
      const spaceAbove = anchorRect.top;
      const spaceRight = viewport.width - anchorRect.left;
      const spaceLeft = anchorRect.right;

      if (spaceBelow >= dropdownRect.height) {
        finalPlacement = spaceRight >= dropdownRect.width ? "bottom-start" : "bottom-end";
      } else if (spaceAbove >= dropdownRect.height) {
        finalPlacement = spaceRight >= dropdownRect.width ? "top-start" : "top-end";
      } else {
        finalPlacement = "bottom-start"; // fallback
      }
    }

    let _width = dropdownRect.width;

    if (isFullAnchorWidth) {
      dropdownEl.style.maxWidth = `${anchorRect.width}px`;
      dropdownEl.style.width = `${anchorRect.width}px`;
      _width = anchorRect.width;
    }

    // Calculate position based on placement
    switch (finalPlacement) {
      case "bottom-start":
        top = anchorRect.bottom + offset.y;
        left = anchorRect.left + offset.x;
        origin = "top left";
        break;
      case "bottom-end":
        top = anchorRect.bottom + offset.y;
        left = anchorRect.right - _width - offset.x;
        origin = "top right";
        break;
      case "top-start":
        top = anchorRect.top - dropdownRect.height - offset.y;
        left = anchorRect.left + offset.x;
        origin = "bottom left";
        break;
      case "top-end":
        top = anchorRect.top - dropdownRect.height - offset.y;
        left = anchorRect.right - _width - offset.x;
        origin = "bottom right";
        break;
      default:
        top = anchorRect.bottom + offset.y;
        left = anchorRect.left + offset.x;
        origin = "top left";
    }

    // Viewport collision detection and adjustment
    if (left < 0) left = 8;
    if (left + dropdownRect.width > viewport.width) left = viewport.width - dropdownRect.width - 8;
    if (top < 0) top = 8;
    if (top + dropdownRect.height > viewport.height) top = viewport.height - dropdownRect.height - 8;

    dropdownEl.style.top = `${top + window.scrollY}px`;
    dropdownEl.style.left = `${left + window.scrollX}px`;
    dropdownEl.style.transformOrigin = origin;

    dispatch("positionChange", { placement: finalPlacement, top, left });
  };

  const handlePositioning = (): void => {
    tick().then(() => {
      positionDropdown();
    });
  };

  // Event handlers
  const handleDocumentClick = (event: MouseEvent): void => {
    if (!closeOnClickOutside) return;
    const target = event.target as Node;
    if (dropdownEl && !dropdownEl.contains(target) && anchor && !anchor.contains(target)) {
      dispatch("close");
    }
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (!closeOnEscape) return;
    if (event.key === "Escape") {
      event.preventDefault();
      dispatch("close");
    }
  };

  const addEventListeners = (): void => {
    if (typeof window === "undefined") return;
    if (closeOnClickOutside) {
      document.addEventListener("mousedown", handleDocumentClick, true);
    }
    if (closeOnEscape) {
      document.addEventListener("keydown", handleKeydown, true);
    }
  };

  const removeEventListeners = (): void => {
    if (typeof window === "undefined") return;
    document.removeEventListener("mousedown", handleDocumentClick, true);
    document.removeEventListener("keydown", handleKeydown, true);
  };

  onMount(() => {
    if (visible) {
      handlePositioning();
      addEventListeners();
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handlePositioning);
      window.addEventListener("scroll", handlePositioning, true);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handlePositioning);
        window.removeEventListener("scroll", handlePositioning, true);
      }
      removeEventListeners();
    };
  });

  $: if (visible) {
    handlePositioning();
    addEventListeners();
    dispatch("open");
  } else {
    removeEventListeners();
  }
</script>

{#if visible}
  <div
    bind:this={dropdownEl}
    use:portal
    class="dropdown dropdown--{variant} dropdown--{size} {classes}"
    style={composeStyle()}
    transition:grow
    role="menu"
    aria-hidden={!visible}
  >
    <slot>
      <div class="dropdown__fallback">No content provided</div>
    </slot>
  </div>
{/if}

<style>
  .dropdown {
    /* Base styles */
    position: absolute;
    z-index: var(--dropdown-z-index, 9999);
    border-radius: var(--dropdown-border-radius, 0.5rem);
    min-width: var(--dropdown-min-width, 160px);
    max-width: var(--dropdown-max-width, 280px);

    /* Design tokens */
    background: var(--dropdown-bg, white);
    border: var(--dropdown-border, 1px solid var(--dropdown-border-color, rgba(0, 0, 0, 0.1)));
    box-shadow: var(--dropdown-shadow, rgba(0, 0, 0, 0.05) 0px 0px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px);

    /* Typography */
    font-family: var(--dropdown-font-family, inherit);
    font-size: var(--dropdown-font-size, 0.875rem);
    line-height: var(--dropdown-line-height, 1.5);
    color: var(--dropdown-text-color, inherit);
  }

  /* Variants */
  .dropdown--minimal {
    border: none;
    box-shadow: var(--dropdown-minimal-shadow, rgba(0, 0, 0, 0.1) 0px 1px 3px);
  }

  .dropdown--elevated {
    box-shadow: var(
      --dropdown-elevated-shadow,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px
    );
  }

  .dropdown--outlined {
    border: var(--dropdown-outlined-border, 2px solid var(--dropdown-border-color, rgba(0, 0, 0, 0.2)));
    box-shadow: none;
  }

  /* Size variants handled by CSS custom properties set in JavaScript */

  .dropdown__fallback {
    padding: var(--dropdown-padding, 0.75rem);
    color: var(--dropdown-fallback-color, rgba(0, 0, 0, 0.5));
    font-style: italic;
  }

  /* Focus and interaction states */
  .dropdown:focus-within {
    outline: var(--dropdown-focus-outline, 2px solid var(--dropdown-focus-color, #3b82f6));
    outline-offset: var(--dropdown-focus-offset, 2px);
  }
</style>
