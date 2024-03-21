import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { pb }, params: { parent } }) => {
	const pathParents = parent.split('/');
	const parentResource = await pb.collection('data_resources').getFullList({
		filter: pathParents.map((pid) => pb.filter('id = {:pid}', { pid })).join('||'),
		requestKey: null
	});

	const details = pathParents
		.map((pid) => {
			const resource = parentResource.find((r) => r.id === pid);
			if (!resource) return null;
			return {
				...resource,
				href: `/files/${pathParents.slice(0, pathParents.indexOf(pid) + 1).join('/')}`
			};
		})
		.filter((r): r is NonNullable<typeof r> => !!r);

	return { parentResource: details };
}) satisfies LayoutServerLoad;
