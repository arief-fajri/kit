<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let className: string = "";
  export let colClass: string = "";

  export let name: string | undefined;
  export let key: string;
  export let sort: string = "";
  export let disable = false;

  const dispatch = createEventDispatcher<{
    sorting: void;
  }>();

  let currentKey = "";

  const toggleSort = (): void => {
    if (disable) {
      return;
    }

    currentKey = key;

    if (!sort || sort.replace("-", "").replace("+", "") !== currentKey) {
      sort = "-" + key;
    } else if (sort === "-" + key) {
      sort = "+" + key;
    } else {
      sort = "";
    }

    dispatch("sorting");
  };

  // Computed classes for icon state
  $: isActive = sort === "-" + key || sort === "+" + key;
  $: isDescending = sort === "-" + key;
</script>

<th
  scope="col"
  tabindex="0"
  title={key}
  class="sort-header {className}"
  class:sort-header--disabled={disable}
  style:cursor={!disable ? "pointer" : "default"}
  on:click={toggleSort}
>
  <div class="sort-header__content {className} {colClass}" class:sort-header__content--hoverable={!disable}>
    <slot>
      <p class="sort-header__text">{name}</p>
    </slot>
    {#if !disable}
      <div
        class="sort-header__icon"
        class:sort-header__icon--active={isActive}
        class:sort-header__icon--descending={isDescending}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 13V3M9 6l3-3l3 3m-3 11a2 2 0 1 1 0 4a2 2 0 0 1 0-4z"
          />
        </svg>
      </div>
    {/if}
  </div>
</th>

<style>
  /* ============================================
     SORT HEADER CSS VARIABLES
     ============================================
     
     These variables can be customized globally or per-instance:
     
     Global override:
     :root {
       --sort-header-bg-hover: var(--color-surface-hover);
       --sort-header-icon-color: var(--color-text-secondary);
     }
     
     Per-instance override:
     .custom-table .sort-header {
       --sort-header-bg-hover: #custom-color;
     }
     
     Dark theme is automatically handled via [data-theme="dark"]
  */

  :root {
    /* Background colors */
    --sort-header-bg: transparent;
    --sort-header-bg-hover: var(--color-surface-hover, #f3f4f6);

    /* Text colors */
    --sort-header-text-color: var(--color-text, #111827);
    --sort-header-text-color-hover: var(--color-text, #111827);

    /* Icon colors */
    --sort-header-icon-color: var(--color-text-muted, #9ca3af);
    --sort-header-icon-color-hover: var(--color-text-secondary, #6b7280);
    --sort-header-icon-color-active: var(--color-text, #111827);

    /* Spacing */
    --sort-header-padding-x: 0.75rem;
    --sort-header-padding-y: 0.5rem;
    --sort-header-gap: 0.25rem;

    /* Transitions */
    --sort-header-transition-duration: 200ms;
    --sort-header-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sort-header {
    background-color: var(--sort-header-bg);
    transition: background-color var(--sort-header-transition-duration) var(--sort-header-transition-timing);
  }

  .sort-header--disabled {
    cursor: default;
  }

  .sort-header__content {
    padding: var(--sort-header-padding-y) var(--sort-header-padding-x);
    display: flex;
    flex: none;
    align-items: center;
    /* justify-content: space-between; */
    gap: var(--sort-header-gap);
    color: var(--sort-header-text-color);
    transition: background-color var(--sort-header-transition-duration) var(--sort-header-transition-timing);
  }

  .sort-header__content--hoverable:hover {
    background-color: var(--sort-header-bg-hover);
    color: var(--sort-header-text-color-hover);
  }

  .sort-header__text {
    white-space: nowrap;
    margin: 0;
    font-weight: var(--font-weight-medium, 500);
  }

  .sort-header__icon {
    height: 1.25rem;
    width: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--sort-header-icon-color);
    transition-property: opacity, transform, color;
    transition-duration: var(--sort-header-transition-duration);
    transition-timing-function: var(--sort-header-transition-timing);
    opacity: 0;
    transform: rotate(0deg);
  }

  .sort-header:hover .sort-header__icon,
  .sort-header__icon--active {
    opacity: 1;
  }

  .sort-header__icon--active {
    color: var(--sort-header-icon-color-active);
  }

  .sort-header__icon--descending {
    transform: rotate(180deg);
  }

  .sort-header:hover .sort-header__icon:not(.sort-header__icon--active) {
    color: var(--sort-header-icon-color-hover);
  }
</style>
