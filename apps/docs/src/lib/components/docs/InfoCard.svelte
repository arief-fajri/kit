<script lang="ts">
	import { Card } from '@rief/kit';

	export let description: string;
</script>

<Card styling={{ padding: 'md' }}>
	<div class="space-y-4 w-full">
		<p class="text-gray-700 dark:text-gray-300">{description}</p>
		<slot />
	</div>
</Card>
