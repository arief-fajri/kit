<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import type { DragLineProps, DragLineEventDetail } from '../types.js';

	const dispatch = createEventDispatcher<{
		dragstart: DragLineEventDetail;
		dragging: DragLineEventDetail & { diffX: number; diffY: number };
		dragstop: DragLineEventDetail;
	}>();

	// Core props
	export let styling: DragLineProps['styling'] = {};
	export let behavior: DragLineProps['behavior'] = {};
	export let ariaLabel: DragLineProps['ariaLabel'] = undefined;
	export let ariaDescribedBy: DragLineProps['ariaDescribedBy'] = undefined;

	// Computed props with defaults
	$: computedStyling = {
		className: styling?.className ?? '',
		style: styling?.style ?? '',
		zIndex: styling?.zIndex ?? 101
	};

	$: computedBehavior = {
		disabled: behavior?.disabled ?? false,
		tolerance: behavior?.tolerance ?? 0,
		isVertical: behavior?.isVertical ?? false
	};

	let elem: HTMLElement;
	let startX = 0;
	let startY = 0;
	let shiftX = 0;
	let shiftY = 0;
	let isDragging = false;

	function getClientCoordinates(e: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
		if (e instanceof TouchEvent && e.touches.length > 0) {
			return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
		}
		if (e instanceof MouseEvent) {
			return { clientX: e.clientX, clientY: e.clientY };
		}
		return { clientX: 0, clientY: 0 };
	}

	function dragInit(e: MouseEvent | TouchEvent) {
		if (computedBehavior.disabled) return;

		e.stopPropagation();

		const coords = getClientCoordinates(e);
		startX = coords.clientX;
		startY = coords.clientY;
		shiftX = coords.clientX - elem.offsetLeft;
		shiftY = coords.clientY - elem.offsetTop;

		document.addEventListener('touchmove', onMove);
		document.addEventListener('mousemove', onMove);
		document.addEventListener('touchend', onStop);
		document.addEventListener('mouseup', onStop);
	}

	function onStop(e: MouseEvent | TouchEvent) {
		if (isDragging) {
			e.preventDefault();
			isDragging = false;
			elem.classList.remove('no-pointer-events');
			dispatch('dragstop', { event: e, elem: elem });
		}

		document.removeEventListener('touchmove', onMove);
		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('touchend', onStop);
		document.removeEventListener('mouseup', onStop);
	}

	function onMove(e: MouseEvent | TouchEvent) {
		const coords = getClientCoordinates(e);
		const diffX = coords.clientX - startX;
		const diffY = coords.clientY - startY;
		const left = coords.clientX - shiftX;
		const top = coords.clientY - shiftY;
		const toleranceValue = computedBehavior.tolerance ?? 0;

		if (
			!isDragging &&
			Math.abs(left - elem.offsetLeft) < toleranceValue &&
			Math.abs(top - elem.offsetTop) < toleranceValue
		) {
			return;
		}

		e.preventDefault();

		if (!isDragging) {
			isDragging = true;
			elem.classList.add('no-pointer-events');
			dispatch('dragstart', { event: e, elem: elem });
		}

		dispatch('dragging', { event: e, elem: elem, diffX: diffX, diffY: diffY });
	}

	// Cleanup on component destroy
	onDestroy(() => {
		if (isDragging) {
			document.removeEventListener('touchmove', onMove);
			document.removeEventListener('mousemove', onMove);
			document.removeEventListener('touchend', onStop);
			document.removeEventListener('mouseup', onStop);
		}
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	bind:this={elem}
	class="dragline {computedStyling.className}"
	class:dragging={isDragging}
	class:isVertical={computedBehavior.isVertical}
	class:disabled={computedBehavior.disabled}
	style="z-index: var(--dragline-z-index, {computedStyling.zIndex}); {computedStyling.style || ''}"
	role="separator"
	aria-orientation={computedBehavior.isVertical ? 'vertical' : 'horizontal'}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedBy}
	aria-disabled={computedBehavior.disabled}
	on:mousedown={(e) => {
		if (!computedBehavior.disabled && e.button === 0) {
			dragInit(e);
		}
	}}
	on:touchstart={(e) => {
		if (!computedBehavior.disabled) {
			dragInit(e);
		}
	}}
>
	<slot />
</div>

<style lang="postcss">
	.dragline {
		position: relative;
		left: 0;
		top: 0;
		padding: 0;
		background: none;
		cursor: var(--dragline-cursor-horizontal, ew-resize);
		box-sizing: content-box;
		width: 100%;
		height: 100%;
		opacity: var(--dragline-opacity, 1);
		transition: var(--dragline-transition, opacity 0.2s ease);
	}

	.dragline.isVertical {
		cursor: var(--dragline-cursor-vertical, ns-resize);
	}

	.dragline.dragging {
		opacity: var(--dragline-dragging-opacity, var(--dragline-opacity, 1));
	}

	.dragline.disabled {
		cursor: not-allowed;
		opacity: var(--dragline-disabled-opacity, 0.5);
		pointer-events: none;
	}

	.dragline:hover:not(.disabled) {
		opacity: var(--dragline-hover-opacity, var(--dragline-opacity, 1));
	}
</style>
