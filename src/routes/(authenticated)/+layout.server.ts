import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	return { session: pb.authStore.exportToCookie() };
}) satisfies LayoutServerLoad;
