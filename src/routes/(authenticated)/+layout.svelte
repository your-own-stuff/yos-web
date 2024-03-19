<svelte:options runes={true} />

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
	import { LogOut } from 'lucide-svelte';

	const { data } = $props();

	$effect(() => {
		rebuilding.setRebuilding(data.indexRebuilding.rebuilding);
		data.pb.collection('systemstatus').subscribe(data.indexRebuilding.id, (doc) => {
			rebuilding.setRebuilding(doc.record.value === 'true');
		});
	});
</script>

<div class="grid h-min min-h-full grid-rows-[auto_1fr]">
	<header class="sticky top-0 z-10 bg-background bg-opacity-30 backdrop-blur-md">
		<nav class="flex items-center justify-between p-3">
			<span class="text-lg font-bold">YOS</span>
			<form method="post" action="/api/logout">
				<Button type="submit" size="icon" variant="ghost"><LogOut /></Button>
			</form>
		</nav>
		<Separator />
	</header>
	<main class="p-6">
		<slot />
	</main>
</div>
