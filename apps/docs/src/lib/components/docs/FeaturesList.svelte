<script lang="ts">
	export let features: string[] = [];
</script>

<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
	{#each features as feature}
		<li>{feature}</li>
	{/each}
</ul>
