// Switch component types
export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SwitchVariant = 'default' | 'primary' | 'success' | 'error' | 'warning';

export interface SwitchEventDetail {
	/** The checked state of the switch */
	checked: boolean;
	/** The value associated with the switch */
	value: any;
	/** The original DOM event */
	originalEvent: Event;
}

export interface FocusEventDetail {
	/** The original focus/blur event */
	originalEvent: FocusEvent;
}

export interface SwitchProps {
	/** Unique identifier for the switch input */
	id?: string;
	/** HTML name attribute for form handling */
	name?: string;
	/** Controls the checked state of the switch */
	checked?: boolean;
	/** Disables the switch interaction */
	disabled?: boolean;
	/** Marks the switch as required for form validation */
	required?: boolean;
	/** Value associated with the switch for form submission */
	value?: any;
	/** Text label displayed next to the switch */
	label?: string;
	/** Size variant of the switch */
	size?: SwitchSize;
	/** Visual variant with semantic colors */
	variant?: SwitchVariant;
	/** Additional CSS classes for custom styling */
	class?: string;
	/** Prevents click event bubbling when enabled */
	stopPropagation?: boolean;
	/** Change event handler */
	onChange?: (event: CustomEvent<SwitchEventDetail>) => void;
	/** Focus event handler */
	onFocus?: (event: CustomEvent<FocusEventDetail>) => void;
	/** Blur event handler */
	onBlur?: (event: CustomEvent<FocusEventDetail>) => void;
}

