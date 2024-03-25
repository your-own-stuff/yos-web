import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const user = pb.authStore.model;
	if (!user) {
		error(401, 'Unauthorized');
	}
	return {
		session: pb.authStore.exportToCookie(),
		user,
		image: user ? pb.getFileUrl(user, user.avatar) : null
	};
}) satisfies LayoutServerLoad;
