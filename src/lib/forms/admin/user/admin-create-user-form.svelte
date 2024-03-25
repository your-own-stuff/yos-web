<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminCreateUserSchema, type AdminCreateUserSchema } from './admin-user-schema';

	export let data: SuperValidated<Infer<AdminCreateUserSchema>>;

	const form = superForm(data, {
		validators: zodClient(adminCreateUserSchema),
		onUpdated({ form }) {
			if (form.valid) {
				toast.success('User created successfully!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" use:enhance class="flex flex-col gap-5">
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
	<Form.Field {form} name="isAdmin" class="flex items-center gap-3 space-y-0">
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.isAdmin} />
			<Form.Label>Is Admin</Form.Label>
			<input name={attrs.name} value={$formData.isAdmin} hidden />
		</Form.Control>
	</Form.Field>
	<Button class="mt-auto w-min" type="submit">Create User</Button>
</form>
