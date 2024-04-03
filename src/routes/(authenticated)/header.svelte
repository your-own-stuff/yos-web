<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { Avatar, LightSwitch, popup, type PopupSettings } from '@skeletonlabs/skeleton';

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

<nav
	class="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-neutral-500 border-opacity-10 p-3"
>
	<a class="flex w-min items-end gap-1 text-lg font-bold" href="/dash">
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
			<div class="flex justify-center py-2">
				<LightSwitch />
			</div>
			{#if showAdmin}
				<a href="/admin">Admin</a>
			{/if}
			<a href="/profile">Profile</a>
			<form action="/api/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</div>
	</aside>
</nav>
