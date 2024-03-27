<svelte:options runes={true} />

<script lang="ts">
	import { enhance } from '$app/forms';
	import SubmitButton from '$lib/components/submit-button.svelte';
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toast = getToastStore();
</script>

<section class="container mx-auto grid h-full auto-rows-min gap-3">
	<form
		method="post"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'success') {
					toast.trigger({ message: 'Index Generation started' });
				}
			};
		}}
	>
		<SubmitButton class="variant-outline btn" isLoading={rebuilding.indexRebuilding}>
			Generate Index
		</SubmitButton>
	</form>
</section>
