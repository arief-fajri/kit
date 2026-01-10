<script lang="ts">
	import PropsTable from './PropsTable.svelte';
	import type { APISection } from './types';

	export let sections: APISection[] = [];
</script>

<div class="space-y-6">
	{#each sections as section}
		<PropsTable title={section.title} rows={section.rows} />
	{/each}
</div>
