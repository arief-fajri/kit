<script lang="ts">
	import { BaseLayoutWrapper } from '@rief/kit';

	let height = 420;
	let background = '#0f172a';
	let contentBackground = '#1f2937';
	let bodyPadding = '2rem';

	const baseLayoutSnippet = `&lt;BaseLayoutWrapper
  layoutStyle="--base-layout-bg: var(--color-surface);"
  bodyStyle="padding: 0;"
&gt;
  &lt;SidebarWrapper /&gt;
  &lt;PageWrapper /&gt;
&lt;/BaseLayoutWrapper&gt;`;
</script>

<svelte:head>
	<title>BaseLayoutWrapper - Kit Documentation</title>
	<meta name="description" content="BaseLayoutWrapper demo for anchoring apps to the viewport." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Wrappers</p>
		<h1>BaseLayoutWrapper</h1>
		<p class="lede">
			Fixed viewport wrapper that gives you a predictable canvas for shells, dashboards, or
			immersive experiences.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Viewport shell</h2>
			<p>Override layout styles to preview the wrapper in isolation.</p>
		</div>

		<div class="demo-panel">
			<BaseLayoutWrapper
				layoutClassName="base-layout-demo"
				layoutStyle={`position:relative; height:${height}px; width: 100%; border-radius:1rem; overflow:hidden; --base-layout-bg:${background};`}
				bodyStyle={`background:${contentBackground}; padding:${bodyPadding};`}
			>
				<div class="layout-columns">
					<div class="layout-sidebar">
						<p class="sidebar-title">Nav</p>
						<ul>
							<li>Overview</li>
							<li>Analytics</li>
							<li>Billing</li>
							<li>Settings</li>
						</ul>
					</div>
					<div class="layout-content">
						<h3>Base layout keeps the viewport locked</h3>
						<p>
							Everything inside stretches to the window size. Combine with <code
								>SidebarWrapper</code
							>
							and <code>PageWrapper</code> for full dashboards.
						</p>
					</div>
				</div>
			</BaseLayoutWrapper>

			<div class="control-columns">
				<label>
					<span>Height (px)</span>
					<input type="range" min="240" max="600" step="10" bind:value={height} />
				</label>

				<label>
					<span>Layout background</span>
					<input type="color" bind:value={background} />
				</label>

				<label>
					<span>Content background</span>
					<input type="color" bind:value={contentBackground} />
				</label>

				<label>
					<span>Body padding</span>
					<select bind:value={bodyPadding}>
						<option value="1rem">compact</option>
						<option value="2rem">comfortable</option>
						<option value="3rem">airy</option>
					</select>
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html baseLayoutSnippet}</code></pre>
			<ul class="key-points">
				<li>Inline <code>layoutStyle</code> overrides the fixed container styles.</li>
				<li>
					Use CSS vars like <code>--base-layout-bg</code> and
					<code>--base-layout-user-select</code>.
				</li>
				<li>Wrap sidebars, drawers, and page content once to avoid duplicated viewport logic.</li>
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

	.base-layout-demo {
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
	}

	.layout-columns {
		display: grid;
		grid-template-columns: 220px 1fr;
		height: 100%;
		color: #f3f4f6;
	}

	.layout-sidebar {
		background: rgba(255, 255, 255, 0.05);
		padding: 1rem;
	}

	.layout-sidebar ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.sidebar-title {
		margin: 0 0 1rem;
		font-weight: 600;
		color: #fef9c3;
	}

	.layout-content {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		justify-content: center;
	}

	.layout-content h3 {
		margin: 0;
		font-size: 1.4rem;
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

	input[type='color'],
	select,
	input[type='range'] {
		width: 100%;
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

	@media (max-width: 640px) {
		.layout-columns {
			grid-template-columns: 1fr;
		}
	}
</style>
