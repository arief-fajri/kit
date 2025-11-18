// Button component types
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonState = 'default' | 'active' | 'selected' | 'highlight';
export type IconPosition = 'left' | 'right' | 'only';

export interface ButtonProps {
	/** Button text content */
	label?: string;
	/** Button variant style */
	variant?: ButtonVariant;
	/** Button size */
	size?: ButtonSize;
	/** Button state */
	state?: ButtonState;
	/** Fully rounded corners */
	fullRounded?: boolean;
	/** Custom CSS class */
	className?: string;
	/** Disabled state */
	disabled?: boolean;
	/** Loading/processing state */
	loading?: boolean;
	/** Loading message */
	loadingMessage?: string;
	/** Stop click event propagation */
	stopPropagation?: boolean;
	/** Fill color (CSS custom property override) */
	fillColor?: string;
	/** Text color (CSS custom property override) */
	textColor?: string;
	/** Outline color (CSS custom property override) */
	outlineColor?: string;
	/** Link URL (converts button to anchor) */
	href?: string;
	/** Link target */
	target?: string;
	/** Link rel attribute */
	rel?: string;
	/** Icon position */
	iconPosition?: IconPosition;
	/** ARIA label (only set if provided or no visible text) */
	ariaLabel?: string;
	/** Click handler */
	onclick?: (event: MouseEvent) => void;
}

// Card component types
export interface CardProps {
	/** Card title */
	title?: string;
	/** Card subtitle */
	subtitle?: string;
}

// InputText component types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

export interface InputTextStyling {
	/** Input size variant */
	size?: InputSize;
	/** Input style variant */
	variant?: InputVariant;
	/** Custom CSS class for input element */
	inputClass?: string;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface InputTextValidation {
	/** Required field indicator */
	required?: boolean;
	/** Error state */
	isError?: boolean;
	/** Error message to display */
	errorMessage?: string;
	/** Maximum character length */
	maxLength?: number | null;
	/** Input pattern for masking (e.g., 'xxx-xxx-xxxx') */
	pattern?: string;
	/** Show character counter */
	showMaxLengthCounter?: boolean;
}

export interface InputTextBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Readonly state */
	readonly?: boolean;
	/** Auto focus on mount */
	autoFocus?: boolean;
	/** Show clear button when input has value */
	clearable?: boolean;
	/** Use keyup instead of input event */
	useKeyup?: boolean;
	/** Enable number formatting for number inputs */
	useNumberFormat?: boolean;
	/** HTML autocomplete attribute */
	autocomplete?: string;
}

export interface InputTextProps {
	/** Input type */
	type?: InputType;
	/** Input value */
	value?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Label text */
	label?: string;
	/** Styling configuration */
	styling?: InputTextStyling;
	/** Validation configuration */
	validation?: InputTextValidation;
	/** Behavior configuration */
	behavior?: InputTextBehavior;
	/** Reference to input DOM element */
	inputRef?: HTMLInputElement;
}

// TextArea component types
export interface TextAreaStyling {
	/** TextArea size variant */
	size?: InputSize;
	/** TextArea style variant */
	variant?: InputVariant;
	/** Custom CSS class for textarea element */
	inputClass?: string;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface TextAreaValidation {
	/** Required field indicator */
	required?: boolean;
	/** Error state */
	isError?: boolean;
	/** Error message to display */
	errorMessage?: string;
	/** Maximum character length */
	maxLength?: number | null;
	/** Show character counter */
	showMaxLengthCounter?: boolean;
}

export interface TextAreaBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Readonly state */
	readonly?: boolean;
	/** Auto focus on mount */
	autoFocus?: boolean;
	/** Show clear button when textarea has value */
	clearable?: boolean;
	/** HTML autocomplete attribute */
	autocomplete?: string;
	/** Array of keys to exclude from input */
	excludedKeys?: string[];
}

export interface TextAreaLayout {
	/** Number of visible text lines */
	rows?: number;
	/** Fixed height mode */
	fixedHeight?: boolean;
	/** Maximum height in pixels */
	maxHeight?: number | null;
	/** Auto-resize behavior */
	autoResize?: boolean;
}

export interface TextAreaProps {
	/** TextArea value */
	value?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Label text */
	label?: string;
	/** Styling configuration */
	styling?: TextAreaStyling;
	/** Validation configuration */
	validation?: TextAreaValidation;
	/** Behavior configuration */
	behavior?: TextAreaBehavior;
	/** Layout configuration */
	layout?: TextAreaLayout;
	/** Reference to textarea DOM element */
	textareaRef?: HTMLTextAreaElement;
}

// DragLine component types
export interface DragLineEventDetail {
	/** Original DOM event */
	event: MouseEvent | TouchEvent;
	/** DragLine element reference */
	elem: HTMLElement;
	/** Horizontal movement delta (only in dragging event) */
	diffX?: number;
	/** Vertical movement delta (only in dragging event) */
	diffY?: number;
}

export interface DragLineProps {
	/** Minimum movement in pixels before drag starts */
	tolerance?: number;
	/** Vertical drag orientation (changes cursor) */
	isVertical?: boolean;
	/** Z-index of the drag element */
	zIndex?: number;
	/** Disabled state */
	disabled?: boolean;
	/** Custom CSS class */
	className?: string;
	/** ARIA label for accessibility */
	ariaLabel?: string;
}

// Drawer component types
export type DrawerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface DrawerEventDetail {
	/** Drawer position */
	position: DrawerPosition;
	/** Timestamp of event */
	timestamp: number;
}

export interface DrawerResizeEventDetail extends DrawerEventDetail {
	/** Current width in pixels */
	width?: number;
	/** Current height in pixels */
	height?: number;
}

export interface DrawerProps {
	/** Controls drawer visibility */
	visible?: boolean;
	/** Drawer position */
	position?: DrawerPosition;
	/** Prevent closing when clicking overlay */
	preventClose?: boolean;
	/** Background color of panel */
	bgPanel?: string;
	/** Enable drag-to-resize functionality */
	isDraggable?: boolean;
	/** Custom CSS class for wrapper */
	className?: string;
	/** Show overlay backdrop */
	overlay?: boolean;
	/** Close drawer on ESC key press */
	closeOnEscape?: boolean;
	/** ARIA label for drawer */
	ariaLabel?: string;
}
