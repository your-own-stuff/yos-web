import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb }, params: { parent } }) => {
	const currentElement = parent.split('/').at(-1);
	const [parentResource, resources] = await Promise.all([
		currentElement
			? pb.collection('data_resources').getOne(currentElement, {
					requestKey: 'parentResource'
				})
			: { resourceName: 'Root' },
		await pb.collection('data_resources').getList(1, 20, {
			filter: pb.filter('parent = {:parent}', { parent: parent.split('/').at(-1) }),
			requestKey: 'resources'
		})
	]);

	return { resources, parentResource };
}) satisfies PageServerLoad;
