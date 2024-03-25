import { createPbAdmin } from '$lib/create-pb-admin';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateUserSchema } from '../user-schema';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { userid } }) => {
	const pbAdmin = await createPbAdmin();
	const user = await pbAdmin.collection('users').getOne(userid);

	if (!user) {
		return error(404, "User not found :'(");
	}

	const form = await superValidate(user, zod(updateUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params: { userid } }) => {
		const form = await superValidate(request, zod(updateUserSchema));

		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, form.data);
			form.data.password = null;
			form.data.passwordConfirm = null;
			return message(form, { success: 'User created' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	}
};
