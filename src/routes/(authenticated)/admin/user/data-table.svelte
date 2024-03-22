<svelte:options runes={true} />

<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Users } from '$lib/types/yos-pocket-base';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';

	const { data }: { data: Users[] } = $props();

	const table = createTable(readable(data));

	const columns = table.createColumns([
		table.column({
			header: 'Id',
			accessor: 'id'
		}),
		table.column({
			header: 'Username',
			accessor: 'username'
		}),
		table.column({
			header: 'Admin',
			accessor: 'isAdmin'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
