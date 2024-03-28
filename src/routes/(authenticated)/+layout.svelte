<svelte:options runes={true} />

<script lang="ts">
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
	import Header from './header.svelte';

	const { data } = $props();

	$effect(() => {
		rebuilding.setRebuilding(data.indexRebuilding.rebuilding);
		data.pb.collection('systemstatus').subscribe(data.indexRebuilding.id, (doc) => {
			rebuilding.setRebuilding(doc.record.value === 'true');
		});
	});
</script>

<div class="grid h-min min-h-full grid-rows-[auto_1fr]">
	<header class="bg-background sticky top-0 z-10 bg-opacity-30 backdrop-blur-md">
		<Header avatar={data.avatar} showAdmin={data.user.isAdmin} />
	</header>
	<main class="p-6">
		<slot />
	</main>
</div>
