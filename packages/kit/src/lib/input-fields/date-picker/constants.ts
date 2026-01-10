import type { DatePickerLabels } from './types.js';

export const DEFAULT_LABELS: Required<DatePickerLabels> = {
	selectMonth: 'Select month',
	selectYear: 'Select year',
	prev: 'Previous month',
	next: 'Next month',
	today: 'Today',
	clear: 'Clear',
	weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]
};

export const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

export const SHORT_MONTH_NAMES = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
] as const;

export const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export const CALENDAR_WEEKS = 6;
export const DAYS_IN_WEEK = 7;
export const TOTAL_CALENDAR_CELLS = CALENDAR_WEEKS * DAYS_IN_WEEK;
