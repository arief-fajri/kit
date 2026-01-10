<script lang="ts">
	import { page } from '$app/stores';

	function getBreadcrumbs(pathname: string) {
		// Don't show breadcrumbs on home page
		if (pathname === '/') {
			return [];
		}

		const segments = pathname.split('/').filter(Boolean);
		const breadcrumbs: Array<{ title: string; href: string }> = [{ title: 'Home', href: '/' }];

		let currentPath = '';
		for (const segment of segments) {
			currentPath += `/${segment}`;
			const title = segment
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
			breadcrumbs.push({ title, href: currentPath });
		}

		return breadcrumbs;
	}

	$: breadcrumbs = getBreadcrumbs($page.url.pathname);
</script>

{#if breadcrumbs.length > 0}
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<ol class="breadcrumb-list">
			{#each breadcrumbs as crumb, index}
				<li class="breadcrumb-item">
					{#if index === breadcrumbs.length - 1}
						<span class="breadcrumb-current" aria-current="page">{crumb.title}</span>
					{:else}
						<a href={crumb.href} class="breadcrumb-link">{crumb.title}</a>
						<span class="breadcrumb-separator" aria-hidden="true">/</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	.breadcrumbs {
		margin-bottom: 1.5rem;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.breadcrumb-link {
		color: var(--color-text-secondary, #6b7280);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s;
	}

	.breadcrumb-link:hover {
		color: var(--color-primary, #3b82f6);
		text-decoration: underline;
	}

	.breadcrumb-current {
		color: var(--color-text, #1f2937);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.breadcrumb-separator {
		color: var(--color-text-muted, #9ca3af);
		font-size: 0.875rem;
		user-select: none;
	}

	@media (max-width: 768px) {
		.breadcrumbs {
			margin-bottom: 1rem;
		}
	}
</style>
