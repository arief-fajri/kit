<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { PageWrapperProps, PageWrapperScrollEventDetail } from '../../types.js';

  export let center: PageWrapperProps['center'] = false;
  export let wrapperClassName: PageWrapperProps['wrapperClassName'] = "";
  export let wrapperStyle: PageWrapperProps['wrapperStyle'] = "";
  export let contentClassName: PageWrapperProps['contentClassName'] = "";
  export let contentStyle: PageWrapperProps['contentStyle'] = "";
  export let footerClassName: PageWrapperProps['footerClassName'] = "";
  export let footerStyle: PageWrapperProps['footerStyle'] = "";
  export let pageElm: PageWrapperProps['pageElm'];
  export let contentElm: PageWrapperProps['contentElm'];
  export let footerElm: PageWrapperProps['footerElm'];

  const dispatch = createEventDispatcher<{
    scroll: PageWrapperScrollEventDetail;
  }>();

  function handleScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (typeof window === "undefined" || !target) return;

    const detail: PageWrapperScrollEventDetail = {
      scrollTop: target.scrollTop,
      scrollLeft: target.scrollLeft,
      scrollHeight: target.scrollHeight,
      clientHeight: target.clientHeight,
      target
    };
    dispatch("scroll", detail);
  }
</script>

<div
  class="page-wrapper {wrapperClassName}"
  class:center-content={center}
  bind:this={pageElm}
  style={wrapperStyle}
  on:scroll={handleScroll}
>
  <div class="page-content {contentClassName}" style={contentStyle} bind:this={contentElm}>
    <slot />
  </div>

  {#if $$slots.footer}
    <footer class="page-footer {footerClassName}" style={footerStyle} bind:this={footerElm}>
      <slot name="footer" />
    </footer>
  {/if}
</div>

<style lang="postcss">
  .page-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: var(--page-wrapper-scroll-behavior, smooth);
    position: relative;
    background: var(--page-wrapper-bg, var(--color-surface, transparent));
    padding: var(--page-wrapper-padding, 0);
  }

  :global(.overlay-active .page-wrapper) {
    overflow-y: hidden;
  }

  .page-content {
    width: 100%;
    max-width: var(--page-content-max-width, none);
    padding: var(--page-content-padding, 0);
  }

  .page-wrapper.center-content .page-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;
  }

  .page-footer {
    background: var(--page-footer-bg, transparent);
    padding: var(--page-footer-padding, 0);
  }
</style>
