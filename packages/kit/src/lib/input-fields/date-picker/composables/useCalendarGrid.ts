import type { CalendarCell, CalendarGridOptions } from '../types.js';
import { TOTAL_CALENDAR_CELLS, DAYS_IN_WEEK } from '../constants.js';
import { getDaysInMonth, sameDay, formatISODate, isToday } from './useDateUtils.js';

/**
 * Generate calendar grid for a given month and year
 */
export function useCalendarGrid(options: CalendarGridOptions): CalendarCell[] {
	const { month, year, selectedDates, dateRange, isAllowed, firstDayOfWeek, today } = options;

	const cells: CalendarCell[] = [];
	const daysInMonth = getDaysInMonth(month, year);
	const firstDayOfMonth = new Date(year, month, 1);

	// Calculate starting position based on first day of week preference
	let startIndex = firstDayOfMonth.getDay();
	if (firstDayOfWeek === 1) {
		// Monday as first day: adjust Sunday (0) to be 6
		startIndex = startIndex === 0 ? 6 : startIndex - 1;
	}

	// Fill calendar grid
	for (let i = 0; i < TOTAL_CALENDAR_CELLS; i++) {
		const dayNumber = i - startIndex + 1;

		if (dayNumber < 1 || dayNumber > daysInMonth) {
			// Empty cell for previous/next month
			cells.push({
				value: undefined,
				allowed: false,
				inRange: false,
				isRangeStart: false,
				isRangeEnd: false,
				selected: false,
				isToday: false,
				isoDate: ''
			});
		} else {
			// Valid day cell
			const currentDate = new Date(year, month, dayNumber);
			const isoDate = formatISODate(currentDate);
			const allowed = isAllowed(currentDate);
			const selected = selectedDates.some((date) => sameDay(date, currentDate));
			const todayCheck = isToday(currentDate);

			// Range calculations
			const [rangeStart, rangeEnd] = dateRange;
			const isRangeStart = rangeStart ? sameDay(rangeStart, currentDate) : false;
			const isRangeEnd = rangeEnd ? sameDay(rangeEnd, currentDate) : false;
			const inRange =
				rangeStart &&
				rangeEnd &&
				currentDate >= rangeStart &&
				currentDate <= rangeEnd &&
				!isRangeStart &&
				!isRangeEnd;

			cells.push({
				value: dayNumber,
				allowed,
				inRange: !!inRange,
				isRangeStart,
				isRangeEnd,
				selected,
				isToday: todayCheck,
				isoDate
			});
		}
	}

	// Trim trailing empty weeks if they're all empty
	let lastNonEmptyIndex = cells.length - 1;
	while (lastNonEmptyIndex >= 0 && !cells[lastNonEmptyIndex].value) {
		lastNonEmptyIndex--;
	}

	// Keep at least 5 weeks, trim only if we have 6 full weeks and last week is empty
	const weeksToShow = Math.max(5, Math.ceil((lastNonEmptyIndex + 1) / DAYS_IN_WEEK));
	return cells.slice(0, weeksToShow * DAYS_IN_WEEK);
}

/**
 * Get weekday headers based on first day of week preference
 */
export function getWeekdayHeaders(firstDayOfWeek: 0 | 1, weekdayLabels: string[]): string[] {
	if (firstDayOfWeek === 1) {
		// Monday first: move Sunday to end
		return [...weekdayLabels.slice(1), weekdayLabels[0]];
	}
	return [...weekdayLabels];
}

/**
 * Get week number for a given date (ISO week)
 */
export function getWeekNumber(date: Date): number {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
