<script lang="ts">
	import { Radiobox } from '@rief/kit';

	type Variant = 'default' | 'outlined' | 'filled';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

	const variantOptions: Variant[] = ['default', 'outlined', 'filled'];
	const sizeOptions: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const colorOptions: Color[] = ['primary', 'secondary', 'success', 'error', 'warning'];

	let selectedVariant: Variant = 'default';
	let selectedSize: Size = 'md';
	let selectedColor: Color = 'primary';
	let rtl = false;
	let disabled = false;
	let choice = 'ar';

	const languages = [
		{ id: 'en', label: 'English' },
		{ id: 'es', label: 'Spanish' },
		{ id: 'de', label: 'German' },
		{ id: 'fr', label: 'French' },
		{ id: 'ar', label: 'Arabic (RTL preview)' }
	];

	const radioboxSnippet = `&lt;script lang="ts"&gt;
  import { Radiobox } from '@rief/kit';
  let value = 'primary';
&lt;/script&gt;

&lt;Radiobox
  name="theme"
  label="Primary"
  color="primary"
  checked={value === 'primary'}
  on:change={() =&gt; value = 'primary'}
/&gt;`;
</script>

<svelte:head>
	<title>Radiobox - Kit Documentation</title>
	<meta name="description" content="Radiobox component demos, usage tips, and API highlights." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<div>
			<p class="eyebrow">Input Field</p>
			<h1>Radiobox</h1>
			<p class="lede">
				Accessible radio inputs with built-in theming, RTL awareness, and granular control over
				variant, size, and color.
			</p>
		</div>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<div>
				<h2>Interactive Playground</h2>
				<p>Switch variants, sizes, colors, and RTL mode to preview different combinations.</p>
			</div>
		</div>

		<div class="demo-panel">
			<div class="radio-grid" data-rtl={rtl}>
				{#each languages as lang}
					<Radiobox
						name="language"
						label={lang.label}
						variant={selectedVariant}
						size={selectedSize}
						color={selectedColor}
						{rtl}
						checked={choice === lang.id}
						disabled={disabled && lang.id !== 'en'}
						on:change={() => (choice = lang.id)}
					/>
				{/each}
			</div>

			<div class="control-columns">
				<label>
					<span>Variant</span>
					<select bind:value={selectedVariant}>
						{#each variantOptions as variant}
							<option value={variant}>{variant}</option>
						{/each}
					</select>
				</label>

				<label>
					<span>Size</span>
					<select bind:value={selectedSize}>
						{#each sizeOptions as size}
							<option value={size}>{size}</option>
						{/each}
					</select>
				</label>

				<label>
					<span>Accent Color</span>
					<select bind:value={selectedColor}>
						{#each colorOptions as color}
							<option value={color}>{color}</option>
						{/each}
					</select>
				</label>

				<div class="toggle-row">
					<label>
						<input type="checkbox" bind:checked={rtl} /> RTL layout
					</label>
					<label>
						<input type="checkbox" bind:checked={disabled} /> Disable others
					</label>
				</div>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
			<p>Quick copy-and-paste example for a radio group.</p>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html radioboxSnippet}</code></pre>
			<ul class="key-points">
				<li>Pass identical <code>name</code> props to keep radios grouped.</li>
				<li>
					Use the <code>variant</code>, <code>size</code>, and <code>color</code> props for built-in
					themes.
				</li>
				<li><code>rtl</code> mirrors both layout and spacing for right-to-left experiences.</li>
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

	.radio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.radio-grid[data-rtl='true'] {
		direction: rtl;
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
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--color-text-secondary, #6b7280);
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
		.radio-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
