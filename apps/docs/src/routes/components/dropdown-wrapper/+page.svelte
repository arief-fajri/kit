<script lang="ts">
	import { DropdownWrapper } from '@rief/kit';

	type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto';
	type Variant = 'default' | 'minimal' | 'elevated' | 'outlined';
	type Size = 'sm' | 'md' | 'lg' | 'xl';

	let anchor: HTMLElement | null = null;
	let visible = false;
	let placement: Placement = 'bottom-start';
	let variant: Variant = 'elevated';
	let size: Size = 'md';
	let closeOnClickOutside = true;
	let closeOnEscape = true;

	const actions = [
		{ label: 'Duplicate', shortcut: '⌘D' },
		{ label: 'Archive', shortcut: '⌘⇧A' },
		{ label: 'Delete', shortcut: '⌘⌫' }
	];

	function toggleDropdown() {
		visible = !visible;
	}

	const dropdownSnippet = `&lt;DropdownWrapper
  visible={open}
  anchor={trigger}
  placement="bottom-start"
  on:close={() =&gt; (open = false)}
&gt;
  &lt;div class="menu"&gt;...&lt;/div&gt;
&lt;/DropdownWrapper&gt;`;
</script>

<svelte:head>
	<title>DropdownWrapper - Kit Documentation</title>
	<meta name="description" content="DropdownWrapper usage for anchored floating panels." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Wrappers</p>
		<h1>DropdownWrapper</h1>
		<p class="lede">
			Portal-powered utility that handles positioning, collision detection, and animations for any
			custom dropdown content.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Anchored menu</h2>
			<p>Pass any trigger node as the anchor reference.</p>
		</div>

		<div class="demo-panel">
			<button type="button" class="trigger-button" bind:this={anchor} on:click={toggleDropdown}>
				{visible ? 'Close dropdown' : 'Open dropdown'}
			</button>

			<DropdownWrapper
				{visible}
				{anchor}
				{placement}
				{variant}
				{size}
				{closeOnClickOutside}
				{closeOnEscape}
				on:close={() => (visible = false)}
			>
				<div class="dropdown-content">
					<header>
						<h3>Quick actions</h3>
						<p>Scoped to selected card</p>
					</header>
					<ul>
						{#each actions as action}
							<li>
								<span>{action.label}</span>
								<kbd>{action.shortcut}</kbd>
							</li>
						{/each}
					</ul>
				</div>
			</DropdownWrapper>

			<div class="control-columns">
				<label>
					<span>Placement</span>
					<select bind:value={placement}>
						<option value="bottom-start">bottom-start</option>
						<option value="bottom-end">bottom-end</option>
						<option value="top-start">top-start</option>
						<option value="top-end">top-end</option>
						<option value="auto">auto</option>
					</select>
				</label>

				<label>
					<span>Variant</span>
					<select bind:value={variant}>
						<option value="default">default</option>
						<option value="minimal">minimal</option>
						<option value="elevated">elevated</option>
						<option value="outlined">outlined</option>
					</select>
				</label>

				<label>
					<span>Size</span>
					<select bind:value={size}>
						<option value="sm">sm</option>
						<option value="md">md</option>
						<option value="lg">lg</option>
						<option value="xl">xl</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={closeOnClickOutside} />
					Close on outside click
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={closeOnEscape} />
					Close on Escape
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html dropdownSnippet}</code></pre>
			<ul class="key-points">
				<li>Bind a DOM node (button, input, etc.) to <code>anchor</code>.</li>
				<li><code>placement="auto"</code> flips the dropdown automatically.</li>
				<li>The slot can contain any markup—lists, forms, or custom menus.</li>
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
		position: relative;
		min-height: 280px;
	}

	.trigger-button {
		border: 1px solid var(--color-border, #d1d5db);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-weight: 600;
		background: var(--color-surface, #fff);
		color: var(--color-text, #0f172a);
		cursor: pointer;
	}

	.trigger-button:hover {
		background: var(--color-surface-secondary, #f8fafc);
	}

	.dropdown-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.dropdown-content header h3 {
		margin: 0;
		font-size: 1rem;
	}

	.dropdown-content header p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-text-secondary, #6b7280);
	}

	.dropdown-content ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.dropdown-content li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.95rem;
	}

	kbd {
		background: var(--color-surface-secondary, #f3f4f6);
		border-radius: 0.35rem;
		padding: 0.1rem 0.4rem;
		font-size: 0.75rem;
		font-family: 'Menlo', 'Monaco', 'SFMono-Regular', monospace;
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
