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

// BaseLayoutWrapper component types
export interface BaseLayoutWrapperProps {
	/** Additional CSS classes for the outer layout container */
	layoutClassName?: string;
	/** Inline styles for the outer layout container */
	layoutStyle?: string;
	/** Additional CSS classes for the inner body container */
	bodyClassName?: string;
	/** Inline styles for the inner body container */
	bodyStyle?: string;
}

// PageWrapper component types
export interface PageWrapperScrollEventDetail {
	/** Current scroll position from top */
	scrollTop: number;
	/** Current scroll position from left */
	scrollLeft: number;
	/** Total scrollable height */
	scrollHeight: number;
	/** Visible height of the scrollable area */
	clientHeight: number;
	/** The scrollable element */
	target: HTMLElement;
}

export interface PageWrapperProps {
	/** Center content vertically and horizontally */
	center?: boolean;
	/** Additional CSS classes for the page wrapper container */
	wrapperClassName?: string;
	/** Inline styles for the page wrapper container */
	wrapperStyle?: string;
	/** Additional CSS classes for the content container */
	contentClassName?: string;
	/** Inline styles for the content container */
	contentStyle?: string;
	/** Additional CSS classes for the footer container */
	footerClassName?: string;
	/** Inline styles for the footer container */
	footerStyle?: string;
	/** Reference to the page wrapper DOM element */
	pageElm?: HTMLElement;
	/** Reference to the content DOM element */
	contentElm?: HTMLElement;
	/** Reference to the footer DOM element */
	footerElm?: HTMLElement;
}

// SidebarWrapper component types
export type SidebarPosition = 'left' | 'right';

export interface SidebarResizeEventDetail {
	/** Current width in pixels */
	width: number;
	/** Current width as CSS value */
	widthPx: string;
}

export interface SidebarDragEventDetail {
	/** Initial width when drag started */
	initialWidth: number;
	/** Final width when drag ended */
	finalWidth?: number;
}

export interface SidebarWrapperProps {
	/** Collapsed state */
	collapsed?: boolean;
	/** Width when collapsed (CSS value) */
	collapseWidth?: string;
	/** Enable drag-to-resize functionality */
	isDraggable?: boolean;
	/** Default width in pixels */
	defaultWidth?: number;
	/** Drag handle position */
	position?: SidebarPosition;
	/** Minimum width in pixels */
	minWidth?: number;
	/** Maximum width (CSS value: px, %, etc.) */
	maxWidth?: string;
	/** Persist width to localStorage */
	persistWidth?: boolean;
	/** localStorage key for width persistence */
	storageKey?: string;
	/** Additional CSS classes for sidebar */
	sidebarClassName?: string;
	/** Inline styles for sidebar */
	sidebarStyle?: string;
	/** Custom CSS class (exported as class) */
	class?: string;
	/** ARIA label for accessibility */
	ariaLabel?: string;
	/** Reference to sidebar DOM element */
	sidebarElm?: HTMLElement;
}

// SelectOption component types
export interface SelectOptionItem {
	/** Option value (unique identifier) */
	value: string | number;
	/** Option display label */
	label?: string;
	/** Disabled state */
	disabled?: boolean;
	/** Optional group/category */
	group?: string;
	/** Additional metadata */
	metadata?: Record<string, any>;
}

export type SelectOptionSize = 'sm' | 'md' | 'lg';
export type SelectOptionVariant = 'default' | 'filled' | 'outlined';

export interface SelectOptionStyling {
	/** Select size variant */
	size?: SelectOptionSize;
	/** Select style variant */
	variant?: SelectOptionVariant;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
	/** Custom CSS class for trigger/input */
	inputClass?: string;
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface SelectOptionValidation {
	/** Required field indicator */
	required?: boolean;
	/** Error state */
	isError?: boolean;
	/** Error message to display */
	errorMessage?: string;
}

export interface SelectOptionBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Enable multi-selection mode */
	isMultiOption?: boolean;
	/** Enable search/filter functionality */
	isSearchable?: boolean;
	/** Close dropdown on selection (single mode only) */
	closeOnSelect?: boolean;
	/** Search debounce delay in milliseconds */
	debounceMs?: number;
	/** Maximum dropdown height in pixels */
	maxHeight?: number;
	/** Placeholder text */
	placeholder?: string;
	/** Empty state message */
	emptyMessage?: string;
	/** Loading state */
	loading?: boolean;
}

export interface SelectOptionProps {
	/** Array of selectable options */
	options?: SelectOptionItem[];
	/** Selected value(s) - controlled mode */
	value?: SelectOptionItem | SelectOptionItem[] | null;
	/** Default value(s) - uncontrolled mode */
	defaultValue?: SelectOptionItem | SelectOptionItem[] | null;
	/** Label text */
	label?: string;
	/** Field name for form integration */
	name?: string;
	/** Field ID for label association */
	id?: string;
	/** Styling configuration */
	styling?: SelectOptionStyling;
	/** Validation configuration */
	validation?: SelectOptionValidation;
	/** Behavior configuration */
	behavior?: SelectOptionBehavior;
	/** Reference to trigger element */
	triggerRef?: HTMLElement;
}

// Accordion component types
export interface AccordionItem {
	/** Accordion title */
	title: string;
	/** Optional subtitle */
	subtitle?: string;
	/** Content as HTML string */
	content?: string;
	/** Disabled state for this item */
	disabled?: boolean;
	/** Additional metadata */
	metadata?: Record<string, any>;
}

export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionVariant = 'default' | 'filled' | 'outlined';

export interface AccordionStyling {
	/** Accordion size variant */
	size?: AccordionSize;
	/** Accordion style variant */
	variant?: AccordionVariant;
	/** Custom CSS class for root element */
	className?: string;
	/** Custom CSS class for header wrapper */
	headerWrapperClass?: string;
	/** Custom CSS class for header button */
	headerButtonClass?: string;
	/** Custom CSS class for content area */
	contentClass?: string;
	/** Custom CSS class for icon */
	iconClass?: string;
	/** Custom inline styles for wrapper */
	wrapperStyle?: string;
}

export interface AccordionBehavior {
	/** Disabled state */
	disabled?: boolean;
	/** Show icon */
	showIcon?: boolean;
	/** Icon position */
	iconPosition?: 'left' | 'right';
	/** Transition duration in milliseconds */
	transitionDuration?: number;
	/** Show border when expanded */
	titleUnderline?: boolean;
}

export interface AccordionContent {
	/** Accordion item data */
	item?: AccordionItem;
	/** Title (alternative to item.title) */
	title?: string;
	/** Subtitle (alternative to item.subtitle) */
	subtitle?: string;
	/** Content (alternative to item.content) */
	content?: string;
}

export interface AccordionProps {
	/** Expanded state - controlled mode */
	expanded?: boolean;
	/** Default expanded state - uncontrolled mode */
	defaultExpanded?: boolean;
	/** Styling configuration */
	styling?: AccordionStyling;
	/** Behavior configuration */
	behavior?: AccordionBehavior;
	/** Content configuration */
	content?: AccordionContent;
}
