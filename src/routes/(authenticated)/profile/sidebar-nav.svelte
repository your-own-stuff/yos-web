<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
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

		<Button
			href={item.href}
			variant="ghost"
			class={cn(!isActive && 'hover:underline', 'relative justify-start hover:bg-transparent')}
			data-sveltekit-noscroll
		>
			{#if isActive}
				<div
					class="absolute inset-0 rounded-md bg-muted"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				/>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>
