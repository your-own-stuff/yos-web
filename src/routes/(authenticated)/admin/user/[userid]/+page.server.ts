import { createPbAdmin } from '$lib/create-pb-admin';
import { adminAvatarSchema } from '$lib/forms/admin/avatar/admin-avatar-schema';
import { adminUpdateUserSchema } from '$lib/forms/admin/user/admin-user-schema';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { userid } }) => {
	const pbAdmin = await createPbAdmin();
	const user = await pbAdmin.collection('users').getOne(userid);

	if (!user) {
		return error(404, "User not found :'(");
	}

	const updateUser = await superValidate({ ...user }, zod(adminUpdateUserSchema));
	const updateAvatar = await superValidate(zod(adminAvatarSchema));

	const userAvatar = {
		src: user.avatar ? pbAdmin.getFileUrl(user, user.avatar) : null,
		fallback: user.username.slice(0, 2)
	};

	return { updateUser, updateAvatar, userAvatar };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params: { userid }, locals: { pb } }) => {
		const form = await superValidate(request, zod(adminUpdateUserSchema));

		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, form.data);
			await pb.collection('users').authRefresh();
			form.data.password = null;
			form.data.passwordConfirm = null;
			return message(form, { success: 'User created' });
		} catch (error) {
			return message(form, { error: 'Failed to create user' });
		}
	},
	'update-avatar': async ({ request, params: { userid } }) => {
		const form = await superValidate(request, zod(adminAvatarSchema));

		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, form.data);
			return message(form, { success: 'Avatar updated' });
		} catch (error) {
			return message(form, { error: 'Failed to update avatar' });
		}
	},
	'remove-avatar': async ({ request, params: { userid } }) => {
		const form = await superValidate(request, zod(adminAvatarSchema));
		if (!form.valid) {
			return { form };
		}

		const pbAdmin = await createPbAdmin();

		try {
			await pbAdmin.collection('users').update(userid, { avatar: null });
			return message(form, { success: 'Avatar removed' });
		} catch (error) {
			return message(form, { error: 'Failed to remove avatar' });
		}
	}
};
