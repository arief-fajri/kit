<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DropdownWrapper from '../../wrapper/dropdown/DropdownWrapper.svelte';
	import DatePicker from './DatePicker.svelte';
	import type {
		DatePickerProps,
		DatePickerChangeEvent,
		DateValue,
		DateRangeValue,
		DateMultipleValue,
		DatePickerStyling,
		DatePickerValidation,
		DatePickerBehavior
	} from './types.js';
	import { toDate, formatDate } from './composables/useDateUtils.js';

	import type {
		DatePickerProps,
		DatePickerStyling,
		DatePickerValidation,
		DatePickerBehavior
	} from './types.js';

	// Core props
	export let value: DatePickerProps['value'] = null;
	export let rangeValue: DatePickerProps['rangeValue'] = [null, null];
	export let multipleValue: DatePickerProps['multipleValue'] = [];
	export let label: string = '';
	export let name: string = '';
	export let id: string = '';
	export let styling: DatePickerProps['styling'] = {};
	export let validation: DatePickerProps['validation'] = {};
	export let behavior: DatePickerProps['behavior'] = {};
	export let ariaLabel: DatePickerProps['ariaLabel'] = undefined;
	export let ariaDescribedBy: DatePickerProps['ariaDescribedBy'] = undefined;

	// Computed props with defaults
	$: computedStyling = {
		size: styling.size ?? 'md',
		variant: styling.variant ?? 'default',
		className: styling.className ?? '',
		style: styling.style ?? '',
		wrapperClass: styling.wrapperClass ?? '',
		triggerClass: styling.triggerClass ?? '',
		labelClass: styling.labelClass ?? '',
		wrapperStyle: styling.wrapperStyle ?? ''
	};

	$: computedValidation = {
		required: validation.required ?? false,
		isError: validation.isError ?? false,
		errorMessage: validation.errorMessage ?? ''
	};

	$: computedBehavior = {
		mode: behavior.mode ?? 'single',
		disabled: behavior.disabled ?? false,
		loading: behavior.loading ?? false,
		minDate: behavior.minDate ?? null,
		maxDate: behavior.maxDate ?? null,
		disabledDates: behavior.disabledDates ?? undefined,
		firstDayOfWeek: behavior.firstDayOfWeek ?? 0,
		showWeekNumbers: behavior.showWeekNumbers ?? false,
		showToday: behavior.showToday ?? true,
		showClear: behavior.showClear ?? true,
		labels: behavior.labels ?? {},
		locale: behavior.locale ?? 'en-US',
		closeOnSelect: behavior.closeOnSelect ?? true,
		placement: behavior.placement ?? 'bottom-start',
		isFullAnchorWidth: behavior.isFullAnchorWidth ?? false,
		placeholder: behavior.placeholder ?? 'Select date'
	};

	const dispatch = createEventDispatcher<{ change: DatePickerChangeEvent }>();

	// Internal state
	let openDropdown = false;
	let triggerElement: HTMLElement | null = null;

	// Display text based on mode
	$: displayText = (() => {
		if (computedBehavior.mode === 'single') {
			const date = toDate(value);
			return date ? formatDate(date, computedBehavior.locale) : computedBehavior.placeholder;
		} else if (computedBehavior.mode === 'range') {
			const [start, end] = rangeValue || [null, null];
			const startDate = toDate(start);
			const endDate = toDate(end);
			if (startDate && endDate) {
				return `${formatDate(startDate, computedBehavior.locale)} - ${formatDate(endDate, computedBehavior.locale)}`;
			} else if (startDate) {
				return formatDate(startDate, computedBehavior.locale);
			}
			return computedBehavior.placeholder;
		} else {
			if (multipleValue && multipleValue.length > 0) {
				return multipleValue
					.map((d) => formatDate(toDate(d), computedBehavior.locale))
					.filter(Boolean)
					.join(', ');
			}
			return computedBehavior.placeholder;
		}
	})();

	// Handle date change from DatePicker
	const handleDateChange = (event: CustomEvent<DatePickerChangeEvent>) => {
		const { value: newValue, mode: changeMode, formatted } = event.detail;

		if (changeMode === 'single') {
			value = newValue as DateValue;
		} else if (changeMode === 'range') {
			rangeValue = newValue as DateRangeValue;
		} else {
			multipleValue = newValue as DateMultipleValue;
		}

		dispatch('change', event.detail);

		// Close dropdown if closeOnSelect is true
		if (computedBehavior.closeOnSelect && changeMode === 'single') {
			openDropdown = false;
		} else if (
			computedBehavior.closeOnSelect &&
			changeMode === 'range' &&
			(newValue as DateRangeValue)[1]
		) {
			openDropdown = false;
		}
	};

	// Toggle dropdown
	const toggleDropdown = () => {
		if (!computedBehavior.disabled && !computedBehavior.loading) {
			openDropdown = !openDropdown;
		}
	};

	// Handle keyboard
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleDropdown();
		} else if (e.key === 'Escape' && openDropdown) {
			openDropdown = false;
		}
	};
</script>

<div
	class="input-date-picker input-date-picker--{computedStyling.variant} input-date-picker--{computedStyling.size}"
	class:input-date-picker--error={computedValidation.isError}
	class:input-date-picker--disabled={computedBehavior.disabled}
>
	<slot name="label">
		{#if label}
			<label class="input-date-picker__label {computedStyling.labelClass}" for={id || name}>
				{label}
				{#if computedValidation.required}
					<span class="input-date-picker__required">*</span>
				{/if}
			</label>
		{/if}
	</slot>

	<div
		class="input-date-picker__container {computedStyling.wrapperClass}"
		style={computedStyling.wrapperStyle}
	>
		<button
			type="button"
			bind:this={triggerElement}
			class="input-date-picker__trigger {computedStyling.triggerClass}"
			class:input-date-picker__trigger--disabled={computedBehavior.disabled}
			class:input-date-picker__trigger--open={openDropdown}
			on:click={toggleDropdown}
			on:keydown={handleKeydown}
			disabled={computedBehavior.disabled}
			role="combobox"
			aria-expanded={openDropdown}
			aria-haspopup="dialog"
			aria-controls={id ? `${id}-calendar` : undefined}
			aria-label={ariaLabel || label || computedBehavior.placeholder}
			aria-invalid={computedValidation.isError}
			aria-describedby={ariaDescribedBy ||
				(computedValidation.isError && id ? `${id}-error` : undefined)}
			tabindex={computedBehavior.disabled ? -1 : 0}
		>
			<span
				class="input-date-picker__text"
				class:input-date-picker__text--placeholder={displayText === computedBehavior.placeholder}
			>
				{displayText}
			</span>
			<svg
				class="input-date-picker__icon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		</button>

		{#if name}
			<input
				type="hidden"
				{name}
				{id}
				value={computedBehavior.mode === 'single'
					? value
						? toDate(value)?.toISOString()
						: ''
					: ''}
			/>
		{/if}

		<DropdownWrapper
			bind:visible={openDropdown}
			anchor={triggerElement}
			placement={computedBehavior.placement}
			isFullAnchorWidth={computedBehavior.isFullAnchorWidth}
			size="xl"
			closeOnClickOutside={true}
			closeOnEscape={true}
			on:close={() => {
				openDropdown = false;
			}}
		>
			<DatePicker
				{value}
				{rangeValue}
				{multipleValue}
				styling={{
					variant:
						computedStyling.variant === 'filled' || computedStyling.variant === 'outlined'
							? 'default'
							: computedStyling.variant,
					size: computedStyling.size,
					className: computedStyling.className,
					style: computedStyling.style
				}}
				behavior={{
					mode: computedBehavior.mode,
					disabled: computedBehavior.disabled,
					loading: computedBehavior.loading,
					minDate: computedBehavior.minDate,
					maxDate: computedBehavior.maxDate,
					disabledDates: computedBehavior.disabledDates,
					firstDayOfWeek: computedBehavior.firstDayOfWeek,
					showWeekNumbers: computedBehavior.showWeekNumbers,
					showToday: computedBehavior.showToday,
					showClear: computedBehavior.showClear,
					closeOnSelect: computedBehavior.closeOnSelect,
					labels: computedBehavior.labels,
					locale: computedBehavior.locale
				}}
				on:change={handleDateChange}
			/>
		</DropdownWrapper>
	</div>

	<slot name="error">
		{#if computedValidation.isError && computedValidation.errorMessage}
			<div class="input-date-picker__error" id={id ? `${id}-error` : undefined}>
				{computedValidation.errorMessage}
			</div>
		{/if}
	</slot>
</div>

<style>
	.input-date-picker {
		width: 100%;
		font-family: inherit;
	}

	/* Label */
	.input-date-picker__label {
		display: block;
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--input-date-picker-label, var(--color-text-secondary, #374151));
	}

	.input-date-picker__required {
		color: var(--input-date-picker-error-text, var(--color-error, #ef4444));
		margin-left: 0.125rem;
	}

	.input-date-picker__container {
		position: relative;
		width: 100%;
	}

	/* Trigger Button */
	.input-date-picker__trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--input-date-picker-padding-y-md, 0.5rem)
			var(--input-date-picker-padding-x-md, 0.75rem);
		height: var(--input-date-picker-height-md, 2.5rem);
		border: var(--input-date-picker-border-width, 1px) solid
			var(--input-date-picker-border, var(--color-border, #e5e7eb));
		border-radius: var(--input-date-picker-border-radius, var(--radius, 0.375rem));
		background: var(--input-date-picker-bg, var(--color-surface, #ffffff));
		color: var(--input-date-picker-text, var(--color-text, #111827));
		font-size: var(--input-date-picker-font-size-md, 0.875rem);
		font-family: inherit;
		cursor: pointer;
		transition: var(--input-date-picker-transition, all 0.2s ease-in-out);
		gap: 0.5rem;
	}

	.input-date-picker__trigger:hover:not(:disabled) {
		background: var(--input-date-picker-bg-hover, var(--color-surface-hover, #f9fafb));
	}

	.input-date-picker__trigger:focus-visible {
		outline: none;
		border-color: var(--input-date-picker-border-focus, var(--color-primary, #3b82f6));
		box-shadow: var(
			--input-date-picker-shadow-focus,
			var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1))
		);
	}

	.input-date-picker__trigger--open {
		outline: none;
		border-color: var(--input-date-picker-border-focus, var(--color-primary, #3b82f6));
		box-shadow: var(
			--input-date-picker-shadow-focus,
			var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1))
		);
	}

	.input-date-picker__trigger--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-surface-disabled, #f9fafb);
	}

	.input-date-picker__text {
		flex: 1;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.input-date-picker__text--placeholder {
		color: var(--input-date-picker-text-placeholder, var(--color-text-muted, #9ca3af));
		font-style: italic;
	}

	.input-date-picker__icon {
		flex-shrink: 0;
		color: var(--input-date-picker-icon-color, var(--color-text-muted, #6b7280));
	}

	/* Error Message */
	.input-date-picker__error {
		color: var(--input-date-picker-error-text, var(--color-error, #ef4444));
		font-size: 0.875rem;
		margin-top: 0.25rem;
		font-style: italic;
	}

	/* Error State */
	.input-date-picker--error .input-date-picker__trigger {
		border-color: var(--input-date-picker-border-error, var(--color-error, #ef4444));
	}

	.input-date-picker--error .input-date-picker__trigger:focus-visible {
		border-color: var(--input-date-picker-border-error, var(--color-error, #ef4444));
		box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
	}

	/* Disabled State */
	.input-date-picker--disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	/* Size Variants */
	.input-date-picker--sm .input-date-picker__trigger {
		height: var(--input-date-picker-height-sm, 2rem);
		padding: var(--input-date-picker-padding-y-sm, 0.375rem)
			var(--input-date-picker-padding-x-sm, 0.5rem);
		font-size: var(--input-date-picker-font-size-sm, 0.875rem);
	}

	.input-date-picker--lg .input-date-picker__trigger {
		height: var(--input-date-picker-height-lg, 3rem);
		padding: var(--input-date-picker-padding-y-lg, 0.625rem)
			var(--input-date-picker-padding-x-lg, 1rem);
		font-size: var(--input-date-picker-font-size-lg, 1.125rem);
	}

	/* Variant Styles */
	.input-date-picker--filled .input-date-picker__trigger {
		background: var(--color-surface-secondary, #f9fafb);
		border-color: transparent;
	}

	.input-date-picker--filled .input-date-picker__trigger:focus-visible {
		background: var(--input-date-picker-bg, var(--color-surface, #ffffff));
		border-color: var(--input-date-picker-border-focus, var(--color-primary, #3b82f6));
	}

	.input-date-picker--outlined .input-date-picker__trigger {
		background: transparent;
		border-width: 2px;
	}
</style>
