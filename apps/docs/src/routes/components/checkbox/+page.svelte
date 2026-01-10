<script lang="ts">
	import { Checkbox, Accordion, SelectOption } from '@rief/kit';
	import type { CheckboxVariant, CheckboxSize, SelectOptionItem } from '@rief/kit';

	// Demo state
	let checked = false;
	let variant: SelectOptionItem | null = { value: 'default', label: 'Default' };
	let size: SelectOptionItem | null = { value: 'md', label: 'Medium' };
	let disabled = false;
	let label = 'Accept terms and conditions';

	// Options
	const variantOptions = [
		{ value: 'default', label: 'Default' },
		{ value: 'primary', label: 'Primary' },
		{ value: 'success', label: 'Success' },
		{ value: 'error', label: 'Error' }
	];

	const sizeOptions = [
		{ value: 'xs', label: 'Extra Small' },
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' },
		{ value: 'xl', label: 'Extra Large' }
	];

	// Computed values for component props
	$: checkboxVariant = (variant?.value as CheckboxVariant) || 'default';
	$: checkboxSize = (size?.value as CheckboxSize) || 'md';

	// Multiple checkboxes example
	let preferences = {
		newsletter: false,
		notifications: true,
		marketing: false,
		updates: true
	};
</script>

<svelte:head>
	<title>Checkbox - Kit Documentation</title>
	<meta name="description" content="Checkbox component documentation and examples" />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<h1>Checkbox</h1>
		<p class="docs-description">
			A flexible checkbox component with multiple variants, sizes, and states. Perfect for forms,
			settings, and any binary choice interfaces.
		</p>
	</header>

	<section class="demo-section">
		<h2>Interactive Demo</h2>
		<div class="demo-container">
			<div class="demo-preview">
				<Checkbox bind:checked variant={checkboxVariant} size={checkboxSize} {disabled}>
					{label}
				</Checkbox>
				<p class="demo-value">
					Status: <code>{checked ? 'Checked' : 'Unchecked'}</code>
				</p>
			</div>

			<div class="demo-controls">
				<h3>Controls</h3>
				<div class="controls-grid">
					<SelectOption
						label="Variant"
						options={variantOptions}
						bind:value={variant}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: 'outlined' }}
					/>

					<SelectOption
						label="Size"
						options={sizeOptions}
						bind:value={size}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: 'outlined' }}
					/>
				</div>

				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled}>Disabled</Checkbox>
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>

		<Accordion
			content={{
				title: 'Variants',
				subtitle: 'Different checkbox styles',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Checkbox variant="default" checked={true}>Default Variant</Checkbox>
				<Checkbox variant="primary" checked={true}>Primary Variant</Checkbox>
				<Checkbox variant="success" checked={true}>Success Variant</Checkbox>
				<Checkbox variant="error" checked={true}>Error Variant</Checkbox>
			</div>
		</Accordion>

		<Accordion
			content={{
				title: 'Sizes',
				subtitle: 'Different checkbox sizes',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Checkbox size="sm" checked={true}>Small</Checkbox>
				<Checkbox size="md" checked={true}>Medium</Checkbox>
				<Checkbox size="lg" checked={true}>Large</Checkbox>
			</div>
		</Accordion>

		<Accordion
			content={{
				title: 'States',
				subtitle: 'Different checkbox states',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Checkbox checked={false}>Unchecked</Checkbox>
				<Checkbox checked={true}>Checked</Checkbox>
				<Checkbox checked={false} disabled={true}>Disabled Unchecked</Checkbox>
				<Checkbox checked={true} disabled={true}>Disabled Checked</Checkbox>
			</div>
		</Accordion>

		<Accordion
			content={{
				title: 'Form Example',
				subtitle: 'Multiple checkboxes in a form',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<div class="form-example">
				<h4>Notification Preferences</h4>
				<div class="checkbox-list">
					<Checkbox bind:checked={preferences.newsletter}>Email Newsletter</Checkbox>
					<Checkbox bind:checked={preferences.notifications}>Push Notifications</Checkbox>
					<Checkbox bind:checked={preferences.marketing}>Marketing Communications</Checkbox>
					<Checkbox bind:checked={preferences.updates}>Product Updates</Checkbox>
				</div>

				<div class="preferences-output">
					<h5>Current Preferences:</h5>
					<pre><code>{JSON.stringify(preferences, null, 2)}</code></pre>
				</div>
			</div>
		</Accordion>
	</section>
</div>

<style>
	.component-docs {
		max-width: 1000px;
		margin: 0 auto;
	}

	.docs-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border, #e5e7eb);
	}

	.docs-header h1 {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.docs-description {
		font-size: 1.25rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
		line-height: 1.6;
	}

	.demo-section,
	.examples-section {
		margin-bottom: 3rem;
	}

	.demo-section h2,
	.examples-section h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.demo-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 2rem;
	}

	.demo-preview {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
		min-height: 200px;
		justify-content: center;
		align-items: center;
	}

	.demo-value {
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
	}

	.demo-value code {
		background: var(--color-surface, #ffffff);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.demo-controls h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1.5rem;
		color: var(--color-text, #1f2937);
	}

	.controls-grid {
		display: grid;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.checkbox-controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.example-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1.5rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
	}

	.form-example {
		padding: 1.5rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.form-example h4 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.checkbox-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.preferences-output h5 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--color-text, #1f2937);
	}

	.preferences-output pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.docs-header h1 {
			font-size: 2.5rem;
		}

		.demo-container {
			grid-template-columns: 1fr;
		}

		.demo-preview {
			min-height: 150px;
		}
	}
</style>
