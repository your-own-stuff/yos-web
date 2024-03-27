<svelte:options runes={true} />

<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Ellipsis } from 'lucide-svelte';
	const { id }: { id: string } = $props();

	const popupSettings: PopupSettings = {
		event: 'click',
		target: `user-${id}-popup`,
		placement: 'bottom',
		closeQuery: '#admin, #logout, #feedback, #kiga-selection',
		middleware: { offset: { crossAxis: -50 } }
	};
</script>

<div>
	<button class="variant-ghost btn" use:popup={popupSettings}>
		<Ellipsis />
	</button>
	<aside data-popup="user-{id}-popup">
		<div class="variant-filled-surface btn-group-vertical">
			<!-- <DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
					Copy user ID
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator /> -->
			<a href="/admin/user/{id}">Edit User</a>
		</div>
	</aside>
</div>
