<script lang="ts">
	import CodeBlock from '../../../lib/components/CodeBlock.svelte';
	import { codeExamples } from '../../../lib/utils/code-examples';
</script>

<svelte:head>
	<title>Installation - @rief/kit</title>
</svelte:head>

<div class="space-y-8">
	<h1 class="text-4xl font-bold">Installation</h1>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Install Package</h2>
		<p class="mb-4 text-gray-700 dark:text-gray-300">
			Install @rief/kit using your preferred package manager:
		</p>
		<CodeBlock code={codeExamples.installation.install} language="bash" />
	</section>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Peer Dependencies</h2>
		<p class="mb-4 text-gray-700 dark:text-gray-300">
			Make sure you have Svelte 4.0.0 or higher installed:
		</p>
		<CodeBlock code={codeExamples.installation.peerDependency} language="bash" />
	</section>

	<section>
		<h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
		<p class="mb-4 text-gray-700 dark:text-gray-300">Import and use components:</p>
		<CodeBlock code={codeExamples.installation.usage} language="svelte" />
	</section>
</div>
