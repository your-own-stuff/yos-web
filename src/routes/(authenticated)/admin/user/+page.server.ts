import { createPbAdmin } from '$lib/create-pb-admin';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const pbAdmin = await createPbAdmin();

	const users = (await pbAdmin.collection('users').getFullList()).map((u) => ({
		...u,
		avatar: u.avatar ? pbAdmin.files.getUrl(u, u.avatar) : null
	}));

	return { users };
}) satisfies PageServerLoad;
