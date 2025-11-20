<script lang="ts">
	import { PageWrapper } from '@rief/kit';
	import type { PageWrapperScrollEventDetail } from '@rief/kit';

	let centerContent = false;
	let padding = '2rem';
	let footer = true;
	let scrollTop = 0;
	let wrapperElm: HTMLElement | undefined;
	let contentElm: HTMLElement | undefined;
	let footerElm: HTMLElement | undefined;

	function handleScroll(event: CustomEvent<PageWrapperScrollEventDetail>) {
		scrollTop = Math.round(event.detail.scrollTop);
	}

	const pageWrapperSnippet = `&lt;PageWrapper on:scroll={(event) =&gt; console.log(event.detail.scrollTop)}&gt;
  &lt;div slot="footer"&gt;Footer content&lt;/div&gt;
&lt;/PageWrapper&gt;`;
</script>

<svelte:head>
	<title>PageWrapper - Kit Documentation</title>
	<meta name="description" content="PageWrapper usage examples for scrollable content areas." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Wrappers</p>
		<h1>PageWrapper</h1>
		<p class="lede">
			Scrollable content shell with automatic center alignment, footer slots, and scroll events.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Scrollable body</h2>
			<p>Emulate an app content region with a fixed-height container.</p>
		</div>

		<div class="demo-panel">
			<div class="page-wrapper-demo">
				<PageWrapper
					bind:pageElm={wrapperElm}
					bind:contentElm
					bind:footerElm
					center={centerContent}
					wrapperStyle={`padding:${padding}; background:var(--color-surface-secondary,#f8fafc);`}
					contentStyle="gap:1.5rem;"
					on:scroll={handleScroll}
				>
					<div class="card">
						<h3>Weekly snapshot</h3>
						<p>Use PageWrapper as the main scroll container in dashboards or multi-pane layouts.</p>
					</div>
					<div class="card">
						<h3>Long form content</h3>
						<p>
							Because the wrapper emits a <code>scroll</code> event with offsets, you can sync headers,
							parallax effects, or infinite loaders.
						</p>
					</div>
					<div class="card">
						<h3>Footer slot</h3>
						<p>Optionally render an inline footer that sticks to the bottom of the wrapper.</p>
					</div>

					<svelte:fragment slot="footer">
						{#if footer}
							<div class="footer">
								<div>
									<h4>Need more space?</h4>
									<p>Combine with Drawer or SidebarWrapper for advanced layouts.</p>
								</div>
								<button type="button">Create report</button>
							</div>
						{/if}
					</svelte:fragment>
				</PageWrapper>
			</div>

			<div class="control-columns">
				<label>
					<span>Padding</span>
					<select bind:value={padding}>
						<option value="1rem">1rem</option>
						<option value="2rem">2rem</option>
						<option value="3rem">3rem</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={centerContent} />
					Center content vertically
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={footer} />
					Show footer slot
				</label>
			</div>

			<p class="selection-output">
				Scroll position: <strong>{scrollTop}px</strong>
			</p>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html pageWrapperSnippet}</code></pre>
			<ul class="key-points">
				<li>The root element handles overflow scrolling for you.</li>
				<li>Toggle <code>center</code> to vertically align content inside hero layouts.</li>
				<li>Bind <code>pageElm</code> or <code>contentElm</code> when you need DOM references.</li>
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

	.page-wrapper-demo {
		height: 360px;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid var(--color-border, #d1d5db);
		background: var(--color-surface, #fff);
	}

	.card {
		background: #fff;
		border-radius: 0.75rem;
		padding: 1.25rem;
		box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
	}

	.card h3 {
		margin: 0 0 0.5rem;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15, 23, 42, 0.1);
	}

	.footer button {
		background: #2563eb;
		color: #fff;
		border: none;
		border-radius: 0.5rem;
		padding: 0.6rem 1rem;
		cursor: pointer;
		font-weight: 600;
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
