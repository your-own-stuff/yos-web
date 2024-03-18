<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './schema';

	export let data: SuperValidated<Infer<LoginSchema>>;
	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" use:enhance class="space-y-4">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Form.Button>Continue</Form.Button>
</form>
