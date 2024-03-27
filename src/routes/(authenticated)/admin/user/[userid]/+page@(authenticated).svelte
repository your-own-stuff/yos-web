<script lang="ts">
	import { page } from '$app/stores';
	import AdminAvatarForm from '$lib/forms/admin/avatar/admin-avatar-form.svelte';
	import AdminUpdateUserForm from '$lib/forms/admin/user/admin-update-user-form.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto grid h-full grid-rows-[auto_auto_auto_1fr] gap-10">
	<a class="anchor flex items-center px-0" href=".">
		<ArrowLeft size={16} class="mr-2" />
		Back to User
	</a>
	<div>
		<h3 class="text-2xl font-bold">Update User</h3>
		<span class="text-sm opacity-50">{$page.params.userid}</span>
	</div>
	<AdminAvatarForm
		data={data.updateAvatar}
		avatar={data.userAvatar}
		action="?/update-avatar"
		removeAction="?/remove-avatar"
	/>
	<AdminUpdateUserForm data={data.updateUser} action="?/update" />
</div>
