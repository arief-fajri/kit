<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { BaseLayoutWrapper, SidebarWrapper, Button } from '@rief/kit';
	
	const navigation = [
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
			title: 'Components',
			items: [
				{ title: 'Button', href: '/components/button' },
				{ title: 'InputText', href: '/components/input-text' },
				{ title: 'TextArea', href: '/components/textarea' },
				{ title: 'Checkbox', href: '/components/checkbox' },
				{ title: 'Switch', href: '/components/switch' },
				{ title: 'SelectOption', href: '/components/select-option' },
				{ title: 'DatePicker', href: '/components/date-picker' },
				{ title: 'Accordion', href: '/components/accordion' },
				{ title: 'Drawer', href: '/components/drawer' }
			]
		},
		{
			title: 'Layout',
			items: [
				{ title: 'SidebarWrapper', href: '/components/sidebar-wrapper' },
				{ title: 'PageWrapper', href: '/components/page-wrapper' },
				{ title: 'BaseLayoutWrapper', href: '/components/base-layout-wrapper' }
			]
		},
		{
			title: 'Playground',
			items: [
				{ title: 'Interactive Demo', href: '/playground' }
			]
		}
	];
	
	let sidebarCollapsed = false;
</script>

<BaseLayoutWrapper layoutClassName="docs-layout">
	<nav class="navbar">
		<div class="nav-container">
			<a href="/" class="nav-logo">@rief/kit</a>
			<div class="nav-actions">
				<Button 
					variant="text" 
					size="sm"
					on:click={() => sidebarCollapsed = !sidebarCollapsed}
				>
					{sidebarCollapsed ? '→' : '←'}
				</Button>
			</div>
		</div>
	</nav>
	
	<div class="layout-grid">
		<SidebarWrapper 
			collapsed={sidebarCollapsed}
			isDraggable={true}
			defaultWidth={280}
			minWidth={240}
			maxWidth="400px"
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
										{item.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</SidebarWrapper>
		
		<div class="main-content">
			<slot />
		</div>
	</div>
</BaseLayoutWrapper>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: var(--color-surface, #ffffff);
		color: var(--color-text, #1f2937);
	}

	:global(.docs-layout) {
		min-height: 100vh;
	}

	.layout-grid {
		display: flex;
		min-height: calc(100vh - 73px);
	}

	.navbar {
		background: var(--color-surface, #ffffff);
		border-bottom: 1px solid var(--color-border, #e5e7eb);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-logo {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-primary, #3b82f6);
		text-decoration: none;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
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
		display: block;
		padding: 0.5rem 1.5rem;
		color: var(--color-text-secondary, #6b7280);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s;
		border-left: 3px solid transparent;
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
		/* max-width: 1000px; */
		margin: 0 auto;
		width: 100%;
		overflow-y: auto;
	}

	@media (max-width: 768px) {
		.main-content {
			padding: 1rem;
		}
	}
</style>
