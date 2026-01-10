<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { DatePickerMode, DateValue, DateRangeValue, DateMultipleValue } from './types.js';
	import {
		useCalendarGrid,
		getWeekdayHeaders,
		getWeekNumber
	} from './composables/useCalendarGrid.js';
	import { toDate } from './composables/useDateUtils.js';

	const dispatch = createEventDispatcher<{
		datechange: { date: Date; type: 'select' | 'range-start' | 'range-end' };
	}>();

	export let month: number;
	export let year: number;
	export let value: DateValue = null;
	export let rangeValue: DateRangeValue = [null, null];
	export let multipleValue: DateMultipleValue = [];
	export let mode: DatePickerMode = 'single';
	export let isAllowed: (date: Date) => boolean = () => true;
	export let firstDayOfWeek: 0 | 1 = 0;
	export let showWeekNumbers = false;
	export let weekdayLabels: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// Convert props to internal format
	$: selectedDates = (() => {
		const dates: Date[] = [];

		if (mode === 'single' && value) {
			const date = toDate(value);
			if (date) dates.push(date);
		} else if (mode === 'multiple' && multipleValue) {
			multipleValue.forEach((v) => {
				const date = toDate(v);
				if (date) dates.push(date);
			});
		}

		return dates;
	})();

	$: dateRange = (() => {
		if (mode === 'range' && rangeValue) {
			const start = toDate(rangeValue[0]);
			const end = toDate(rangeValue[1]);
			return [start, end] as [Date | null, Date | null];
		}
		return [null, null] as [Date | null, Date | null];
	})();

	// Generate calendar grid
	$: cells = useCalendarGrid({
		month,
		year,
		selectedDates,
		dateRange,
		isAllowed,
		firstDayOfWeek,
		today: new Date()
	});

	// Get weekday headers
	$: weekdays = getWeekdayHeaders(firstDayOfWeek, weekdayLabels);

	// Handle cell click
	const handleCellClick = (cell: (typeof cells)[0]) => {
		if (!cell.value || !cell.allowed) return;

		const date = new Date(year, month, cell.value);

		if (mode === 'range') {
			// Determine if this should be start or end of range
			const [start, end] = dateRange;
			if (!start || (start && end)) {
				dispatch('datechange', { date, type: 'range-start' });
			} else {
				dispatch('datechange', { date, type: 'range-end' });
			}
		} else {
			dispatch('datechange', { date, type: 'select' });
		}
	};

	// Get week number for first day of each week
	const getWeekNumberForRow = (rowIndex: number): number => {
		const firstCellIndex = rowIndex * 7;
		const firstCell = cells[firstCellIndex];
		if (firstCell?.value) {
			return getWeekNumber(new Date(year, month, firstCell.value));
		}
		// If first cell is empty, try next cells in the row
		for (let i = 1; i < 7; i++) {
			const cell = cells[firstCellIndex + i];
			if (cell?.value) {
				return getWeekNumber(new Date(year, month, cell.value));
			}
		}
		return 1; // fallback
	};

	// Calculate number of weeks to display
	$: weekCount = Math.ceil(cells.length / 7);
</script>

<div class="calendar-grid">
	<!-- Weekday headers -->
	<div
		class="calendar-grid__header"
		class:calendar-grid__header--with-week-numbers={showWeekNumbers}
	>
		{#if showWeekNumbers}
			<div class="calendar-grid__week-header">Wk</div>
		{/if}
		{#each weekdays as day}
			<div class="calendar-grid__weekday">{day}</div>
		{/each}
	</div>

	<!-- Calendar body -->
	<div class="calendar-grid__body">
		{#each Array(weekCount) as _, weekIndex}
			<div
				class="calendar-grid__week"
				class:calendar-grid__week--with-week-numbers={showWeekNumbers}
			>
				{#if showWeekNumbers}
					<div class="calendar-grid__week-number">
						{getWeekNumberForRow(weekIndex)}
					</div>
				{/if}

				{#each Array(7) as _, dayIndex}
					{@const cellIndex = weekIndex * 7 + dayIndex}
					{@const cell = cells[cellIndex]}

					{#if cell}
						<div class="calendar-grid__wrapper-cell">
							<button
								class="calendar-grid__cell"
								class:calendar-grid__cell--empty={!cell.value}
								class:calendar-grid__cell--disabled={!cell.allowed}
								class:calendar-grid__cell--selected={cell.selected}
								class:calendar-grid__cell--today={cell.isToday}
								class:calendar-grid__cell--in-range={cell.inRange}
								class:calendar-grid__cell--range-start={cell.isRangeStart}
								class:calendar-grid__cell--range-end={cell.isRangeEnd}
								type="button"
								on:click={() => handleCellClick(cell)}
								disabled={!cell.allowed || !cell.value}
								aria-label={cell.value ? `${cell.value} ${year}-${month + 1}` : ''}
							>
								{cell.value || ''}
							</button>
						</div>
					{:else}
						<div class="calendar-grid__cell calendar-grid__cell--empty"></div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.calendar-grid {
		width: 100%;
	}

	.calendar-grid__header {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: var(--dp-cell-gap, 1px);
		margin-bottom: var(--dp-spacing-sm, 0.5rem);
		border-bottom: 1px solid var(--dp-border-color, #e5e7eb);
		padding: 0.25rem;
	}

	.calendar-grid__header--with-week-numbers {
		grid-template-columns: auto repeat(7, 1fr);
	}

	.calendar-grid__week-header,
	.calendar-grid__weekday {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--dp-spacing-xs, 0.25rem);
		font-size: var(--dp-font-size-sm, 0.875rem);
		font-weight: var(--dp-font-weight-medium, 500);
		color: var(--dp-text-muted, #6b7280);
	}

	.calendar-grid__body {
		display: flex;
		flex-direction: column;
		gap: var(--dp-cell-gap, 1px);
		padding: 0.25rem;
	}

	.calendar-grid__week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: var(--dp-cell-gap, 1px);
	}

	.calendar-grid__week--with-week-numbers {
		grid-template-columns: auto repeat(7, 1fr);
	}

	.calendar-grid__week-number {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--dp-spacing-xs, 0.25rem);
		font-size: var(--dp-font-size-sm, 0.875rem);
		color: var(--dp-text-muted, #6b7280);
		min-width: var(--dp-cell-size, 2.5rem);
	}

	.calendar-grid__wrapper-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.calendar-grid__cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--dp-cell-size, 2.5rem);
		height: var(--dp-cell-size, 2.5rem);
		border: none;
		border-radius: var(--dp-border-radius, 0.375rem);
		background: transparent;
		color: var(--dp-text-color, #374151);
		font-size: var(--dp-font-size-sm, 0.875rem);
		font-weight: var(--dp-font-weight-normal, 400);
		cursor: pointer;
		transition: var(--dp-transition, all 0.2s ease-in-out);
		position: relative;
	}

	.calendar-grid__cell:hover:not(.calendar-grid__cell--disabled):not(.calendar-grid__cell--empty) {
		background-color: var(--dp-cell-hover-bg, rgba(59, 130, 246, 0.1));
		color: var(--dp-cell-hover-color, #1d4ed8);
	}

	.calendar-grid__cell:focus-visible {
		outline: 2px solid var(--dp-focus-ring-color, #3b82f6);
		outline-offset: 2px;
	}

	.calendar-grid__cell--empty {
		cursor: default;
		color: transparent;
	}

	.calendar-grid__cell--disabled {
		cursor: not-allowed;
		opacity: var(--dp-disabled-opacity, 0.5);
		color: var(--dp-text-disabled, #9ca3af);
	}

	.calendar-grid__cell--disabled:hover {
		background: transparent;
		color: var(--dp-text-disabled, #9ca3af);
	}

	.calendar-grid__cell--selected {
		background-color: var(--dp-primary-color, #3b82f6);
		color: var(--dp-primary-text, #ffffff);
	}

	.calendar-grid__cell--selected:hover {
		background-color: var(--dp-primary-hover, #2563eb);
		color: var(--dp-primary-text, #ffffff);
	}

	.calendar-grid__cell--today {
		font-weight: var(--dp-font-weight-medium, 500);
		position: relative;
	}

	.calendar-grid__cell--today:not(.calendar-grid__cell--selected)::after {
		content: '';
		position: absolute;
		bottom: 2px;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: var(--dp-today-color, #ef4444);
	}

	.calendar-grid__cell--in-range {
		background-color: var(--dp-range-bg, rgba(59, 130, 246, 0.1));
		color: var(--dp-range-color, #1d4ed8);
	}

	.calendar-grid__cell--range-start,
	.calendar-grid__cell--range-end {
		background-color: var(--dp-primary-color, #3b82f6);
		color: var(--dp-primary-text, #ffffff);
	}

	.calendar-grid__cell--range-start:hover,
	.calendar-grid__cell--range-end:hover {
		background-color: var(--dp-primary-hover, #2563eb);
		color: var(--dp-primary-text, #ffffff);
	}
</style>
