<script lang="ts">
	import { Button, InputText } from '@rief/kit';
	import { theme } from '../stores/theme';
	import { page } from '$app/stores';

	export let isMobile = false;
	export let sidebarOpen = false;

	let searchValue = '';
	$: isDark =
		$theme === 'dark' ||
		($theme === 'system' &&
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches);

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<header
	class="sticky top-0 z-50 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
>
	<div class="w-full px-3 md:px-4 py-3 flex items-center justify-between gap-2 md:gap-4">
		<div class="flex items-center gap-2 md:gap-4">
			{#if isMobile}
				<Button
					label="☰"
					styling={{ variant: 'text', size: 'sm' }}
					on:click={toggleSidebar}
					ariaLabel="Toggle navigation menu"
				/>
			{/if}
			<a href="/" class="text-lg md:text-xl font-bold text-gray-900 dark:text-white"> @rief/kit </a>
		</div>
		<div class="hidden sm:flex flex-1 max-w-md mx-4">
			<InputText
				value={searchValue}
				placeholder="Search components..."
				styling={{ size: 'sm', variant: 'default' }}
				on:input={(e) => (searchValue = e?.detail || '')}
			/>
		</div>
		<div class="flex items-center gap-1 md:gap-2 flex-shrink-0">
			<Button
				label={isDark ? '☀️' : '🌙'}
				styling={{ variant: 'text', size: 'sm' }}
				on:click={toggleTheme}
				ariaLabel="Toggle theme"
			/>
			<a
				href="https://github.com/arief-fajri/kit"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden sm:inline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm md:text-base"
			>
				GitHub
			</a>
		</div>
	</div>
	{#if isMobile}
		<div class="px-3 pb-2 sm:hidden transition-all duration-200">
			<InputText
				value={searchValue}
				placeholder="Search..."
				styling={{ size: 'sm', variant: 'default' }}
				on:input={(e) => (searchValue = e?.detail || '')}
			/>
		</div>
	{/if}
</header>

<style>
	:global(html.dark) {
		color-scheme: dark;
	}
</style>
