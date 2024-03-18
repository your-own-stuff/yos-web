<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './login-form.svelte';

	export let data: PageData;
</script>

<section class="grid h-full place-items-center">
	<div class="container mx-auto max-w-md space-y-10">
		<h1>Sign In</h1>
		<LoginForm data={data.form} />
	</div>
</section>
