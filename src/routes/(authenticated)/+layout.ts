import { browser } from '$app/environment';
import { createPb } from '$lib/create-pb';
import type { LayoutLoad } from './$types';

export const load = (async ({ data }) => {
	const pb = createPb();

	pb.authStore.loadFromCookie(browser ? document.cookie : data.session);

	const res = await pb
		.collection('systemstatus')
		.getFirstListItem(pb.filter("name = 'index_rebuilding'"));

	return { indexRebuilding: { id: res.id, rebuilding: res.value === 'true' }, pb };
}) satisfies LayoutLoad;
