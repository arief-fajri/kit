<script lang="ts">
	import { Button, Card } from '@rief/kit';
	import CodeBlock from '../../../lib/components/CodeBlock.svelte';
	import { codeExamples } from '../../../lib/utils/code-examples';
</script>

<svelte:head>
	<title>Button - @rief/kit</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-4xl font-bold mb-4">Button</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			Versatile button component with multiple variants, sizes, and states.
		</p>
	</div>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Features</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>Multiple variants: filled, outlined, text, link</li>
			<li>Size options: sm, md, lg, xl</li>
			<li>Loading states</li>
			<li>Disabled states</li>
			<li>Full TypeScript support</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Examples</h2>

		<div class="space-y-6">
			<div>
				<h3 class="text-xl font-semibold mb-3">Basic</h3>
				<Card styling={{ padding: 'md' }}>
					<Button label="Click me" />
				</Card>
				<CodeBlock code={codeExamples.button.basic} language="svelte" />
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Variants</h3>
				<Card styling={{ padding: 'md' }}>
					<div class="flex gap-4 flex-wrap">
						<Button label="Filled" styling={{ variant: 'filled' }} />
						<Button label="Outlined" styling={{ variant: 'outlined' }} />
						<Button label="Text" styling={{ variant: 'text' }} />
					</div>
				</Card>
				<CodeBlock code={codeExamples.button.variants} language="svelte" />
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Sizes</h3>
				<Card styling={{ padding: 'md' }}>
					<div class="flex gap-4 items-center flex-wrap">
						<Button label="Small" styling={{ size: 'sm' }} />
						<Button label="Medium" styling={{ size: 'md' }} />
						<Button label="Large" styling={{ size: 'lg' }} />
					</div>
				</Card>
				<CodeBlock code={codeExamples.button.sizes} language="svelte" />
			</div>
		</div>
	</section>
</div>
