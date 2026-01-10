<script lang="ts">
	import { Button, Card } from '@rief/kit';
</script>

<svelte:head>
	<title>@rief/kit - Svelte Component Library</title>
</svelte:head>

<div class="space-y-6 md:space-y-8">
	<div class="text-center py-8 md:py-12">
		<h1 class="text-3xl md:text-5xl font-bold mb-4">@rief/kit</h1>
		<p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 md:mb-8">
			A modern Svelte component library built with TypeScript
		</p>
		<div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
			<Button
				label="Get Started"
				styling={{ variant: 'filled', size: 'lg' }}
				behavior={{ href: '/getting-started/installation' }}
			/>
			<Button
				label="View Components"
				styling={{ variant: 'outlined', size: 'lg' }}
				behavior={{ href: '/components/button' }}
			/>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
		<Card styling={{ variant: 'default', padding: 'md' }}>
			<h3 class="text-xl font-semibold mb-2">🎨 Beautiful Components</h3>
			<p class="text-gray-600 dark:text-gray-400">
				Pre-built, accessible components ready to use in your Svelte applications.
			</p>
		</Card>

		<Card styling={{ variant: 'default', padding: 'md' }}>
			<h3 class="text-xl font-semibold mb-2">🔧 TypeScript First</h3>
			<p class="text-gray-600 dark:text-gray-400">
				Full TypeScript support with comprehensive type definitions for all components.
			</p>
		</Card>

		<Card styling={{ variant: 'default', padding: 'md' }}>
			<h3 class="text-xl font-semibold mb-2">♿ Accessible</h3>
			<p class="text-gray-600 dark:text-gray-400">
				Built with accessibility in mind, following WCAG guidelines.
			</p>
		</Card>
	</div>
</div>
