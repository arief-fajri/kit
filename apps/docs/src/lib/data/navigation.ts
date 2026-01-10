export interface NavItem {
	title: string;
	href?: string;
	items?: NavItem[];
}

export const navigation: NavItem[] = [
	{
		title: 'Getting Started',
		items: [
			{ title: 'Installation', href: '/getting-started/installation' },
			{ title: 'Quick Start', href: '/getting-started/quick-start' }
		]
	},
	{
		title: 'Components',
		items: [
			{
				title: 'Form Inputs',
				items: [
					{ title: 'InputText', href: '/components/input-text' },
					{ title: 'TextArea', href: '/components/textarea' },
					{ title: 'Checkbox', href: '/components/checkbox' },
					{ title: 'Switch', href: '/components/switch' },
					{ title: 'Radiobox', href: '/components/radiobox' },
					{ title: 'SelectOption', href: '/components/select-option' },
					{ title: 'DatePicker', href: '/components/date-picker' },
					{ title: 'Tags', href: '/components/tags' }
				]
			},
			{
				title: 'Layout',
				items: [
					{ title: 'BaseLayoutWrapper', href: '/components/base-layout-wrapper' },
					{ title: 'PageWrapper', href: '/components/page-wrapper' },
					{ title: 'SidebarWrapper', href: '/components/sidebar-wrapper' },
					{ title: 'DropdownWrapper', href: '/components/dropdown-wrapper' }
				]
			},
			{
				title: 'Data Display',
				items: [
					{ title: 'Card', href: '/components/card' },
					{ title: 'TableListing', href: '/components/table-listing' },
					{ title: 'Pagination', href: '/components/pagination' }
				]
			},
			{
				title: 'Feedback',
				items: [
					{ title: 'Accordion', href: '/components/accordion' },
					{ title: 'Drawer', href: '/components/drawer' }
				]
			},
			{
				title: 'Interactive',
				items: [
					{ title: 'Button', href: '/components/button' },
					{ title: 'DragLine', href: '/components/drag-line' }
				]
			}
		]
	},
	{
		title: 'Design System',
		items: [
			{ title: 'Theming', href: '/design-system/theming' },
			{ title: 'Global Configuration', href: '/design-system/global-configuration' }
		]
	}
];
