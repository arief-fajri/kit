// DatePicker component types
export type DatePickerVariant = 'default' | 'minimal' | 'rounded' | 'bordered';
export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerMode = 'single' | 'range' | 'multiple';
export type DateValue = Date | string | null;
export type DateRangeValue = [DateValue, DateValue];
export type DateMultipleValue = DateValue[];

export interface DatePickerLabels {
	/** Label for month selection button */
	selectMonth?: string;
	/** Label for year selection button */
	selectYear?: string;
	/** Label for previous month button */
	prev?: string;
	/** Label for next month button */
	next?: string;
	/** Label for today button */
	today?: string;
	/** Label for clear button */
	clear?: string;
	/** Weekday labels starting from Sunday */
	weekdays?: [string, string, string, string, string, string, string];
	/** Month names */
	months?: [string, string, string, string, string, string, string, string, string, string, string, string];
}

export interface DatePickerProps {
	/** Selected date value for single mode */
	value?: DateValue;
	/** Selected date range for range mode */
	rangeValue?: DateRangeValue;
	/** Selected dates for multiple mode */
	multipleValue?: DateMultipleValue;
	/** Selection mode */
	mode?: DatePickerMode;
	/** Component variant style */
	variant?: DatePickerVariant;
	/** Component size */
	size?: DatePickerSize;
	/** Minimum selectable date */
	minDate?: DateValue;
	/** Maximum selectable date */
	maxDate?: DateValue;
	/** Array of disabled dates or function to determine disabled dates */
	disabledDates?: DateValue[] | ((date: Date) => boolean);
	/** First day of week (0 = Sunday, 1 = Monday) */
	firstDayOfWeek?: 0 | 1;
	/** Show week numbers */
	showWeekNumbers?: boolean;
	/** Show today button */
	showToday?: boolean;
	/** Show clear button */
	showClear?: boolean;
	/** Close picker on date selection */
	closeOnSelect?: boolean;
	/** Custom labels for internationalization */
	labels?: DatePickerLabels;
	/** Custom CSS class */
	className?: string;
	/** Disabled state */
	disabled?: boolean;
	/** Loading state */
	loading?: boolean;
	/** Custom locale for date formatting */
	locale?: string;
}

export interface DatePickerChangeEvent {
	/** Selected value based on mode */
	value: DateValue | DateRangeValue | DateMultipleValue;
	/** Current mode */
	mode: DatePickerMode;
	/** Formatted date string(s) */
	formatted: string | string[];
}

// Internal types for calendar grid
export interface CalendarCell {
	/** Day number (1-31) or undefined for empty cells */
	value?: number;
	/** Whether this date is selectable */
	allowed: boolean;
	/** Whether this date is in a selected range */
	inRange: boolean;
	/** Whether this date is a range start */
	isRangeStart: boolean;
	/** Whether this date is a range end */
	isRangeEnd: boolean;
	/** Whether this date is selected */
	selected: boolean;
	/** Whether this date is today */
	isToday: boolean;
	/** ISO date string for this cell */
	isoDate: string;
}

export interface CalendarGridOptions {
	/** Current month (0-11) */
	month: number;
	/** Current year */
	year: number;
	/** Selected dates */
	selectedDates: Date[];
	/** Date range */
	dateRange: [Date | null, Date | null];
	/** Function to check if date is allowed */
	isAllowed: (date: Date) => boolean;
	/** First day of week */
	firstDayOfWeek: 0 | 1;
	/** Today's date */
	today: Date;
}

// Utility types
export type DateLike = Date | string | number | null | undefined;
export type NormalizedRange = [Date | null, Date | null];
