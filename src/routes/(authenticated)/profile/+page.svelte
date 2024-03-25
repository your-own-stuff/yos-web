<script lang="ts">
	import UpdateUserForm from '$lib/forms/user/update-user-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<UpdateUserForm data={data.form} />
