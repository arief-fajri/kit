// Import default styles
// LET USER CHOOSE
// import './default-style.css';

// Export all components
export { default as Button } from './button/Button.svelte';
export { default as InputText } from './input-fields/text/InputText.svelte';
export { default as Radiobox } from './input-fields/radiobox/Radiobox.svelte';
export { default as Checkbox } from './input-fields/checkbox/Checkbox.svelte';
export { default as Switch } from './input-fields/switch/Switch.svelte';
export { default as TextArea } from './input-fields/textarea/TextArea.svelte';
export { default as SelectOption } from './input-fields/select-option/SelectOption.svelte';
export { default as DatePicker } from './input-fields/date-picker/DatePicker.svelte';
export { default as InputDatePicker } from './input-fields/date-picker/InputDatePicker.svelte';
export { default as Tags } from './input-fields/tags/Tags.svelte';
export { default as Accordion } from './accordion/Accordion.svelte';
export { default as DropdownWrapper } from './wrapper/dropdown/DropdownWrapper.svelte';
export { default as BaseLayoutWrapper } from './wrapper/base-layout/BaseLayoutWrapper.svelte';
export { default as PageWrapper } from './wrapper/page/PageWrapper.svelte';
export { default as SidebarWrapper } from './wrapper/sidebar/SidebarWrapper.svelte';
export { default as DragLine } from './drag-line/DragLine.svelte';
export { default as Drawer } from './drawer/Drawer.svelte';
export { default as Card } from './card/Card.svelte';
export { default as Pagination } from './pagination/Pagination.svelte';
export { default as SortHeader } from './table/SortHeader.svelte';
export { default as TableListing } from './table/TableListing.svelte';
export { default as TableLoading } from './table/TableLoading.svelte';

// Export types from types.ts
export type {
	ButtonProps,
	ButtonVariant,
	ButtonSize,
	ButtonState,
	IconPosition,
	InputTextProps,
	InputTextStyling,
	InputTextValidation,
	InputTextBehavior,
	InputType,
	InputSize,
	InputVariant,
	TextAreaProps,
	TextAreaStyling,
	TextAreaValidation,
	TextAreaBehavior,
	TextAreaLayout,
	SelectOptionProps,
	SelectOptionItem,
	SelectOptionStyling,
	SelectOptionValidation,
	SelectOptionBehavior,
	SelectOptionSize,
	SelectOptionVariant,
	DragLineProps,
	DragLineEventDetail,
	DrawerProps,
	DrawerPosition,
	DrawerEventDetail,
	DrawerResizeEventDetail,
	BaseLayoutWrapperProps,
	PageWrapperProps,
	PageWrapperScrollEventDetail,
	SidebarWrapperProps,
	SidebarPosition,
	SidebarResizeEventDetail,
	SidebarDragEventDetail,
	AccordionProps,
	AccordionItem,
	AccordionStyling,
	AccordionBehavior,
	AccordionContent,
	CardProps,
	CardVariant,
	CardSize,
	CardPadding,
	PaginationProps,
	PaginationSize,
	PaginationVariant,
	PaginationEvents,
	TableColumn,
	TableRow,
	TableHeaderRow,
	TableProps,
	TableData,
	TableEvents,
	TableListingProps,
	SortOrder,
	SortConfig,
	DataLoadParams,
	FilterCriteria,
	ProcessedHeaderCell
} from './types.js';

// Export Checkbox types
export type {
	CheckboxProps,
	CheckboxVariant,
	CheckboxSize,
	CheckboxEventDetail,
	CheckboxStyling,
	CheckboxBehavior,
	FocusEventDetail
} from './input-fields/checkbox/types.js';

// Export Switch types
export type {
	SwitchProps,
	SwitchVariant,
	SwitchSize,
	SwitchEventDetail,
	SwitchStyling,
	SwitchBehavior
} from './input-fields/switch/types.js';

// Export Radiobox types
export type {
	RadioboxProps,
	RadioboxSize,
	RadioboxVariant,
	RadioboxColor,
	RadioboxEventDetail,
	RadioboxStyling,
	RadioboxBehavior
} from './input-fields/radiobox/types.js';

// Export DatePicker types
export type {
	DatePickerProps,
	DatePickerVariant,
	DatePickerSize,
	DatePickerMode,
	DatePickerLabels,
	DatePickerChangeEvent,
	DateValue,
	DateRangeValue,
	DateMultipleValue,
	InputDatePickerVariant,
	DatePickerStyling,
	DatePickerValidation,
	DatePickerBehavior
} from './input-fields/date-picker/types.js';

// Re-export form utilities from @rief/utils
export {
	getFormData,
	getFormDataAsObject,
	validateRequiredFields,
	getFormErrors
} from '@rief/utils';

// Export helper utilities
export {
	validateRequiredProp,
	validateEnumProp,
	validateNumberRange,
	getAriaDescribedBy,
	getErrorId,
	getHelperId,
	createComponentError,
	logComponentError,
	sanitizeHtml,
	safeHtmlContent
} from './helpers/index.js';
