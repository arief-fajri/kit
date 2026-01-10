<script lang="ts">
	import { Button, Accordion, InputText } from '@rief/kit';

	let copied = false;

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>Installation - Kit Component Library</title>
	<meta
		name="description"
		content="Learn how to install and set up Kit components in your project"
	/>
</svelte:head>

<div class="installation-guide">
	<header class="docs-header">
		<h1>Installation</h1>
		<p class="docs-description">
			Get started with Kit by installing the package and setting up your first components.
		</p>
	</header>

	<section class="installation-steps">
		<Accordion
			content={{
				title: 'Package Installation',
				subtitle: 'Install Kit via npm, yarn, or pnpm',
				content: `
					<div class="install-commands">
						<div class="command-group">
							<h4>npm</h4>
							<div class="command-line">
								<code>npm install @rief/kit</code>
								<button class="copy-btn" onclick="navigator.clipboard.writeText('npm install @rief/kit')">📋</button>
							</div>
						</div>
						<div class="command-group">
							<h4>yarn</h4>
							<div class="command-line">
								<code>yarn add @rief/kit</code>
								<button class="copy-btn" onclick="navigator.clipboard.writeText('yarn add @rief/kit')">📋</button>
							</div>
						</div>
						<div class="command-group">
							<h4>pnpm</h4>
							<div class="command-line">
								<code>pnpm add @rief/kit</code>
								<button class="copy-btn" onclick="navigator.clipboard.writeText('pnpm add @rief/kit')">📋</button>
							</div>
						</div>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'Basic Usage',
				subtitle: 'Import and use components in your Svelte app',
				content: `
					<div class="code-example">
						<h4>Component Import</h4>
						<pre><code>&lt;script&gt;
  import &#123; Button, InputText, Accordion &#125; from '@rief/kit';
&lt;/script&gt;

&lt;Button variant="filled"&gt;Click me&lt;/Button&gt;
&lt;InputText label="Name" placeholder="Enter your name" /&gt;
&lt;Accordion content=&#123;&#123; title: "Example", content: "Content here" &#125;&#125; /&gt;</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'Styling Setup',
				subtitle: 'Include default styles or customize your own',
				content: `
					<div class="code-example">
						<h4>Include Default Styles</h4>
						<pre><code>// In your main.js or App.svelte
import '@rief/kit/default-style.css';</code></pre>
						
						<h4>Or use your own styles</h4>
						<pre><code>// Skip importing default-style.css and use your own CSS variables
:root &#123;
  --color-primary: #your-color;
  --color-surface: #your-surface;
  /* ... other variables */
&#125;</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'TypeScript Support',
				subtitle: 'Full TypeScript support with type definitions',
				content: `
					<div class="code-example">
						<h4>TypeScript Example</h4>
						<pre><code>&lt;script lang="ts"&gt;
  import &#123; Button, type ButtonProps &#125; from '@rief/kit';
  
  let buttonProps: ButtonProps = &#123;
    variant: 'filled',
    size: 'lg',
    disabled: false
  &#125;;
&lt;/script&gt;

&lt;Button &#123;...buttonProps&#125;&gt;Typed Button&lt;/Button&gt;</code></pre>

						<h4>Available type exports</h4>
						<pre><code>import type &#123;
  // Button types
  ButtonProps, ButtonVariant, ButtonSize,
  
  // Input types  
  InputTextProps, InputType, InputSize,
  
  // Select types
  SelectOptionProps, SelectOptionItem,
  
  // And many more...
&#125; from '@rief/kit';</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'Custom Styling',
				subtitle: 'Override component styles with CSS',
				content: `
					<div class="code-example">
						<h4>Global Style Override</h4>
						<pre><code>&lt;style&gt;
  :global(.my-custom-button) &#123;
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
  &#125;
&lt;/style&gt;

&lt;Button className="my-custom-button"&gt;Custom Styled&lt;/Button&gt;</code></pre>

						<h4>CSS Variables Override</h4>
						<pre><code>&lt;style&gt;
  :global(.my-themed-button) &#123;
    --btn-bg-filled: #8b5cf6;
    --btn-bg-filled-hover: #7c3aed;
    --btn-text-filled: #ffffff;
  &#125;
&lt;/style&gt;</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'Tree Shaking & Bundle Size',
				subtitle: 'Optimize your bundle size with tree shaking',
				content: `
					<div class="code-example">
						<h4>Individual Component Imports</h4>
						<pre><code>// ✅ Good - only imports Button component
import &#123; Button &#125; from '@rief/kit';

// ❌ Avoid - imports entire library
import * as Kit from '@rief/kit';</code></pre>

						<h4>Conditional Style Loading</h4>
						<pre><code>&lt;script&gt;
  // Conditionally import styles
  if (typeof window !== 'undefined' && !document.querySelector('[data-kit-styles]')) &#123;
    import('@rief/kit/default-style.css');
    document.head.setAttribute('data-kit-styles', 'loaded');
  &#125;
&lt;/script&gt;</code></pre>

						<h4>Vite bundle analysis</h4>
						<pre><code># Add to vite.config.js
import &#123; visualizer &#125; from 'rollup-plugin-visualizer';

export default &#123;
  plugins: [
    svelte(),
    visualizer(&#123; filename: 'dist/stats.html' &#125;)
  ]
&#125;</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>

		<Accordion
			content={{
				title: 'SvelteKit Configuration',
				subtitle: 'Setup for SvelteKit projects',
				content: `
					<div class="code-example">
						<h4>SvelteKit Config</h4>
						<pre><code>// svelte.config.js
export default &#123;
  kit: &#123;
    adapter: adapter()
  &#125;
&#125;;</code></pre>

						<h4>App.html</h4>
						<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8" /&gt;
    &lt;link rel="icon" href="%sveltekit.assets%/favicon.png" /&gt;
    &lt;meta name="viewport" content="width=device-width" /&gt;
    %sveltekit.head%
  &lt;/head&gt;
  &lt;body data-sveltekit-preload-data="hover"&gt;
    &lt;div style="display: contents"&gt;%sveltekit.body%&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
					</div>
				`
			}}
			styling={{ variant: 'outlined' }}
			behavior={{ showIcon: true }}
		/>
	</section>

	<section class="next-steps">
		<h2>Next Steps</h2>
		<div class="next-steps-grid">
			<div class="step-card">
				<h3>Browse Components</h3>
				<p>Explore all available components and their APIs</p>
				<Button variant="outlined" href="/components/button">View Components →</Button>
			</div>
			<div class="step-card">
				<h3>Theming Guide</h3>
				<p>Learn how to customize colors and styles</p>
				<Button variant="outlined" href="/design-system/theming">Theming →</Button>
			</div>
			<div class="step-card">
				<h3>Playground</h3>
				<p>Try components interactively</p>
				<Button variant="outlined" href="/playground">Playground →</Button>
			</div>
		</div>
	</section>
</div>

<style>
	.installation-guide {
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

	.installation-steps {
		margin-bottom: 4rem;
	}

	.next-steps h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
		text-align: center;
	}

	.next-steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.step-card {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 2rem;
		text-align: center;
		transition: box-shadow 0.2s ease;
	}

	.step-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.step-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.step-card p {
		color: var(--color-text-secondary, #6b7280);
		margin: 0 0 1.5rem;
		line-height: 1.6;
	}

	:global(.install-commands) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(.command-group h4) {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--color-text, #1f2937);
	}

	:global(.command-line) {
		display: flex;
		align-items: center;
		background: #1f2937;
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		gap: 0.5rem;
	}

	:global(.command-line code) {
		flex: 1;
		color: #f9fafb;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		background: transparent;
	}

	:global(.copy-btn) {
		background: transparent;
		border: 1px solid #4b5563;
		color: #9ca3af;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.75rem;
		transition: all 0.2s ease;
	}

	:global(.copy-btn:hover) {
		background: #374151;
		color: #f9fafb;
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

		.next-steps-grid {
			grid-template-columns: 1fr;
		}

		:global(.install-commands) {
			gap: 1.5rem;
		}
	}
</style>
