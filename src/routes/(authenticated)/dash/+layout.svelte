<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="sticky top-0 flex justify-end">
	<form method="post" action="/api/logout">
		<Button type="submit">Logout</Button>
	</form>
</div>
<slot />
