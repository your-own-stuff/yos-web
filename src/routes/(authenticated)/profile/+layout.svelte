<svelte:options runes={true} />

<script lang="ts">
	import SidebarNav from '$lib/components/sidebar-nav.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	const { children } = $props();

	const sidebarItems = [
		{
			title: 'Update User',
			href: '/profile'
		}
	];
</script>

<section class="grid h-full grid-cols-[20%_1fr] grid-rows-[auto_1fr] gap-y-5">
	<a class="anchor flex items-center col-span-full" href="/">
		<ArrowLeft size={16} class="mr-2" />
		Home
	</a>
	<aside>
		<SidebarNav items={sidebarItems} />
	</aside>
	<div class="container mx-auto px-4">
		{@render children()}
	</div>
</section>
