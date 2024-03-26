import type { Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals: { pb } }) => {
		try {
			const res = await pb.send('/rebuild-index', {});
			return res;
		} catch (e) {
			if (e instanceof ClientResponseError) {
				return e.response;
			}
		}
	}
};
