import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const resources = await pb.collection('data_resources').getList(1, 20, {
		filter: pb.filter('parent = null')
	});

	return { resources };
}) satisfies PageServerLoad;
