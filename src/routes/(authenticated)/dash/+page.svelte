<script lang="ts">
	import { Folder } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="grid h-full grid-rows-[auto_1fr] gap-6">
	<h1>Dashboard</h1>

	<section class="grid auto-rows-min">
		{#each data.resources.items as item}
			<a
				href="/files/{item.id}"
				class="grid grid-cols-[auto_1fr] gap-3 border-b p-3 transition-all hover:rounded-sm hover:bg-neutral-500 hover:bg-opacity-25"
			>
				<Folder />
				<span class="font-bold">{item.resourceName}</span>
			</a>
		{/each}
	</section>
</section>
