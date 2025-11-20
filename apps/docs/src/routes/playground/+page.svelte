<script lang="ts">
	import { 
		Button, 
		InputText, 
		TextArea, 
		Checkbox, 
		Switch, 
		SelectOption, 
		DatePicker, 
		Accordion, 
		Drawer,
		PageWrapper
	} from '@rief/kit';
	import type { SelectOptionItem } from '@rief/kit';
	
	// Form state
	let formData = {
		name: '',
		email: '',
		message: '',
		newsletter: false,
		darkMode: false,
		country: null as SelectOptionItem | null,
		birthDate: null,
		interests: [] as SelectOptionItem[]
	};
	
	// Drawer state
	let drawerVisible = false;
	let drawerPosition: 'left' | 'right' | 'top' | 'bottom' = 'right';
	let drawerPositionSelect: SelectOptionItem | null = { value: 'right', label: 'Right' };
	
	function handleDrawerPositionChange() {
		drawerPosition = (drawerPositionSelect?.value as any) || 'right';
	}
	
	// Options
	const countryOptions: SelectOptionItem[] = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'au', label: 'Australia' }
	];
	
	const interestOptions: SelectOptionItem[] = [
		{ value: 'tech', label: 'Technology' },
		{ value: 'design', label: 'Design' },
		{ value: 'music', label: 'Music' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'travel', label: 'Travel' },
		{ value: 'food', label: 'Food & Cooking' },
		{ value: 'books', label: 'Books & Reading' },
		{ value: 'movies', label: 'Movies & TV' }
	];
	
	const drawerPositions = [
		{ value: 'left', label: 'Left' },
		{ value: 'right', label: 'Right' },
		{ value: 'top', label: 'Top' },
		{ value: 'bottom', label: 'Bottom' }
	];
	
	// Demo state
	let submitting = false;
	let submitted = false;
	
	function handleSubmit() {
		submitting = true;
		setTimeout(() => {
			submitting = false;
			submitted = true;
			setTimeout(() => submitted = false, 3000);
		}, 2000);
	}
	
	function resetForm() {
		formData = {
			name: '',
			email: '',
			message: '',
			newsletter: false,
			darkMode: false,
			country: null,
			birthDate: null,
			interests: []
		};
		submitted = false;
	}
	
	function openDrawer(position: typeof drawerPosition) {
		drawerPosition = position;
		drawerVisible = true;
	}
</script>

<svelte:head>
	<title>Playground - Kit Documentation</title>
	<meta name="description" content="Interactive playground for testing Kit components" />
</svelte:head>

<PageWrapper 
	pageElm={undefined}
	contentElm={undefined}
	footerElm={undefined}
>
	<div class="playground">
		<header class="playground-header">
			<h1>Interactive Playground</h1>
			<p class="playground-description">
				Test and experiment with all Kit components in a live environment. 
				All interactions are functional and demonstrate real component behavior.
			</p>
		</header>

		<div class="playground-grid">
			<!-- Form Section -->
			<section class="playground-section">
				<h2>Complete Form Example</h2>
				<div class="form-container">
					<form on:submit|preventDefault={handleSubmit} class="demo-form">
						<div class="form-row">
							<InputText
								bind:value={formData.name}
								label="Full Name"
								placeholder="Enter your full name"
								styling={{ variant: "outlined", size: "md" }}
								validation={{ required: true }}
								behavior={{ clearable: true }}
							/>
							
							<InputText
								bind:value={formData.email}
								type="email"
								label="Email Address"
								placeholder="your@email.com"
								styling={{ variant: "outlined", size: "md" }}
								validation={{ required: true }}
								behavior={{ clearable: true }}
							/>
						</div>
						
						<div class="form-row">
							<SelectOption
								bind:value={formData.country}
								options={countryOptions}
								label="Country"
								styling={{ variant: "outlined", size: "md" }}
								behavior={{ 
									isSearchable: true, 
									placeholder: "Select your country...",
									closeOnSelect: true
								}}
							/>
							
							<DatePicker
								bind:value={formData.birthDate}
								variant="default"
								size="md"
								labels={{ 
									selectMonth: "Month", 
									selectYear: "Year",
									today: "Today",
									clear: "Clear"
								}}
							/>
						</div>
						
						<SelectOption
							bind:value={formData.interests}
							options={interestOptions}
							label="Interests (Multi-select)"
							styling={{ variant: "outlined", size: "md" }}
							behavior={{ 
								isMultiOption: true,
								isSearchable: true,
								placeholder: "Select your interests...",
								closeOnSelect: false
							}}
						/>
						
						<TextArea
							bind:value={formData.message}
							label="Message"
							placeholder="Tell us about yourself..."
							styling={{ variant: "outlined", size: "md" }}
							validation={{ maxLength: 500, showMaxLengthCounter: true }}
							behavior={{ clearable: true }}
							layout={{ rows: 4, autoResize: true }}
						/>
						
						<div class="checkbox-group">
							<Checkbox bind:checked={formData.newsletter} variant="default" size="md">
								Subscribe to newsletter
							</Checkbox>
							
							<Switch bind:checked={formData.darkMode} variant="default" size="md">
								Enable dark mode
							</Switch>
						</div>
						
						<div class="form-actions">
							<Button 
								type="submit" 
								variant="filled" 
								size="lg"
								loading={submitting}
								loadingMessage="Submitting..."
								disabled={!formData.name || !formData.email}
							>
								Submit Form
							</Button>
							
							<Button 
								variant="outlined" 
								size="lg"
								on:click={resetForm}
								disabled={submitting}
							>
								Reset
							</Button>
						</div>
						
						{#if submitted}
							<div class="success-message">
								✅ Form submitted successfully!
							</div>
						{/if}
					</form>
				</div>
			</section>

			<!-- Interactive Components -->
			<section class="playground-section">
				<h2>Interactive Components</h2>
				
				<div class="component-demos">
					<!-- Button Variants -->
					<div class="demo-group">
						<h3>Button Variants & States</h3>
						<div class="button-grid">
							<Button variant="filled" size="sm">Small Filled</Button>
							<Button variant="filled" size="md">Medium Filled</Button>
							<Button variant="filled" size="lg">Large Filled</Button>
							<Button variant="outlined" size="md">Outlined</Button>
							<Button variant="text" size="md">Text Button</Button>
							<Button variant="link" size="md">Link Button</Button>
							<Button variant="filled" state="active" size="md">Active</Button>
							<Button variant="filled" state="selected" size="md">Selected</Button>
							<Button variant="filled" state="highlight" size="md">Highlight</Button>
							<Button variant="filled" fullRounded={true} size="md">Rounded</Button>
						</div>
					</div>

					<!-- Drawers -->
					<div class="demo-group">
						<h3>Drawer Component</h3>
						<div class="drawer-controls">
						<SelectOption
							bind:value={drawerPositionSelect}
							options={drawerPositions}
							on:change={handleDrawerPositionChange}
								styling={{ variant: "outlined", size: "sm" }}
								behavior={{ closeOnSelect: true }}
							/>
							<Button 
								variant="filled" 
								size="md"
								on:click={() => openDrawer(drawerPosition)}
							>
								Open {drawerPosition} Drawer
							</Button>
						</div>
					</div>

					<!-- Accordions -->
					<div class="demo-group">
						<h3>Accordion Examples</h3>
						<div class="accordion-stack">
							<Accordion 
								content={{
									title: "Getting Started",
									subtitle: "Learn the basics",
									content: "This accordion demonstrates basic usage with default styling. Click to expand and see the content."
								}}
								styling={{ variant: "default", size: "md" }}
								behavior={{ showIcon: true, iconPosition: "right" }}
							/>
							
							<Accordion 
								content={{
									title: "Advanced Features",
									subtitle: "Explore advanced options",
									content: "This accordion uses outlined variant with custom styling. It includes subtitle and demonstrates different visual styles."
								}}
								styling={{ variant: "outlined", size: "md" }}
								behavior={{ showIcon: true, iconPosition: "left" }}
							/>
							
							<Accordion 
								content={{
									title: "API Reference",
									subtitle: "Complete documentation",
									content: "This filled variant accordion shows how different variants can be mixed in the same interface for better visual hierarchy."
								}}
								styling={{ variant: "filled", size: "md" }}
								behavior={{ showIcon: true, iconPosition: "right" }}
							/>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Form Data Preview -->
		<section class="data-preview">
			<h2>Live Form Data</h2>
			<div class="data-container">
				<pre><code>{JSON.stringify(formData, null, 2)}</code></pre>
			</div>
		</section>
	</div>
</PageWrapper>

<!-- Drawer Component -->
<Drawer 
	bind:visible={drawerVisible}
	position={drawerPosition}
	overlay={true}
	closeOnEscape={true}
	isDraggable={true}
>
	<div class="drawer-content">
		<h3>Drawer Content</h3>
		<p>This is a {drawerPosition} drawer with draggable resize functionality.</p>
		<p>You can:</p>
		<ul>
			<li>Drag the edge to resize</li>
			<li>Press ESC to close</li>
			<li>Click outside to close</li>
		</ul>
		
		<div class="drawer-demo-form">
			<InputText
				label="Sample Input"
				placeholder="Type something..."
				styling={{ variant: "outlined" }}
			/>
			
			<div class="drawer-actions">
				<Button variant="filled" size="sm">Action</Button>
				<Button 
					variant="outlined" 
					size="sm"
					on:click={() => drawerVisible = false}
				>
					Close
				</Button>
			</div>
		</div>
	</div>
</Drawer>

<style>
	.playground {
		max-width: 1200px;
		margin: 0 auto;
	}

	.playground-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.playground-header h1 {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.playground-description {
		font-size: 1.25rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	.playground-grid {
		display: grid;
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.playground-section {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 2rem;
	}

	.playground-section h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.form-container {
		max-width: 600px;
		margin: 0 auto;
	}

	.demo-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
	}

	.success-message {
		text-align: center;
		padding: 1rem;
		background: #d1fae5;
		color: #065f46;
		border-radius: 0.5rem;
		font-weight: 500;
	}

	.component-demos {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.demo-group h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		align-items: center;
	}

	.drawer-controls {
		display: flex;
		gap: 1rem;
		align-items: end;
	}

	.accordion-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.data-preview {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 2rem;
	}

	.data-preview h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.data-container {
		background: #1f2937;
		color: #f9fafb;
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	.data-container pre {
		margin: 0;
		padding: 1.5rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.drawer-content {
		padding: 2rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.drawer-content h3 {
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.drawer-content p {
		margin: 0 0 0.5rem;
		color: var(--color-text-secondary, #6b7280);
	}

	.drawer-content ul {
		margin: 0 0 1rem;
		padding-left: 1.5rem;
		color: var(--color-text-secondary, #6b7280);
	}

	.drawer-demo-form {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.drawer-actions {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.playground-header h1 {
			font-size: 2.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column;
		}

		.button-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}

		.drawer-controls {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>