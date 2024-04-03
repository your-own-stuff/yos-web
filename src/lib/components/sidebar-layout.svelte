<svelte:options runes={true} />

<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import SidebarNav, { type SidebarItem } from './sidebar-nav.svelte';

	const { children, sidebarItems }: { children: Snippet; sidebarItems: SidebarItem[] } = $props();
</script>

<section class="grid h-full grid-cols-[20%_1fr]">
	<aside class="sticky top-0 space-y-5">
		<a class="anchor flex items-center" href="/">
			<ArrowLeft size={16} class="mr-2" />
			Home
		</a>
		<SidebarNav items={sidebarItems} />
	</aside>
	<div class="container mx-auto px-4">
		{@render children()}
	</div>
</section>
