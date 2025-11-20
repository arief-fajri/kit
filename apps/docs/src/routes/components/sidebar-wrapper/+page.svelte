<script lang="ts">
	import { SidebarWrapper, PageWrapper } from '@rief/kit';
	import type { SidebarDragEventDetail, SidebarResizeEventDetail } from '@rief/kit';

	type Position = 'left' | 'right';

	let collapsed = false;
	let draggable = true;
	let minWidth = 260;
	let maxWidth = '40%';
	let position: Position = 'left';
	let lastWidth = 321;
	let actionLog = 'Ready';
	let primaryPageElm: HTMLElement | undefined;
	let primaryContentElm: HTMLElement | undefined;
	let primaryFooterElm: HTMLElement | undefined;
	let secondaryPageElm: HTMLElement | undefined;
	let secondaryContentElm: HTMLElement | undefined;
	let secondaryFooterElm: HTMLElement | undefined;

	function handleResize(event: CustomEvent<SidebarResizeEventDetail>) {
		lastWidth = Math.round(event.detail.width);
	}

	function handleDragEnd(event: CustomEvent<SidebarDragEventDetail>) {
		const finalWidth = event.detail.finalWidth;
		actionLog =
			typeof finalWidth === 'number'
				? `Width saved at ${Math.round(finalWidth)}px`
				: 'Drag cancelled';
	}

	const sidebarSnippet = `&lt;SidebarWrapper
  isDraggable
  minWidth={280}
  maxWidth="480px"
  on:resize={(event) =&gt; console.log(event.detail.width)}
/&gt;`;
</script>

<svelte:head>
	<title>SidebarWrapper - Kit Documentation</title>
	<meta name="description" content="SidebarWrapper demo for resizable side panels." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Wrappers</p>
		<h1>SidebarWrapper</h1>
		<p class="lede">
			Built-in collapse, persistence, and draggable resizing for application sidebars.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Resizable shell</h2>
			<p>Drag the handle or collapse the panel.</p>
		</div>

		<div class="demo-panel">
			<div class="sidebar-shell" data-position={position}>
				{#if position === 'left'}
					<SidebarWrapper
						{collapsed}
						isDraggable={draggable}
						{minWidth}
						{maxWidth}
						{position}
						defaultWidth={320}
						on:resize={handleResize}
						on:dragend={handleDragEnd}
					>
						<header class="sidebar-header">
							<h3>Workspace</h3>
							<button type="button" on:click={() => (collapsed = !collapsed)}>
								{collapsed ? 'Expand' : 'Collapse'}
							</button>
						</header>
						<ul>
							<li>Inbox</li>
							<li>Campaigns</li>
							<li>Automations</li>
							<li>Billing</li>
						</ul>
					</SidebarWrapper>

					<PageWrapper
						wrapperStyle="padding:1.5rem;"
						bind:pageElm={primaryPageElm}
						bind:contentElm={primaryContentElm}
						bind:footerElm={primaryFooterElm}
					>
						<div class="page-card">
							<p>Sidebar width: {lastWidth}px</p>
							<p>Status: {actionLog}</p>
						</div>
					</PageWrapper>
				{:else}
					<PageWrapper
						wrapperStyle="padding:1.5rem;"
						bind:pageElm={secondaryPageElm}
						bind:contentElm={secondaryContentElm}
						bind:footerElm={secondaryFooterElm}
					>
						<div class="page-card">
							<p>Sidebar width: {lastWidth}px</p>
							<p>Status: {actionLog}</p>
						</div>
					</PageWrapper>

					<SidebarWrapper
						{collapsed}
						isDraggable={draggable}
						{minWidth}
						{maxWidth}
						{position}
						defaultWidth={320}
						on:resize={handleResize}
						on:dragend={handleDragEnd}
					>
						<header class="sidebar-header">
							<h3>Workspace</h3>
							<button type="button" on:click={() => (collapsed = !collapsed)}>
								{collapsed ? 'Expand' : 'Collapse'}
							</button>
						</header>
						<ul>
							<li>Inbox</li>
							<li>Campaigns</li>
							<li>Automations</li>
							<li>Billing</li>
						</ul>
					</SidebarWrapper>
				{/if}
			</div>

			<div class="control-columns">
				<label>
					<span>Position</span>
					<select bind:value={position}>
						<option value="left">Left</option>
						<option value="right">Right</option>
					</select>
				</label>

				<label>
					<span>Min width (px)</span>
					<input type="number" min="200" max="500" bind:value={minWidth} />
				</label>

				<label>
					<span>Max width</span>
					<select bind:value={maxWidth}>
						<option value="40%">40%</option>
						<option value="50%">50%</option>
						<option value="600px">600px</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={draggable} />
					Enable drag handle
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html sidebarSnippet}</code></pre>
			<ul class="key-points">
				<li>Use <code>collapsed</code> + <code>collapseWidth</code> for mini modes.</li>
				<li><code>persistWidth</code> stores user sizing in <code>localStorage</code>.</li>
				<li>
					Drag events emit <code>dragstart</code>, <code>dragging</code>, and <code>dragend</code>.
				</li>
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

	.sidebar-shell {
		display: flex;
		height: 320px;
		border-radius: 1rem;
		border: 1px solid var(--color-border, #d1d5db);
		overflow: hidden;
		background: var(--color-surface-secondary, #f8fafc);
	}

	.sidebar-shell[data-position='right'] {
		flex-direction: row-reverse;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: 1px solid var(--color-border, #e5e7eb);
	}

	.sidebar-header button {
		border: 1px solid var(--color-border, #d1d5db);
		background: #fff;
		border-radius: 0.5rem;
		padding: 0.3rem 0.7rem;
		cursor: pointer;
	}

	.sidebar-header h3 {
		margin: 0;
		font-size: 1rem;
	}

	.sidebar-header + ul {
		list-style: none;
		margin: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.95rem;
	}

	.page-card {
		background: #fff;
		border-radius: 0.75rem;
		padding: 1.25rem;
		box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
		height: max-content;
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

	select,
	input[type='number'] {
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
