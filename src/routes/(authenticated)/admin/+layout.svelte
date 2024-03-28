<svelte:options runes={true} />

<script lang="ts">
	import SidebarNav from '$lib/components/sidebar-nav.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	const { children } = $props();

	const sidebarItems = [
		{
			title: 'General',
			href: '/admin/general'
		},
		{
			title: 'User',
			href: '/admin/user'
		}
	];
</script>

<section class="grid h-full grid-cols-[20%_1fr] grid-rows-[auto_1fr] gap-y-5">
	<a class="anchor col-span-full flex w-min items-center px-0" href="/">
		<ArrowLeft size={16} class="mr-2" />
		Home
	</a>
	<aside class="space-y-3">
		<h3 class="text-2xl font-bold">Admin</h3>
		<SidebarNav items={sidebarItems} />
	</aside>
	<div class="container mx-auto px-4">
		{@render children()}
	</div>
</section>
