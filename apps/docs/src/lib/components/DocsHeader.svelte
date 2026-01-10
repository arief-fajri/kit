<script lang="ts">
	import { Button, InputText } from "@rief/kit";
	import { theme } from "../stores/theme";
	import { page } from "$app/stores";

	let searchValue = "";
	$: isDark =
		$theme === "dark" ||
		($theme === "system" &&
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	function toggleTheme() {
		$theme = $theme === "light" ? "dark" : "light";
	}
</script>

<header
	class="sticky top-0 z-50 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
>
	<div class="w-full px-4 py-3 flex items-center justify-between gap-4">
		<a href="/" class="text-xl font-bold text-gray-900 dark:text-white"> @rief/kit </a>
		<div class="flex-1 max-w-md">
			<InputText
				value={searchValue}
				placeholder="Search components..."
				styling={{ size: "sm", variant: "default" }}
				on:input={(e) => (searchValue = e?.detail || "")}
			/>
		</div>
		<div class="flex items-center gap-2">
			<Button
				label={isDark ? "☀️" : "🌙"}
				styling={{ variant: "text", size: "sm" }}
				on:click={toggleTheme}
				ariaLabel="Toggle theme"
			/>

			<a
				href="https://github.com/rief/kit"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
			>
				GitHub
			</a>
		</div>
	</div>
</header>

<style>
	:global(html.dark) {
		color-scheme: dark;
	}
</style>
