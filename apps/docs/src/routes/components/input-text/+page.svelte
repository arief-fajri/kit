<script lang="ts">
	import { InputText, Accordion, SelectOption, Checkbox } from '@rief/kit';
	import type {
		InputTextStyling,
		InputTextValidation,
		InputTextBehavior,
		InputType,
		SelectOptionItem
	} from '@rief/kit';

	// Demo state
	let variant: SelectOptionItem | null = { value: 'default', label: 'Default' };
	let size: SelectOptionItem | null = { value: 'md', label: 'Medium' };
	let type: SelectOptionItem | null = { value: 'text', label: 'Text' };
	let demoValue = '';
	let placeholder = 'Enter text here';
	let label = 'Input Label';
	let disabled = false;
	let readonly = false;
	let required = false;
	let isError = false;
	let errorMessage = '';
	let clearable = false;
	let showMaxLength = false;
	let maxLength = 50;

	// Options for selects
	const variantOptions = [
		{ value: 'default', label: 'Default' },
		{ value: 'filled', label: 'Filled' },
		{ value: 'outlined', label: 'Outlined' }
	];

	const sizeOptions = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	const typeOptions = [
		{ value: 'text', label: 'Text' },
		{ value: 'email', label: 'Email' },
		{ value: 'password', label: 'Password' },
		{ value: 'number', label: 'Number' },
		{ value: 'tel', label: 'Tel' },
		{ value: 'url', label: 'URL' },
		{ value: 'search', label: 'Search' }
	];

	// Computed values for component props
	$: inputVariant = (variant?.value as InputTextStyling['variant']) || 'default';
	$: inputSize = (size?.value as InputTextStyling['size']) || 'md';
	$: inputType = (type?.value as InputType) || 'text';

	$: computedStyling = {
		variant: inputVariant,
		size: inputSize
	} as InputTextStyling;

	$: computedValidation = {
		required,
		isError,
		errorMessage: errorMessage || undefined,
		maxLength: showMaxLength ? maxLength : null,
		showMaxLengthCounter: showMaxLength
	} as InputTextValidation;

	$: computedBehavior = {
		disabled,
		readonly,
		clearable
	} as InputTextBehavior;

	function handleInput(e: CustomEvent<string>) {
		demoValue = e.detail;
		// Simple validation example
		if (inputType === 'email' && demoValue) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			isError = !emailRegex.test(demoValue);
			errorMessage = isError ? 'Please enter a valid email address' : '';
		} else {
			isError = false;
			errorMessage = '';
		}
	}
</script>

<svelte:head>
	<title>InputText - Kit Documentation</title>
	<meta name="description" content="InputText component documentation and examples" />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<h1>InputText</h1>
		<p class="docs-description">
			A comprehensive and accessible text input component with advanced features including masking,
			validation, formatting, and extensive customization options.
		</p>
	</header>

	<section class="demo-section">
		<h2>Interactive Demo</h2>
		<div class="demo-container">
			<div class="demo-preview">
				<InputText
					type={inputType}
					bind:value={demoValue}
					{placeholder}
					{label}
					styling={computedStyling}
					validation={computedValidation}
					behavior={computedBehavior}
					on:input={handleInput}
				/>
				{#if demoValue}
					<p class="value-display">Current value: <code>{demoValue}</code></p>
				{/if}
			</div>

			<div class="demo-controls">
				<h3>Controls</h3>
				<div class="controls-grid">
					<InputText label="Label" bind:value={label} styling={{ variant: 'outlined' }} />
					<InputText
						label="Placeholder"
						bind:value={placeholder}
						styling={{ variant: 'outlined' }}
					/>

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

					<SelectOption
						label="Type"
						options={typeOptions}
						bind:value={type}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: 'outlined' }}
					/>
				</div>

				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled} label="Disabled" />
					<Checkbox bind:checked={readonly} label="Readonly" />
					<Checkbox bind:checked={required} label="Required" />
					<Checkbox bind:checked={clearable} label="Clearable" />
					<Checkbox bind:checked={showMaxLength} label="Show Max Length" />
					{#if showMaxLength}
						<InputText
							type="number"
							label="Max Length"
							bind:value={maxLength}
							styling={{ variant: 'outlined', size: 'sm' }}
						/>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>

		<Accordion
			content={{
				title: 'Variants',
				subtitle: 'Different input styles',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText
						label="Default"
						placeholder="Default variant"
						styling={{ variant: 'default' }}
					/>
					<InputText label="Filled" placeholder="Filled variant" styling={{ variant: 'filled' }} />
					<InputText
						label="Outlined"
						placeholder="Outlined variant"
						styling={{ variant: 'outlined' }}
					/>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText 
  label="Default" 
  placeholder="Default variant" 
  styling=&#123;&#123; variant: 'default' &#125;&#125; 
/&gt;

&lt;InputText 
  label="Filled" 
  placeholder="Filled variant" 
  styling=&#123;&#123; variant: 'filled' &#125;&#125; 
/&gt;

&lt;InputText 
  label="Outlined" 
  placeholder="Outlined variant" 
  styling=&#123;&#123; variant: 'outlined' &#125;&#125; 
/&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Sizes',
				subtitle: 'Different input sizes',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText label="Small" placeholder="Small size" styling={{ size: 'sm' }} />
					<InputText label="Medium" placeholder="Medium size" styling={{ size: 'md' }} />
					<InputText label="Large" placeholder="Large size" styling={{ size: 'lg' }} />
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText 
  label="Small" 
  placeholder="Small size" 
  styling=&#123;&#123; size: 'sm' &#125;&#125; 
/&gt;

&lt;InputText 
  label="Medium" 
  placeholder="Medium size" 
  styling=&#123;&#123; size: 'md' &#125;&#125; 
/&gt;

&lt;InputText 
  label="Large" 
  placeholder="Large size" 
  styling=&#123;&#123; size: 'lg' &#125;&#125; 
/&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Input Types',
				subtitle: 'Different input types',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText type="text" label="Text" placeholder="Enter text" />
					<InputText type="email" label="Email" placeholder="user@example.com" />
					<InputText type="password" label="Password" placeholder="Enter password" />
					<InputText type="number" label="Number" placeholder="0.00" />
					<InputText type="tel" label="Phone" placeholder="(555) 123-4567" />
					<InputText type="url" label="URL" placeholder="https://example.com" />
					<InputText type="search" label="Search" placeholder="Search..." />
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText type="text" label="Text" placeholder="Enter text" /&gt;
&lt;InputText type="email" label="Email" placeholder="user@example.com" /&gt;
&lt;InputText type="password" label="Password" placeholder="Enter password" /&gt;
&lt;InputText type="number" label="Number" placeholder="0.00" /&gt;
&lt;InputText type="tel" label="Phone" placeholder="(555) 123-4567" /&gt;
&lt;InputText type="url" label="URL" placeholder="https://example.com" /&gt;
&lt;InputText type="search" label="Search" placeholder="Search..." /&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Validation',
				subtitle: 'Input validation and error states',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText
						label="Required Field"
						placeholder="This field is required"
						validation={{ required: true }}
					/>
					<InputText
						label="With Error"
						placeholder="Invalid input"
						validation={{ isError: true, errorMessage: 'This field has an error' }}
					/>
					<InputText
						label="Max Length"
						placeholder="Max 20 characters"
						validation={{ maxLength: 20, showMaxLengthCounter: true }}
					/>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText
  label="Required Field"
  placeholder="This field is required"
  validation=&#123;&#123; required: true &#125;&#125;
/&gt;

&lt;InputText
  label="With Error"
  placeholder="Invalid input"
  validation=&#123;&#123; 
    isError: true, 
    errorMessage: 'This field has an error' 
  &#125;&#125;
/&gt;

&lt;InputText
  label="Max Length"
  placeholder="Max 20 characters"
  validation=&#123;&#123; 
    maxLength: 20, 
    showMaxLengthCounter: true 
  &#125;&#125;
/&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'States',
				subtitle: 'Disabled and readonly states',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText
						label="Disabled"
						placeholder="Cannot edit"
						behavior={{ disabled: true }}
						value="Disabled value"
					/>
					<InputText
						label="Readonly"
						placeholder="Read only"
						behavior={{ readonly: true }}
						value="Readonly value"
					/>
					<InputText
						label="Clearable"
						placeholder="Has clear button"
						behavior={{ clearable: true }}
						value="Clearable value"
					/>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText 
  label="Disabled" 
  placeholder="Cannot edit" 
  behavior=&#123;&#123; disabled: true &#125;&#125; 
  value="Disabled value" 
/&gt;

&lt;InputText 
  label="Readonly" 
  placeholder="Read only" 
  behavior=&#123;&#123; readonly: true &#125;&#125; 
  value="Readonly value" 
/&gt;

&lt;InputText 
  label="Clearable" 
  placeholder="Has clear button" 
  behavior=&#123;&#123; clearable: true &#125;&#125; 
  value="Clearable value" 
/&gt;</code
						></pre>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Pattern Masking',
				subtitle: 'Input masking with patterns',
				content: ''
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		>
			<svelte:fragment slot="content">
				<div class="example-group">
					<InputText
						type="tel"
						label="Phone Number"
						placeholder="(555) 123-4567"
						validation={{ pattern: '(xxx) xxx-xxxx' }}
					/>
					<InputText
						type="tel"
						label="Credit Card"
						placeholder="1234 5678 9012 3456"
						validation={{ pattern: 'xxxx xxxx xxxx xxxx' }}
					/>
				</div>
				<div class="code-block">
					<pre><code
							>&lt;InputText
  type="tel"
  label="Phone Number"
  placeholder="(555) 123-4567"
  validation=&#123;&#123; pattern: '(xxx) xxx-xxxx' &#125;&#125;
/&gt;

&lt;InputText
  type="tel"
  label="Credit Card"
  placeholder="1234 5678 9012 3456"
  validation=&#123;&#123; pattern: 'xxxx xxxx xxxx xxxx' &#125;&#125;
/&gt;</code
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
				subtitle: 'All available InputText properties',
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
								<td><code>type</code></td>
								<td
									><code>'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'</code
									></td
								>
								<td><code>'text'</code></td>
								<td>Input type for different data formats</td>
							</tr>
							<tr>
								<td><code>value</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Current input value (reactive)</td>
							</tr>
							<tr>
								<td><code>placeholder</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Placeholder text displayed when empty</td>
							</tr>
							<tr>
								<td><code>label</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Label text displayed above input</td>
							</tr>
							<tr>
								<td><code>name</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Input name attribute for forms</td>
							</tr>
							<tr>
								<td><code>id</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Input ID attribute (auto-generated if not provided)</td>
							</tr>
							<tr>
								<td><code>inputRef</code></td>
								<td><code>HTMLInputElement | undefined</code></td>
								<td><code>undefined</code></td>
								<td>Reference to the input DOM element</td>
							</tr>
							<tr>
								<td><code>ariaLabel</code></td>
								<td><code>string | undefined</code></td>
								<td><code>undefined</code></td>
								<td>Accessibility label for screen readers</td>
							</tr>
							<tr>
								<td><code>ariaDescribedBy</code></td>
								<td><code>string | undefined</code></td>
								<td><code>undefined</code></td>
								<td>ARIA describedby attribute</td>
							</tr>
							<tr>
								<td><code>styling</code></td>
								<td><code>InputTextStyling</code></td>
								<td><code>&#123;&#125;</code></td>
								<td>Styling configuration object</td>
							</tr>
							<tr>
								<td><code>validation</code></td>
								<td><code>InputTextValidation</code></td>
								<td><code>&#123;&#125;</code></td>
								<td>Validation rules and error handling</td>
							</tr>
							<tr>
								<td><code>behavior</code></td>
								<td><code>InputTextBehavior</code></td>
								<td><code>&#123;&#125;</code></td>
								<td>Behavioral configuration options</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h3>Styling Configuration</h3>
				<div class="api-table">
					<table>
						<thead>
							<tr>
								<th>Property</th>
								<th>Type</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>size</code></td>
								<td><code>'sm' | 'md' | 'lg'</code></td>
								<td><code>'md'</code></td>
								<td>Input size variant</td>
							</tr>
							<tr>
								<td><code>variant</code></td>
								<td><code>'default' | 'filled' | 'outlined'</code></td>
								<td><code>'default'</code></td>
								<td>Visual style variant</td>
							</tr>
							<tr>
								<td><code>inputClass</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Additional CSS classes for input element</td>
							</tr>
							<tr>
								<td><code>wrapperClass</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Additional CSS classes for wrapper</td>
							</tr>
							<tr>
								<td><code>labelClass</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Additional CSS classes for label</td>
							</tr>
							<tr>
								<td><code>wrapperStyle</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Inline styles for wrapper element</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h3>Validation Configuration</h3>
				<div class="api-table">
					<table>
						<thead>
							<tr>
								<th>Property</th>
								<th>Type</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>required</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Mark field as required with visual indicator</td>
							</tr>
							<tr>
								<td><code>isError</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Display error state styling</td>
							</tr>
							<tr>
								<td><code>errorMessage</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Error message to display below input</td>
							</tr>
							<tr>
								<td><code>maxLength</code></td>
								<td><code>number | null</code></td>
								<td><code>null</code></td>
								<td>Maximum character limit</td>
							</tr>
							<tr>
								<td><code>pattern</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>Masking pattern (e.g., 'xxx-xxx-xxxx')</td>
							</tr>
							<tr>
								<td><code>showMaxLengthCounter</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Show character count indicator</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h3>Behavior Configuration</h3>
				<div class="api-table">
					<table>
						<thead>
							<tr>
								<th>Property</th>
								<th>Type</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>disabled</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Disable input interaction</td>
							</tr>
							<tr>
								<td><code>readonly</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Make input read-only</td>
							</tr>
							<tr>
								<td><code>autoFocus</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Auto-focus input on mount</td>
							</tr>
							<tr>
								<td><code>clearable</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Show clear button when input has value</td>
							</tr>
							<tr>
								<td><code>useKeyup</code></td>
								<td><code>boolean</code></td>
								<td><code>true</code></td>
								<td>Use keyup instead of input event</td>
							</tr>
							<tr>
								<td><code>useNumberFormat</code></td>
								<td><code>boolean</code></td>
								<td><code>true</code></td>
								<td>Enable number formatting for number inputs</td>
							</tr>
							<tr>
								<td><code>autocomplete</code></td>
								<td><code>string</code></td>
								<td><code>''</code></td>
								<td>HTML autocomplete attribute value</td>
							</tr>
						</tbody>
					</table>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Events',
				subtitle: 'InputText events',
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
								<td><code>input</code></td>
								<td><code>CustomEvent&lt;string&gt;</code></td>
								<td>Fired when input value changes</td>
							</tr>
							<tr>
								<td><code>keyup</code></td>
								<td><code>CustomEvent&lt;string&gt;</code></td>
								<td>Fired on key release (key name)</td>
							</tr>
							<tr>
								<td><code>keydown</code></td>
								<td
									><code
										>CustomEvent&lt;&#123; key: string; event: KeyboardEvent &#125;&#125;&gt;</code
									></td
								>
								<td>Fired on key press</td>
							</tr>
							<tr>
								<td><code>focus</code></td>
								<td><code>void</code></td>
								<td>Fired when input receives focus</td>
							</tr>
							<tr>
								<td><code>outFocus</code></td>
								<td><code>void</code></td>
								<td>Fired when input loses focus</td>
							</tr>
							<tr>
								<td><code>change</code></td>
								<td><code>Event</code></td>
								<td>Fired when input value changes and loses focus</td>
							</tr>
						</tbody>
					</table>
				</div>
			</svelte:fragment>
		</Accordion>

		<Accordion
			content={{
				title: 'Slots',
				subtitle: 'Available slots for custom content',
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
								<th>Slot</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>label</code></td>
								<td>Custom label content (replaces default label)</td>
							</tr>
							<tr>
								<td><code>prefix</code></td>
								<td>Content displayed before the input field</td>
							</tr>
							<tr>
								<td><code>suffix</code></td>
								<td>Content displayed after the input field</td>
							</tr>
							<tr>
								<td><code>helper</code></td>
								<td>Custom helper text (replaces default max length counter)</td>
							</tr>
							<tr>
								<td><code>error</code></td>
								<td>Custom error message (replaces default error display)</td>
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
		gap: 1rem;
		padding: 2rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
		min-height: 200px;
	}

	.value-display {
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
	}

	.value-display code {
		background: var(--color-surface-secondary, #f8fafc);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.8125rem;
		color: var(--color-text, #1f2937);
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
		margin-bottom: 2rem;
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

	.api-section h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 2rem 0 1rem;
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
		}
	}
</style>
