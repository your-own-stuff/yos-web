<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { FileInput } from '$lib/components/ui/file-input';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { avatarSchema, type AvatarSchema } from './avatar-schema';

	export let action: string;
	export let removeAction: string;
	export let data: SuperValidated<Infer<AvatarSchema>>;
	export let avatar: { src: string | null; fallback: string };

	const form = superForm(data, {
		validators: zodClient(avatarSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message?.success);
			}
		}
	});

	const { form: formData, enhance, tainted } = form;

	let avatarProxy = fileProxy(formData, 'avatar');
	let preview = avatar.src;
</script>

<form {action} method="post" enctype="multipart/form-data" class="flex flex-col gap-5" use:enhance>
	<Form.Field {form} name="avatar">
		<Form.Control let:attrs>
			<Form.Label>Avatar</Form.Label>
			<div class="grid grid-cols-[auto_1fr] items-center gap-5">
				<Avatar.Root class="h-20 w-20">
					<Avatar.Image src={preview} />
					<Avatar.Fallback>{avatar.fallback}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col gap-2">
					<FileInput
						type="file"
						accept="image/*"
						bind:files={$avatarProxy}
						on:change={(e) => {
						const file = e.currentTarget.files?.item(0) as File;
						if (file) {
							$formData.avatar = file;
							preview = URL.createObjectURL(file);
						}
					}}
						{...attrs}
					/>
					<Button
						formaction={removeAction}
						size="sm"
						variant="destructive"
						type="submit"
						class="w-min"
						on:click={() => {
							preview = null;
						}}
					>
						Remove Avatar
					</Button>
				</div>
			</div>
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Button disabled={$tainted === undefined} type="submit" class="w-min">Update Avatar</Button>
</form>
