/**
 * Svelte action to portal an element to document.body
 * @param node - The element to portal
 * @returns Action object with destroy method
 */
export function portal(node: HTMLElement): { destroy(): void } {
  const target = document.body;
  
  function update(): void {
    target.appendChild(node);
  }
  
  function destroy(): void {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  
  update();
  
  return {
    destroy
  };
}
