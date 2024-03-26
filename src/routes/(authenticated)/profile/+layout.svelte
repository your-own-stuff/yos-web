<svelte:options runes={true} />

<script lang="ts">
	import SidebarNav from '$lib/components/sidebar-nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';

	const { children } = $props();

	const sidebarItems = [
		{
			title: 'Update User',
			href: '/profile'
		}
	];
</script>

<section class="grid h-full grid-cols-[20%_1fr] grid-rows-[auto_1fr]">
	<Button variant="link" class="col-span-full w-min px-0" href="/">
		<ArrowLeft size={16} class="mr-2" />
		Home
	</Button>
	<aside>
		<SidebarNav items={sidebarItems} />
	</aside>
	<div class="container mx-auto px-4">
		{@render children()}
	</div>
</section>
