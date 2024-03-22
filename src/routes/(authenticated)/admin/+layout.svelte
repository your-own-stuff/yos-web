<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/stores';

	const { children } = $props();

	const activeClasses = 'text-foreground bg-background';
	const otherClasses = 'opacity-50';
</script>

{#snippet link(label, href)}
	<a
		class="w-full py-1 text-center {$page.url.pathname.endsWith(href)
			? activeClasses
			: otherClasses}"
		{href}>{label}</a
	>
{/snippet}

<section class="space-y-10">
	<div class="grid grid-cols-[auto_1fr] items-center gap-4">
		<h1>Admin</h1>
		<div class="grid grid-flow-col place-items-center rounded-sm bg-muted p-1 *:rounded-sm">
			{@render link('Basics', '/admin/basics')}
			{@render link('User', '/admin/user')}
		</div>
	</div>
	{@render children()}
</section>
