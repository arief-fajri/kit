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

export interface CheckboxStyling {
	/** Checkbox size variant */
	size?: CheckboxSize;
	/** Checkbox visual variant */
	variant?: CheckboxVariant;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom CSS class for checkbox input */
	inputClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface CheckboxBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Readonly state */
	readonly?: boolean;
	/** Required field indicator */
	required?: boolean;
	/** Stop click event propagation */
	stopPropagation?: boolean;
}

export interface CheckboxProps {
	/** Unique identifier for the checkbox input */
	id?: string;
	/** HTML name attribute for form handling */
	name?: string;
	/** Controls the checked state of the checkbox */
	checked?: boolean;
	/** Value associated with the checkbox for form submission */
	value?: any;
	/** Text label displayed next to the checkbox */
	label?: string;
	/** Styling configuration */
	styling?: CheckboxStyling;
	/** Behavior configuration */
	behavior?: CheckboxBehavior;
	/** Reference to checkbox DOM element */
	checkboxRef?: HTMLInputElement;
}
