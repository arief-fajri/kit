<script lang="ts">
	export let title: string;
	export let level: 1 | 2 | 3 = 2;
</script>

<section>
	{#if level === 1}
		<h1 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{title}</h1>
	{:else if level === 2}
		<h2 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{title}</h2>
	{:else}
		<h3 class="text-lg font-semibold mb-3">{title}</h3>
	{/if}
	<slot />
</section>
