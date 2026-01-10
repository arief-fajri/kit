<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { uniqueId as generateUniqueId } from '@rief/utils';
	import { safeHtmlContent } from '../../helpers/errorHandling.js';

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
		error: { message: string; code?: string };
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

	import type { TagsProps, TagsStyling, TagsValidation, TagsBehavior } from '../../types.js';

	// Core props
	export let tags: TagsArray = [];
	export let name: string = 'svelte-tags-input';
	export let id: string = '';
	export let label: string = '';
	export let styling: TagsStyling = {};
	export let validation: TagsValidation = {};
	export let behavior: TagsBehavior = {};
	export let ariaLabel: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	// Computed props with defaults
	$: computedStyling = {
		className: styling.className ?? '',
		style: styling.style ?? '',
		labelClass: styling.labelClass ?? '',
		wrapperClass: styling.wrapperClass ?? ''
	};

	$: computedValidation = {
		isError: validation.isError ?? false,
		required: validation.required ?? false
	};

	$: computedBehavior = {
		disabled: behavior.disabled ?? false,
		readonly: behavior.readonly ?? false,
		addKeys: behavior.addKeys ?? [KEY_CODES.ENTER],
		maxTags: behavior.maxTags ?? false,
		onlyUnique: behavior.onlyUnique ?? false,
		removeKeys: behavior.removeKeys ?? [KEY_CODES.BACKSPACE],
		placeholder: behavior.placeholder ?? '',
		allowPaste: behavior.allowPaste ?? false,
		allowDrop: behavior.allowDrop ?? false,
		splitWith: behavior.splitWith ?? ',',
		autoComplete: behavior.autoComplete ?? false,
		autoCompleteKey: behavior.autoCompleteKey ?? false,
		autoCompleteMarkupKey: behavior.autoCompleteMarkupKey ?? false,
		allowBlur: behavior.allowBlur ?? false,
		minChars: behavior.minChars ?? 0,
		onlyAutocomplete: behavior.onlyAutocomplete ?? false,
		onTagClick: behavior.onTagClick ?? (() => {}),
		autoCompleteShowKey: behavior.autoCompleteShowKey ?? behavior.autoCompleteKey ?? false,
		numberOnly: behavior.numberOnly ?? false,
		allowDecimal: behavior.allowDecimal ?? false,
		debounceMs: behavior.debounceMs ?? DEFAULT_DEBOUNCE_MS
	};

	// Internal state
	let tag: string = '';
	let arrelementsmatch: AutoCompleteArray = [];
	let autoCompleteIndex: number = -1;
	let layoutElement: HTMLElement;
	let inputElement: HTMLInputElement;
	let dropdownElement: HTMLElement;
	let storePlaceholder: string = '';
	let isLoading: boolean = false;
	let searchInput: string = '';
	let debounceSearch: ReturnType<typeof setTimeout> | null = null;
	let controller: AbortController | null = null;

	// Generate unique ID if not provided - SSR safe
	let uniqueId: string = '';

	onMount(() => {
		if (!uniqueId) {
			uniqueId = generateUniqueId('sti_');
		}
		storePlaceholder = computedBehavior.placeholder;
	});

	// Fallback ID for SSR
	$: if (typeof window === 'undefined' && !uniqueId) {
		uniqueId = 'sti_ssr';
	}

	$: tags = tags || [];
	$: id = id || uniqueId;
	$: autoCompleteShowKey = computedBehavior.autoCompleteShowKey || computedBehavior.autoCompleteKey;
	$: storePlaceholder = computedBehavior.placeholder;

	// Utility functions
	function regExpEscape(s: string): string {
		return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	}

	function escapeHTML(string: string): string {
		const htmlEscapes: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'/': '&#x2F;'
		};
		return ('' + string).replace(/[&<>"'\/]/g, (match) => htmlEscapes[match]);
	}

	function buildMatchMarkup(search: string, value: string): string {
		return escapeHTML(value).replace(
			RegExp(regExpEscape(search.toLowerCase()), 'i'),
			'<strong>$&</strong>'
		);
	}

	function getClipboardData(e: ClipboardEvent): string {
		if ((window as any).clipboardData) {
			return (window as any).clipboardData.getData('Text');
		}
		if (e.clipboardData) {
			return e.clipboardData.getData('text/plain');
		}
		return '';
	}

	function splitTags(data: string): string[] {
		return data.split(computedBehavior.splitWith).map((tag) => tag.trim());
	}

	function sanitizeNumberInput(data: string, allowDecimal: boolean): string {
		if (allowDecimal) {
			data = data.replace(/[^0-9.]/g, '');
			const parts = data.split('.');
			if (parts.length > 2) {
				data = parts.shift() + '.' + parts.join('');
			}
		} else {
			data = data.replace(/\D+/g, '');
		}
		return data;
	}

	function validateNumberInput(e: KeyboardEvent): boolean {
		if (!computedBehavior.numberOnly) return true;

		const isNumberKey =
			(e.keyCode >= KEY_CODES.NUM_0 && e.keyCode <= KEY_CODES.NUM_9) ||
			(e.keyCode >= KEY_CODES.NUMPAD_0 && e.keyCode <= KEY_CODES.NUMPAD_9);
		const isAllowedKey = [
			KEY_CODES.BACKSPACE,
			KEY_CODES.TAB,
			KEY_CODES.ENTER,
			KEY_CODES.ARROW_LEFT,
			KEY_CODES.ARROW_RIGHT,
			KEY_CODES.DELETE
		].includes(e.keyCode as any);
		const isDecimal =
			computedBehavior.allowDecimal &&
			(e.key === '.' || e.keyCode === KEY_CODES.DECIMAL || e.keyCode === KEY_CODES.NUMPAD_DECIMAL);

		if (!(isNumberKey || isAllowedKey || isDecimal)) {
			e.preventDefault();
			return false;
		}

		if (isDecimal && (e.target as HTMLInputElement).value.includes('.')) {
			e.preventDefault();
			return false;
		}

		return true;
	}

	// Tag management
	function addTag(currentTag: string | TagItem): void {
		if (!currentTag) return;
		if (
			computedBehavior.numberOnly &&
			typeof currentTag === 'string' &&
			!new RegExp(computedBehavior.allowDecimal ? /^\d*(\.\d+)?$/ : /^\d+$/).test(currentTag)
		)
			return;

		let currentObjTags: TagItem | undefined;
		if (typeof currentTag === 'object' && currentTag !== null) {
			if (!computedBehavior.autoCompleteKey) {
				dispatch('error', {
					message: "'autoCompleteKey' is necessary if 'autoComplete' result is an array of objects",
					code: 'MISSING_AUTOCOMPLETE_KEY'
				});
				return;
			}

			if (computedBehavior.onlyUnique) {
				let found = tags?.find(
					(elem) =>
						typeof elem === 'object' &&
						elem !== null &&
						computedBehavior.autoCompleteKey &&
						(elem as any)[computedBehavior.autoCompleteKey] ===
							(currentTag as any)[computedBehavior.autoCompleteKey]
				);
				if (found) return;
			}

			currentObjTags = currentTag;
			const tagValue = computedBehavior.autoCompleteKey
				? currentTag[computedBehavior.autoCompleteKey]
				: '';
			currentTag = typeof tagValue === 'string' ? tagValue.trim() : String(tagValue);
		} else if (typeof currentTag === 'string') {
			currentTag = currentTag.trim();
		}

		if (currentTag == '') return;
		if (computedBehavior.maxTags && tags.length == computedBehavior.maxTags) return;
		if (computedBehavior.onlyUnique && tags.includes(currentTag)) return;
		if (computedBehavior.onlyAutocomplete && arrelementsmatch.length === 0) return;

		tags.push(currentObjTags ? currentObjTags : currentTag);
		tags = tags;
		tag = '';

		arrelementsmatch = [];
		autoCompleteIndex = -1;

		if (inputElement) {
			inputElement.focus();
		}

		if (computedBehavior.maxTags && tags.length == computedBehavior.maxTags) {
			if (inputElement) {
				inputElement.readOnly = true;
			}
			storePlaceholder = '';
		}

		dispatch('tags', { tags });
	}

	function removeTag(i: number): void {
		tags.splice(i, 1);
		tags = tags;

		dispatch('tags', { tags });
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

		if (computedBehavior.addKeys) {
			computedBehavior.addKeys.forEach(function (key) {
				if (key === e.keyCode) {
					if (currentTag) e.preventDefault();

					if (computedBehavior.autoComplete && dropdownElement && arrelementsmatch.length > 0) {
						if (computedBehavior.onlyAutocomplete) {
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

		if (computedBehavior.removeKeys) {
			computedBehavior.removeKeys.forEach(function (key) {
				if (key === e.keyCode && tag === '') {
					tags.pop();
					tags = tags;
					dispatch('tags', { tags });
					arrelementsmatch = [];

					if (inputElement) {
						inputElement.readOnly = false;
						inputElement.focus();
					}
					storePlaceholder = computedBehavior.placeholder;
				}
			});
		}

		if (
			e.keyCode === KEY_CODES.ARROW_DOWN &&
			computedBehavior.autoComplete &&
			dropdownElement &&
			arrelementsmatch.length > 0
		) {
			if (autoCompleteIndex + 1 === arrelementsmatch.length) autoCompleteIndex = 0;
			else autoCompleteIndex++;
		} else if (
			e.keyCode === KEY_CODES.ARROW_UP &&
			computedBehavior.autoComplete &&
			dropdownElement &&
			arrelementsmatch.length > 0
		) {
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
		if (!computedBehavior.allowPaste) return;
		e.preventDefault();

		let data = getClipboardData(e);
		if (computedBehavior.numberOnly) {
			data = sanitizeNumberInput(data, computedBehavior.allowDecimal);
		}
		splitTags(data).map((tag) => addTag(tag));
	}

	function onDrop(e: DragEvent): void {
		if (!computedBehavior.allowDrop) return;
		e.preventDefault();

		let data = e.dataTransfer?.getData('Text') || '';
		if (computedBehavior.numberOnly) {
			data = sanitizeNumberInput(data, computedBehavior.allowDecimal);
		}
		splitTags(data).map((tag) => addTag(tag));
	}

	// Focus handlers
	function onFocus(): void {
		if (layoutElement) {
			layoutElement.classList.add('focus');
		}
	}

	function onBlur(e: FocusEvent, tag: string): void {
		if (layoutElement) {
			layoutElement.classList.remove('focus');
		}

		if (computedBehavior.allowBlur) {
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
		if (!computedBehavior.autoComplete) return;
		if (computedBehavior.maxTags && tags.length >= computedBehavior.maxTags) return;

		dispatch('input', { value });
		searchInput = value;

		if (value.length < computedBehavior.minChars) {
			arrelementsmatch = [];
			isLoading = false;
			return;
		}

		isLoading = true;

		let autoCompleteValues: AutoCompleteArray = [];
		if (Array.isArray(computedBehavior.autoComplete)) {
			autoCompleteValues = computedBehavior.autoComplete;
		} else if (typeof computedBehavior.autoComplete === 'function') {
			try {
				if ((computedBehavior.autoComplete as any).constructor.name === 'AsyncFunction') {
					if (controller) controller.abort();
					controller = new AbortController();
					autoCompleteValues = await computedBehavior.autoComplete(value, controller.signal);
				} else {
					autoCompleteValues = computedBehavior.autoComplete(value) as AutoCompleteArray;
				}
			} catch (error) {
				dispatch('error', {
					message: error instanceof Error ? error.message : 'Error in autocomplete function',
					code: 'AUTOCOMPLETE_ERROR'
				});
				isLoading = false;
				return;
			}
		}

		if (autoCompleteValues?.constructor?.name === 'Promise') {
			try {
				autoCompleteValues = await autoCompleteValues;
			} catch (error) {
				dispatch('error', {
					message: error instanceof Error ? error.message : 'Error resolving autocomplete promise',
					code: 'AUTOCOMPLETE_PROMISE_ERROR'
				});
				isLoading = false;
				return;
			}
		}

		isLoading = false;
		let matchs = autoCompleteValues;

		if (
			autoCompleteValues !== null &&
			autoCompleteValues.length &&
			typeof autoCompleteValues[0] === 'object'
		) {
			if (!computedBehavior.autoCompleteKey) {
				dispatch('error', {
					message: "'autoCompleteKey' is necessary if 'autoComplete' result is an array of objects",
					code: 'MISSING_AUTOCOMPLETE_KEY'
				});
				return;
			}
			matchs = matchs.map((matchTag) => {
				return {
					label: matchTag,
					search: computedBehavior.autoCompleteMarkupKey
						? matchTag[computedBehavior.autoCompleteMarkupKey]
						: buildMatchMarkup(value, matchTag[computedBehavior.autoCompleteKey])
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

		if (computedBehavior.onlyUnique === true && !computedBehavior.autoCompleteKey) {
			matchs = matchs.filter((tag) => !tags.includes(tag.label));
		}
		arrelementsmatch = matchs;
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		watchSearchInput(target?.value || '', true);
	};

	const watchSearchInput = (eventValue: string, isKeyUp: boolean) => {
		let valToSearch = '';
		if (!eventValue) {
			if (isKeyUp) {
				valToSearch = '';
				searchInput = '';
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
		}, computedBehavior.debounceMs);
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
			origin = ['bottom'];

			const afterSetPostion = node.getBoundingClientRect();
			if (afterSetPostion.top < 12) {
				node.style.removeProperty('bottom');
				node.style.top = `${parentHeight + gap}px`;
				origin = ['top'];
			}
		} else {
			node.style.top = `${parentHeight + gap}px`;
			origin = ['top'];
		}

		node.style.transformOrigin = `${origin.join(' ')}`;
	};
</script>

<div class="tags">
	<slot name="label">
		{#if label}
			<p class="tags__label {computedStyling.labelClass}">
				{label}
				{#if computedValidation.required}
					<span class="tags__required">*</span>
				{/if}
			</p>
		{/if}
	</slot>
	<div class="tags__container" class:tags__container--error={computedValidation.isError}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="tags__wrapper {computedStyling.wrapperClass}"
			class:tags__wrapper--disabled={computedBehavior.disabled}
			class:tags__wrapper--readonly={computedBehavior.readonly}
			on:click={() => {
				if (inputElement) {
					inputElement.focus();
				}
				watchSearchInput('', false);
			}}
		>
			<div class="tags__layout" bind:this={layoutElement}>
				{#if tags.length > 0}
					{#each tags as tagItem, i}
						<button class="tags__tag" on:click={() => computedBehavior.onTagClick(tagItem)}>
							<slot name="tag-label" tag={tagItem}>
								{#if typeof tagItem === 'string' || typeof tagItem === 'number'}
									{tagItem}
								{:else if typeof tagItem === 'object'}
									{autoCompleteShowKey && tagItem && typeof tagItem === 'object'
										? tagItem[autoCompleteShowKey]
										: ''}
								{/if}
							</slot>

							{#if !computedBehavior.disabled && !computedBehavior.readonly}
								<span class="tags__tag-remove" on:pointerdown|preventDefault={() => removeTag(i)}>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 4L4 12M4 4L12 12"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
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
					placeholder={computedBehavior.placeholder}
					disabled={computedBehavior.disabled || computedBehavior.readonly}
					autocomplete="off"
					aria-label={ariaLabel}
					aria-invalid={computedValidation.isError}
					aria-describedby={ariaDescribedBy ||
						(computedValidation.isError && id ? `${id}-error` : undefined)}
					class:tags__input--hidden={computedBehavior.maxTags === tags.length}
					inputmode={computedBehavior.numberOnly
						? computedBehavior.allowDecimal
							? 'decimal'
							: 'numeric'
						: undefined}
					pattern={computedBehavior.numberOnly
						? computedBehavior.allowDecimal
							? '[0-9]*[.,]?[0-9]*'
							: '[0-9]*'
						: undefined}
				/>
			</div>
			{#if isLoading}
				<div class="tags__loading">
					<svg
						class="tags__loading-icon"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
							stroke-opacity="0.25"
						/>
						<path
							d="M12 2C6.477 2 2 6.477 2 12"
							stroke="currentColor"
							stroke-width="4"
							stroke-linecap="round"
						/>
					</svg>
				</div>
			{/if}
			{#if computedBehavior.autoComplete && arrelementsmatch.length > 0}
				<ul class="tags__dropdown" bind:this={dropdownElement} use:checkPosition>
					{#each arrelementsmatch as element, index}
						<li
							tabindex="-1"
							class:tags__dropdown-item--focus={index === autoCompleteIndex}
							on:pointerdown|preventDefault={() => addTag(element.label)}
						>
							<slot {element}>
								{@html safeHtmlContent(element.search || '')}
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
		width: 100%;
		font-family: inherit;
	}

	.tags__label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--tags-label, var(--color-text-secondary, #374151));
		margin-bottom: 0.25rem;
	}

	.tags__required {
		color: var(--tags-error-text, var(--color-error, #ef4444));
		margin-left: 0.125rem;
	}

	.tags__container {
		position: relative;
	}

	.tags__container--error .tags__wrapper {
		border-color: var(--tags-border-error, var(--color-error, #ef4444));
	}

	.tags__container--error .tags__wrapper:focus-within {
		border-color: var(--tags-border-error, var(--color-error, #ef4444));
		box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
	}

	.tags__wrapper {
		position: relative;
		width: 100%;
		background: var(--tags-bg, var(--color-surface, #ffffff));
		border: 1px solid var(--tags-border, var(--color-border, #d1d5db));
		border-radius: var(--tags-radius, var(--radius-md, 0.5rem));
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		cursor: text;
	}

	.tags__wrapper:focus-within {
		border-color: var(--tags-border-focus, var(--color-primary, #3b82f6));
		box-shadow: var(--tags-shadow-focus, var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1)));
	}

	.tags__wrapper--disabled,
	.tags__wrapper--readonly {
		opacity: var(--tags-disabled-opacity, 0.5);
		background: var(--tags-disabled-bg, var(--color-surface-disabled, #f9fafb));
		cursor: not-allowed;
	}

	.tags__layout {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 0.3125rem 0.5rem 0.3125rem 0.5rem;
		min-height: 2rem;
		gap: var(--tags-tag-gap, 0.3125rem);
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
		color: var(--tags-text, var(--color-text, #111827));
		font-size: 1rem;
		line-height: 1.5;
		padding: 0.25rem 0.3125rem;
		margin: 0;
	}

	.tags__input::placeholder {
		color: var(--tags-text-placeholder, var(--color-text-muted, #6b7280));
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
		background: var(--tags-tag-bg, var(--color-primary-100, #dbeafe));
		color: var(--tags-tag-text, var(--color-primary, #3b82f6));
		border: none;
		border-radius: var(--tags-tag-radius, var(--radius-sm, 0.25rem));
		padding: var(--tags-tag-padding-y, 0.25rem) var(--tags-tag-padding-x, 0.5rem);
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.2;
		cursor: default;
		user-select: text;
	}

	.tags__tag:hover {
		background: var(--tags-tag-bg-hover, var(--color-primary-200, #bfdbfe));
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
		color: var(--tags-tag-text, var(--color-primary, #3b82f6));
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
		background: var(--tags-dropdown-bg, var(--color-surface, #ffffff));
		border: 1px solid var(--tags-dropdown-border, var(--color-border, #d1d5db));
		border-radius: var(--tags-radius, var(--radius-md, 0.5rem));
		padding: 0;
		margin: 0;
		max-height: var(--tags-dropdown-max-height, 240px);
		overflow-y: auto;
		overflow-x: hidden;
		z-index: 10;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.tags__dropdown li {
		list-style: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		color: var(--tags-text, var(--color-text, #111827));
	}

	.tags__dropdown li:hover,
	.tags__dropdown-item--focus {
		background: var(--tags-dropdown-item-hover, var(--color-primary-100, #dbeafe));
		outline: none;
	}
</style>
