import { adminCreateUserSchema } from '$lib/forms/admin/user/admin-user-schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const form = await superValidate(zod(adminCreateUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(adminCreateUserSchema));

		if (!form.valid) {
			return { form };
		}

		try {
			await pb.collection('users').create(form.data);
			return message(form, { success: 'User created' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	}
};
