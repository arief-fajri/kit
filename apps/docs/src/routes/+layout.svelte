<script lang="ts">
	import { BaseLayoutWrapper, PageWrapper, SidebarWrapper, Drawer } from "@rief/kit";
	import "@rief/kit/default-style.css";
	import DocsHeader from "../lib/components/DocsHeader.svelte";
	import DocsSidebar from "../lib/components/DocsSidebar.svelte";
	import "../app.css";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	let mounted = false;
	let isMobile = false;
	let sidebarOpen = false;

	function checkMobile() {
		if (browser) {
			isMobile = window.innerWidth < 768;
			if (isMobile) {
				sidebarOpen = false;
			}
		}
	}

	onMount(() => {
		mounted = true;
		checkMobile();
		if (browser) {
			window.addEventListener("resize", checkMobile);
			return () => window.removeEventListener("resize", checkMobile);
		}
	});
</script>

{#if mounted}
	<BaseLayoutWrapper styling={{ bodyStyle: `height: calc(100% - ${isMobile ? 98 : 57}px)` }}>
		<svelte:fragment slot="header">
			<DocsHeader {isMobile} bind:sidebarOpen />
		</svelte:fragment>
		<svelte:fragment slot="body">
			{#if isMobile}
				<Drawer
					visible={sidebarOpen}
					behavior={{
						position: "left",
						overlay: true,
						closeOnEscape: true,
						isDraggable: false
					}}
					on:close={() => (sidebarOpen = false)}
				>
					<DocsSidebar />
				</Drawer>
			{:else}
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
			{/if}
			<PageWrapper styling={{ style: "background: transparent" }}>
				<main class="p-4 md:p-8 max-w-5xl mx-auto">
					<slot />
				</main>
			</PageWrapper>
		</svelte:fragment>
	</BaseLayoutWrapper>
{/if}
