<script lang="ts">
	import { SelectOption } from '@rief/kit';
	import type { SelectOptionItem } from '@rief/kit';

	const frameworks: SelectOptionItem[] = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'kit', label: 'SvelteKit' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'solid', label: 'Solid' }
	];

	const roles: SelectOptionItem[] = [
		{ value: 'design', label: 'Design Systems' },
		{ value: 'frontend', label: 'Frontend' },
		{ value: 'backend', label: 'Backend' },
		{ value: 'qa', label: 'QA Automation' },
		{ value: 'pm', label: 'Product' }
	];

	let favorite: SelectOptionItem | null = frameworks[0];
	let contributors: SelectOptionItem[] = [roles[0], roles[1]];

	let searchable = true;
	let closeOnSelect = true;
	let multiClose = false;

	type SelectUpdateEvent = CustomEvent<SelectOptionItem | SelectOptionItem[] | null>;

	function handleFavorite(event: SelectUpdateEvent) {
		const detail = event.detail;
		favorite = Array.isArray(detail) ? (detail[0] ?? null) : detail;
	}

	function handleContributors(event: SelectUpdateEvent) {
		const detail = event.detail;
		contributors = Array.isArray(detail) ? detail : detail ? [detail] : [];
	}

	const selectOptionSnippet = `&lt;SelectOption
  label="Status"
  options={[{ value: 'todo', label: 'To do' }, { value: 'done', label: 'Done' }]}
  behavior={{ isSearchable: true, closeOnSelect: true }}
  styling={{ variant: 'outlined' }}
  on:update={(event) =&gt; status = event.detail}
/&gt;`;
</script>

<svelte:head>
	<title>SelectOption - Kit Documentation</title>
	<meta
		name="description"
		content="SelectOption component demos, usage patterns, and API overview."
	/>
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Input Field</p>
		<h1>SelectOption</h1>
		<p class="lede">
			A fully featured select with optional search, multi-selection, async-friendly filtering, and a
			keyboard-first UX powered by `DropdownWrapper`.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Single Select</h2>
			<p>Searchable dropdown with smart positioning and accessible keyboard navigation.</p>
		</div>

		<div class="demo-panel">
			<SelectOption
				label="Favorite Framework"
				options={frameworks}
				value={favorite}
				on:update={handleFavorite}
				behavior={{ isSearchable: searchable, closeOnSelect, placeholder: 'Pick one' }}
				styling={{ variant: 'outlined' }}
			/>

			<div class="control-columns">
				<label>
					<span>Searchable</span>
					<input type="checkbox" bind:checked={searchable} />
				</label>
				<label>
					<span>Close on select</span>
					<input type="checkbox" bind:checked={closeOnSelect} />
				</label>
			</div>

			<p class="selection-output">
				Selected:
				<strong>{favorite ? favorite.label : 'none'}</strong>
			</p>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Multi Select</h2>
			<p>Use <code>behavior.isMultiOption</code> to toggle chips and multiple value support.</p>
		</div>

		<div class="demo-panel">
			<SelectOption
				label="Project Contributors"
				options={roles}
				value={contributors}
				on:update={handleContributors}
				behavior={{
					isMultiOption: true,
					isSearchable: true,
					closeOnSelect: multiClose,
					placeholder: 'Add roles'
				}}
				styling={{ variant: 'filled' }}
			/>

			<label class="toggle-row">
				<input type="checkbox" bind:checked={multiClose} />
				<span>Close dropdown after each pick</span>
			</label>

			<div class="chip-row">
				{#if contributors.length > 0}
					{#each contributors as role (role.value)}
						<span class="chip">{role.label}</span>
					{/each}
				{:else}
					<span class="chip chip--muted">No roles selected</span>
				{/if}
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html selectOptionSnippet}</code></pre>
			<ul class="key-points">
				<li><code>behavior.isMultiOption</code> toggles between single and multiple selection.</li>
				<li>Listen to the <code>update</code> event to keep local state in sync.</li>
				<li>
					Use <code>styling.variant</code> and <code>styling.size</code> to match form density.
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

	input[type='checkbox'] {
		width: 1rem;
		height: 1rem;
	}

	.selection-output {
		margin: 0;
		color: var(--color-text-secondary, #4b5563);
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
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

	.chip--muted {
		color: var(--color-text-secondary, #9ca3af);
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
