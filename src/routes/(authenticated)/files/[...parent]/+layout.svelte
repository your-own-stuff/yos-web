<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<section class="grid grid-rows-[auto_1fr] gap-6">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/dash">Dashboard</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			{#each data.parentResource as item, i (item.id)}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={item.href}>{item.resourceName}</Breadcrumb.Link>
				</Breadcrumb.Item>
				{#if i !== data.parentResource.length - 1}
					<Breadcrumb.Separator />
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<slot />
</section>
