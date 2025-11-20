import type { DateLike, NormalizedRange } from '../types.js';

const DAY_IN_MS = 86_400_000;

/**
 * Convert various date formats to Date object or null
 */
export function toDate(value: DateLike): Date | null {
	if (value === null || value === undefined || value === "") return null;
	const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Get start of day for a date
 */
export function startOfDay(value: Date | null): Date | null {
	if (!value) return null;
	return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

/**
 * Check if two dates are exactly equal
 */
export function datesEqual(a: Date | null, b: Date | null): boolean {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return a.getTime() === b.getTime();
}

/**
 * Check if two dates are on the same day
 */
export function sameDay(a: Date | null, b: Date | null): boolean {
	if (!a || !b) return false;
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

/**
 * Normalize date range ensuring start <= end
 */
export function normalizeRange(range: DateLike[] = []): NormalizedRange {
	const [startRaw, endRaw] = range;
	const start = toDate(startRaw);
	const end = toDate(endRaw);
	if (start && end && start > end) {
		return [end, start];
	}
	return [start, end];
}

/**
 * Calculate difference in days between two dates
 */
export function diffInDays(candidate: Date | null, anchor: Date | null): number {
	if (!candidate || !anchor) return 0;
	const candidateStart = startOfDay(candidate);
	const anchorStart = startOfDay(anchor);
	if (!candidateStart || !anchorStart) return 0;
	return Math.round((candidateStart.getTime() - anchorStart.getTime()) / DAY_IN_MS);
}

/**
 * Format date as ISO string (YYYY-MM-DD)
 */
export function formatISODate(value: Date | null): string {
	if (!value) return "";
	const year = value.getFullYear();
	const month = `${value.getMonth() + 1}`.padStart(2, "0");
	const date = `${value.getDate()}`.padStart(2, "0");
	return `${year}-${month}-${date}`;
}

/**
 * Check if year is leap year
 */
export function isLeapYear(year: number): boolean {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Get number of days in a month
 */
export function getDaysInMonth(month: number, year: number): number {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month === 1 && isLeapYear(year)) return 29;
	return daysInMonth[month] || 31;
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
	const today = new Date();
	return sameDay(date, today);
}

/**
 * Get array of dates between start and end (inclusive)
 */
export function getDateRange(start: Date, end: Date): Date[] {
	const dates: Date[] = [];
	const current = new Date(start);
	const endDate = new Date(end);
	
	while (current <= endDate) {
		dates.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}
	
	return dates;
}

/**
 * Format date using locale
 */
export function formatDate(date: Date | null, locale = 'en-US', options: Intl.DateTimeFormatOptions = {}): string {
	if (!date) return '';
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...options
	}).format(date);
}
