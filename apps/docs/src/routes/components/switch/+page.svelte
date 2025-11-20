<script lang="ts">
	import { Switch } from '@rief/kit';

	type Variant = 'default' | 'primary' | 'success' | 'error' | 'warning';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	let selectedVariant: Variant = 'primary';
	let selectedSize: Size = 'md';
	let disabled = false;

	const preferenceOrder = ['email', 'sms', 'push'] as const;
	type PreferenceKey = (typeof preferenceOrder)[number];

	let preferences: Record<PreferenceKey, boolean> = {
		email: true,
		sms: false,
		push: true
	};

	const preferenceLabels: Record<PreferenceKey, string> = {
		email: 'EMAIL',
		sms: 'SMS',
		push: 'PUSH'
	};

	function togglePreference(key: PreferenceKey) {
		if (disabled) return;
		preferences = { ...preferences, [key]: !preferences[key] };
	}

	const switchSnippet = `&lt;script lang="ts"&gt;
  import { Switch } from '@rief/kit';
  let marketing = false;
&lt;/script&gt;

&lt;Switch
  label="Marketing emails"
  variant="success"
  size="lg"
  bind:checked={marketing}
/&gt;`;
</script>

<svelte:head>
	<title>Switch - Kit Documentation</title>
	<meta name="description" content="Switch component demos, usage tips, and API highlights." />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<div>
			<p class="eyebrow">Input Field</p>
			<h1>Switch</h1>
			<p class="lede">
				Animated, accessible toggle built on a semantic checkbox. Supports five sizes, semantic
				variants, custom labels, and controlled state out of the box.
			</p>
		</div>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Notification Preferences</h2>
			<p>Use the controls to change the size, variant, or disable the entire group.</p>
		</div>

		<div class="demo-panel">
			<div class="switch-stack">
				{#each preferenceOrder as key}
					<button type="button" class="switch-row" on:click={() => togglePreference(key)}>
						<Switch
							label={preferenceLabels[key]}
							size={selectedSize}
							variant={selectedVariant}
							checked={preferences[key]}
							{disabled}
							stopPropagation={true}
						/>
						<span class="status">{preferences[key] ? 'Enabled' : 'Muted'}</span>
					</button>
				{/each}
			</div>

			<div class="control-columns">
				<label>
					<span>Variant</span>
					<select bind:value={selectedVariant}>
						<option value="default">default</option>
						<option value="primary">primary</option>
						<option value="success">success</option>
						<option value="error">error</option>
						<option value="warning">warning</option>
					</select>
				</label>

				<label>
					<span>Size</span>
					<select bind:value={selectedSize}>
						<option value="xs">xs</option>
						<option value="sm">sm</option>
						<option value="md">md</option>
						<option value="lg">lg</option>
						<option value="xl">xl</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={disabled} />
					<span>Disable all switches</span>
				</label>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
			<p>Switch exposes change, focus, and blur events for controlled forms.</p>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html switchSnippet}</code></pre>
			<ul class="key-points">
				<li>Every instance is a native checkbox under the hood for accessibility.</li>
				<li>Use <code>stopPropagation</code> when nesting switches inside clickable containers.</li>
				<li>Bind to <code>checked</code> for fully controlled components.</li>
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

	.switch-stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.switch-row {
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--color-surface-secondary, #f8fafc);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.switch-row:focus-visible {
		outline: 2px solid var(--color-primary, #2563eb);
		outline-offset: 2px;
	}

	.switch-row:disabled {
		cursor: not-allowed;
	}

	.status {
		font-size: 0.9rem;
		color: var(--color-text-secondary, #6b7280);
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
