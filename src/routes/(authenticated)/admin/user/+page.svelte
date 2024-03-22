<svelte:options runes={true} />

<script lang="ts">
	const { data } = $props();
</script>

<section class="grid h-full gap-3">
	{#each data.users as user}
		<span>{user.id}</span>
	{/each}
</section>
