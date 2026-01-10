/**
 * @rief/utils - Shared utility functions for Svelte components
 */

// Function utilities
export { debounce, throttle, noop } from './function/index.js';

// Class name utilities
export { classNames, cn } from './classname/index.js';

// Type guards
export { isFunction, isObject } from './type-guards/index.js';

// Object utilities
export { omit, pick, merge, isEmpty } from './object/index.js';

// String utilities
export {
	toSnakeCase,
	fromSnakeCase,
	parseIfJSON,
	stripAnyBraces,
	objStringify
} from './string/index.js';

// Number utilities
export { formatNumber, formatNumberCompact, convertNumber } from './number/index.js';

// DOM utilities
export { portal, clickOutside, intersect, copyToClipboard, sanitizeHtml } from './dom/index.js';

// Form utilities
export {
	getFormData,
	getFormDataAsObject,
	validateRequiredFields,
	getFormErrors
} from './form/index.js';

// Async utilities
export { sleep } from './async/index.js';

// ID utilities
export { uniqueId } from './id/index.js';

// JSON utilities
export { isJson } from './json/index.js';

// SSR utilities
export { isBrowser, safeUniqueId } from './ssr/index.js';

// Input utilities
export {
	applyMask,
	removeMask,
	getPatternLength,
	getPatternSeparators,
	sanitizeNumericInput,
	isValidNumericKey,
	shouldPreventInput,
	parseAndFormatNumber,
	formatNumberLocale
} from './input/index.js';

// Table utilities
export { isDateValue, compareValues, normalizeTableColumn } from './table/index.js';
