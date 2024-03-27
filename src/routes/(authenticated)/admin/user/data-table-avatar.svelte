<svelte:options runes={true} />

<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	const { url, fallback }: { url: string | undefined; fallback: string } = $props();
</script>

<Avatar src={url} initials={fallback} width="w-10" />
