<script lang="ts">
	import type { PropRow } from './types';

	export let title: string;
	export let rows: PropRow[] = [];
</script>

<div>
	<h3 class="text-lg font-semibold mb-3">{title}</h3>
	<div class="overflow-x-auto">
		<table class="w-full border-collapse border border-gray-300 dark:border-gray-700">
			<thead>
				<tr class="bg-gray-100 dark:bg-gray-800">
					<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Prop</th>
					<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
					<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Default</th>
					<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">
							<code class="text-sm">{row.prop}</code>
						</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">
							<code class="text-sm">{row.type}</code>
						</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">
							<code class="text-sm">{row.default}</code>
						</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{row.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
