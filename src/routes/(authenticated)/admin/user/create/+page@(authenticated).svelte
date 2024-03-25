<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	import CreateUserForm from '../../../../../lib/forms/user/create-user-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto grid h-full grid-rows-[auto_auto_1fr] gap-5">
	<Button variant="link" class="w-min px-0" href=".">
		<ArrowLeft size={16} class="mr-2" />
		Back to User
	</Button>
	<h3 class="text-2xl font-bold">Add User</h3>
	<CreateUserForm data={data.form} />
</div>
