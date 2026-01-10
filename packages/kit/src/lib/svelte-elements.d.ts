import 'svelte/elements';

declare module 'svelte/elements' {
	export interface DOMAttributes<T extends EventTarget> {
		'on:outclick'?: (event: CustomEvent<MouseEvent>) => void;
	}
}
