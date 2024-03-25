import { createPbAdmin } from '$lib/create-pb-admin';
import { avatarSchema } from '$lib/forms/user/avatar/avatar-schema';
import { updateProfileSchema } from '$lib/forms/user/profile/profile-schema';
import { error, type Actions } from '@sveltejs/kit';
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

	const profileForm = await superValidate({ ...user }, zod(updateProfileSchema));
	const avatarForm = await superValidate({ avatar: null }, zod(avatarSchema));

	return { profileForm, avatarForm };
}) satisfies PageServerLoad;

export const actions: Actions = {
	update: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateProfileSchema));
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
			await pb.collection('users').authRefresh();
			form.data.password = null;
			form.data.passwordConfirm = null;
			return message(form, { success: 'User updated' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	},
	'update-avatar': async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(avatarSchema));
		const userid = pb.authStore.model?.id;

		if (!userid) {
			return error(401, 'Unauthorized');
		}

		const pbAdmin = await createPbAdmin();

		if (!form.valid) {
			return { form };
		}

		try {
			await pbAdmin.collection('users').update(userid, form.data);
			await pb.collection('users').authRefresh();
			return message(form, { success: 'Avatar updated' });
		} catch (error) {
			return message(form, { error: 'Failed to update avatar' });
		}
	},
	'remove-avatar': async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(avatarSchema));
		const userid = pb.authStore.model?.id;

		if (!userid) {
			return error(401, 'Unauthorized');
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, { avatar: null });
			await pb.collection('users').authRefresh();
			return message(form, { success: 'Avatar removed' });
		} catch (error) {
			return message(form, { error: 'Failed to remove avatar' });
		}
	}
};
