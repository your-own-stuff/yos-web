<svelte:options runes={true} />

<script lang="ts">
	import DataTable from './data-table.svelte';

	const { data } = $props();
</script>

<div class="container mx-auto space-y-5">
	<a class="variant-filled-primary btn" href="/admin/user/create">Add User</a>
	<DataTable data={data.users} currentUserId={data.user.id} />
</div>
