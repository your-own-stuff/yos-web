<svelte:options runes={true} />

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
</script>

<section class="grid h-full auto-rows-min gap-3">
	<h1>Admin</h1>
	<Separator />
	<form method="post">
		<Button type="submit" isLoading={rebuilding.indexRebuilding}>Generate Index</Button>
	</form>
</section>
