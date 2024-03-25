<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/stores';

	const { children } = $props();

	const activeClasses = 'text-foreground underline';
	const otherClasses = 'opacity-50';
</script>

{#snippet link(label, href)}
	<a
		class="w-full py-1 text-center {$page.url.pathname.startsWith(href)
			? activeClasses
			: otherClasses}"
		{href}>{label}</a
	>
{/snippet}

<section class="grid h-full grid-rows-[auto_1fr] gap-10">
	<div class="grid grid-cols-[auto_1fr] items-end gap-4">
		<h1>Admin</h1>
		<div class="flex gap-3 *:w-min">
			{@render link('Basics', '/admin/basics')}
			{@render link('User', '/admin/user')}
		</div>
	</div>
	{@render children()}
</section>
