<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminUpdateUserSchema, type AdminUpdateUserSchema } from './admin-user-schema';

	const toast = getToastStore();

	export let action: string;
	export let data: SuperValidated<Infer<AdminUpdateUserSchema>>;

	const form = superForm(data, {
		validators: zodClient(adminUpdateUserSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.trigger({ message: 'User updated successfully!' });
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form {action} method="post" use:enhance class="flex flex-col gap-5">
	<Field {form} name="username">
		<Control let:attrs>
			<div>
				<Label>Username</Label>
				<input class="input" {...attrs} bind:value={$formData.username} />
				<FieldErrors />
			</div>
		</Control>
	</Field>
	<div class="grid grid-cols-2 gap-5">
		<Field {form} name="password">
			<Control let:attrs>
				<div>
					<Label>Password</Label>
					<input class="input" type="password" {...attrs} bind:value={$formData.password} />
					<FieldErrors />
				</div>
			</Control>
		</Field>
		<Field {form} name="passwordConfirm">
			<Control let:attrs>
				<div>
					<Label>Confirm Password</Label>
					<input class="input" type="password" {...attrs} bind:value={$formData.passwordConfirm} />
					<FieldErrors />
				</div>
			</Control>
		</Field>
	</div>
	<Field {form} name="isAdmin">
		<Control let:attrs>
			<div class="flex items-center gap-3 space-y-0">
				<input type="checkbox" class="input checkbox" {...attrs} bind:checked={$formData.isAdmin} />
				<Label>Is Admin</Label>
			</div>
		</Control>
	</Field>
	<button class="variant-filled-primary btn mt-auto w-min" type="submit">Update User</button>
</form>
