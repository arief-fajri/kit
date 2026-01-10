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
	$: buttonVariant = (variant?.value as ButtonVariant) || 'filled';
	$: buttonSize = (size?.value as ButtonSize) || 'md';
	$: buttonState = (state?.value as ButtonState) || 'default';

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
						styling={{ variant: 'outlined' }}
						on:select={(e) => {
							variant = e.detail.option;
						}}
					/>

					<SelectOption
						label="Size"
						options={sizeOptions}
						bind:value={size}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: 'outlined' }}
					/>

					<SelectOption
						label="State"
						options={stateOptions}
						bind:value={state}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: 'outlined' }}
					/>

					<InputText label="Label" bind:value={label} styling={{ variant: 'outlined' }} />

					<InputText
						label="Loading Message"
						bind:value={loadingMessage}
						styling={{ variant: 'outlined' }}
					/>
				</div>

				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled} label="Disabled" />
					<Checkbox bind:checked={loading} label="Loading" />
					<Checkbox bind:checked={fullRounded} label="Full Rounded" />
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>

		<Accordion
			content={{
				title: 'Variants',
				subtitle: 'Different button styles',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button variant="filled">Filled</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="text">Text</Button>
					<Button variant="link">Link</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button variant="filled"&gt;Filled&lt;/Button&gt;
&lt;Button variant="outlined"&gt;Outlined&lt;/Button&gt;
&lt;Button variant="text"&gt;Text&lt;/Button&gt;
&lt;Button variant="link"&gt;Link&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Sizes',
				subtitle: 'Different button sizes',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
					<Button size="xl">Extra Large</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button size="sm"&gt;Small&lt;/Button&gt;
&lt;Button size="md"&gt;Medium&lt;/Button&gt;
&lt;Button size="lg"&gt;Large&lt;/Button&gt;
&lt;Button size="xl"&gt;Extra Large&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'States',
				subtitle: 'Different button states',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button state="default">Default</Button>
					<Button state="active">Active</Button>
					<Button state="selected">Selected</Button>
					<Button state="highlight">Highlight</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button state="default"&gt;Default&lt;/Button&gt;
&lt;Button state="active"&gt;Active&lt;/Button&gt;
&lt;Button state="selected"&gt;Selected&lt;/Button&gt;
&lt;Button state="highlight"&gt;Highlight&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Loading State',
				subtitle: 'Button with loading spinner',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button loading={true}>Loading...</Button>
					<Button loading={true} loadingMessage="Processing">Custom Message</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button loading={true}&gt;Loading...&lt;/Button&gt;
&lt;Button loading={true} loadingMessage="Processing"&gt;Custom Message&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'As Link',
				subtitle: 'Button rendered as anchor element',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button href="/" variant="filled">Internal Link</Button>
					<Button href="https://example.com" variant="outlined">External Link</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button href="/" variant="filled"&gt;Internal Link&lt;/Button&gt;
&lt;Button href="https://example.com" variant="outlined"&gt;External Link&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Disabled State',
				subtitle: 'Disabled buttons',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button disabled={true} variant="filled">Disabled Filled</Button>
					<Button disabled={true} variant="outlined">Disabled Outlined</Button>
					<Button disabled={true} variant="text">Disabled Text</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button disabled={true} variant="filled"&gt;Disabled Filled&lt;/Button&gt;
&lt;Button disabled={true} variant="outlined"&gt;Disabled Outlined&lt;/Button&gt;
&lt;Button disabled={true} variant="text"&gt;Disabled Text&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Full Rounded',
				subtitle: 'Buttons with fully rounded corners',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button fullRounded={true} variant="filled">Fully Rounded</Button>
					<Button fullRounded={true} variant="outlined">Fully Rounded</Button>
					<Button fullRounded={true} variant="text">Fully Rounded</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button fullRounded={true} variant="filled"&gt;Fully Rounded&lt;/Button&gt;
&lt;Button fullRounded={true} variant="outlined"&gt;Fully Rounded&lt;/Button&gt;
&lt;Button fullRounded={true} variant="text"&gt;Fully Rounded&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Icons',
				subtitle: 'Buttons with icons',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button iconPosition="left" variant="filled">
						<span slot="icon">💾</span>
						Save
					</Button>
					<Button iconPosition="right" variant="outlined">
						Next
						<span slot="icon">→</span>
					</Button>
					<Button iconPosition="only" variant="filled" ariaLabel="Close">
						<span slot="icon">✕</span>
					</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button iconPosition="left" variant="filled"&gt;
  &lt;span slot="icon"&gt;💾&lt;/span&gt;
  Save
&lt;/Button&gt;

&lt;Button iconPosition="right" variant="outlined"&gt;
  Next
  &lt;span slot="icon"&gt;→&lt;/span&gt;
&lt;/Button&gt;

&lt;Button iconPosition="only" variant="filled" ariaLabel="Close"&gt;
  &lt;span slot="icon"&gt;✕&lt;/span&gt;
&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Custom Colors',
				subtitle: 'Buttons with custom color overrides',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button fillColor="#ff6b6b" textColor="#ffffff" variant="filled">Custom Colors</Button>
					<Button outlineColor="#3b82f6" textColor="#3b82f6" variant="outlined">
						Custom Outline
					</Button>
					<Button textColor="#10b981" variant="text">Custom Text Color</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button 
  fillColor="#ff6b6b" 
  textColor="#ffffff" 
  variant="filled"
&gt;
  Custom Colors
&lt;/Button&gt;

&lt;Button 
  outlineColor="#3b82f6" 
  textColor="#3b82f6" 
  variant="outlined"
&gt;
  Custom Outline
&lt;/Button&gt;

&lt;Button 
  textColor="#10b981" 
  variant="text"
&gt;
  Custom Text Color
&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>
	</section>

	<section class="advanced-section">
		<h2>Advanced Usage</h2>

		<Accordion
			content={{
				title: 'Dynamic Content',
				subtitle: 'Buttons with dynamic content and icons',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button variant="filled">
						<span slot="icon">↑</span>
						Expand
					</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;Button on:click=&#123;toggle&#125;&gt;
  &lt;span slot="icon"&gt;
    &#123;#if expanded&#125;
      &lt;ChevronUpIcon /&gt;
    &#123;:else&#125;
      &lt;ChevronDownIcon /&gt;
    &#123;/if&#125;
  &lt;/span&gt;
  &#123;expanded ? 'Collapse' : 'Expand'&#125;
&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Conditional Rendering',
				subtitle: 'Buttons with conditional props',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button variant="filled" disabled={false}>Primary Action</Button>
					<Button variant="outlined" disabled={true}>Secondary Action</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;script&gt;
  let isPrimary = true;
  let currentState = 'default';
  let isValid = true;
  let isEditing = false;
&lt;/script&gt;

&lt;Button 
  variant=&#123;isPrimary ? 'filled' : 'outlined'&#125;
  state=&#123;currentState&#125;
  disabled=&#123;isValid === false&#125;
  label=&#123;isEditing ? 'Save' : 'Edit'&#125;
/&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Form Integration',
				subtitle: 'Using buttons in forms',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button variant="filled" type="submit">Submit Form</Button>
					<Button variant="outlined" type="button">Cancel</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;script&gt;
  let submitting = false;
  let isFormValid = true;
&lt;/script&gt;

&lt;form on:submit|preventDefault=&#123;handleSubmit&#125;&gt;
  &lt;Button 
    type="submit"
    label="Submit Form"
    loading=&#123;submitting&#125;
    disabled=&#123;isFormValid === false&#125;
  /&gt;
&lt;/form&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Accessibility',
				subtitle: 'Accessible button examples',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<Button iconPosition="only" ariaLabel="Delete item" variant="filled">
						<span slot="icon">🗑️</span>
					</Button>
					<Button ariaLabel="Save document" variant="outlined">Save</Button>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;!-- Accessible icon-only button --&gt;
&lt;Button 
  iconPosition="only" 
  ariaLabel="Delete item"
  on:click=&#123;deleteItem&#125;
&gt;
  &lt;TrashIcon slot="icon" /&gt;
&lt;/Button&gt;

&lt;!-- Button with descriptive label --&gt;
&lt;Button 
  ariaLabel="Save document"
  on:click=&#123;saveDocument&#125;
&gt;
  Save
&lt;/Button&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>
	</section>

	<section class="api-section">
		<h2>API Reference</h2>

		<Accordion
			content={{
				title: 'Props',
				subtitle: 'All available button properties',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
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
							<tr>
								<td><code>rel</code></td>
								<td><code>string</code></td>
								<td><code>undefined</code></td>
								<td>Link rel attribute (auto-set for external links)</td>
							</tr>
							<tr>
								<td><code>iconPosition</code></td>
								<td><code>'left' | 'right' | 'only'</code></td>
								<td><code>'left'</code></td>
								<td>Icon placement position</td>
							</tr>
							<tr>
								<td><code>fillColor</code></td>
								<td><code>string</code></td>
								<td><code>undefined</code></td>
								<td>Custom background color override</td>
							</tr>
							<tr>
								<td><code>textColor</code></td>
								<td><code>string</code></td>
								<td><code>undefined</code></td>
								<td>Custom text color override</td>
							</tr>
							<tr>
								<td><code>outlineColor</code></td>
								<td><code>string</code></td>
								<td><code>undefined</code></td>
								<td>Custom border color override</td>
							</tr>
							<tr>
								<td><code>ariaLabel</code></td>
								<td><code>string</code></td>
								<td><code>undefined</code></td>
								<td>Accessibility label for screen readers</td>
							</tr>
							<tr>
								<td><code>stopPropagation</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Stop event propagation on click</td>
							</tr>
							<tr>
								<td><code>className</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Additional CSS classes</td>
							</tr>
						</tbody>
					</table>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Events',
				subtitle: 'Button events',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
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
							<tr>
								<td><code>dragstart</code></td>
								<td><code>&#123; event: DragEvent &#125;</code></td>
								<td>Fired when drag operation starts</td>
							</tr>
						</tbody>
					</table>
				</div>
			</svelte:fragment>
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
	.advanced-section,
	.api-section {
		margin-bottom: 3rem;
	}

	.demo-section h2,
	.examples-section h2,
	.advanced-section h2,
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
