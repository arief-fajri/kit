<script lang="ts">
	import { Accordion } from '@rief/kit';
	import type { NavItem } from '../data/navigation';
	import { navigation } from '../data/navigation';
	import { page } from '$app/stores';

	function isActive(href?: string): boolean {
		if (!href) return false;
		return $page.url.pathname === href;
	}

	function hasActiveChild(items?: NavItem[]): boolean {
		if (!items) return false;
		return items.some((item) => isActive(item.href) || hasActiveChild(item.items));
	}

</script>

<aside class="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto">
	<nav class="space-y-2">
		{#each navigation as section}
			{#if section.items}
				<div class="mb-4">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2 px-2">{section.title}</h3>
					<ul class="space-y-1">
						{#each section.items as item}
							{#if item.items}
								<li class="mb-2">
									<span class="text-sm font-medium text-gray-700 dark:text-gray-300 px-2 block">
										{item.title}
									</span>
									<ul class="mt-1 space-y-1 pl-4">
										{#each item.items as subItem}
											<li>
												<a
													href={subItem.href}
													class="block px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-800 {isActive(
														subItem.href
													)
														? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
														: 'text-gray-600 dark:text-gray-400'}"
												>
													{subItem.title}
												</a>
											</li>
										{/each}
									</ul>
								</li>
							{:else}
								<li>
									<a
										href={item.href}
										class="block px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-800 {isActive(
											item.href
										)
											? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
											: 'text-gray-600 dark:text-gray-400'}"
									>
										{item.title}
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			{:else}
				<a
					href={section.href}
					class="block px-2 py-2 font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
				>
					{section.title}
				</a>
			{/if}
		{/each}
	</nav>
</aside>
