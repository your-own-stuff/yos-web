import { isRedirect, redirect, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { loginSchema } from './schema';

export const load = (async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) return form;

		try {
			await pb.collection('users').authWithPassword(form.data.email, form.data.password);
			redirect(307, '/dash');
		} catch (e) {
			if (isRedirect(e)) throw e;
		}

		return setError(form, 'password', 'Invalid email or password');
	}
};
