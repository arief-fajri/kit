import { writable } from "svelte/store";
import { browser } from "$app/environment";

type Theme = "light" | "dark" | "system";

// function createThemeStore() {
// 	const { subscribe, set, update } = writable("dark");

// 	return {
// 		subscribe,
// 		set: (theme: string) => {
// 			if (browser) {
// 				localStorage.setItem("theme", theme);
// 				document.documentElement.setAttribute("data-theme", theme);
// 			}
// 			set(theme);
// 		},
// 		toggle: () => {
// 			update((current) => {
// 				const newTheme = current === "dark" ? "light" : "dark";
// 				if (browser) {
// 					localStorage.setItem("theme", newTheme);
// 					document.documentElement.setAttribute("data-theme", newTheme);
// 				}
// 				return newTheme;
// 			});
// 		},
// 		init: () => {
// 			if (browser) {
// 				const stored = localStorage.getItem("theme") || "dark";
// 				document.documentElement.setAttribute("data-theme", stored);
// 				set(stored);
// 			}
// 		}
// 	};
// }

// export const theme = createThemeStore();

function getInitialTheme(): Theme {
	if (!browser) return "system";
	const stored = localStorage.getItem("theme") as Theme;
	return stored || "system";
}

function getSystemTheme(): "light" | "dark" {
	if (!browser) return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
	if (!browser) return;
	const actualTheme = theme === "system" ? getSystemTheme() : theme;
	document.documentElement.classList.toggle("dark", actualTheme === "dark");
	document.documentElement.setAttribute("data-theme", actualTheme);
}

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem("theme", value);
		applyTheme(value);
	}
});

if (browser) {
	applyTheme(getInitialTheme());
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
		theme.update((t) => {
			if (t === "system") applyTheme("system");
			return t;
		});
	});
}
