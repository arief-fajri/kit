import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	// Initialize theme from localStorage or system preference
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
			set(savedTheme);
			document.documentElement.setAttribute('data-theme', savedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			set('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			set('light');
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				if (typeof window !== 'undefined') {
					document.documentElement.setAttribute('data-theme', newTheme);
					localStorage.setItem('theme', newTheme);
				}
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (typeof window !== 'undefined') {
				document.documentElement.setAttribute('data-theme', theme);
				localStorage.setItem('theme', theme);
			}
			set(theme);
		}
	};
}

export const theme = createThemeStore();
