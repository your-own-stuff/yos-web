<svelte:options runes={true} />

<script context="module" lang="ts">
	export type SidebarItem = { title: string; href: string };
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import clsx from 'clsx';

	const { items, class: className }: { items: SidebarItem[]; class?: string } = $props();
</script>

<nav class={clsx('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}
		<a
			href={item.href}
			class={clsx('variant-ghost btn justify-start', isActive && '!variant-ghost-primary')}
			data-sveltekit-noscroll
		>
			<div class="relative">
				{item.title}
			</div>
		</a>
	{/each}
</nav>
