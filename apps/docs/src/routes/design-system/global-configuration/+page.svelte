<script lang="ts">
	import { Button } from '@rief/kit';
	import type { ButtonVariant, ButtonSize } from '@rief/kit';
	
	let playgroundProps = {
		variant: 'filled' as ButtonVariant,
		size: 'md' as ButtonSize,
		disabled: false,
		loading: false,
		fullRounded: false
	};
	
	const variants = ['filled', 'outlined', 'text', 'link'];
	const sizes = ['sm', 'md', 'lg', 'xl'];
</script>

<svelte:head>
	<title>Button - Kit Component Library</title>
	<meta name="description" content="Button component documentation with examples and API reference" />
</svelte:head>

<div class="component-page">
	<header class="component-header">
		<h1>Button</h1>
		<p class="component-description">
			Interactive button component with multiple variants, sizes, and states. Supports both button and link functionality.
		</p>
		
		<div class="import-code">
			<pre><code>import &#123; Button &#125; from '@rief/kit';</code></pre>
		</div>
	</header>

	<section class="hero-example">
		<div class="example-container">
			<Button variant="filled" size="lg">Get Started</Button>
		</div>
	</section>

	<section class="playground">
		<h2>Interactive Playground</h2>
		<div class="playground-container">
			<div class="playground-controls">
				<div class="control-group">
					<label for="variant-select">Variant</label>
					<select id="variant-select" bind:value={playgroundProps.variant}>
						{#each variants as variant}
							<option value={variant}>{variant}</option>
						{/each}
					</select>
				</div>
				
				<div class="control-group">
					<label for="size-select">Size</label>
					<select id="size-select" bind:value={playgroundProps.size}>
						{#each sizes as size}
							<option value={size}>{size}</option>
						{/each}
					</select>
				</div>
				
				<div class="control-group">
					<label>
						<input type="checkbox" bind:checked={playgroundProps.disabled} />
						Disabled
					</label>
				</div>
				
				<div class="control-group">
					<label>
						<input type="checkbox" bind:checked={playgroundProps.loading} />
						Loading
					</label>
				</div>
				
				<div class="control-group">
					<label>
						<input type="checkbox" bind:checked={playgroundProps.fullRounded} />
						Full Rounded
					</label>
				</div>
			</div>
			
			<div class="playground-preview">
				<Button 
					variant={playgroundProps.variant}
					size={playgroundProps.size}
					disabled={playgroundProps.disabled}
					loading={playgroundProps.loading}
					fullRounded={playgroundProps.fullRounded}
				>
					Button Text
				</Button>
			</div>
		</div>
		
		<div class="code-output">
			<pre><code>&lt;Button 
  variant="{playgroundProps.variant}"
  size="{playgroundProps.size}"
  {playgroundProps.disabled ? 'disabled' : ''}
  {playgroundProps.loading ? 'loading' : ''}
  {playgroundProps.fullRounded ? 'fullRounded' : ''}
&gt;
  Button Text
&lt;/Button&gt;</code></pre>
		</div>
	</section>

	<section class="examples">
		<h2>Examples</h2>
		
		<div class="example-section">
			<h3>Variants</h3>
			<div class="example-grid">
				<div class="example-item">
					<Button variant="filled">Filled</Button>
					<code>variant="filled"</code>
				</div>
				<div class="example-item">
					<Button variant="outlined">Outlined</Button>
					<code>variant="outlined"</code>
				</div>
				<div class="example-item">
					<Button variant="text">Text</Button>
					<code>variant="text"</code>
				</div>
				<div class="example-item">
					<Button variant="link">Link</Button>
					<code>variant="link"</code>
				</div>
			</div>
		</div>

		<div class="example-section">
			<h3>Sizes</h3>
			<div class="example-grid">
				<div class="example-item">
					<Button size="sm">Small</Button>
					<code>size="sm"</code>
				</div>
				<div class="example-item">
					<Button size="md">Medium</Button>
					<code>size="md"</code>
				</div>
				<div class="example-item">
					<Button size="lg">Large</Button>
					<code>size="lg"</code>
				</div>
				<div class="example-item">
					<Button size="xl">Extra Large</Button>
					<code>size="xl"</code>
				</div>
			</div>
		</div>

		<div class="example-section">
			<h3>States</h3>
			<div class="example-grid">
				<div class="example-item">
					<Button disabled>Disabled</Button>
					<code>disabled</code>
				</div>
				<div class="example-item">
					<Button loading>Loading</Button>
					<code>loading</code>
				</div>
				<div class="example-item">
					<Button fullRounded>Rounded</Button>
					<code>fullRounded</code>
				</div>
			</div>
		</div>
	</section>

	<section class="api-reference">
		<h2>API Reference</h2>
		
		<h3>Props</h3>
		<div class="props-table">
			<table>
				<thead>
					<tr>
						<th>Name</th>
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
						<td>Button visual style variant</td>
					</tr>
					<tr>
						<td><code>size</code></td>
						<td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
						<td><code>'md'</code></td>
						<td>Button size</td>
					</tr>
					<tr>
						<td><code>disabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disable button interactions</td>
					</tr>
					<tr>
						<td><code>loading</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Show loading state</td>
					</tr>
					<tr>
						<td><code>fullRounded</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Apply fully rounded corners</td>
					</tr>
					<tr>
						<td><code>href</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>Convert to link with URL</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3>Events</h3>
		<div class="events-table">
			<table>
				<thead>
					<tr>
						<th>Name</th>
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
				</tbody>
			</table>
		</div>
	</section>
</div>

<style>
	.component-page {
		max-width: 900px;
		margin: 0 auto;
	}

	.component-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.component-header h1 {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1rem;
		color: #111827;
	}

	.component-description {
		font-size: 1.125rem;
		color: #6b7280;
		margin: 0 0 2rem;
		line-height: 1.6;
	}

	.import-code pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		margin: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
	}

	.hero-example {
		text-align: center;
		padding: 3rem 0;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-radius: 1rem;
		margin-bottom: 3rem;
	}

	.playground {
		margin-bottom: 3rem;
	}

	.playground h2 {
		font-size: 1.875rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: #111827;
	}

	.playground-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.playground-controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.control-group label {
		font-weight: 500;
		color: #374151;
		font-size: 0.875rem;
	}

	.control-group select {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		background: white;
	}

	.control-group input[type="checkbox"] {
		margin-right: 0.5rem;
	}

	.playground-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: #f8fafc;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.code-output pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1.5rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.examples {
		margin-bottom: 3rem;
	}

	.examples h2 {
		font-size: 1.875rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: #111827;
	}

	.example-section {
		margin-bottom: 2rem;
	}

	.example-section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: #374151;
	}

	.example-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
	}

	.example-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
		background: #f8fafc;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.example-item code {
		font-size: 0.75rem;
		color: #6b7280;
		background: #e5e7eb;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.api-reference h2 {
		font-size: 1.875rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: #111827;
	}

	.api-reference h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 2rem 0 1rem;
		color: #374151;
	}

	.props-table,
	.events-table {
		overflow-x: auto;
		margin-bottom: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	th,
	td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	th {
		background: #f8fafc;
		font-weight: 600;
		color: #374151;
		font-size: 0.875rem;
	}

	td {
		font-size: 0.875rem;
		color: #6b7280;
	}

	td code {
		background: #e5e7eb;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.75rem;
		color: #374151;
	}

	@media (max-width: 768px) {
		.playground-container {
			grid-template-columns: 1fr;
		}

		.example-grid {
			grid-template-columns: 1fr;
		}

		.component-header h1 {
			font-size: 2.5rem;
		}
	}
</style>
