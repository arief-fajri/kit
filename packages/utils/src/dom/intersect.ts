/**
 * Svelte action to detect when an element enters or leaves the viewport
 * @param node - The element to observe
 * @returns Action object with destroy method
 */
export function intersect(node: HTMLElement): { destroy(): void } {
	const options = { threshold: 0 };
	const intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? 'inViewport' : 'outViewport';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	}, options);

	intersectionObserver.observe(node);

	return {
		destroy() {
			intersectionObserver.unobserve(node);
			intersectionObserver.disconnect();
		}
	};
}
