<script lang="ts">
	import { BaseLayoutWrapper, PageWrapper, SidebarWrapper } from "@rief/kit";
	import "@rief/kit/default-style.css";
	import DocsHeader from "../lib/components/DocsHeader.svelte";
	import DocsSidebar from "../lib/components/DocsSidebar.svelte";
	import "../app.css";
	import { onMount } from "svelte";

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<BaseLayoutWrapper styling={{ bodyStyle: "height: calc(100% - 57px)" }}>
		<svelte:fragment slot="header">
			<DocsHeader />
		</svelte:fragment>
		<svelte:fragment slot="body">
			<SidebarWrapper
				behavior={{
					collapsed: false,
					isDraggable: false,
					defaultWidth: 256,
					minWidth: 200,
					maxWidth: "400px"
				}}
			>
				<DocsSidebar />
			</SidebarWrapper>
			<PageWrapper styling={{ style: "background: transparent" }}>
				<main class="p-8 max-w-4xl mx-auto">
					<slot />
				</main>
			</PageWrapper>
		</svelte:fragment>
	</BaseLayoutWrapper>
{/if}
