<script lang="ts">
	import { InputText, Accordion, SelectOption, Checkbox } from '@rief/kit';
	import type { InputType, InputSize, InputVariant, SelectOptionItem } from '@rief/kit';
	
	// Demo state
	let value = '';
	let type: SelectOptionItem | null = { value: 'text', label: 'Text' };
	let size: SelectOptionItem | null = { value: 'md', label: 'Medium' };
	let variant: SelectOptionItem | null = { value: 'default', label: 'Default' };
	let disabled = false;
	let readonly = false;
	let required = false;
	let isError = false;
	let clearable = true;
	let useNumberFormat = false;
	let maxLength: number | null = null;
	let showCounter = false;
	let label = 'Input Label';
	let placeholder = 'Enter text...';
	let errorMessage = 'This field has an error';
	let maxLengthString = '';
	
	// Computed values for component props
	$: inputType = type?.value as InputType || 'text';
	$: inputSize = size?.value as InputSize || 'md';
	$: inputVariant = variant?.value as InputVariant || 'default';
	
	// Options
	const typeOptions = [
		{ value: 'text', label: 'Text' },
		{ value: 'email', label: 'Email' },
		{ value: 'password', label: 'Password' },
		{ value: 'number', label: 'Number' },
		{ value: 'tel', label: 'Telephone' },
		{ value: 'url', label: 'URL' },
		{ value: 'search', label: 'Search' }
	];
	
	const sizeOptions = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];
	
	const variantOptions = [
		{ value: 'default', label: 'Default' },
		{ value: 'filled', label: 'Filled' },
		{ value: 'outlined', label: 'Outlined' }
	];
</script>

<svelte:head>
	<title>InputText - Kit Documentation</title>
	<meta name="description" content="InputText component documentation and examples" />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<h1>InputText</h1>
		<p class="docs-description">
			A comprehensive text input component with validation, formatting, masking, and accessibility features.
			Supports multiple input types and extensive customization options.
		</p>
	</header>

	<section class="demo-section">
		<h2>Interactive Demo</h2>
		<div class="demo-container">
			<div class="demo-preview">
				<InputText 
					bind:value
					type={inputType}
					{label}
					{placeholder}
					styling={{ size: inputSize, variant: inputVariant }}
					validation={{ 
						required, 
						isError, 
						errorMessage,
						maxLength,
						showMaxLengthCounter: showCounter
					}}
					behavior={{ 
						disabled, 
						readonly, 
						clearable,
						useNumberFormat: inputType === 'number' ? useNumberFormat : false
					}}
				/>
				{#if value}
					<p class="demo-value">Current value: <code>{value}</code></p>
				{/if}
			</div>
			
			<div class="demo-controls">
				<h3>Controls</h3>
				<div class="controls-grid">
					<SelectOption
						label="Type"
						options={typeOptions}
						bind:value={type}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
					/>
					
					<SelectOption
						label="Size"
						options={sizeOptions}
						bind:value={size}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
					/>
					
					<SelectOption
						label="Variant"
						options={variantOptions}
						bind:value={variant}
						behavior={{ closeOnSelect: true }}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Label"
						bind:value={label}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Placeholder"
						bind:value={placeholder}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Error Message"
						bind:value={errorMessage}
						styling={{ variant: "outlined" }}
					/>
					
					<InputText
						label="Max Length"
						bind:value={maxLengthString}
						styling={{ variant: "outlined" }}
						on:input={() => maxLength = parseInt(maxLengthString) || null}
					/>
				</div>
				
				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled}>Disabled</Checkbox>
					<Checkbox bind:checked={readonly}>Readonly</Checkbox>
					<Checkbox bind:checked={required}>Required</Checkbox>
					<Checkbox bind:checked={isError}>Error State</Checkbox>
					<Checkbox bind:checked={clearable}>Clearable</Checkbox>
					<Checkbox bind:checked={showCounter}>Show Counter</Checkbox>
					{#if inputType === 'number'}
						<Checkbox bind:checked={useNumberFormat}>Number Formatting</Checkbox>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>
		
		<Accordion 
			content={{
				title: "Input Types",
				subtitle: "Different input types",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<InputText type="text" label="Text Input" placeholder="Enter text..." />
				<InputText type="email" label="Email Input" placeholder="your@email.com" />
				<InputText type="password" label="Password Input" placeholder="Enter password..." />
				<InputText type="number" label="Number Input" placeholder="Enter number..." />
				<InputText type="tel" label="Phone Input" placeholder="(555) 123-4567" />
				<InputText type="url" label="URL Input" placeholder="https://example.com" />
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Variants",
				subtitle: "Different visual styles",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<InputText label="Default Variant" placeholder="Default styling..." styling={{ variant: "default" }} />
				<InputText label="Filled Variant" placeholder="Filled styling..." styling={{ variant: "filled" }} />
				<InputText label="Outlined Variant" placeholder="Outlined styling..." styling={{ variant: "outlined" }} />
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Sizes",
				subtitle: "Different input sizes",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<InputText label="Small" placeholder="Small input..." styling={{ size: "sm" }} />
				<InputText label="Medium" placeholder="Medium input..." styling={{ size: "md" }} />
				<InputText label="Large" placeholder="Large input..." styling={{ size: "lg" }} />
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Validation",
				subtitle: "Input validation features",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<InputText 
					label="Required Field" 
					placeholder="This field is required..." 
					validation={{ required: true }}
				/>
				<InputText 
					label="Error State" 
					placeholder="This has an error..." 
					validation={{ isError: true, errorMessage: "Please fix this error" }}
				/>
				<InputText 
					label="Character Limit" 
					placeholder="Max 50 characters..." 
					validation={{ maxLength: 50, showMaxLengthCounter: true }}
				/>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Behavior Options",
				subtitle: "Different behavior configurations",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<InputText 
					label="Clearable Input" 
					placeholder="Has clear button..." 
					behavior={{ clearable: true }}
				/>
				<InputText 
					label="Disabled Input" 
					placeholder="Cannot interact..." 
					behavior={{ disabled: true }}
				/>
				<InputText 
					label="Readonly Input" 
					value="Read-only value"
					behavior={{ readonly: true }}
				/>
			</div>
		</Accordion>
	</section>

	<section class="api-section">
		<h2>API Reference</h2>
		
		<Accordion 
			content={{
				title: "Props",
				subtitle: "All available InputText properties",
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
							<td><code>type</code></td>
							<td><code>'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'</code></td>
							<td><code>'text'</code></td>
							<td>Input type</td>
						</tr>
						<tr>
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Input value</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Label text</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Placeholder text</td>
						</tr>
						<tr>
							<td><code>styling</code></td>
							<td><code>InputTextStyling</code></td>
							<td><code>{'{}'}</code></td>
							<td>Styling configuration</td>
						</tr>
						<tr>
							<td><code>validation</code></td>
							<td><code>InputTextValidation</code></td>
							<td><code>{'{}'}</code></td>
							<td>Validation configuration</td>
						</tr>
						<tr>
							<td><code>behavior</code></td>
							<td><code>InputTextBehavior</code></td>
							<td><code>{'{}'}</code></td>
							<td>Behavior configuration</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Styling Interface",
				subtitle: "InputTextStyling properties",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="api-table">
				<table>
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td>Input size variant</td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td><code>'default' | 'filled' | 'outlined'</code></td>
							<td>Input style variant</td>
						</tr>
						<tr>
							<td><code>inputClass</code></td>
							<td><code>string</code></td>
							<td>Custom CSS class for input element</td>
						</tr>
						<tr>
							<td><code>wrapperClass</code></td>
							<td><code>string</code></td>
							<td>Custom CSS class for wrapper</td>
						</tr>
						<tr>
							<td><code>labelClass</code></td>
							<td><code>string</code></td>
							<td>Custom CSS class for label</td>
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
		gap: 1rem;
		padding: 2rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
		min-height: 200px;
		justify-content: center;
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

	.example-grid {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
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
	}
</style>
