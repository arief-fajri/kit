<script lang="ts">
	import { Card } from '@rief/kit';
	import CodeBlock from '../CodeBlock.svelte';

	export let title: string;
	export let code: string;
	export let language: string = 'svelte';
	export let previewClassName: string = '';
</script>

<div>
	<h3 class="text-lg font-semibold mb-3">{title}</h3>
	<Card styling={{ padding: 'md', className: '!rounded-b-none' }}>
		<div class="flex flex-wrap gap-3 {previewClassName}">
			<slot name="preview" />
		</div>
	</Card>
	<CodeBlock className="rounded-b-lg" {code} {language} />
</div>
