<svelte:options runes={true} />

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
	import { toast } from 'svelte-sonner';
</script>

<section class="grid h-full auto-rows-min gap-3">
	<form
		method="post"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'success') {
					toast('Index Generation started');
				}
			};
		}}
	>
		<Button type="submit" isLoading={rebuilding.indexRebuilding}>Generate Index</Button>
	</form>
</section>
