<script lang="ts">
	import { sineOut } from 'svelte/easing';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import DragLine from '../drag-line/DragLine.svelte';
	import type {
		DrawerPosition,
		DrawerEventDetail,
		DrawerResizeEventDetail,
		DrawerStyling,
		DrawerBehavior
	} from '../types.js';

	// Core props
	export let visible: boolean = false;
	export let styling: DrawerStyling = {};
	export let behavior: DrawerBehavior = {};
	export let ariaLabel: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	// Computed props with defaults
	$: computedStyling = {
		className: styling?.className ?? '',
		style: styling?.style ?? '',
		bgPanel: styling?.bgPanel ?? 'var(--color-surface, #F6F6F6)'
	};

	$: computedBehavior = {
		position: behavior?.position ?? 'right',
		preventClose: behavior?.preventClose ?? false,
		isDraggable: behavior?.isDraggable ?? true,
		overlay: behavior?.overlay ?? true,
		closeOnEscape: behavior?.closeOnEscape ?? true
	};

	const dispatch = createEventDispatcher<{
		open: DrawerEventDetail;
		close: DrawerEventDetail & { reason: 'overlay' | 'escape' | 'programmatic' };
		resize: DrawerResizeEventDetail;
	}>();

	let drawerElm: HTMLDivElement | null = null;
	let initialWidth: number = 0;
	let drawerWidth: string | null = null;
	let previousFocusElement: HTMLElement | null = null;

	// Validate position
	$: validPosition = (['top', 'bottom', 'left', 'right', 'center'] as DrawerPosition[]).includes(
		computedBehavior.position
	)
		? computedBehavior.position
		: 'right';

	// Animation functions
	const fade = (
		_: any,
		{ delay = 0, duration = 300 }: { delay?: number; duration?: number } = {}
	) => ({
		duration,
		delay,
		easing: sineOut,
		css: (t: number) => `opacity: ${t};`
	});

	const grow = (_node: Element) => {
		const duration = validPosition === 'center' ? 300 : 200;
		const easing = sineOut;

		switch (validPosition) {
			case 'bottom':
				return {
					duration,
					easing,
					css: (_t: number, u: number) => `bottom: -${u * 100}%;`
				};
			case 'top':
				return {
					duration,
					easing,
					css: (_t: number, u: number) => `top: -${u * 100}%;`
				};
			case 'left':
				return {
					duration,
					easing,
					css: (_t: number, u: number) => `left: -${u * 100}%;`
				};
			case 'right':
				return {
					duration,
					easing,
					css: (_t: number, u: number) => `right: -${u * 100}%;`
				};
			case 'center':
				return {
					duration,
					easing,
					css: (t: number) => {
						const scale = 0.9 + t * 0.1;
						return `opacity: ${t}; transform: translate(-50%, -50%) scale(${scale});`;
					}
				};
		}
	};

	const getPanelStyle = (): string => {
		const styles: string[] = [];

		switch (validPosition) {
			case 'bottom':
				styles.push('bottom: 0', 'left: 0', 'right: 0', 'width: 100%');
				break;
			case 'top':
				styles.push('top: 0', 'left: 0', 'right: 0', 'width: 100%');
				break;
			case 'left':
				styles.push('top: 0', 'bottom: 0', 'left: 0');
				break;
			case 'right':
				styles.push('top: 0', 'bottom: 0', 'right: 0');
				break;
			case 'center':
				styles.push('top: 50%', 'left: 50%', 'transform: translate(-50%, -50%)');
				break;
		}

		return styles.join('; ');
	};

	// Handle close
	const handleClose = (reason: 'overlay' | 'escape' | 'programmatic' = 'programmatic') => {
		if (computedBehavior.preventClose && reason !== 'programmatic') return;

		visible = false;
		dispatch('close', {
			position: validPosition,
			timestamp: Date.now(),
			reason
		});

		// Restore focus
		if (previousFocusElement) {
			previousFocusElement.focus();
			previousFocusElement = null;
		}
	};

	// Handle overlay click
	const handleOverlayClick = () => {
		handleClose('overlay');
	};

	// Handle keyboard events
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && visible && computedBehavior.closeOnEscape) {
			e.preventDefault();
			handleClose('escape');
		}
		trapFocus(e);
	};

	// Handle drag start
	const handleDragStart = () => {
		if (['left', 'right'].includes(validPosition) && drawerElm) {
			initialWidth = drawerElm.offsetWidth;
		}
	};

	// Handle dragging
	const handleDragging = (e: CustomEvent) => {
		if (validPosition === 'right' && drawerElm) {
			const newWidth = initialWidth - (e.detail.diffX || 0);
			drawerWidth = `${newWidth}px`;

			dispatch('resize', {
				position: validPosition,
				timestamp: Date.now(),
				width: newWidth
			});
		} else if (validPosition === 'left' && drawerElm) {
			const newWidth = initialWidth + (e.detail.diffX || 0);
			drawerWidth = `${newWidth}px`;

			dispatch('resize', {
				position: validPosition,
				timestamp: Date.now(),
				width: newWidth
			});
		}
	};

	// Handle drag stop
	const handleDragStop = () => {
		// Drag stop handler - can be extended for persistence
	};

	// Computed class name for position
	$: positionClass = `drawer-panel--${validPosition}`;

	// Focus trap functionality
	const trapFocus = (e: KeyboardEvent) => {
		if (!visible || !drawerElm) return;

		const focusableElements = drawerElm.querySelectorAll(
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);

		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
	};

	// Watch for visibility changes
	$: if (visible) {
		// Store previous focus element
		previousFocusElement = document.activeElement as HTMLElement;

		// Focus first element in drawer
		setTimeout(() => {
			if (drawerElm) {
				const firstFocusable = drawerElm.querySelector(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
				) as HTMLElement;
				firstFocusable?.focus();
			}
		}, 100);

		// Dispatch open event
		dispatch('open', {
			position: validPosition,
			timestamp: Date.now()
		});
	}

	// Reactive width update
	$: if (drawerWidth && drawerElm && ['left', 'right'].includes(validPosition)) {
		drawerElm.style.width = drawerWidth;
	}

	// Setup keyboard listener
	onMount(() => {
		window?.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window?.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if visible}
	{#if computedBehavior.overlay}
		<div
			class="drawer-overlay"
			role="presentation"
			aria-hidden="true"
			in:fade
			out:fade={{ delay: 200 }}
			on:click={handleOverlayClick}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleOverlayClick();
				}
			}}
			tabindex="-1"
		/>
	{/if}
	<div
		class="drawer-panel {positionClass} {computedStyling.className}"
		style="background: {computedStyling.bgPanel}; {getPanelStyle()}; {computedStyling.style || ''}"
		bind:this={drawerElm}
		role="dialog"
		aria-modal="true"
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedBy}
		transition:grow
	>
		<slot />
		{#if computedBehavior.isDraggable && ['left', 'right'].includes(validPosition)}
			<div class="drawer-handle drawer-handle--{validPosition}">
				<DragLine
					on:dragstart={handleDragStart}
					on:dragging={handleDragging}
					on:dragstop={handleDragStop}
				>
					<div class="drawer-handle-indicator">
						<div class="drawer-handle-line" />
					</div>
				</DragLine>
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.drawer-overlay {
		--drawer-overlay-bg: rgba(55, 53, 60, 0.5);
		--drawer-overlay-blur: 4px;
		--drawer-overlay-z-index: 1000;

		background-color: var(--drawer-overlay-bg);
		backdrop-filter: blur(var(--drawer-overlay-blur));
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: var(--drawer-overlay-z-index);
		cursor: pointer;
	}

	.drawer-panel {
		--drawer-z-index: 1000;
		--drawer-min-width: 320px;
		--drawer-max-width: 90%;
		--drawer-min-height: 4rem;
		--drawer-border-radius: 12px;
		--drawer-handle-width: 6px;

		position: fixed;
		z-index: var(--drawer-z-index);
		max-height: 100vh;
		max-width: 100vw;
		min-width: var(--drawer-min-width);
		max-width: var(--drawer-max-width);
		min-height: var(--drawer-min-height);
		user-select: none;
	}

	.drawer-panel--bottom {
		border-top-left-radius: var(--drawer-border-radius);
		border-top-right-radius: var(--drawer-border-radius);
	}

	.drawer-panel--top {
		border-bottom-left-radius: var(--drawer-border-radius);
		border-bottom-right-radius: var(--drawer-border-radius);
	}

	.drawer-panel--center {
		border-radius: var(--drawer-border-radius);
		max-width: 90vw;
		max-height: 90vh;
	}

	.drawer-handle {
		position: absolute;
		top: 0;
		width: var(--drawer-handle-width);
		height: 100%;
		z-index: 100;
		user-select: none;
		cursor: ew-resize;
	}

	.drawer-handle--left {
		right: 0;
	}

	.drawer-handle--right {
		left: 0;
	}

	.drawer-handle-indicator {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 2.5px 6px;
		background: white;
		border: 1px solid var(--color-primary-200, #bfdbfe);
		border-radius: 4px;
	}

	.drawer-handle-line {
		width: 1px;
		height: 28px;
		background: var(--color-primary-200, #bfdbfe);
	}
</style>
