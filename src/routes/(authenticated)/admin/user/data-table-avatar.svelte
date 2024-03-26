<svelte:options runes={true} />

<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	const { url, fallback }: { url: string | null; fallback: string } = $props();
</script>

<Avatar.Root class="h-6 w-6 text-xs">
	<Avatar.Image src={url} />
	<Avatar.Fallback>{fallback}</Avatar.Fallback>
</Avatar.Root>
