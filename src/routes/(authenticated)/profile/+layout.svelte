<svelte:options runes={true} />

<script lang="ts">
	import SidebarLayout from '$lib/components/sidebar-layout.svelte';

	const { children } = $props();

	const sidebarItems = [
		{
			title: 'Update User',
			href: '/profile'
		}
	];
</script>

<SidebarLayout {sidebarItems}>
	{@render children()}
</SidebarLayout>
