<script lang="ts">
	import { Button, Accordion, InputText, Switch, SelectOption } from '@rief/kit';
	import type { SelectOptionItem } from '@rief/kit';
	
	let currentTheme: SelectOptionItem | null = { value: 'light', label: 'Light Theme' };
	let customPrimary = '#3b82f6';
	let customSurface = '#ffffff';
	let customText = '#1f2937';
	
	const themes = [
		{ value: 'light', label: 'Light Theme' },
		{ value: 'dark', label: 'Dark Theme' },
		{ value: 'corporate', label: 'Corporate Theme' },
		{ value: 'custom', label: 'Custom Theme' }
	];
	
	function applyTheme(theme: SelectOptionItem | null) {
		if (!theme) return;
		
		const root = document.documentElement;
		root.setAttribute('data-theme', theme.value as string);
		
		if (theme.value === 'custom') {
			root.style.setProperty('--color-primary', customPrimary);
			root.style.setProperty('--color-surface', customSurface);
			root.style.setProperty('--color-text', customText);
		}
	}
	
	$: applyTheme(currentTheme);
</script>

<svelte:head>
	<title>Theming - Kit Component Library</title>
	<meta name="description" content="Learn how to customize and theme Kit components" />
</svelte:head>

<div class="theming-docs">
	<header class="docs-header">
		<h1>Theming System</h1>
		<p class="docs-description">
			Kit provides a flexible theming system based on CSS custom properties. 
			Easily customize colors, spacing, and component styles to match your design system.
		</p>
	</header>

	<section class="theme-demo">
		<h2>Interactive Theme Demo</h2>
		<div class="demo-container">
			<div class="theme-controls">
				<SelectOption
					label="Select Theme"
					options={themes}
					bind:value={currentTheme}
					behavior={{ closeOnSelect: true }}
					styling={{ variant: "outlined" }}
				/>
				
				{#if currentTheme?.value === 'custom'}
					<div class="custom-controls">
						<InputText
							label="Primary Color"
							bind:value={customPrimary}
							type="text"
							styling={{ variant: "outlined" }}
						/>
						<InputText
							label="Surface Color"
							bind:value={customSurface}
							type="text"
							styling={{ variant: "outlined" }}
						/>
						<InputText
							label="Text Color"
							bind:value={customText}
							type="text"
							styling={{ variant: "outlined" }}
						/>
					</div>
				{/if}
			</div>
			
			<div class="theme-preview">
				<h3>Preview</h3>
				<div class="preview-components">
					<Button variant="filled">Primary Button</Button>
					<Button variant="outlined">Outlined Button</Button>
					<InputText
						label="Sample Input"
						placeholder="Type here..."
						styling={{ variant: "outlined" }}
					/>
					<Switch checked={true}>Enable feature</Switch>
				</div>
			</div>
		</div>
	</section>

	<section class="theming-guide">
		<Accordion
			content={{
				title: "Global Theme Override",
				subtitle: "Override default theme colors",
				content: `
					<div class="code-example">
						<h4>CSS Custom Properties</h4>
						<pre><code>:root &#123;
  /* Primary colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;
  
  /* Surface colors */
  --color-surface: #ffffff;
  --color-surface-secondary: #f8fafc;
  --color-surface-hover: #f1f5f9;
  
  /* Text colors */
  --color-text: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  
  /* Border colors */
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
  
  /* Status colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
&#125;</code></pre>
					</div>
				`
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: "Dark Mode Support",
				subtitle: "Built-in dark theme support",
				content: `
					<div class="code-example">
						<h4>Dark Theme Variables</h4>
						<pre><code>[data-theme="dark"] &#123;
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-active: #2563eb;
  
  --color-surface: #1f2937;
  --color-surface-secondary: #374151;
  --color-surface-hover: #4b5563;
  
  --color-text: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  
  --color-border: #4b5563;
  --color-border-hover: #6b7280;
&#125;</code></pre>
					</div>
				`
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: "Custom Themes",
				subtitle: "Create your own theme variants",
				content: `
					<div class="code-example">
						<h4>Corporate Theme Example</h4>
						<pre><code>[data-theme="corporate"] &#123;
  --color-primary: #1e40af;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e3a8a;
  
  --btn-bg-filled: var(--color-primary);
  --input-border-focus: var(--color-primary);
&#125;</code></pre>
						
						<h4>Apply Custom Theme</h4>
						<pre><code>document.documentElement.setAttribute('data-theme', 'corporate');</code></pre>
					</div>
				`
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: "Component-Specific Theming",
				subtitle: "Override styles for individual components",
				content: `
					<div class="code-example">
						<h4>Button Component Override</h4>
						<pre><code>.custom-button &#123;
  --btn-bg-filled: #dc2626;
  --btn-bg-filled-hover: #b91c1c;
  --btn-bg-filled-active: #991b1b;
  --btn-text-filled: #ffffff;
&#125;</code></pre>
						
						<h4>Input Component Override</h4>
						<pre><code>.custom-input &#123;
  --input-bg: #fef3c7;
  --input-border: #f59e0b;
  --input-border-focus: #d97706;
  --input-text: #92400e;
&#125;</code></pre>
					</div>
				`
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: "JavaScript Theme Switching",
				subtitle: "Programmatically change themes",
				content: `
					<div class="code-example">
						<h4>Theme Switcher Function</h4>
						<pre><code>function switchTheme(theme: string) &#123;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  localStorage.setItem('preferred-theme', theme);
&#125;

&lt;Button on:click=&#123;() =&gt; switchTheme('dark')&#125;&gt;
  Dark Theme
&lt;/Button&gt;
&lt;Button on:click=&#123;() =&gt; switchTheme('light')&#125;&gt;
  Light Theme
&lt;/Button&gt;</code></pre>
						
						<h4>System Preference Detection</h4>
						<pre><code>// Detect system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) &#123;
  document.documentElement.setAttribute('data-theme', 'dark');
&#125;

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) =&gt; &#123;
    if (e.matches) &#123;
      document.documentElement.setAttribute('data-theme', 'dark');
    &#125; else &#123;
      document.documentElement.removeAttribute('data-theme');
    &#125;
  &#125;);</code></pre>
					</div>
				`
			}}
			styling={{ variant: "outlined" }}
			behavior={{ showIcon: true }}
		/>
	</section>
</div>

<style>
	.theming-docs {
		max-width: 1000px;
		margin: 0 auto;
	}

	.docs-header {
		margin-bottom: 3rem;
		text-align: center;
		padding: 2rem 0;
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
		max-width: 600px;
		margin: 0 auto;
	}

	.theme-demo {
		margin-bottom: 3rem;
	}

	.theme-demo h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.demo-container {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 2rem;
	}

	.theme-controls {
		margin-bottom: 2rem;
	}

	.custom-controls {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.theme-preview {
		padding: 2rem;
		background: var(--color-surface-secondary, #f8fafc);
		border-radius: 0.5rem;
	}

	.theme-preview h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1.5rem;
		color: var(--color-text, #1f2937);
	}

	.preview-components {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	.theming-guide h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	:global(.code-example) {
		margin-bottom: 1.5rem;
	}

	:global(.code-example h4) {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--color-text, #1f2937);
	}

	:global(.code-example pre) {
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

	@media (max-width: 768px) {
		.docs-header h1 {
			font-size: 2.5rem;
		}

		.custom-controls {
			grid-template-columns: 1fr;
		}

		.preview-components {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
