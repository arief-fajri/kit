<script lang="ts">
	import { TextArea, Accordion, SelectOption, Checkbox } from '@rief/kit';
	import type { InputSize, InputVariant, SelectOptionItem } from '@rief/kit';
	
	// Demo state
	let value = '';
	let size: SelectOptionItem | null = { value: 'md', label: 'Medium' };
	let variant: SelectOptionItem | null = { value: 'default', label: 'Default' };
	let disabled = false;
	let readonly = false;
	let required = false;
	let isError = false;
	let clearable = true;
	let autoResize = true;
	let fixedHeight = false;
	let maxLength: number | null = 500;
	let showCounter = true;
	let rows = 4;
	let maxHeight: number | null = 200;
	let rowsString = '4';
	let maxLengthString = '500';
	let maxHeightString = '200';
	
	// Computed values for component props
	$: textAreaSize = size?.value as InputSize || 'md';
	$: textAreaVariant = variant?.value as InputVariant || 'default';
	let label = 'Message';
	let placeholder = 'Enter your message...';
	let errorMessage = 'This field has an error';
	
	// Options
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
	<title>TextArea - Kit Documentation</title>
	<meta name="description" content="TextArea component documentation and examples" />
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<h1>TextArea</h1>
		<p class="docs-description">
			A comprehensive multi-line text input component with auto-resize, validation, character counting, and accessibility features.
			Perfect for forms, comments, and any multi-line text input needs.
		</p>
	</header>

	<section class="demo-section">
		<h2>Interactive Demo</h2>
		<div class="demo-container">
			<div class="demo-preview">
				<TextArea 
					bind:value
					{label}
					{placeholder}
					styling={{ 
						size: textAreaSize, 
						variant: textAreaVariant 
					}}
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
						clearable
					}}
					layout={{
						rows,
						autoResize,
						fixedHeight,
						maxHeight
					}}
				/>
				{#if value}
					<p class="demo-value">
						Characters: <code>{value.length}</code>
						{#if maxLength}
							/ {maxLength}
						{/if}
					</p>
				{/if}
			</div>
			
			<div class="demo-controls">
				<h3>Controls</h3>
				<div class="controls-grid">
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
					
					<TextArea
						label="Label"
						bind:value={label}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
					/>
					
					<TextArea
						label="Placeholder"
						bind:value={placeholder}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
					/>
					
					<TextArea
						label="Error Message"
						bind:value={errorMessage}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
					/>
				</div>
				
				<div class="number-controls">
					<TextArea
						label="Rows"
						bind:value={rowsString}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
						on:input={() => rows = parseInt(rowsString) || 4}
					/>
					
					<TextArea
						label="Max Length"
						bind:value={maxLengthString}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
						on:input={() => maxLength = parseInt(maxLengthString) || null}
					/>
					
					<TextArea
						label="Max Height (px)"
						bind:value={maxHeightString}
						styling={{ variant: "outlined" }}
						layout={{ rows: 1 }}
						on:input={() => maxHeight = parseInt(maxHeightString) || null}
					/>
				</div>
				
				<div class="checkbox-controls">
					<Checkbox bind:checked={disabled}>Disabled</Checkbox>
					<Checkbox bind:checked={readonly}>Readonly</Checkbox>
					<Checkbox bind:checked={required}>Required</Checkbox>
					<Checkbox bind:checked={isError}>Error State</Checkbox>
					<Checkbox bind:checked={clearable}>Clearable</Checkbox>
					<Checkbox bind:checked={showCounter}>Show Counter</Checkbox>
					<Checkbox bind:checked={autoResize}>Auto Resize</Checkbox>
					<Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
				</div>
			</div>
		</div>
	</section>

	<section class="examples-section">
		<h2>Examples</h2>
		
		<Accordion 
			content={{
				title: "Basic Usage",
				subtitle: "Simple textarea examples",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<TextArea 
					label="Basic TextArea" 
					placeholder="Enter your text here..."
					layout={{ rows: 3 }}
				/>
				<TextArea 
					label="With Character Limit" 
					placeholder="Max 100 characters..."
					validation={{ maxLength: 100, showMaxLengthCounter: true }}
					layout={{ rows: 3 }}
				/>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Auto-Resize",
				subtitle: "Automatically expanding textarea",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<TextArea 
					label="Auto-Resize TextArea" 
					placeholder="Start typing and watch it grow..."
					layout={{ rows: 2, autoResize: true, maxHeight: 150 }}
				/>
				<TextArea 
					label="Fixed Height" 
					placeholder="This won't resize..."
					layout={{ rows: 4, fixedHeight: true }}
				/>
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
				<TextArea 
					label="Default Variant" 
					placeholder="Default styling..."
					styling={{ variant: "default" }}
					layout={{ rows: 3 }}
				/>
				<TextArea 
					label="Filled Variant" 
					placeholder="Filled styling..."
					styling={{ variant: "filled" }}
					layout={{ rows: 3 }}
				/>
				<TextArea 
					label="Outlined Variant" 
					placeholder="Outlined styling..."
					styling={{ variant: "outlined" }}
					layout={{ rows: 3 }}
				/>
			</div>
		</Accordion>

		<Accordion 
			content={{
				title: "Validation States",
				subtitle: "Error handling and validation",
				content: ""
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		>
			<div class="example-grid">
				<TextArea 
					label="Required Field" 
					placeholder="This field is required..."
					validation={{ required: true }}
					layout={{ rows: 3 }}
				/>
				<TextArea 
					label="Error State" 
					placeholder="This has an error..."
					validation={{ isError: true, errorMessage: "Please provide more details" }}
					layout={{ rows: 3 }}
				/>
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
		min-height: 300px;
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

	.controls-grid,
	.number-controls {
		display: grid;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.number-controls {
		grid-template-columns: 1fr 1fr 1fr;
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

	@media (max-width: 768px) {
		.docs-header h1 {
			font-size: 2.5rem;
		}

		.demo-container {
			grid-template-columns: 1fr;
		}

		.demo-preview {
			min-height: 200px;
		}

		.number-controls {
			grid-template-columns: 1fr;
		}
	}
</style>
