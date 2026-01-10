/**
 * Base types for standardized component props pattern
 */

/** Common size variants used across components */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/** Base styling interface for components */
export interface BaseStyling {
	/** Size variant */
	size?: ComponentSize | 'sm' | 'md' | 'lg';
	/** Visual style variant */
	variant?: string;
	/** Root element CSS class */
	className?: string;
	/** Root element inline style */
	style?: string;
}

/** Base behavior interface for components */
export interface BaseBehavior {
	/** Disabled state */
	disabled?: boolean;
}

/** Base accessibility interface for components */
export interface BaseAccessibility {
	/** ARIA label */
	ariaLabel?: string;
	/** ARIA described by */
	ariaDescribedBy?: string;
}

/**
 * Button component types
 */

/** Visual style variant for buttons */
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';

/** Size variant for buttons */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/** Interactive state of the button */
export type ButtonState = 'default' | 'active' | 'selected' | 'highlight';

/** Semantic color scheme for buttons (can be custom string for theming) */
export type ButtonSemantic =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| string;

/** Position of icon relative to button text */
export type IconPosition = 'left' | 'right' | 'only';

/** Placement position for dropdowns and popovers */
export type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto';

/**
 * Styling configuration for Button component
 */
export interface ButtonStyling extends BaseStyling {
	/** Button variant style */
	variant?: ButtonVariant;
	/** Button semantic color scheme */
	semantic?: ButtonSemantic;
	/** Button size */
	size?: ButtonSize;
	/** Fully rounded corners */
	fullRounded?: boolean;
	/** Fill color (CSS custom property override) */
	fillColor?: string;
	/** Text color (CSS custom property override) */
	textColor?: string;
	/** Outline color (CSS custom property override) */
	outlineColor?: string;
}

/**
 * Behavior configuration for Button component
 */
export interface ButtonBehavior extends BaseBehavior {
	/** Button state */
	state?: ButtonState;
	/** Loading/processing state */
	loading?: boolean;
	/** Loading message */
	loadingMessage?: string;
	/** Stop click event propagation */
	stopPropagation?: boolean;
	/** Link URL (converts button to anchor) */
	href?: string;
	/** Link target */
	target?: string;
	/** Link rel attribute */
	rel?: string;
	/** Icon position */
	iconPosition?: IconPosition;
}

/**
 * Button component props
 * @example
 * ```svelte
 * <Button label="Click me" styling={{ variant: "filled", size: "md", semantic: "primary" }} />
 * ```
 */
export interface ButtonProps extends BaseAccessibility {
	/** Button text content */
	label?: string;
	/** Styling configuration */
	styling?: ButtonStyling;
	/** Behavior configuration */
	behavior?: ButtonBehavior;
	/** Click handler */
	onclick?: (event: MouseEvent) => void;
}

/**
 * InputText component types
 */

/** HTML input type attribute values */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/** Size variant for input fields */
export type InputSize = 'sm' | 'md' | 'lg';

/** Visual style variant for input fields */
export type InputVariant = 'default' | 'filled' | 'outlined';

/**
 * Styling configuration for InputText component
 */
export interface InputTextStyling extends BaseStyling {
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

/**
 * Validation configuration for InputText component
 */
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

/**
 * Behavior configuration for InputText component
 */
export interface InputTextBehavior extends BaseBehavior {
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

/**
 * Props for InputText component
 * @example
 * ```svelte
 * <InputText
 *   value={name}
 *   label="Name"
 *   validation={{ required: true, isError: hasError, errorMessage: "Name is required" }}
 *   behavior={{ disabled: false, clearable: true }}
 * />
 * ```
 */
export interface InputTextProps extends BaseAccessibility {
	/** Input type */
	type?: InputType;
	/** Input value */
	value?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Label text */
	label?: string;
	/** Field name for form integration */
	name?: string;
	/** Field ID for label association */
	id?: string;
	/** Styling configuration */
	styling?: InputTextStyling;
	/** Validation configuration */
	validation?: InputTextValidation;
	/** Behavior configuration */
	behavior?: InputTextBehavior;
	/** Reference to input DOM element */
	inputRef?: HTMLInputElement;
}

/**
 * TextArea component types
 */

/**
 * Styling configuration for TextArea component
 */
export interface TextAreaStyling extends BaseStyling {
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

/**
 * Validation configuration for TextArea component
 */
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

/**
 * Behavior configuration for TextArea component
 */
export interface TextAreaBehavior extends BaseBehavior {
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

/**
 * Layout configuration for TextArea component
 */
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

/**
 * Props for TextArea component
 */
export interface TextAreaProps extends BaseAccessibility {
	/** TextArea value */
	value?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Label text */
	label?: string;
	/** Field name for form integration */
	name?: string;
	/** Field ID for label association */
	id?: string;
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

/**
 * DragLine component types
 */

/**
 * Event detail for drag line interactions
 */
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

/**
 * Styling configuration for DragLine component
 */
export interface DragLineStyling extends BaseStyling {
	/** Z-index of the drag element */
	zIndex?: number;
}

/**
 * Behavior configuration for DragLine component
 */
export interface DragLineBehavior extends BaseBehavior {
	/** Minimum movement in pixels before drag starts */
	tolerance?: number;
	/** Vertical drag orientation (changes cursor) */
	isVertical?: boolean;
}

/**
 * Props for DragLine component
 */
export interface DragLineProps extends BaseAccessibility {
	/** Styling configuration */
	styling?: DragLineStyling;
	/** Behavior configuration */
	behavior?: DragLineBehavior;
}

/**
 * Drawer component types
 */

/** Position of the drawer on screen */
export type DrawerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

/**
 * Event detail for drawer interactions
 */
export interface DrawerEventDetail {
	/** Drawer position */
	position: DrawerPosition;
	/** Timestamp of event */
	timestamp: number;
}

/**
 * Event detail for drawer resize interactions
 */
export interface DrawerResizeEventDetail extends DrawerEventDetail {
	/** Current width in pixels */
	width?: number;
	/** Current height in pixels */
	height?: number;
}

/**
 * Styling configuration for Drawer component
 */
export interface DrawerStyling extends BaseStyling {
	/** Background color of panel */
	bgPanel?: string;
}

/**
 * Behavior configuration for Drawer component
 */
export interface DrawerBehavior {
	/** Drawer position */
	position?: DrawerPosition;
	/** Prevent closing when clicking overlay */
	preventClose?: boolean;
	/** Enable drag-to-resize functionality */
	isDraggable?: boolean;
	/** Show overlay backdrop */
	overlay?: boolean;
	/** Close drawer on ESC key press */
	closeOnEscape?: boolean;
}

/**
 * Props for Drawer component
 */
export interface DrawerProps extends BaseAccessibility {
	/** Controls drawer visibility */
	visible?: boolean;
	/** Styling configuration */
	styling?: DrawerStyling;
	/** Behavior configuration */
	behavior?: DrawerBehavior;
}

/**
 * BaseLayoutWrapper component types
 */

/**
 * Styling configuration for BaseLayoutWrapper component
 */
export interface BaseLayoutWrapperStyling extends BaseStyling {
	/** Additional CSS classes for the outer layout container */
	layoutClassName?: string;
	/** Inline styles for the outer layout container */
	layoutStyle?: string;
	/** Additional CSS classes for the inner body container */
	bodyClassName?: string;
	/** Inline styles for the inner body container */
	bodyStyle?: string;
}

/**
 * Props for BaseLayoutWrapper component
 */
export interface BaseLayoutWrapperProps extends BaseAccessibility {
	/** Styling configuration */
	styling?: BaseLayoutWrapperStyling;
}

/**
 * PageWrapper component types
 */

/**
 * Event detail for page scroll events
 */
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

/**
 * Styling configuration for PageWrapper component
 */
export interface PageWrapperStyling extends BaseStyling {
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
}

/**
 * Behavior configuration for PageWrapper component
 */
export interface PageWrapperBehavior {
	/** Center content vertically and horizontally */
	center?: boolean;
}

/**
 * Props for PageWrapper component
 */
export interface PageWrapperProps extends BaseAccessibility {
	/** Styling configuration */
	styling?: PageWrapperStyling;
	/** Behavior configuration */
	behavior?: PageWrapperBehavior;
	/** Reference to the page wrapper DOM element */
	pageElm?: HTMLElement;
	/** Reference to the content DOM element */
	contentElm?: HTMLElement;
	/** Reference to the footer DOM element */
	footerElm?: HTMLElement;
}

/**
 * SidebarWrapper component types
 */

/** Position of sidebar relative to main content */
export type SidebarPosition = 'left' | 'right';

/**
 * Event detail for sidebar resize interactions
 */
export interface SidebarResizeEventDetail {
	/** Current width in pixels */
	width: number;
	/** Current width as CSS value */
	widthPx: string;
}

/**
 * Event detail for sidebar drag interactions
 */
export interface SidebarDragEventDetail {
	/** Initial width when drag started */
	initialWidth: number;
	/** Final width when drag ended */
	finalWidth?: number;
}

/**
 * Styling configuration for SidebarWrapper component
 */
export interface SidebarWrapperStyling extends BaseStyling {
	/** Additional CSS classes for sidebar */
	sidebarClassName?: string;
	/** Inline styles for sidebar */
	sidebarStyle?: string;
}

/**
 * Behavior configuration for SidebarWrapper component
 */
export interface SidebarWrapperBehavior {
	/** Collapsed state */
	collapsed?: boolean;
	/** Width when collapsed (CSS value) */
	collapseWidth?: string;
	/** Enable drag-to-resize functionality */
	isDraggable?: boolean;
	/** Default width in pixels */
	defaultWidth?: number;
	/** Drag handle position */
	draglinePosition?: SidebarPosition;
	/** Minimum width in pixels */
	minWidth?: number;
	/** Maximum width (CSS value: px, %, etc.) */
	maxWidth?: string;
	/** Persist width to localStorage */
	persistWidth?: boolean;
	/** localStorage key for width persistence */
	storageKey?: string;
}

/**
 * Props for SidebarWrapper component
 */
export interface SidebarWrapperProps extends BaseAccessibility {
	/** Styling configuration */
	styling?: SidebarWrapperStyling;
	/** Behavior configuration */
	behavior?: SidebarWrapperBehavior;
	/** Reference to sidebar DOM element */
	sidebarElm?: HTMLElement;
}

/**
 * SelectOption component types
 */

/**
 * Individual option item for SelectOption component
 */
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

/** Size variant for SelectOption component */
export type SelectOptionSize = 'sm' | 'md' | 'lg';

/** Visual style variant for SelectOption component */
export type SelectOptionVariant = 'default' | 'filled' | 'outlined';

/**
 * Styling configuration for SelectOption component
 */
export interface SelectOptionStyling extends BaseStyling {
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

/**
 * Validation configuration for SelectOption component
 */
export interface SelectOptionValidation {
	/** Required field indicator */
	required?: boolean;
	/** Error state */
	isError?: boolean;
	/** Error message to display */
	errorMessage?: string;
}

/**
 * Behavior configuration for SelectOption component
 */
export interface SelectOptionBehavior extends BaseBehavior {
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
	/** placement position */
	placement?: Placement;
	/** dropdown class position */
	dropdownClass?: string;
	/** Full anchor width */
	isFullAnchorWidth?: boolean;
}

/**
 * Props for SelectOption component
 */
export interface SelectOptionProps extends BaseAccessibility {
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
	/** Fetch function for async options */
	fetchFn?: ((query: any, callback: (result: SelectOptionItem[], total?: number) => void) => void) | null;
	/** Limit for fetch */
	limit?: number;
}

/**
 * Accordion component types
 */

/**
 * Individual accordion item data
 */
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

/** Size variant for Accordion component */
export type AccordionSize = 'sm' | 'md' | 'lg';

/** Visual style variant for Accordion component */
export type AccordionVariant = 'default' | 'filled' | 'outlined';

/**
 * Styling configuration for Accordion component
 */
export interface AccordionStyling extends BaseStyling {
	/** Accordion size variant */
	size?: AccordionSize;
	/** Accordion style variant */
	variant?: AccordionVariant;
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

/**
 * Behavior configuration for Accordion component
 */
export interface AccordionBehavior extends BaseBehavior {
	/** Show icon */
	showIcon?: boolean;
	/** Icon position */
	iconPosition?: 'left' | 'right';
	/** Transition duration in milliseconds */
	transitionDuration?: number;
	/** Show border when expanded */
	titleUnderline?: boolean;
}

/**
 * Content configuration for Accordion component
 */
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

/**
 * Props for Accordion component
 */
export interface AccordionProps extends BaseAccessibility {
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

/**
 * Card component types
 */

/** Visual style variant for Card component */
export type CardVariant = "default" | "outlined" | "elevated" | "filled";

/** Size variant for Card component */
export type CardSize = "sm" | "md" | "lg";

/** Padding size for Card component */
export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Styling configuration for Card component
 */
export interface CardStyling extends BaseStyling {
	/** Card variant style */
	variant?: CardVariant;
	/** Card size */
	size?: CardSize;
	/** Card padding */
	padding?: CardPadding;
	/** Custom background color */
	backgroundColor?: string;
	/** Custom border color */
	borderColor?: string;
	/** Custom shadow color */
	shadowColor?: string;
	/** Whether card has rounded corners */
	rounded?: boolean;
	/** Border radius value (overrides rounded) */
	borderRadius?: string;
}

/**
 * Behavior configuration for Card component
 */
export interface CardBehavior extends BaseBehavior {
	/** Whether card is interactive (hover effects) */
	interactive?: boolean;
	/** Whether card is clickable */
	clickable?: boolean;
}

/**
 * Props for Card component
 */
export interface CardProps extends BaseAccessibility {
	/** Styling configuration */
	styling?: CardStyling;
	/** Behavior configuration */
	behavior?: CardBehavior;
}

/**
 * Table component types
 */

/** Sort order direction */
export type SortOrder = "asc" | "desc" | null;

/**
 * Column definition for Table component
 * @template T - Type of the row data
 */
export interface TableColumn<T = Record<string, unknown>> {
	/** Unique identifier for the column */
	id?: string;
	/** Field name in the data object */
	field: keyof T | string;
	/** Alternative field names (for backward compatibility) */
	key?: keyof T | string;
	/** Display label for the column header */
	label?: string;
	/** Alternative label names (for backward compatibility) */
	title?: string;
	name?: string;
	alias?: string;
	/** Column width in pixels */
	width?: number;
	/** Minimum column width in pixels */
	minWidth?: number;
	/** Whether column is sortable */
	sortable?: boolean;
	/** Whether column is filterable */
	filterable?: boolean;
	/** Whether column is hidden */
	hidden?: boolean;
	/** Current sort order */
	sortOrder?: SortOrder;
	/** Force sorting (prevent clearing sort) */
	forceSorting?: boolean;
	/** Custom CSS style for the column */
	style?: string;
	/** Custom CSS class for the column */
	className?: string;
	colClass?: string;
	/** Rowspan for this column in data rows */
	rowspan?: number;
}

/**
 * Header row definition for Table component
 * @template T - Type of the row data
 */
export interface TableHeaderRow<T = Record<string, unknown>> {
	/** Content for each column field */
	[key: string]: string | number | undefined;
	/** Colspan configuration: field -> colspan value */
	colspan?: Record<string, number> | any;
	/** Rowspan configuration: field -> rowspan value */
	rowspan?: Record<string, number> | any;
}

/**
 * Data row for Table component
 * @template T - Type of the row data
 */
export interface TableRow<T = Record<string, unknown>> extends Record<string, unknown> {
	/** Colspan configuration: field -> colspan value */
	colspan?: Record<string, number>;
	/** Rowspan configuration: field -> rowspan value */
	rowspan?: Record<string, number>;
	[key: string]: unknown;
}

/** Filter criteria for table data */
export type FilterCriteria = Record<string, string | number | boolean>;

/**
 * Sort configuration for table
 */
export interface SortConfig {
	field: string;
	order: SortOrder;
}

/**
 * Parameters for async data loading in Table component
 */
export interface DataLoadParams {
	page: number;
	offset: number;
	filterCriteria: FilterCriteria;
	allSorting: SortConfig[];
}

/** Table data - can be static array or async function */
export type TableData<T = Record<string, unknown>> =
	| TableRow<T>[]
	| ((params: DataLoadParams) => Promise<TableRow<T>[]> | TableRow<T>[]>);

/**
 * Props for Table component
 * @template T - Type of the row data
 */
export interface TableProps<T = Record<string, unknown>> {
	/** Full dataset (rows) or async function that returns data */
	items: TableData<T>;
	/** Column definitions with dynamic widths */
	columns: TableColumn<T>[];
	/** Height of each row in pixels */
	itemHeight?: number;
	/** Height of the scrollable area in pixels */
	viewportHeight?: number;
	/** Width of the scrollable area in pixels */
	viewportWidth?: number;
	/** Enable column resizing */
	resizeable?: boolean;
	/** Prevent infinite scroll */
	preventInfiniteScroll?: boolean;
	/** Force reload trigger */
	forceReload?: boolean;
	/** Current page for pagination */
	currentPage?: number;
	/** Current offset for pagination */
	offset?: number;
	/** Items per page limit */
	limit?: number;
	/** CSS class for header cells */
	headerClass?: string;
	/** Inline styles for header cells */
	headerStyle?: string;
	/** Inline styles for header content */
	headerContentStyle?: string;
	/** CSS class for body cells */
	cellClass?: string;
	/** Inline styles for body cells */
	cellStyle?: string;
	/** Array of header row definitions */
	headerRows?: TableHeaderRow<T>[];
	/** Whether header has rounded corners */
	isHeaderRounded?: boolean;
}

/**
 * Processed header cell data for rendering
 */
export interface ProcessedHeaderCell {
	content: string | number | undefined;
	width: number;
	height: number;
	offset: number;
	colspan: number;
	rowspan: number;
	field: string;
	style: string;
	forceSorting?: boolean;
	sortOrder?: SortOrder;
}

/**
 * Event types for Table component
 */
export interface TableEvents {
	resizeColumn: { columns: TableColumn[] };
	sort: { column: TableColumn; sortOrder: SortOrder };
	filter: { column: TableColumn; value: string };
}

/**
 * Styling configuration for TableListing component
 */
export interface TableListingStyling extends BaseStyling {
	/** Custom CSS class for table wrapper */
	tableContainerClass?: string;
	/** Custom CSS class for header */
	headerClass?: string;
	/** Custom CSS class for rows (string or function) */
	rowClass?: string | ((row: TableRow<any>, index: number) => string);
	/** Custom CSS class for cells (string or function) */
	cellClass?: string | ((column: TableColumn<any>, row: TableRow<any>) => string);
	/** Custom tbody class */
	tbodyClass?: string;
	/** Custom pagination wrapper class */
	paginationClass?: string;
	/** Custom CSS variables for theming */
	cssVariables?: Record<string, string>;
	/** Custom hover background color */
	hoverColor?: string;
}

/**
 * Behavior configuration for TableListing component
 */
export interface TableListingBehavior {
	/** Show pagination component */
	showPagination?: boolean;
	/** Pagination size */
	paginationSize?: "sm" | "md" | "lg";
	/** Pagination variant */
	paginationVariant?: "default" | "minimal";
	/** Show first/last page buttons in pagination */
	paginationShowFirstLast?: boolean;
	/** Show page info in pagination */
	paginationShowPageInfo?: boolean;
	/** Auto reset offset when sort changes */
	autoResetOffsetOnSort?: boolean;
	/** Scroll to top on page change */
	scrollToTopOnPageChange?: boolean;
	/** Custom sort function */
	customSortFn?: (data: TableRow<any>[], sortKey: string, isDescending: boolean) => TableRow<any>[];
	/** Enable row click handling */
	rowClickable?: boolean;
	/** Loading state */
	loading?: boolean;
	/** Enable row selection */
	selectable?: boolean;
	/** Selected row IDs/indices */
	selectedRows?: (string | number)[];
	/** Enable hover effect on rows */
	enableHover?: boolean;
	/** Enable drag and drop */
	draggable?: boolean;
	/** Function to check if a row can be dropped on target row */
	canDrop?: (draggedRow: TableRow<any>, targetRow: TableRow<any>) => boolean;
	/** Enable server-side pagination and sorting */
	serverSide?: boolean;
	/** Total number of rows (required for server-side mode) */
	totalRows?: number;
}

/**
 * Props interface for TableListing component
 * @template T - Type of the row data
 */
export interface TableListingProps<T = Record<string, unknown>> extends BaseAccessibility {
	/** Column definitions */
	columns: TableColumn<T>[];
	/** Data rows */
	data: TableRow<T>[];
	/** Current sort string (e.g., "-created_at" for descending, "+name" for ascending) */
	sort?: string;
	/** Current offset for pagination (0-based) */
	currentOffset?: number;
	/** Items per page */
	limit?: number;
	/** Empty state message */
	emptyMessage?: string;
	/** Table ID for accessibility */
	tableId?: string;
	/** Styling configuration */
	styling?: TableListingStyling;
	/** Behavior configuration */
	behavior?: TableListingBehavior;
}

/**
 * Tags component types
 */

/**
 * Styling configuration for Tags component
 */
export interface TagsStyling extends BaseStyling {
	/** Custom CSS class for label */
	labelClass?: string;
	/** Custom CSS class for wrapper */
	wrapperClass?: string;
}

/**
 * Validation configuration for Tags component
 */
export interface TagsValidation {
	/** Error state */
	isError?: boolean;
	/** Required field indicator */
	required?: boolean;
}

/**
 * Behavior configuration for Tags component
 */
export interface TagsBehavior extends BaseBehavior {
	/** Readonly state */
	readonly?: boolean;
	/** Keys that trigger tag addition */
	addKeys?: number[];
	/** Maximum number of tags */
	maxTags?: number | false;
	/** Only allow unique tags */
	onlyUnique?: boolean;
	/** Keys that trigger tag removal */
	removeKeys?: number[];
	/** Placeholder text */
	placeholder?: string;
	/** Allow paste to add tags */
	allowPaste?: boolean;
	/** Allow drop to add tags */
	allowDrop?: boolean;
	/** Character(s) to split pasted/dropped text */
	splitWith?: string;
	/** Autocomplete data or function */
	autoComplete?: any[] | ((value: string, signal?: AbortSignal) => any[] | Promise<any[]>) | false;
	/** Key to extract from autocomplete objects */
	autoCompleteKey?: string | false;
	/** Key for markup in autocomplete */
	autoCompleteMarkupKey?: string | false;
	/** Allow adding tag on blur */
	allowBlur?: boolean;
	/** Minimum characters for autocomplete */
	minChars?: number;
	/** Only allow autocomplete suggestions */
	onlyAutocomplete?: boolean;
	/** Tag click handler */
	onTagClick?: (tag: string | any) => void;
	/** Key to show in autocomplete display */
	autoCompleteShowKey?: string | false;
	/** Only allow numbers */
	numberOnly?: boolean;
	/** Allow decimal numbers */
	allowDecimal?: boolean;
	/** Debounce delay for autocomplete */
	debounceMs?: number;
}

/**
 * Props for Tags component
 */
export interface TagsProps extends BaseAccessibility {
	/** Current tags array */
	tags?: (string | any)[];
	/** Field name for form integration */
	name?: string;
	/** Field ID for label association */
	id?: string;
	/** Label text */
	label?: string;
	/** Styling configuration */
	styling?: TagsStyling;
	/** Validation configuration */
	validation?: TagsValidation;
	/** Behavior configuration */
	behavior?: TagsBehavior;
}

/**
 * DropdownWrapper component types
 */

/** Placement position for dropdowns */
export type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end" | "auto";

/** Visual style variant for DropdownWrapper */
export type DropdownVariant = "default" | "minimal" | "elevated" | "outlined";

/** Size variant for DropdownWrapper */
export type DropdownSize = "sm" | "md" | "lg" | "xl";

/**
 * Styling configuration for DropdownWrapper component
 */
export interface DropdownWrapperStyling extends BaseStyling {
	/** Dropdown variant style */
	variant?: DropdownVariant;
	/** Dropdown size */
	size?: DropdownSize;
}

/**
 * Behavior configuration for DropdownWrapper component
 */
export interface DropdownWrapperBehavior {
	/** Placement position */
	placement?: DropdownPlacement;
	/** Offset from anchor */
	offset?: { x: number; y: number };
	/** Close dropdown when clicking outside */
	closeOnClickOutside?: boolean;
	/** Close dropdown on ESC key press */
	closeOnEscape?: boolean;
	/** Make dropdown full width of anchor */
	isFullAnchorWidth?: boolean;
}

/**
 * Props for DropdownWrapper component
 */
export interface DropdownWrapperProps extends BaseAccessibility {
	/** Controls dropdown visibility */
	visible?: boolean;
	/** Anchor element to position relative to */
	anchor?: HTMLElement | null;
	/** Styling configuration */
	styling?: DropdownWrapperStyling;
	/** Behavior configuration */
	behavior?: DropdownWrapperBehavior;
}

/**
 * Pagination component types
 */

/** Size variant for Pagination component */
export type PaginationSize = "sm" | "md" | "lg";

/** Visual style variant for Pagination component */
export type PaginationVariant = "default" | "outlined" | "minimal";

/**
 * Styling configuration for Pagination component
 */
export interface PaginationStyling extends BaseStyling {
	/** Pagination size */
	size?: PaginationSize;
	/** Pagination variant style */
	variant?: PaginationVariant;
	/** Custom background color */
	backgroundColor?: string;
	/** Custom text color */
	textColor?: string;
	/** Custom active page background color */
	activeBackgroundColor?: string;
	/** Custom active page text color */
	activeTextColor?: string;
	/** Custom border color */
	borderColor?: string;
	/** Custom border radius value */
	borderRadius?: string;
	/** Custom gap between pagination elements */
	gap?: string;
}

/**
 * Behavior configuration for Pagination component
 */
export interface PaginationBehavior extends BaseBehavior {
	/** Number of visible page buttons (default: 5) */
	visiblePages?: number;
	/** Whether to show first/last page buttons */
	showFirstLast?: boolean;
	/** Whether to show previous/next page buttons */
	showPreviousNext?: boolean;
	/** Whether to show page info text */
	showPageInfo?: boolean;
	/** Custom page info format function */
	pageInfoFormatter?: (currentPage: number, totalPages: number, totalRows: number) => string;
	/** Whether to show ellipsis between page numbers */
	showEllipsis?: boolean;
}

/**
 * Props for Pagination component
 */
export interface PaginationProps extends BaseAccessibility {
	/** Current offset (0-based) */
	currentOffset?: number;
	/** Items per page */
	limit?: number;
	/** Total number of items */
	totalRows?: number;
	/** Styling configuration */
	styling?: PaginationStyling;
	/** Behavior configuration */
	behavior?: PaginationBehavior;
}

/**
 * Event types for Pagination component
 */
export interface PaginationEvents {
	/** Emitted when page changes */
	pageChange: { offset: number; page: number };
	/** Emitted when going to first page */
	firstPage: { offset: number; page: number };
	/** Emitted when going to previous page */
	previousPage: { offset: number; page: number };
	/** Emitted when going to next page */
	nextPage: { offset: number; page: number };
	/** Emitted when going to last page */
	lastPage: { offset: number; page: number };
}
