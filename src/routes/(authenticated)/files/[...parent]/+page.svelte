<script lang="ts">
	import { page } from '$app/stores';
	import { File, Folder } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="grid h-full grid-rows-[auto_1fr] gap-2">
	<div class="text-2xl font-bold">
		{data.parentResource.resourceName}
	</div>
	<section class="grid auto-rows-min">
		{#each data.resources.items as item}
			<a
				href="/files/{$page.params.parent}/{item.id}"
				class="grid grid-cols-[auto_1fr] gap-3 border-b p-3 transition-all hover:rounded-sm hover:bg-neutral-500 hover:bg-opacity-25"
			>
				{#if item.type === 'dir'}
					<Folder />
				{:else}
					<File />
				{/if}
				<span class="font-bold">{item.resourceName}</span>
			</a>
		{/each}
	</section>
</section>
