<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { clsx } from 'clsx';
	import { scale } from 'svelte/transition';

	export let binding: HTMLButtonElement | undefined = undefined;
	export let isLoading: boolean;
</script>

<button
	bind:this={binding}
	type="submit"
	{...$$restProps}
	class={clsx('relative transition-all', $$restProps.class)}
	disabled={isLoading}
>
	{#if isLoading}
		<div transition:scale class="absolute grid place-items-center">
			<ProgressRadial value={undefined} width="w-5" />
		</div>
	{/if}
	<div class={clsx('!m-0 transition-all', isLoading ? 'scale-0 opacity-0' : 'scale-100')}>
		<slot />
	</div>
</button>
