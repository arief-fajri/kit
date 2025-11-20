<script lang="ts">
	import { Drawer, Button } from '@rief/kit';

	type Position = 'left' | 'right' | 'top' | 'bottom' | 'center';

	let open = false;
	let position: Position = 'right';
	let overlay = true;
	let preventClose = false;
	let isDraggable = true;
	let closeReason: string | null = null;

	function handleClose(event: CustomEvent<{ reason: string }>) {
		open = false;
		closeReason = event.detail.reason;
	}

	const drawerSnippet = `&lt;Drawer
  visible={open}
  position="left"
  on:close={() =&gt; (open = false)}
&gt;
  &lt;slot /&gt;
&lt;/Drawer&gt;`;
</script>

<svelte:head>
	<title>Drawer - Kit Documentation</title>
	<meta name="description" content="Drawer examples for side panels, modals, and bottom sheets." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Overlays</p>
		<h1>Drawer</h1>
		<p class="lede">
			Flexible overlay component with five positions, optional overlay, focus trapping, and drag to
			resize.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Interactive drawer</h2>
			<p>Use the controls to change placement and behavior.</p>
		</div>

		<div class="demo-panel">
			<Button on:click={() => (open = true)}>Open drawer</Button>

			<Drawer
				visible={open}
				{position}
				{overlay}
				{preventClose}
				{isDraggable}
				on:close={handleClose}
			>
				<div class="drawer-content">
					<header>
						<h3>{position === 'center' ? 'Modal Drawer' : 'Workspace Drawer'}</h3>
						<p>Drag the edge or press Escape to close.</p>
					</header>
					<div class="drawer-body">
						<ul>
							<li>Position: {position}</li>
							<li>Draggable: {isDraggable ? 'yes' : 'no'}</li>
							<li>Overlay: {overlay ? 'enabled' : 'hidden'}</li>
						</ul>
					</div>
					<footer>
						<Button size="sm" variant="outlined" on:click={() => (open = false)}>Dismiss</Button>
						<Button size="sm" on:click={() => (open = false)}>Save changes</Button>
					</footer>
				</div>
			</Drawer>

			<div class="control-columns">
				<label>
					<span>Position</span>
					<select bind:value={position}>
						<option value="left">Left</option>
						<option value="right">Right</option>
						<option value="top">Top</option>
						<option value="bottom">Bottom</option>
						<option value="center">Center</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={overlay} />
					Show overlay
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={isDraggable} />
					Enable dragging
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={preventClose} />
					Prevent overlay/Escape close
				</label>
			</div>

			{#if closeReason}
				<p class="selection-output">Last closed via: {closeReason}</p>
			{/if}
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html drawerSnippet}</code></pre>
			<ul class="key-points">
				<li>
					Use <code>preventClose</code> to keep destructive flows open until explicitly closed.
				</li>
				<li><code>position="center"</code> behaves like a modal with scaling animation.</li>
				<li><code>isDraggable</code> lets users resize side drawers horizontally.</li>
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

	.drawer-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100%;
		padding: 1.5rem;
	}

	.drawer-content header h3 {
		margin: 0;
	}

	.drawer-body ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.drawer-content footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
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

	.selection-output {
		margin: 0;
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
