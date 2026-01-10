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

export interface SwitchStyling {
	/** Switch size variant */
	size?: SwitchSize;
	/** Switch visual variant */
	variant?: SwitchVariant;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom CSS class for switch input */
	inputClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface SwitchBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Required field indicator */
	required?: boolean;
	/** Stop click event propagation */
	stopPropagation?: boolean;
}

import type { BaseAccessibility } from '../../types.js';

export interface SwitchProps extends BaseAccessibility {
	/** Unique identifier for the switch input */
	id?: string;
	/** HTML name attribute for form handling */
	name?: string;
	/** Controls the checked state of the switch */
	checked?: boolean;
	/** Value associated with the switch for form submission */
	value?: any;
	/** Text label displayed next to the switch */
	label?: string;
	/** Styling configuration */
	styling?: SwitchStyling;
	/** Behavior configuration */
	behavior?: SwitchBehavior;
	/** Reference to switch DOM element */
	switchRef?: HTMLInputElement;
}
