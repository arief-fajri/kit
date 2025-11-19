/**
 * Svelte action to detect clicks outside an element
 * @param node - The element to detect outside clicks for
 * @returns Action object with destroy method
 */
export function clickOutside(node: HTMLElement) {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick', { detail: event }));
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

