<svelte:options runes={true} />

<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { rebuilding } from '$lib/stores/index-rebuilding.svelte';
	import { LogOut } from 'lucide-svelte';

	const { data } = $props();

	$effect(() => {
		rebuilding.setRebuilding(data.indexRebuilding.rebuilding);
		data.pb.collection('systemstatus').subscribe(data.indexRebuilding.id, (doc) => {
			rebuilding.setRebuilding(doc.record.value === 'true');
		});
	});
</script>

<div class="grid h-min min-h-full grid-rows-[auto_1fr]">
	<header class="sticky top-0 z-10 bg-background bg-opacity-30 backdrop-blur-md">
		<nav class="flex items-center justify-between p-3">
			<a class="flex items-end gap-1 text-lg font-bold" href="/dash">
				<enhanced:img src="../../assets/hausi.svg" class="h-10 w-10" />
				YOS
			</a>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} class="rounded-full" variant="ghost" size="icon">
						<Avatar.Root>
							<Avatar.Image src={data.avatar.src} alt="Avatar" />
							<Avatar.Fallback>{data.avatar.fallback}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#if data.user?.isAdmin}
						<DropdownMenu.Item href="/admin">Admin</DropdownMenu.Item>
						<DropdownMenu.Separator />
					{/if}
					<DropdownMenu.Item href="/profile">
						<span>Settings</span>
						<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<form method="post" action="/api/logout">
						<DropdownMenu.Item asChild>
							<Button
								type="submit"
								variant="ghost"
								class="h-min w-full justify-start px-2 py-1.5 text-sm font-normal"
							>
								<LogOut class="mr-2 h-4 w-4" />
								<span>Logout</span>
							</Button>
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</nav>
		<Separator />
	</header>
	<main class="p-6">
		<slot />
	</main>
</div>
