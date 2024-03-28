<script lang="ts">
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './schema';

	export let data: SuperValidated<Infer<LoginSchema>>;
	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" use:enhance class="space-y-5">
	<Field {form} name="email">
		<Control let:attrs>
			<div>
				<Label>Email</Label>
				<input class="input" {...attrs} bind:value={$formData.email} />
			</div>
		</Control>
	</Field>
	<Field {form} name="password">
		<Control let:attrs>
			<div>
				<Label>Password</Label>
				<input class="input" {...attrs} type="password" bind:value={$formData.password} />
				<FieldErrors class="absolute" />
			</div>
		</Control>
	</Field>
	<button class="variant-filled-primary btn">Continue</button>
</form>
