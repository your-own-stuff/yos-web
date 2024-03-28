<svelte:options runes={true} />

<script lang="ts">
	import type { Users } from '$lib/types/yos-pocket-base';
	import clsx from 'clsx';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import DataTableActions from './data-table-actions.svelte';
	import DataTableAvatar from './data-table-avatar.svelte';
	import DataTableYou from './data-table-you.svelte';

	const { data, currentUserId }: { data: Users[]; currentUserId: string } = $props();

	const table = createTable(readable(data));

	const columns = table.createColumns([
		table.column({
			header: 'Avatar',
			accessor: (a) => a,
			cell: ({ value }) => {
				return createRender(DataTableAvatar, {
					url: value.avatar ?? undefined,
					fallback: value.username.slice(0, 2)
				});
			}
		}),
		table.column({
			header: 'Username',
			accessor: 'username'
		}),
		table.column({
			header: 'Admin',
			accessor: 'isAdmin'
		}),
		table.column({
			id: 'action',
			header: '',
			accessor: 'id',
			cell: ({ value }) => {
				if (value === currentUserId) return createRender(DataTableYou);
				return createRender(DataTableActions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="box-border overflow-hidden border border-surface-600 rounded-container-token">
	<table {...$tableAttrs} class="w-full">
		<thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs} class="border-b border-surface-600">
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<th class="p-2 text-left" {...attrs}>
									<Render of={cell.render()} />
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<tr
						{...rowAttrs}
						class="border-b border-surface-600 transition-colors last:border-b-0 hover:bg-neutral-500 hover:bg-opacity-50"
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td class={clsx('p-2', cell.id === 'action' && 'text-right')} {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</table>
</div>
