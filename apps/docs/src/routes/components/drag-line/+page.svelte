<script lang="ts">
	import { DragLine } from '@rief/kit';

	let isVertical = false;
	let tolerance = 4;
	let disabled = false;

	let panelSize = 260;
	let startSize = 260;

	function handleDragStart() {
		startSize = panelSize;
	}

	function handleDragging(event: CustomEvent<{ diffX: number; diffY: number }>) {
		if (isVertical) {
			panelSize = Math.max(120, startSize + event.detail.diffY);
		} else {
			panelSize = Math.max(160, startSize + event.detail.diffX);
		}
	}

	const dragLineSnippet = `&lt;DragLine
  isVertical
  on:dragging={(event) =&gt; console.log(event.detail.diffY)}
&gt;
  &lt;div class="bars" /&gt;
&lt;/DragLine&gt;`;
</script>

<svelte:head>
	<title>DragLine - Kit Documentation</title>
	<meta name="description" content="DragLine helper for resizing layouts or interactive handles." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Utilities</p>
		<h1>DragLine</h1>
		<p class="lede">
			Low-level drag handle that emits <code>dragstart</code>, <code>dragging</code>, and
			<code>dragstop</code> events with pointer deltas.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Resizable panels</h2>
			<p>Drag the handle to resize the column.</p>
		</div>

		<div class="demo-panel">
			<div class="drag-demo" data-vertical={isVertical}>
				<div
					class="panel panel--primary"
					style={isVertical ? `height:${panelSize}px` : `width:${panelSize}px`}
				>
					<p>{isVertical ? 'Top' : 'Left'} pane</p>
					<p class="panel-size">{Math.round(panelSize)}px</p>
				</div>

				<DragLine
					{isVertical}
					{tolerance}
					{disabled}
					className="drag-handle"
					on:dragstart={handleDragStart}
					on:dragging={handleDragging}
					on:dragstop={() => (disabled ? null : (startSize = panelSize))}
				>
					<div class="handle-visual" aria-hidden="true">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</DragLine>

				<div class="panel panel--secondary">
					<p>{isVertical ? 'Bottom' : 'Right'} pane</p>
				</div>
			</div>

			<div class="control-columns">
				<label class="toggle-row">
					<input type="checkbox" bind:checked={isVertical} />
					Vertical drag
				</label>

				<label>
					<span>Tolerance (px)</span>
					<input type="number" min="0" max="20" bind:value={tolerance} />
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={disabled} />
					Disabled
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html dragLineSnippet}</code></pre>
			<ul class="key-points">
				<li>Use <code>diffX</code> / <code>diffY</code> deltas to resize anything.</li>
				<li><code>tolerance</code> waits for a minimum movement before starting a drag.</li>
				<li>Provide your own visuals via the default slot.</li>
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

	.drag-demo {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		height: 260px;
		border-radius: 1rem;
		border: 1px solid var(--color-border, #d1d5db);
		overflow: hidden;
		--switch-duration: 200ms;
	}

	.drag-demo[data-vertical='true'] {
		flex-direction: column;
		height: 320px;
	}

	.panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-weight: 600;
		color: #0f172a;
	}

	.panel--primary {
		background: #e0f2fe;
	}

	.panel--secondary {
		background: #f3f4f6;
	}

	.panel-size {
		font-size: 0.85rem;
		color: #475569;
	}

	:global(.drag-handle) {
		width: 16px;
		background: rgba(15, 23, 42, 0.05);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: ew-resize;
	}

	.drag-demo[data-vertical='true'] :global(.drag-handle) {
		width: 100%;
		height: 16px;
		cursor: ns-resize;
	}

	.handle-visual {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.drag-demo[data-vertical='false'] .handle-visual {
		flex-direction: column;
	}

	.drag-demo[data-vertical='true'] .handle-visual {
		flex-direction: row;
	}

	.handle-visual span {
		display: block;
		width: 4px;
		height: 20px;
		background: rgba(15, 23, 42, 0.35);
		border-radius: 999px;
	}

	.drag-demo[data-vertical='true'] .handle-visual span {
		width: 20px;
		height: 4px;
	}

	.control-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
	}

	label span {
		display: block;
		font-size: 0.85rem;
		margin-bottom: 0.35rem;
		color: var(--color-text-secondary, #6b7280);
	}

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
