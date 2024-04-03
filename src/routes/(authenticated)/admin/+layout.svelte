<svelte:options runes={true} />

<script lang="ts">
	import SidebarLayout from '$lib/components/sidebar-layout.svelte';

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

<SidebarLayout {sidebarItems}>
	{@render children()}
</SidebarLayout>
