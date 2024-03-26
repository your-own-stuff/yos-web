<script lang="ts">
	import AvatarForm from '$lib/forms/user/avatar/avatar-form.svelte';
	import ProfileForm from '$lib/forms/user/profile/profile-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="space-y-10">
	<AvatarForm
		data={data.avatarForm}
		avatar={data.avatar}
		action="?/update-avatar"
		removeAction="?/remove-avatar"
	/>
	<ProfileForm data={data.profileForm} />
</section>
