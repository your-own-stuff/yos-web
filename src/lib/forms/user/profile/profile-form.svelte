<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateProfileSchema, type UpdateProfileSchema } from './profile-schema';

	const toast = getToastStore();

	export let data: SuperValidated<Infer<UpdateProfileSchema>>;

	const form = superForm(data, {
		validators: zodClient(updateProfileSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.trigger({ message: form.message?.success });
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" action="?/update" use:enhance class="flex flex-col gap-5">
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
	<button class="variant-filled-primary btn w-min" type="submit">
		<span>Update User</span>
	</button>
</form>
