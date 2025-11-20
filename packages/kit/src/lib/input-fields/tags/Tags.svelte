<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  // Types
  interface TagItem {
    id?: string | number;
    name?: string;
    [key: string]: any;
  }

  interface AutoCompleteItem {
    [key: string]: any;
  }

  type TagsArray = (string | TagItem)[];
  type AutoCompleteArray = AutoCompleteItem[];

  const dispatch = createEventDispatcher<{
    tags: { tags: TagsArray };
    input: { value: string };
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
    keydown: { event: KeyboardEvent };
    paste: { event: ClipboardEvent };
    drop: { event: DragEvent };
  }>();

  // Constants
  const KEY_CODES = {
    ENTER: 13,
    BACKSPACE: 8,
    TAB: 9,
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    ESCAPE: 27,
    DELETE: 46,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    NUM_0: 48,
    NUM_9: 57,
    NUMPAD_0: 96,
    NUMPAD_9: 105,
    DECIMAL: 190,
    NUMPAD_DECIMAL: 110
  } as const;

  const DEFAULT_DEBOUNCE_MS = 500;

  // Props
  export let tags: TagsArray = [];
  export let isError: boolean = false;
  export let addKeys: number[] = [KEY_CODES.ENTER];
  export let maxTags: number | false = false;
  export let onlyUnique: boolean = false;
  export let removeKeys: number[] = [KEY_CODES.BACKSPACE];
  export let placeholder: string = "";
  export let allowPaste: boolean = false;
  export let allowDrop: boolean = false;
  export let splitWith: string = ",";
  export let autoComplete: AutoCompleteArray | ((value: string, signal?: AbortSignal) => AutoCompleteArray | Promise<AutoCompleteArray>) | false = false;
  export let autoCompleteKey: string | false = false;
  export let autoCompleteMarkupKey: string | false = false;
  export let name: string = "svelte-tags-input";
  export let id: string = "";
  export let allowBlur: boolean = false;
  export let disable: boolean = false;
  export let minChars: number = 0;
  export let onlyAutocomplete: boolean = false;
  export let readonly: boolean = false;
  export let onTagClick: (tag: string | TagItem) => void = () => {};
  export let autoCompleteShowKey: string | false = false;
  export let label: string = "";
  export let labelClass: string = "";
  export let required: boolean = false;
  export let wrapperClass: string = "";
  export let numberOnly: boolean = false;
  export let allowDecimal: boolean = false;
  export let debounceMs: number = DEFAULT_DEBOUNCE_MS;

  // Internal state
  let tag: string = "";
  let arrelementsmatch: AutoCompleteArray = [];
  let autoCompleteIndex: number = -1;
  let layoutElement: HTMLElement;
  let inputElement: HTMLInputElement;
  let dropdownElement: HTMLElement;
  let storePlaceholder: string = placeholder;
  let isLoading: boolean = false;
  let searchInput: string = "";
  let debounceSearch: ReturnType<typeof setTimeout> | null = null;
  let controller: AbortController | null = null;

  // Generate unique ID if not provided - SSR safe
  let uniqueId: string = "";
  
  onMount(() => {
    if (!uniqueId) {
      uniqueId = "sti_" + Math.random().toString(36).substring(2, 11);
    }
  });
  
  // Fallback ID for SSR
  $: if (typeof window === 'undefined' && !uniqueId) {
    uniqueId = 'sti_ssr';
  }

  $: tags = tags || [];
  $: id = id || uniqueId;
  $: autoCompleteShowKey = autoCompleteShowKey || autoCompleteKey;

  // Utility functions
  function regExpEscape(s: string): string {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  function escapeHTML(string: string): string {
    const htmlEscapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    };
    return ("" + string).replace(/[&<>"'\/]/g, (match) => htmlEscapes[match]);
  }

  function buildMatchMarkup(search: string, value: string): string {
    return escapeHTML(value).replace(RegExp(regExpEscape(search.toLowerCase()), "i"), "<strong>$&</strong>");
  }

  function getClipboardData(e: ClipboardEvent): string {
    if ((window as any).clipboardData) {
      return (window as any).clipboardData.getData("Text");
    }
    if (e.clipboardData) {
      return e.clipboardData.getData("text/plain");
    }
    return "";
  }

  function splitTags(data: string): string[] {
    return data.split(splitWith).map((tag) => tag.trim());
  }

  function sanitizeNumberInput(data: string, allowDecimal: boolean): string {
    if (allowDecimal) {
      data = data.replace(/[^0-9.]/g, "");
      const parts = data.split(".");
      if (parts.length > 2) {
        data = parts.shift() + "." + parts.join("");
      }
    } else {
      data = data.replace(/\D+/g, "");
    }
    return data;
  }

  function validateNumberInput(e: KeyboardEvent): boolean {
    if (!numberOnly) return true;

    const isNumberKey = (e.keyCode >= KEY_CODES.NUM_0 && e.keyCode <= KEY_CODES.NUM_9) ||
      (e.keyCode >= KEY_CODES.NUMPAD_0 && e.keyCode <= KEY_CODES.NUMPAD_9);
    const isAllowedKey = [
      KEY_CODES.BACKSPACE,
      KEY_CODES.TAB,
      KEY_CODES.ENTER,
      KEY_CODES.ARROW_LEFT,
      KEY_CODES.ARROW_RIGHT,
      KEY_CODES.DELETE
    ].includes(e.keyCode as any);
    const isDecimal = allowDecimal && (e.key === "." || e.keyCode === KEY_CODES.DECIMAL || e.keyCode === KEY_CODES.NUMPAD_DECIMAL);

    if (!(isNumberKey || isAllowedKey || isDecimal)) {
      e.preventDefault();
      return false;
    }

    if (isDecimal && (e.target as HTMLInputElement).value.includes(".")) {
      e.preventDefault();
      return false;
    }

    return true;
  }

  // Tag management
  function addTag(currentTag: string | TagItem): void {
    if (!currentTag) return;
    if (numberOnly && typeof currentTag === 'string' && !new RegExp(allowDecimal ? /^\d*(\.\d+)?$/ : /^\d+$/).test(currentTag)) return;

    let currentObjTags: TagItem | undefined;
    if (typeof currentTag === "object" && currentTag !== null) {
      if (!autoCompleteKey) {
        console.error("'autoCompleteKey' is necessary if 'autoComplete' result is an array of objects");
        return;
      }

      if (onlyUnique) {
        let found = tags?.find((elem) => 
          typeof elem === 'object' && elem !== null && 
          autoCompleteKey && (elem as any)[autoCompleteKey] === (currentTag as any)[autoCompleteKey]
        );
        if (found) return;
      }

      currentObjTags = currentTag;
      const tagValue = autoCompleteKey ? currentTag[autoCompleteKey] : '';
      currentTag = typeof tagValue === "string" ? tagValue.trim() : String(tagValue);
    } else if (typeof currentTag === "string") {
      currentTag = currentTag.trim();
    }

    if (currentTag == "") return;
    if (maxTags && tags.length == maxTags) return;
    if (onlyUnique && tags.includes(currentTag)) return;
    if (onlyAutocomplete && arrelementsmatch.length === 0) return;

    tags.push(currentObjTags ? currentObjTags : currentTag);
    tags = tags;
    tag = "";

    arrelementsmatch = [];
    autoCompleteIndex = -1;
    
    if (inputElement) {
      inputElement.focus();
    }

    if (maxTags && tags.length == maxTags) {
      if (inputElement) {
        inputElement.readOnly = true;
      }
      placeholder = "";
    }

    dispatch("tags", { tags });
  }

  function removeTag(i: number): void {
    tags.splice(i, 1);
    tags = tags;

    dispatch("tags", { tags });
    arrelementsmatch = [];
    
    if (inputElement) {
      inputElement.readOnly = false;
      inputElement.focus();
    }
    placeholder = storePlaceholder;
  }

  // Keyboard handling
  function setTag(e: KeyboardEvent): void {
    if (!validateNumberInput(e)) return;

    const currentTag = (e.target as HTMLInputElement).value;

    if (addKeys) {
      addKeys.forEach(function (key) {
        if (key === e.keyCode) {
          if (currentTag) e.preventDefault();

          if (autoComplete && dropdownElement && arrelementsmatch.length > 0) {
            if (onlyAutocomplete) {
              addTag(arrelementsmatch?.[autoCompleteIndex]?.label);
            } else {
              addTag(arrelementsmatch?.[autoCompleteIndex]?.label || currentTag);
            }
          } else {
            addTag(currentTag);
          }
        }
      });
    }

    if (removeKeys) {
      removeKeys.forEach(function (key) {
        if (key === e.keyCode && tag === "") {
          tags.pop();
          tags = tags;
          dispatch("tags", { tags });
          arrelementsmatch = [];
          
          if (inputElement) {
            inputElement.readOnly = false;
            inputElement.focus();
          }
          placeholder = storePlaceholder;
        }
      });
    }

    if (e.keyCode === KEY_CODES.ARROW_DOWN && autoComplete && dropdownElement && arrelementsmatch.length > 0) {
      if (autoCompleteIndex + 1 === arrelementsmatch.length) autoCompleteIndex = 0;
      else autoCompleteIndex++;
    } else if (e.keyCode === KEY_CODES.ARROW_UP && autoComplete && dropdownElement && arrelementsmatch.length > 0) {
      if (autoCompleteIndex <= 0) autoCompleteIndex = arrelementsmatch.length - 1;
      else autoCompleteIndex--;
    } else if (e.keyCode === KEY_CODES.ESCAPE) {
      arrelementsmatch = [];
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  // Paste and drop handlers
  function onPaste(e: ClipboardEvent): void {
    if (!allowPaste) return;
    e.preventDefault();

    let data = getClipboardData(e);
    if (numberOnly) {
      data = sanitizeNumberInput(data, allowDecimal);
    }
    splitTags(data).map((tag) => addTag(tag));
  }

  function onDrop(e: DragEvent): void {
    if (!allowDrop) return;
    e.preventDefault();

    let data = e.dataTransfer?.getData("Text") || "";
    if (numberOnly) {
      data = sanitizeNumberInput(data, allowDecimal);
    }
    splitTags(data).map((tag) => addTag(tag));
  }

  // Focus handlers
  function onFocus(): void {
    if (layoutElement) {
      layoutElement.classList.add("focus");
    }
  }

  function onBlur(e: FocusEvent, tag: string): void {
    if (layoutElement) {
      layoutElement.classList.remove("focus");
    }

    if (allowBlur) {
      if (arrelementsmatch.length && autoCompleteIndex > -1) {
        addTag(arrelementsmatch?.[autoCompleteIndex]?.label);
      } else if (!arrelementsmatch.length) {
        e.preventDefault();
        addTag(tag);
      }
    }

    arrelementsmatch = [];
    autoCompleteIndex = -1;
  }

  // Autocomplete
  async function getMatchElements(value: string): Promise<void> {
    if (!autoComplete) return;
    if (maxTags && tags.length >= maxTags) return;

    dispatch("input", { value });
    searchInput = value;

    if (value.length < minChars) {
      arrelementsmatch = [];
      isLoading = false;
      return;
    }

    isLoading = true;

    let autoCompleteValues: AutoCompleteArray = [];
    if (Array.isArray(autoComplete)) {
      autoCompleteValues = autoComplete;
    } else if (typeof autoComplete === "function") {
      try {
        if ((autoComplete as any).constructor.name === "AsyncFunction") {
          if (controller) controller.abort();
          controller = new AbortController();
          autoCompleteValues = await autoComplete(value, controller.signal);
        } else {
          autoCompleteValues = autoComplete(value) as AutoCompleteArray;
        }
      } catch (error) {
        console.error("Error in autocomplete function:", error);
        isLoading = false;
        return;
      }
    }

    if (autoCompleteValues?.constructor?.name === "Promise") {
      try {
        autoCompleteValues = await autoCompleteValues;
      } catch (error) {
        console.error("Error resolving autocomplete promise:", error);
        isLoading = false;
        return;
      }
    }

    isLoading = false;
    let matchs = autoCompleteValues;

    if (autoCompleteValues !== null && autoCompleteValues.length && typeof autoCompleteValues[0] === "object") {
      if (!autoCompleteKey) {
        console.error("'autoCompleteKey' is necessary if 'autoComplete' result is an array of objects");
        return;
      }
      matchs = matchs.map((matchTag) => {
        return {
          label: matchTag,
          search: autoCompleteMarkupKey
            ? matchTag[autoCompleteMarkupKey]
            : buildMatchMarkup(value, matchTag[autoCompleteKey])
        };
      });
    } else {
      matchs = matchs.map((matchTag) => {
        return {
          label: matchTag,
          search: buildMatchMarkup(value, String(matchTag))
        };
      });
    }

    if (onlyUnique === true && !autoCompleteKey) {
      matchs = matchs.filter((tag) => !tags.includes(tag.label));
    }
    arrelementsmatch = matchs;
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    watchSearchInput(target?.value || '', true);
  };

  const watchSearchInput = (eventValue: string, isKeyUp: boolean) => {
    let valToSearch = "";
    if (!eventValue) {
      if (isKeyUp) {
        valToSearch = "";
        searchInput = "";
      } else {
        valToSearch = searchInput;
      }
    } else {
      valToSearch = eventValue;
      searchInput = valToSearch;
    }

    if (debounceSearch) {
      clearTimeout(debounceSearch);
      if (controller) {
        controller.abort();
        controller = null;
      }
    }

    debounceSearch = setTimeout(() => {
      getMatchElements(valToSearch);
    }, debounceMs);
  };

  // Dropdown positioning
  const checkPosition = (node: HTMLElement) => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const rect = node.getBoundingClientRect();
    const parentNode = node.parentNode;

    let parentHeight = 0;
    let origin = [];
    const gap = 4;

    if (parentNode && 'getBoundingClientRect' in parentNode) {
      const parentRect = (parentNode as HTMLElement).getBoundingClientRect();
      parentHeight = parentRect.height;
    }

    if (rect.top + rect.height + parentHeight + gap >= vh) {
      node.style.bottom = `${parentHeight + gap}px`;
      origin = ["bottom"];

      const afterSetPostion = node.getBoundingClientRect();
      if (afterSetPostion.top < 12) {
        node.style.removeProperty("bottom");
        node.style.top = `${parentHeight + gap}px`;
        origin = ["top"];
      }
    } else {
      node.style.top = `${parentHeight + gap}px`;
      origin = ["top"];
    }

    node.style.transformOrigin = `${origin.join(" ")}`;
  };
</script>

<div class="tags">
  <slot name="label">
    {#if label}
      <p class="tags__label {labelClass}">
        {label}
        {#if required}
          <span class="tags__required">*</span>
        {/if}
      </p>
    {/if}
  </slot>
  <div class="tags__container" class:tags__container--error={isError}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="tags__wrapper {wrapperClass}"
      class:tags__wrapper--disabled={disable}
      class:tags__wrapper--readonly={readonly}
      on:click={() => {
        if (inputElement) {
          inputElement.focus();
        }
        watchSearchInput("", false);
      }}
    >
      <div class="tags__layout" bind:this={layoutElement}>
        {#if tags.length > 0}
          {#each tags as tagItem, i}
            <button class="tags__tag" on:click={() => onTagClick(tagItem)}>
              <slot name="tag-label" tag={tagItem}>
                {#if typeof tagItem === "string" || typeof tagItem === "number"}
                  {tagItem}
                {:else if typeof tagItem === "object"}
                  {autoCompleteShowKey && tagItem && typeof tagItem === 'object' ? tagItem[autoCompleteShowKey] : ''}
                {/if}
              </slot>

              {#if !disable && !readonly}
                <span class="tags__tag-remove" on:pointerdown|preventDefault={() => removeTag(i)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              {/if}
            </button>
          {/each}
        {/if}
        <input
          type="text"
          {id}
          {name}
          bind:this={inputElement}
          bind:value={tag}
          on:keydown={setTag}
          on:keyup={handleKeyUp}
          on:paste={onPaste}
          on:drop={onDrop}
          on:focus={onFocus}
          on:blur={(e) => onBlur(e, tag)}
          class="tags__input"
          {placeholder}
          disabled={disable || readonly}
          autocomplete="off"
          class:tags__input--hidden={maxTags === tags.length}
          inputmode={numberOnly ? (allowDecimal ? "decimal" : "numeric") : undefined}
          pattern={numberOnly ? (allowDecimal ? "[0-9]*[.,]?[0-9]*" : "[0-9]*") : undefined}
        />
      </div>
      {#if isLoading}
        <div class="tags__loading">
          <svg class="tags__loading-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"/>
            <path d="M12 2C6.477 2 2 6.477 2 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>
      {/if}
      {#if autoComplete && arrelementsmatch.length > 0}
        <ul class="tags__dropdown" bind:this={dropdownElement} use:checkPosition>
          {#each arrelementsmatch as element, index}
            <li
              tabindex="-1"
              class:tags__dropdown-item--focus={index === autoCompleteIndex}
              on:pointerdown|preventDefault={() => addTag(element.label)}
            >
              <slot {element}>
                {@html element.search}
              </slot>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .tags {
    --tags-bg: var(--color-surface, #ffffff);
    --tags-border: var(--color-border, #d1d5db);
    --tags-border-focus: var(--color-primary, #3b82f6);
    --tags-border-error: var(--color-error, #ef4444);
    --tags-text: var(--color-text, #111827);
    --tags-text-placeholder: var(--color-text-muted, #6b7280);
    --tags-label: var(--color-text-secondary, #374151);
    --tags-error-text: var(--color-error, #ef4444);
    --tags-radius: var(--radius-md, 0.5rem);
    --tags-shadow-focus: var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1));
    
    --tags-tag-bg: var(--color-primary-100, #dbeafe);
    --tags-tag-bg-hover: var(--color-primary-200, #bfdbfe);
    --tags-tag-text: var(--color-primary, #3b82f6);
    --tags-tag-radius: var(--radius-sm, 0.25rem);
    --tags-tag-padding-x: 0.5rem;
    --tags-tag-padding-y: 0.25rem;
    --tags-tag-gap: 0.3125rem;
    
    --tags-dropdown-bg: var(--color-surface, #ffffff);
    --tags-dropdown-border: var(--color-border, #d1d5db);
    --tags-dropdown-item-hover: var(--color-primary-100, #dbeafe);
    --tags-dropdown-max-height: 240px;
    
    --tags-disabled-opacity: 0.5;
    --tags-disabled-bg: var(--color-surface-disabled, #f9fafb);
    
    width: 100%;
    font-family: inherit;
  }

  .tags__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--tags-label);
    margin-bottom: 0.25rem;
  }

  .tags__required {
    color: var(--tags-error-text);
    margin-left: 0.125rem;
  }

  .tags__container {
    position: relative;
  }

  .tags__container--error .tags__wrapper {
    border-color: var(--tags-border-error);
  }

  .tags__container--error .tags__wrapper:focus-within {
    border-color: var(--tags-border-error);
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }

  .tags__wrapper {
    position: relative;
    width: 100%;
    background: var(--tags-bg);
    border: 1px solid var(--tags-border);
    border-radius: var(--tags-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: text;
  }

  .tags__wrapper:focus-within {
    border-color: var(--tags-border-focus);
    box-shadow: var(--tags-shadow-focus);
  }

  .tags__wrapper--disabled,
  .tags__wrapper--readonly {
    opacity: var(--tags-disabled-opacity);
    background: var(--tags-disabled-bg);
    cursor: not-allowed;
  }

  .tags__layout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.3125rem 0.5rem 0.3125rem 0.5rem;
    min-height: 2rem;
    gap: var(--tags-tag-gap);
  }

  .tags__layout.focus {
    outline: none;
  }

  .tags__input {
    flex: 1;
    min-width: 120px;
    background: transparent;
    border: none;
    outline: none;
    color: var(--tags-text);
    font-size: 1rem;
    line-height: 1.5;
    padding: 0.25rem 0.3125rem;
    margin: 0;
  }

  .tags__input::placeholder {
    color: var(--tags-text-placeholder);
  }

  .tags__input:disabled {
    cursor: not-allowed;
  }

  .tags__input--hidden {
    display: none;
  }

  .tags__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3125rem;
    background: var(--tags-tag-bg);
    color: var(--tags-tag-text);
    border: none;
    border-radius: var(--tags-tag-radius);
    padding: var(--tags-tag-padding-y) var(--tags-tag-padding-x);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.2;
    cursor: default;
    user-select: text;
  }

  .tags__tag:hover {
    background: var(--tags-tag-bg-hover);
  }

  .tags__tag-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: currentColor;
    opacity: 0.7;
    transition: opacity 0.15s ease-in-out;
  }

  .tags__tag-remove:hover {
    opacity: 1;
  }

  .tags__tag-remove svg {
    width: 14px;
    height: 14px;
  }

  .tags__wrapper--disabled .tags__tag-remove,
  .tags__wrapper--readonly .tags__tag-remove {
    cursor: not-allowed;
  }

  .tags__loading {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .tags__loading-icon {
    width: 20px;
    height: 20px;
    color: var(--tags-tag-text);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .tags__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    background: var(--tags-dropdown-bg);
    border: 1px solid var(--tags-dropdown-border);
    border-radius: var(--tags-radius);
    padding: 0;
    margin: 0;
    max-height: var(--tags-dropdown-max-height);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .tags__dropdown li {
    list-style: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: var(--tags-text);
  }

  .tags__dropdown li:hover,
  .tags__dropdown-item--focus {
    background: var(--tags-dropdown-item-hover);
    outline: none;
  }
</style>
