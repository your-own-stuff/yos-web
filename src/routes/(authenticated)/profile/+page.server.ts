import { createPbAdmin } from '$lib/create-pb-admin';
import { updateUserSchema } from '$lib/forms/user/user-schema';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	if (!pb.authStore.model?.id) {
		return error(401, 'Unauthorized');
	}
	const user = await pb.collection('users').getOne(pb.authStore.model.id);

	if (!user) {
		return error(404, "User not found :'(");
	}

	const form = await superValidate(user, zod(updateUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateUserSchema));
		const userid = pb.authStore.model?.id;

		if (!userid) {
			return error(401, 'Unauthorized');
		}

		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, form.data);
			form.data.password = null;
			form.data.passwordConfirm = null;
			return message(form, { success: 'User updated' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	}
};
