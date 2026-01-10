<script lang="ts">
	import CodeBlock from '../CodeBlock.svelte';

	export let title: string;
	export let code: string;
	export let language: string = 'svelte';
</script>

<div>
	<h3 class="text-lg font-semibold mb-3">{title}</h3>
	<CodeBlock {code} {language} />
</div>
