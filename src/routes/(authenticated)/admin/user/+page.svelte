<svelte:options runes={true} />

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DataTable from './data-table.svelte';

	const { data } = $props();
</script>

<div class="container mx-auto space-y-5">
	<Button href="/admin/user/create">Add User</Button>
	<DataTable data={data.users} />
</div>
