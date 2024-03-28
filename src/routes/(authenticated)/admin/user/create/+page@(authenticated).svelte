<script lang="ts">
	import AdminCreateUserForm from '$lib/forms/admin/user/admin-create-user-form.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto grid h-full grid-rows-[auto_auto_1fr] gap-5">
	<a class="anchor flex items-center px-0" href=".">
		<ArrowLeft size={16} class="mr-2" />
		Back to User
	</a>
	<h3 class="text-2xl font-bold">Add User</h3>
	<AdminCreateUserForm data={data.form} />
</div>
