<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let avatar: { src: string | undefined; fallback: string };
	export let showAdmin = false;
	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'popupAvatar',
		placement: 'bottom',
		closeQuery: '#admin, #logout, #feedback, #kiga-selection',
		middleware: { offset: { crossAxis: -50 } }
	};
</script>

<nav class="flex items-center justify-between p-3">
	<a class="flex items-end gap-1 text-lg font-bold" href="/dash">
		<Logo />
		YOS
	</a>
	<button use:popup={popupSettings}>
		<Avatar
			src={avatar.src}
			fallback={avatar.fallback}
			border="border-4 border-surface-300-600-token hover:!border-primary-500"
			cursor="cursor-pointer"
		/>
	</button>
	<aside data-popup="popupAvatar">
		<div class="variant-filled-surface btn-group-vertical">
			{#if showAdmin}
				<a id="admin" href="/admin">Admin</a>
			{/if}
			<a id="admin" href="/profile">Profile</a>
			<form action="/api/logout" method="post">
				<button id="logout" type="submit">Logout</button>
			</form>
		</div>
	</aside>
</nav>
