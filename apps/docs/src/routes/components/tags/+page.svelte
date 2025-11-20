<script lang="ts">
	import { Tags } from '@rief/kit';

	let techTags: (string | Record<string, any>)[] = ['Design tokens', 'SvelteKit'];
	let peopleTags: (string | Record<string, any>)[] = ['@monica', '@dave'];

	let placeholder = 'Add a tag…';
	let onlyUnique = true;
	let allowPaste = true;
	let allowDrop = false;
	let maxTags: number | false = 5;
	let numberOnly = false;
	let allowDecimal = false;

	function handleTags(event: CustomEvent<{ tags: (string | Record<string, any>)[] }>) {
		techTags = event.detail.tags;
	}

	const tagsSnippet = `&lt;Tags
  bind:tags={categories}
  placeholder="Add categories"
  maxTags={6}
  onlyUnique
  allowPaste
/&gt;`;
</script>

<svelte:head>
	<title>Tags - Kit Documentation</title>
	<meta
		name="description"
		content="Tags input demonstrations with validation and autocomplete-friendly props."
	/>
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Input Field</p>
		<h1>Tags</h1>
		<p class="lede">
			Keyboard-friendly tag entry with paste/drop support, validation, and autocomplete hooks. Great
			for chips, mentions, or categorizing content.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Interactive Tags</h2>
			<p>Toggle validation props and behaviors to fit your form.</p>
		</div>

		<div class="demo-panel">
			<Tags
				bind:tags={techTags}
				{placeholder}
				{onlyUnique}
				{allowPaste}
				{allowDrop}
				{maxTags}
				{numberOnly}
				{allowDecimal}
				label="Project keywords"
				required={true}
			/>

			<div class="control-grid">
				<label>
					<span>Placeholder</span>
					<input type="text" bind:value={placeholder} />
				</label>

				<label>
					<span>Max tags (blank = unlimited)</span>
					<input
						type="number"
						min="0"
						placeholder="5"
						on:input={(event) => {
							const next = Number(event.currentTarget?.value);
							maxTags = Number.isNaN(next) || next <= 0 ? false : next;
						}}
					/>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={onlyUnique} />
					<span>Only allow unique values</span>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={allowPaste} />
					<span>Allow CSV paste</span>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={allowDrop} />
					<span>Allow drag &amp; drop</span>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={numberOnly} />
					<span>Number-only</span>
				</label>

				{#if numberOnly}
					<label class="toggle-row">
						<input type="checkbox" bind:checked={allowDecimal} />
						<span>Allow decimals</span>
					</label>
				{/if}
			</div>

			<p class="selection-output">
				Tags: {techTags.length > 0
					? techTags.map((tag) => (typeof tag === 'string' ? tag : tag.name)).join(', ')
					: 'none'}
			</p>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Mention Style</h2>
			<p>Use slot content to brand the input and respond to the <code>tags</code> event.</p>
		</div>

		<div class="demo-panel">
			<Tags
				bind:tags={peopleTags}
				placeholder="Type @ to mention teammates"
				label="@mentions"
				allowPaste={false}
				on:tags={handleTags}
			>
				<span slot="label">Team mentions</span>
			</Tags>

			<div class="chip-row">
				{#each peopleTags as tag (typeof tag === 'string' ? tag : tag.name)}
					<span class="chip">{typeof tag === 'string' ? tag : tag.name}</span>
				{/each}
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html tagsSnippet}</code></pre>
			<ul class="key-points">
				<li>Two-way bind <code>tags</code> for instant updates.</li>
				<li><code>maxTags</code> accepts a number or <code>false</code> for unlimited.</li>
				<li>
					Listen to <code>tags</code>, <code>input</code>, or <code>focus</code> events when you need
					analytics.
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

	.control-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	label span {
		display: block;
		font-size: 0.85rem;
		margin-bottom: 0.35rem;
		color: var(--color-text-secondary, #6b7280);
	}

	input[type='text'],
	input[type='number'] {
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #d1d5db);
		width: 100%;
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

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		background: var(--color-surface-secondary, #f5f5f5);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		font-size: 0.85rem;
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
