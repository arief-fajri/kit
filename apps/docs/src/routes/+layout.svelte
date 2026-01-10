<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { BaseLayoutWrapper, SidebarWrapper } from '@rief/kit';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import type { NavigationSection, ComponentStatus } from '$lib/types/navigation';

	const navigation: NavigationSection[] = [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Overview', href: '/' },
				{ title: 'Installation', href: '/getting-started/installation' }
			]
		},
		{
			title: 'Design System',
			items: [
				{ title: 'Global Configuration', href: '/design-system/global-configuration' },
				{ title: 'Theming', href: '/design-system/theming' }
			]
		},
		{
			title: 'Form Inputs',
			items: [
				{ title: 'InputText', href: '/components/input-text', status: 'stable' as ComponentStatus },
				{ title: 'TextArea', href: '/components/textarea', status: 'stable' as ComponentStatus },
				{ title: 'Checkbox', href: '/components/checkbox', status: 'stable' as ComponentStatus },
				{ title: 'Switch', href: '/components/switch', status: 'stable' as ComponentStatus },
				{ title: 'Radiobox', href: '/components/radiobox', status: 'stable' as ComponentStatus },
				{
					title: 'SelectOption',
					href: '/components/select-option',
					status: 'stable' as ComponentStatus
				},
				{
					title: 'DatePicker',
					href: '/components/date-picker',
					status: 'stable' as ComponentStatus
				}
			]
		},
		{
			title: 'Components',
			items: [
				{ title: 'Button', href: '/components/button', status: 'stable' as ComponentStatus },
				{ title: 'Accordion', href: '/components/accordion', status: 'stable' as ComponentStatus },
				{ title: 'Drawer', href: '/components/drawer', status: 'stable' as ComponentStatus },
				{ title: 'Tags', href: '/components/tags', status: 'stable' as ComponentStatus }
			]
		},
		{
			title: 'Layout',
			items: [
				{
					title: 'BaseLayoutWrapper',
					href: '/components/base-layout-wrapper',
					status: 'stable' as ComponentStatus
				},
				{
					title: 'SidebarWrapper',
					href: '/components/sidebar-wrapper',
					status: 'stable' as ComponentStatus
				},
				{
					title: 'PageWrapper',
					href: '/components/page-wrapper',
					status: 'stable' as ComponentStatus
				},
				{
					title: 'DropdownWrapper',
					href: '/components/dropdown-wrapper',
					status: 'stable' as ComponentStatus
				}
			]
		},
		{
			title: 'Utilities',
			items: [
				{ title: 'DragLine', href: '/components/drag-line', status: 'stable' as ComponentStatus }
			]
		}
		// {
		// 	title: 'Playground',
		// 	items: [
		// 		{ title: 'Interactive Demo', href: '/playground' }
		// 	]
		// }
	];

	let sidebarCollapsed = false;
</script>

<!-- <DocsHeader {navigation} /> -->
<BaseLayoutWrapper layoutClassName="docs-layout" layoutStyle="min-height: 100svh;">
	<!-- <div class="layout-body">
</div> -->
	<SidebarWrapper
		collapsed={sidebarCollapsed}
		isDraggable={true}
		defaultWidth={280}
		minWidth={240}
		maxWidth="400px"
		draglinePosition="right"
		persistWidth={true}
		storageKey="docs-sidebar-width"
		sidebarClassName="docs-sidebar"
	>
		<div class="sidebar-content">
			{#each navigation as section}
				<div class="nav-section">
					<h3 class="nav-section-title">{section.title}</h3>
					<ul class="nav-list">
						{#each section.items as item}
							<li>
								<a
									href={item.href}
									class="nav-link"
									class:active={$page.url.pathname === item.href}
								>
									<span class="nav-link-text">{item.title}</span>
									{#if item.status}
										<StatusBadge status={item.status} showTooltip={false} />
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</SidebarWrapper>

	<div class="main-content">
		<Breadcrumbs />
		<slot />
	</div>
</BaseLayoutWrapper>

<style>
	.header-wrapper {
		height: 46px;
	}

	.docs-layout {
		min-height: 100vh;
	}

	.layout-body {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	:global(.docs-sidebar) {
		background: var(--color-surface, #ffffff);
		border-right: 1px solid var(--color-border, #e5e7eb);
	}

	.sidebar-content {
		padding: 2rem 0;
		height: 100%;
		overflow-y: auto;
	}

	.nav-section {
		margin-bottom: 2rem;
	}

	.nav-section-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary, #6b7280);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem 0;
		padding: 0 1.5rem;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-list li {
		margin: 0;
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem 1.5rem;
		color: var(--color-text-secondary, #6b7280);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s;
		border-left: 3px solid transparent;
	}

	.nav-link-text {
		flex: 1;
	}

	.nav-link:hover {
		color: var(--color-primary, #3b82f6);
		background-color: var(--color-surface-hover, #f8fafc);
	}

	.nav-link.active {
		color: var(--color-primary, #3b82f6);
		background-color: var(--color-primary-surface, #eff6ff);
		border-left-color: var(--color-primary, #3b82f6);
		font-weight: 600;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		min-width: 0;
		width: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 768px) {
		.main-content {
			padding: 1rem;
		}
	}
</style>
