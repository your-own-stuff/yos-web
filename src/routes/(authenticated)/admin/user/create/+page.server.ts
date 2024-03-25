import { createPbAdmin } from '$lib/create-pb-admin';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createUserSchema } from '../../../../../lib/forms/user/user-schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const form = await superValidate(zod(createUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createUserSchema));

		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').create(form.data);
			return message(form, { success: 'User created' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	}
};
