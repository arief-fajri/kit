<script lang="ts">
  import type { BaseLayoutWrapperProps } from "../../types.js";

  export let layoutClassName: BaseLayoutWrapperProps["layoutClassName"] = "";
  export let layoutStyle: BaseLayoutWrapperProps["layoutStyle"] = "";
  export let bodyClassName: BaseLayoutWrapperProps["bodyClassName"] = "";
  export let bodyStyle: BaseLayoutWrapperProps["bodyStyle"] = "";

  let innerHeight: number = 0;
  let innerWidth: number = 0;

  // SSR safety: initialize with fallback values
  if (typeof window !== "undefined") {
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
  }

  // Computed style strings
  $: layoutStyles = `--base-layout-height: ${innerHeight || 0}px; --base-layout-width: ${innerWidth || 0}px; ${layoutStyle}`;
  $: bodyStyles = bodyStyle || "";
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div class="base-layout {layoutClassName}" style={layoutStyles}>
  <slot name="header" />
  <div class="base-layout__body {bodyClassName}" style={bodyStyles}>
    <slot name="body" />
  </div>
  <slot name="footer" />
</div>

<style lang="postcss">
  .base-layout {
    position: fixed;
    /* display: flex; */
    width: 100vw;
    height: 100vh;
    width: var(--base-layout-width, 100vw);
    height: var(--base-layout-height, 100vh);
    left: 0;
    top: 0;
    user-select: var(--base-layout-user-select, none);
    background: var(--base-layout-bg, transparent);
    z-index: var(--base-layout-z-index, 0);
  }

  .base-layout__body {
    flex-grow: 1;
    min-width: 0;
    display: flex;
    align-items: stretch;
    color: var(--base-layout-text-color, var(--color-on-surface, inherit));
    background: var(--base-layout-body-bg, transparent);
    padding: var(--base-layout-body-padding, 0);
  }
</style>
