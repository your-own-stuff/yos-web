<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/stores';

	import { cn } from '$lib/utils';
	import clsx from 'clsx';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const { items, class: className }: { items: { title: string; href: string }[]; class?: string } =
		$props();

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}>
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
