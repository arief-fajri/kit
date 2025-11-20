<script lang="ts">
	import { Button, Accordion, InputText, Checkbox, Switch, SelectOption } from '@rief/kit';
	import type { ButtonVariant, ButtonSize, ButtonState, SelectOptionItem } from '@rief/kit';
	
	// Demo state
	let variant: SelectOptionItem | null = { value: 'filled', label: 'Filled' };
	let size: SelectOptionItem | null = { value: 'md', label: 'Medium' };
	let state: SelectOptionItem | null = { value: 'default', label: 'Default' };
	let disabled = false;
	let loading = false;
	let fullRounded = false;
	let label = 'Click me';
	let loadingMessage = 'Loading...';
	
	// Options for selects
	const variantOptions = [
		{ value: 'filled', label: 'Filled' },
		{ value: 'outlined', label: 'Outlined' },
		{ value: 'text', label: 'Text' },
		{ value: 'link', label: 'Link' }
	];
	
	const sizeOptions = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' },
		{ value: 'xl', label: 'Extra Large' }
	];
	
	const stateOptions = [
		{ value: 'default', label: 'Default' },
		{ value: 'active', label: 'Active' },
		{ value: 'selected', label: 'Selected' },
		{ value: 'highlight', label: 'Highlight' }
	];
	
	let clickCount = 0;
	
	// Computed values for component props
	$: buttonVariant = variant?.value as ButtonVariant || 'filled';
	$: buttonSize = size?.value as ButtonSize || 'md';
	$: buttonState = state?.value as ButtonState || 'default';
	
	function handleClick() {
		clickCount++;
	}
</script>

<svelte:head>
	<title>Button - Kit Documentation</title>
	<meta name="description" content="Button component documentation and examples" />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<h1>Button</h1>
		<p class="docs-description">
			A versatile button component with multiple variants, sizes, states, and loading support.
			Supports both button and anchor element rendering.
		</p>
	</header>

	<section class="demo-section">
		<h2>Interactive Demo</h2>
		<div class="demo-container">
			<div class="demo-preview">
				<Button 
					variant={buttonVariant}
					size={buttonSize}
					state={buttonState}
					{disabled}
					{loading}
					{fullRounded}
					{label}
					{loadingMessage}
					on:click={handleClick}
				/>
				{#if clickCount > 0}
					<p class="click-counter">Clicked {clickCount} times</p>
				{/if}
			</div>
			
			<div class="demo-controls">
				<h3>Controls</h3>
				<div class="controls-grid">
					<SelectOption
						label="Variant"
						options={variantOptions}
						bind:value={variant}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
						on:select={(e)=>{
							variant = e.detail.option
						}}
					/>
					
					<SelectOption
						label="Size"
						options={sizeOptions}
						bind:value={size}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
					/>
					
					<SelectOption
						label="State"
						options={stateOptions}
						bind:value={state}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Label"
						bind:value={label}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Loading Message"
						bind:value={loadingMessage}
						styling={{ variant: "outlined" }}
					/>
				</div>
				
				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled}>Disabled</Checkbox>
					<Checkbox bind:checked={loading}>Loading</Checkbox>
					<Checkbox bind:checked={fullRounded}>Full Rounded</Checkbox>
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>
		
		<Accordion 
			content={{
				title: "Variants",
				subtitle: "Different button styles",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Button variant="filled">Filled</Button>
				<Button variant="outlined">Outlined</Button>
				<Button variant="text">Text</Button>
				<Button variant="link">Link</Button>
			</div>
			<div class="code-block">
				<pre><code>&lt;Button variant="filled"&gt;Filled&lt;/Button&gt;
&lt;Button variant="outlined"&gt;Outlined&lt;/Button&gt;
&lt;Button variant="text"&gt;Text&lt;/Button&gt;
&lt;Button variant="link"&gt;Link&lt;/Button&gt;</code></pre>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Sizes",
				subtitle: "Different button sizes",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
				<Button size="xl">Extra Large</Button>
			</div>
			<div class="code-block">
				<pre><code>&lt;Button size="sm"&gt;Small&lt;/Button&gt;
&lt;Button size="md"&gt;Medium&lt;/Button&gt;
&lt;Button size="lg"&gt;Large&lt;/Button&gt;
&lt;Button size="xl"&gt;Extra Large&lt;/Button&gt;</code></pre>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "States",
				subtitle: "Different button states",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Button state="default">Default</Button>
				<Button state="active">Active</Button>
				<Button state="selected">Selected</Button>
				<Button state="highlight">Highlight</Button>
			</div>
			<div class="code-block">
				<pre><code>&lt;Button state="default"&gt;Default&lt;/Button&gt;
&lt;Button state="active"&gt;Active&lt;/Button&gt;
&lt;Button state="selected"&gt;Selected&lt;/Button&gt;
&lt;Button state="highlight"&gt;Highlight&lt;/Button&gt;</code></pre>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Loading State",
				subtitle: "Button with loading spinner",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Button loading={true}>Loading...</Button>
				<Button loading={true} loadingMessage="Processing">Custom Message</Button>
			</div>
			<div class="code-block">
				<pre><code>&lt;Button loading={true}&gt;Loading...&lt;/Button&gt;
&lt;Button loading={true} loadingMessage="Processing"&gt;Custom Message&lt;/Button&gt;</code></pre>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "As Link",
				subtitle: "Button rendered as anchor element",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-group">
				<Button href="/" variant="filled">Internal Link</Button>
				<Button href="https://example.com" variant="outlined">External Link</Button>
			</div>
			<div class="code-block">
				<pre><code>&lt;Button href="/" variant="filled"&gt;Internal Link&lt;/Button&gt;
&lt;Button href="https://example.com" variant="outlined"&gt;External Link&lt;/Button&gt;</code></pre>
			</div>
		</Accordion>
	</section>

	<section class="api-section">
		<h2>API Reference</h2>
		
		<Accordion 
			content={{
				title: "Props",
				subtitle: "All available button properties",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="api-table">
				<table>
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>variant</code></td>
							<td><code>'filled' | 'outlined' | 'text' | 'link'</code></td>
							<td><code>'filled'</code></td>
							<td>Button style variant</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
							<td><code>'md'</code></td>
							<td>Button size</td>
						</tr>
						<tr>
							<td><code>state</code></td>
							<td><code>'default' | 'active' | 'selected' | 'highlight'</code></td>
							<td><code>'default'</code></td>
							<td>Button state</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Button text content</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disabled state</td>
						</tr>
						<tr>
							<td><code>loading</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Loading/processing state</td>
						</tr>
						<tr>
							<td><code>loadingMessage</code></td>
							<td><code>string</code></td>
							<td><code>'Loading...'</code></td>
							<td>Loading message text</td>
						</tr>
						<tr>
							<td><code>fullRounded</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Fully rounded corners</td>
						</tr>
						<tr>
							<td><code>href</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Link URL (converts to anchor)</td>
						</tr>
						<tr>
							<td><code>target</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Link target attribute</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Events",
				subtitle: "Button events",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="api-table">
				<table>
					<thead>
						<tr>
							<th>Event</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>click</code></td>
							<td><code>MouseEvent</code></td>
							<td>Fired when button is clicked</td>
						</tr>
						<tr>
							<td><code>focus</code></td>
							<td><code>FocusEvent</code></td>
							<td>Fired when button receives focus</td>
						</tr>
						<tr>
							<td><code>blur</code></td>
							<td><code>FocusEvent</code></td>
							<td>Fired when button loses focus</td>
						</tr>
						<tr>
							<td><code>keydown</code></td>
							<td><code>KeyboardEvent</code></td>
							<td>Fired on key press</td>
						</tr>
					</tbody>
				</table>
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
	.examples-section,
	.api-section {
		margin-bottom: 3rem;
	}

	.demo-section h2,
	.examples-section h2,
	.api-section h2 {
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
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
		min-height: 200px;
	}

	.click-counter {
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
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
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 1.5rem;
		padding: 1.5rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
	}

	.code-block {
		background: #1f2937;
		color: #f9fafb;
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	.code-block pre {
		margin: 0;
		padding: 1.5rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.api-table {
		overflow-x: auto;
	}

	.api-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.api-table th,
	.api-table td {
		text-align: left;
		padding: 0.75rem;
		border-bottom: 1px solid var(--color-border, #e5e7eb);
	}

	.api-table th {
		font-weight: 600;
		color: var(--color-text, #1f2937);
		background: var(--color-surface-secondary, #f8fafc);
	}

	.api-table td {
		color: var(--color-text-secondary, #6b7280);
	}

	.api-table code {
		background: var(--color-surface-secondary, #f8fafc);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.8125rem;
		color: var(--color-text, #1f2937);
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

		.example-group {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>