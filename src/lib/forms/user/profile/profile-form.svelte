<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateProfileSchema, type UpdateProfileSchema } from './profile-schema';

	export let data: SuperValidated<Infer<UpdateProfileSchema>>;

	const form = superForm(data, {
		validators: zodClient(updateProfileSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message?.success);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="post"
	action="?/update"
	enctype="multipart/form-data"
	use:enhance
	class="flex flex-col gap-5"
>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<div class="grid grid-cols-2 gap-5">
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
				<Form.FieldErrors />
			</Form.Control>
		</Form.Field>
		<Form.Field {form} name="passwordConfirm">
			<Form.Control let:attrs>
				<Form.Label>Confirm Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.passwordConfirm} />
				<Form.FieldErrors />
			</Form.Control>
		</Form.Field>
	</div>
	<Button class="mt-auto w-min" type="submit">
		<span>Update User</span>
	</Button>
</form>
