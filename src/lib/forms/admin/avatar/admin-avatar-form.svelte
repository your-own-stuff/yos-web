<script lang="ts">
	import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminAvatarSchema, type AdminAvatarSchema } from './admin-avatar-schema';

	const toast = getToastStore();

	export let action: string;
	export let removeAction: string;
	export let data: SuperValidated<Infer<AdminAvatarSchema>>;
	export let avatar: { src: string | undefined; fallback: string };

	const form = superForm(data, {
		validators: zodClient(adminAvatarSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.trigger({ message: form.message?.success });
			}
		}
	});

	const { form: formData, enhance, tainted } = form;

	let avatarProxy = fileProxy(formData, 'avatar');
	let preview = avatar.src;
</script>

<form {action} method="post" enctype="multipart/form-data" class="flex flex-col gap-5" use:enhance>
	<Field {form} name="avatar">
		<Control let:attrs>
			<Label>Avatar</Label>
			<div class="grid grid-cols-[auto_1fr] items-center gap-5">
				<Avatar src={preview} initials={avatar.fallback} class="h-20 w-20" />
				<div class="flex flex-col gap-2">
					<input
						class="input w-min"
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
					<button
						formaction={removeAction}
						type="submit"
						class="variant-filled-error btn btn-sm w-min"
						on:click={() => {
							preview = undefined;
						}}
					>
						Remove Avatar
					</button>
				</div>
			</div>
			<FieldErrors />
		</Control>
	</Field>
	<button disabled={$tainted === undefined} type="submit" class="variant-filled-primary btn w-min"
		>Update Avatar</button
	>
</form>
