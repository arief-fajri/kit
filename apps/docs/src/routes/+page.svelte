<script lang="ts">
	import { Button, Accordion, InputText, Checkbox, Switch, DatePicker } from '@rief/kit';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	let emailValue = '';
	let isChecked = false;
	let isSwitched = false;
	let singleDate: Date | null = null;
</script>

<svelte:head>
	<title>Kit Component Library</title>
	<meta
		name="description"
		content="A modern, accessible Svelte component library built with TypeScript"
	/>
</svelte:head>

<div class="w-full">
	<header class="hero">
		<h1>Kit Component Library</h1>
		<p class="subtitle">A modern, accessible Svelte component library built with TypeScript</p>
		<div class="hero-actions">
			<a href="/getting-started/installation">
				<Button variant="filled" size="lg">Get Started</Button>
			</a>
			<a href="/components/button">
				<Button variant="outlined" size="lg">Browse Components</Button>
			</a>
		</div>
	</header>

	<section class="features">
		<h2>Key Features</h2>
		<div class="feature-grid">
			<Accordion
				content={{
					title: 'TypeScript First',
					subtitle: 'Built with full TypeScript support',
					content: '<p>Complete type safety with IntelliSense support and auto-completion.</p>'
				}}
				styling={{ variant: 'outlined' }}
				behavior={{ showIcon: true }}
			/>
			<Accordion
				content={{
					title: 'Accessible',
					subtitle: 'WCAG compliant components',
					content:
						'<p>All components follow accessibility best practices and support keyboard navigation.</p>'
				}}
				styling={{ variant: 'outlined' }}
				behavior={{ showIcon: true }}
			/>
			<Accordion
				content={{
					title: 'Customizable',
					subtitle: 'Flexible theming system',
					content: '<p>Easy to customize with CSS variables and global configuration options.</p>'
				}}
				styling={{ variant: 'outlined' }}
				behavior={{ showIcon: true }}
			/>
		</div>
	</section>

	<section class="quick-start">
		<h2>Quick Start</h2>
		<CodeBlock code="npm install @rief/kit" language="bash" />
		<CodeBlock
			code={`<script>
  import { Button, InputText } from '@rief/kit';
</script>

<Button variant="filled">Click me</Button>
<InputText label="Name" placeholder="Enter your name" />`}
			language="svelte"
		/>
	</section>

	<section class="components-preview">
		<h2>Components in Action</h2>
		<div class="component-grid">
			<div class="component-card">
				<h3>Button</h3>
				<div class="component-demo">
					<Button variant="filled">Filled</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="text">Text</Button>
				</div>
				<a href="/components/button" class="component-link">View Documentation →</a>
			</div>

			<div class="component-card">
				<h3>InputText</h3>
				<div class="component-demo">
					<InputText label="Email" type="email" bind:value={emailValue} />
				</div>
				<a href="/components/input-text" class="component-link">View Documentation →</a>
			</div>

			<div class="component-card">
				<h3>Checkbox & Switch</h3>
				<div class="component-demo">
					<Checkbox label="Agree to terms" bind:checked={isChecked} />
					<Switch label="Enable feature" bind:checked={isSwitched} />
				</div>
				<a href="/components/checkbox" class="component-link">View Documentation →</a>
			</div>

			<div class="component-card">
				<h3>DatePicker</h3>
				<div class="component-demo">
					<DatePicker mode="single" bind:value={singleDate} />
				</div>
				<a href="/components/date-picker" class="component-link">View Documentation →</a>
			</div>
		</div>
	</section>
</div>

<style>
	.overview {
		padding: 2rem;
		/* max-width: 1200px; */
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		padding: 4rem 0;
		margin-bottom: 4rem;
	}

	.hero h1 {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0 0 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.hero-actions a {
		text-decoration: none;
	}

	.features h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.quick-start h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.components-preview h2 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 2rem;
		color: var(--color-text, #1f2937);
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.component-card {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		padding: 1.5rem;
		transition: box-shadow 0.2s ease;
	}

	.component-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.component-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: var(--color-text, #1f2937);
	}

	.component-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
		min-height: 120px;
	}

	.component-link {
		color: var(--color-primary, #3b82f6);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.component-link:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.overview {
			padding: 1rem;
		}

		.hero h1 {
			font-size: 2.5rem;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.feature-grid,
		.component-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
