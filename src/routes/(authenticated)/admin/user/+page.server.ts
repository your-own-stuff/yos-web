import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const users = (await pb.collection('users').getFullList()).map((u) => ({
		...u,
		avatar: u.avatar ? pb.files.getUrl(u, u.avatar) : null
	}));

	return { users };
}) satisfies PageServerLoad;
