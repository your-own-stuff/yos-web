<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { Loader2 } from 'lucide-svelte';
	import { buttonVariants, type Events, type Props } from './index.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let isLoading: $$Props['isLoading'] = false;
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	disabled={isLoading}
	{...$$restProps}
	on:click
	on:keydown
>
	{#if isLoading}
		<Loader2 class="mr-2 animate-spin" />
	{/if}
	<slot />
</ButtonPrimitive.Root>
