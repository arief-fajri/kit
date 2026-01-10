// Radiobox component types
export type RadioboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioboxVariant = 'default' | 'outlined' | 'filled';
export type RadioboxColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

export interface RadioboxEventDetail {
	/** The checked state of the radiobox */
	checked: boolean;
	/** The original DOM event */
	originalEvent: Event;
}

export interface RadioboxStyling {
	/** Radiobox size variant */
	size?: RadioboxSize;
	/** Radiobox visual variant */
	variant?: RadioboxVariant;
	/** Radiobox color scheme */
	color?: RadioboxColor;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom CSS class for radio input */
	radioClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface RadioboxBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Right-to-left layout */
	rtl?: boolean;
	/** Stop click event propagation */
	stopPropagation?: boolean;
}

import type { BaseAccessibility } from "../../types.js";

export interface RadioboxProps extends BaseAccessibility {
	/** HTML name attribute for form handling (required for radio groups) */
	name?: string;
	/** Text label displayed next to the radiobox */
	label?: string;
	/** Controls the checked state of the radiobox */
	checked?: boolean;
	/** Field ID for label association */
	id?: string;
	/** Styling configuration */
	styling?: RadioboxStyling;
	/** Behavior configuration */
	behavior?: RadioboxBehavior;
	/** Reference to radio DOM element */
	radioRef?: HTMLInputElement;
}
