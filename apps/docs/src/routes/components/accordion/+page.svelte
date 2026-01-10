<script lang="ts">
	import { Accordion, Card } from '@rief/kit';
	import CodeBlock from '../../../lib/components/CodeBlock.svelte';
	import { codeExamples } from '../../../lib/utils/code-examples';
</script>

<svelte:head>
	<title>Accordion - @rief/kit</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-4xl font-bold mb-4">Accordion</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			Collapsible content sections for organizing information.
		</p>
	</div>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Features</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>Flexible content with props or slots</li>
			<li>Controlled and uncontrolled modes</li>
			<li>Smooth animations</li>
			<li>Keyboard navigation and accessibility</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Examples</h2>

		<div class="space-y-6">
			<div>
				<h3 class="text-xl font-semibold mb-3">Basic</h3>
				<Card styling={{ padding: 'md' }}>
					<div class="space-y-2">
						<Accordion
							content={{
								title: 'What is @rief/kit?',
								content: '<p class="text-gray-600 dark:text-gray-400">@rief/kit is a modern Svelte component library built with TypeScript.</p>'
							}}
						/>
						<Accordion
							content={{
								title: 'How do I install it?',
								content: '<p class="text-gray-600 dark:text-gray-400">Install via npm: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm install @rief/kit</code></p>'
							}}
						/>
						<Accordion
							content={{
								title: 'Is it free?',
								content: '<p class="text-gray-600 dark:text-gray-400">Yes, it\'s open source and free to use.</p>'
							}}
						/>
					</div>
				</Card>
				<CodeBlock code={codeExamples.accordion.basic} language="svelte" />
			</div>
		</div>
	</section>
</div>
