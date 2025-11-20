<script lang="ts">
	import { Accordion } from '@rief/kit';

	type Panel = {
		id: string;
		title: string;
		subtitle?: string;
		content: string;
	};

	const panels: Panel[] = [
		{
			id: 'tokens',
			title: 'Design tokens',
			subtitle: 'Color, typography, spacing',
			content: 'Centralize primitives so components stay in sync across products.'
		},
		{
			id: 'components',
			title: 'Composable components',
			subtitle: 'Buttons, forms, wrappers',
			content: 'Build UIs faster with accessible defaults, theming hooks, and wrappers.'
		},
		{
			id: 'workflow',
			title: 'Developer workflow',
			subtitle: 'DX improvements',
			content: 'Ship design systems with linting, documentation, and Storybook-ready recipes.'
		}
	];

	let openPanel: string | null = panels[0].id;
	let iconPosition: 'left' | 'right' = 'right';
	let variant: 'default' | 'outline' | 'minimal' | 'ghost' = 'default';
	let size: 'sm' | 'md' | 'lg' = 'md';
	let showIcon = true;

	function handleToggle(id: string, event: CustomEvent<{ expanded: boolean }>) {
		openPanel = event.detail.expanded ? id : null;
	}

	const accordionSnippet = `&lt;Accordion
  content={{ title: 'Shipping', subtitle: 'Delivery timelines' }}
  defaultExpanded={false}
  behavior={{ showIcon: true, iconPosition: 'left' }}
/&gt;`;
</script>

<svelte:head>
	<title>Accordion - Kit Documentation</title>
	<meta
		name="description"
		content="Accordion demos showcasing controlled and uncontrolled usage."
	/>
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Content</p>
		<h1>Accordion</h1>
		<p class="lede">
			Accessible disclosure component with keyboard navigation, icon positioning, and controlled or
			uncontrolled modes.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Controlled panels</h2>
			<p>Manage state yourself for advanced layouts or analytics.</p>
		</div>

		<div class="demo-panel">
			{#each panels as panel}
				<Accordion
					content={{ title: panel.title, subtitle: panel.subtitle, content: panel.content }}
					expanded={openPanel === panel.id}
					styling={{ variant, size }}
					behavior={{ iconPosition, showIcon }}
					on:toggle={(event) => handleToggle(panel.id, event)}
				/>
			{/each}

			<div class="control-columns">
				<label>
					<span>Variant</span>
					<select bind:value={variant}>
						<option value="default">default</option>
						<option value="outline">outline</option>
						<option value="minimal">minimal</option>
						<option value="ghost">ghost</option>
					</select>
				</label>

				<label>
					<span>Size</span>
					<select bind:value={size}>
						<option value="sm">small</option>
						<option value="md">medium</option>
						<option value="lg">large</option>
					</select>
				</label>

				<label>
					<span>Icon position</span>
					<select bind:value={iconPosition}>
						<option value="left">left</option>
						<option value="right">right</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={showIcon} />
					Show chevron
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Uncontrolled stacks</h2>
			<p>Use <code>defaultExpanded</code> when you want each accordion to manage itself.</p>
		</div>

		<div class="demo-panel">
			<Accordion
				content={{
					title: 'Default Expanded',
					subtitle: 'Using defaultExpanded prop',
					content: 'By default, accordion maintains its own state. Perfect for FAQ sections.'
				}}
				defaultExpanded={true}
				behavior={{ showIcon: true }}
			/>
			<Accordion
				content={{
					title: 'Disabled state',
					subtitle: 'Prevent user interaction',
					content: 'Pass behavior.disabled to keep a panel collapsed while showing context.'
				}}
				behavior={{ disabled: true }}
			/>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html accordionSnippet}</code></pre>
			<ul class="key-points">
				<li><code>expanded</code> turns the component into a fully controlled accordion.</li>
				<li>
					<code>behavior.iconPosition</code> accepts <code>'left'</code> or <code>'right'</code>.
				</li>
				<li>Listen to <code>toggle</code> for analytics or to sync with other widgets.</li>
			</ul>
		</div>
	</section>
</div>

<style>
	.component-docs {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.docs-header {
		border-bottom: 1px solid var(--color-border, #e5e7eb);
		padding-bottom: 1.5rem;
	}

	.eyebrow {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-secondary, #6b7280);
		margin: 0 0 0.4rem;
	}

	.docs-header h1 {
		font-size: 2.75rem;
		margin: 0 0 0.75rem;
	}

	.lede {
		margin: 0;
		line-height: 1.6;
		color: var(--color-text-secondary, #4b5563);
		max-width: 60ch;
	}

	.demo-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.6rem;
	}

	.section-header p {
		margin: 0.2rem 0 0;
		color: var(--color-text-secondary, #6b7280);
	}

	.demo-panel,
	.info-panel {
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		background: var(--color-surface, #fff);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.control-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	label span {
		display: block;
		font-size: 0.85rem;
		margin-bottom: 0.35rem;
		color: var(--color-text-secondary, #6b7280);
	}

	select {
		width: 100%;
		border-radius: 0.5rem;
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--color-border, #d1d5db);
		background: var(--color-surface, #fff);
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		color: var(--color-text-secondary, #4b5563);
	}

	.code-block {
		font-family: 'Menlo', 'Monaco', 'SFMono-Regular', monospace;
		font-size: 0.85rem;
		background: #0f172a;
		color: #f8fafc;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 0;
	}

	.key-points {
		margin: 0;
		padding-left: 1.2rem;
		color: var(--color-text-secondary, #4b5563);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
</style>
