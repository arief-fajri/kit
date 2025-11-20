<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

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
  };

  const DEFAULT_DEBOUNCE_MS = 500;

  // Props
  export let tags = [];
  export let isError = false;
  export let addKeys = [KEY_CODES.ENTER];
  export let maxTags = false;
  export let onlyUnique = false;
  export let removeKeys = [KEY_CODES.BACKSPACE];
  export let placeholder = "";
  export let allowPaste = false;
  export let allowDrop = false;
  export let splitWith = ",";
  export let autoComplete = false;
  export let autoCompleteKey = false;
  export let autoCompleteMarkupKey = false;
  export let name = "svelte-tags-input";
  export let id = "";
  export let allowBlur = false;
  export let disable = false;
  export let minChars = 0;
  export let onlyAutocomplete = false;
  export let readonly = false;
  export let onTagClick = () => {};
  export let autoCompleteShowKey = false;
  export let label = "";
  export let labelClass = "";
  export let required = false;
  export let wrapperClass = "";
  export let numberOnly = false;
  export let allowDecimal = false;
  export let debounceMs = DEFAULT_DEBOUNCE_MS;

  // Internal state
  let tag = "";
  let arrelementsmatch = [];
  let autoCompleteIndex = -1;
  let layoutElement;
  let inputElement;
  let dropdownElement;
  let storePlaceholder = placeholder;
  let isLoading = false;
  let searchInput = "";
  let debounceSearch;
  let controller = null;

  // Generate unique ID if not provided
  function uniqueID() {
    return "sti_" + Math.random().toString(36).substring(2, 11);
  }

  $: tags = tags || [];
  $: id = id || uniqueID();
  $: autoCompleteShowKey = autoCompleteShowKey || autoCompleteKey;

  // Utility functions
  function regExpEscape(s) {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  function escapeHTML(string) {
    const htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    };
    return ("" + string).replace(/[&<>"'\/]/g, (match) => htmlEscapes[match]);
  }

  function buildMatchMarkup(search, value) {
    return escapeHTML(value).replace(RegExp(regExpEscape(search.toLowerCase()), "i"), "<strong>$&</strong>");
  }

  function getClipboardData(e) {
    if (window.clipboardData) {
      return window.clipboardData.getData("Text");
    }
    if (e.clipboardData) {
      return e.clipboardData.getData("text/plain");
    }
    return "";
  }

  function splitTags(data) {
    return data.split(splitWith).map((tag) => tag.trim());
  }

  function sanitizeNumberInput(data, allowDecimal) {
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

  function validateNumberInput(e) {
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
    ].includes(e.keyCode);
    const isDecimal = allowDecimal && (e.key === "." || e.keyCode === KEY_CODES.DECIMAL || e.keyCode === KEY_CODES.NUMPAD_DECIMAL);

    if (!(isNumberKey || isAllowedKey || isDecimal)) {
      e.preventDefault();
      return false;
    }

    if (isDecimal && e.target.value.includes(".")) {
      e.preventDefault();
      return false;
    }

    return true;
  }

  // Tag management
  function addTag(currentTag) {
    if (!currentTag) return;
    if (numberOnly && !new RegExp(allowDecimal ? /^\d*(\.\d+)?$/ : /^\d+$/).test(currentTag)) return;

    let currentObjTags;
    if (typeof currentTag === "object" && currentTag !== null) {
      if (!autoCompleteKey) {
        console.error("'autoCompleteKey' is necessary if 'autoComplete' result is an array of objects");
        return;
      }

      if (onlyUnique) {
        let found = tags?.find((elem) => elem[autoCompleteKey] === currentTag[autoCompleteKey]);
        if (found) return;
      }

      currentObjTags = currentTag;
      currentTag =
        typeof currentTag[autoCompleteKey] === "string"
          ? currentTag[autoCompleteKey].trim()
          : currentTag[autoCompleteKey];
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

    dispatch("tags", tags);
  }

  function removeTag(i) {
    tags.splice(i, 1);
    tags = tags;

    dispatch("tags", tags);
    arrelementsmatch = [];
    
    if (inputElement) {
      inputElement.readOnly = false;
      inputElement.focus();
    }
    placeholder = storePlaceholder;
  }

  // Keyboard handling
  function setTag(e) {
    if (!validateNumberInput(e)) return;

    const currentTag = e.target.value;

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
          dispatch("tags", tags);
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
  function onPaste(e) {
    if (!allowPaste) return;
    e.preventDefault();

    let data = getClipboardData(e);
    if (numberOnly) {
      data = sanitizeNumberInput(data, allowDecimal);
    }
    splitTags(data).map((tag) => addTag(tag));
  }

  function onDrop(e) {
    if (!allowDrop) return;
    e.preventDefault();

    let data = e.dataTransfer.getData("Text");
    if (numberOnly) {
      data = sanitizeNumberInput(data, allowDecimal);
    }
    splitTags(data).map((tag) => addTag(tag));
  }

  // Focus handlers
  function onFocus() {
    if (layoutElement) {
      layoutElement.classList.add("focus");
    }
  }

  function onBlur(e, tag) {
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
  async function getMatchElements(value) {
    if (!autoComplete) return;
    if (maxTags && tags.length >= maxTags) return;

    dispatch("keyup", value);
    searchInput = value;

    if (value.length < minChars) {
      arrelementsmatch = [];
      isLoading = false;
      return;
    }

    isLoading = true;

    let autoCompleteValues = [];
    if (Array.isArray(autoComplete)) {
      autoCompleteValues = autoComplete;
    } else if (typeof autoComplete === "function") {
      try {
        if (autoComplete.constructor.name === "AsyncFunction") {
          if (controller) controller.abort();
          controller = new AbortController();
          autoCompleteValues = await autoComplete(value, controller.signal);
        } else {
          autoCompleteValues = autoComplete(value);
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
          search: buildMatchMarkup(value, matchTag)
        };
      });
    }

    if (onlyUnique === true && !autoCompleteKey) {
      matchs = matchs.filter((tag) => !tags.includes(tag.label));
    }
    arrelementsmatch = matchs;
  }

  const watchSearchInput = (eventValue, isKeyUp) => {
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
  const checkPosition = (node) => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const rect = node.getBoundingClientRect();
    const parentNode = node.parentNode;

    let parentHeight = 0;
    let origin = [];
    const gap = 4;

    if (parentNode) {
      const parentRect = parentNode.getBoundingClientRect();
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
                  {tagItem[autoCompleteShowKey]}
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
          on:keyup={(e) => {
            watchSearchInput(e.target.value, true);
          }}
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
