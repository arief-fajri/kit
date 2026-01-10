// Card component types
export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardSize = "sm" | "md" | "lg";
export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps {
  /** Card variant style */
  variant?: CardVariant;
  /** Card size */
  size?: CardSize;
  /** Card padding */
  padding?: CardPadding;
  /** Custom CSS class */
  className?: string;
  /** Whether card is interactive (hover effects) */
  interactive?: boolean;
  /** Whether card is clickable */
  clickable?: boolean;
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
  /** Whether card is disabled */
  disabled?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  customStyle?: string;
}

// Table component types
export type SortOrder = "asc" | "desc" | null;

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

export interface TableHeaderRow<T = Record<string, unknown>> {
  /** Content for each column field */
  [key: string]: string | number | undefined;
  /** Colspan configuration: field -> colspan value */
  colspan?: Record<string, number> | any;
  /** Rowspan configuration: field -> rowspan value */
  rowspan?: Record<string, number> | any;
}

export interface TableRow<T = Record<string, unknown>> extends Record<string, unknown> {
  /** Colspan configuration: field -> colspan value */
  colspan?: Record<string, number>;
  /** Rowspan configuration: field -> rowspan value */
  rowspan?: Record<string, number>;
  [key: string]: unknown;
}

export type FilterCriteria = Record<string, string | number | boolean>;

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export interface DataLoadParams {
  page: number;
  offset: number;
  filterCriteria: FilterCriteria;
  allSorting: SortConfig[];
}

export type TableData<T = Record<string, unknown>> =
  | TableRow<T>[]
  | ((params: DataLoadParams) => Promise<TableRow<T>[]> | TableRow<T>[]);

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

export interface TableEvents {
  resizeColumn: { columns: TableColumn[] };
  sort: { column: TableColumn; sortOrder: SortOrder };
  filter: { column: TableColumn; value: string };
}

// Pagination component types
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "default" | "outlined" | "minimal";

export interface PaginationProps {
  /** Current offset (0-based) */
  currentOffset?: number;
  /** Items per page */
  limit?: number;
  /** Total number of items */
  totalRows?: number;
  /** Number of visible page buttons (default: 5) */
  visiblePages?: number;
  /** Pagination size */
  size?: PaginationSize;
  /** Pagination variant style */
  variant?: PaginationVariant;
  /** Custom CSS class */
  className?: string;
  /** Whether to show first/last page buttons */
  showFirstLast?: boolean;
  /** Whether to show previous/next page buttons */
  showPreviousNext?: boolean;
  /** Whether to show page info text */
  showPageInfo?: boolean;
  /** Custom page info format function */
  pageInfoFormatter?: (currentPage: number, totalPages: number, totalRows: number) => string;
  /** Whether pagination is disabled */
  disabled?: boolean;
  /** ARIA label for pagination navigation */
  ariaLabel?: string;
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
  /** Whether to show ellipsis between page numbers */
  showEllipsis?: boolean;
}

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
