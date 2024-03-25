import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const user = pb.authStore.model;
	return {
		session: pb.authStore.exportToCookie(),
		user,
		image: user ? pb.getFileUrl(user, user.avatar) : null
	};
}) satisfies LayoutServerLoad;
