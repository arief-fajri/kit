// Checkbox component types
export type CheckboxVariant = 'default' | 'primary' | 'success' | 'error';
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CheckboxEventDetail {
	/** The checked state of the checkbox */
	checked: boolean;
	/** The value associated with the checkbox */
	value: any;
	/** The original DOM event */
	originalEvent: Event;
}

export interface FocusEventDetail {
	/** The original focus/blur event */
	originalEvent: FocusEvent;
}

export interface CheckboxProps {
	/** Unique identifier for the checkbox input */
	id?: string;
	/** HTML name attribute for form handling */
	name?: string;
	/** Controls the checked state of the checkbox */
	checked?: boolean;
	/** Disables the checkbox interaction */
	disabled?: boolean;
	/** Marks the checkbox as required for form validation */
	required?: boolean;
	/** Makes the checkbox read-only (visually interactive but unchangeable) */
	readonly?: boolean;
	/** Value associated with the checkbox for form submission */
	value?: any;
	/** Text label displayed next to the checkbox */
	label?: string;
	/** Size variant of the checkbox */
	size?: CheckboxSize;
	/** Visual variant with semantic colors */
	variant?: CheckboxVariant;
	/** Additional CSS classes for custom styling */
	class?: string;
	/** Prevents click event bubbling when enabled */
	stopPropagation?: boolean;
	/** Change event handler */
	onChange?: (event: CustomEvent<CheckboxEventDetail>) => void;
	/** Focus event handler */
	onFocus?: (event: CustomEvent<FocusEventDetail>) => void;
	/** Blur event handler */
	onBlur?: (event: CustomEvent<FocusEventDetail>) => void;
}
