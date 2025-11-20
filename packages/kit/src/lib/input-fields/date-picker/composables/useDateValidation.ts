import type { DateValue } from '../types.js';
import { toDate, sameDay } from './useDateUtils.js';

export interface DateValidationOptions {
	minDate?: DateValue;
	maxDate?: DateValue;
	disabledDates?: DateValue[] | ((date: Date) => boolean);
}

/**
 * Create date validation function
 */
export function useDateValidation(options: DateValidationOptions = {}) {
	const { minDate, maxDate, disabledDates } = options;
	
	const minDateObj = toDate(minDate);
	const maxDateObj = toDate(maxDate);
	
	const isAllowed = (candidate: Date): boolean => {
		// Check min date
		if (minDateObj && candidate < minDateObj) {
			return false;
		}
		
		// Check max date
		if (maxDateObj && candidate > maxDateObj) {
			return false;
		}
		
		// Check disabled dates
		if (disabledDates) {
			if (Array.isArray(disabledDates)) {
				// Array of disabled dates
				return !disabledDates.some(disabledDate => {
					const disabledDateObj = toDate(disabledDate);
					return disabledDateObj && sameDay(candidate, disabledDateObj);
				});
			} else if (typeof disabledDates === 'function') {
				// Function to check if date is disabled
				return !disabledDates(candidate);
			}
		}
		
		return true;
	};
	
	const validateDateRange = (start: Date | null, end: Date | null): boolean => {
		if (!start || !end) return true;
		
		// Check if start is before end
		if (start > end) return false;
		
		// Check if both dates are allowed
		return isAllowed(start) && isAllowed(end);
	};
	
	const validateMultipleDates = (dates: Date[]): boolean => {
		return dates.every(date => isAllowed(date));
	};
	
	return {
		isAllowed,
		validateDateRange,
		validateMultipleDates,
		minDate: minDateObj,
		maxDate: maxDateObj
	};
}
