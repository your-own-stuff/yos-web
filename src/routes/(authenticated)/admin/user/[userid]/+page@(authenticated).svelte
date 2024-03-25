<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import UpdateUserForm from '$lib/forms/user/update-user-form.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto grid h-full grid-rows-[auto_auto_1fr] gap-5">
	<Button variant="link" class="w-min px-0" href=".">
		<ArrowLeft size={16} class="mr-2" />
		Back to User
	</Button>
	<div>
		<h3 class="text-2xl font-bold">Update User</h3>
		<span class="text-sm opacity-50">{$page.params.userid}</span>
	</div>
	<UpdateUserForm data={data.form} />
</div>
