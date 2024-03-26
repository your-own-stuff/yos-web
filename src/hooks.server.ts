import { createPb } from '$lib/create-pb';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = createPb();
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname === '/') {
		if (event.locals.pb.authStore.isValid) {
			redirect(307, '/dash');
		} else {
			redirect(307, '/auth');
		}
	}

	if (event.url.pathname === '/admin' && !event.locals.pb.authStore.model?.isAdmin) {
		redirect(307, '/dash');
	}

	if (event.url.pathname !== '/auth' && !event.locals.pb.authStore.isValid) {
		redirect(307, '/auth');
	}

	if (event.url.pathname === '/auth' && event.locals.pb.authStore.isValid) {
		redirect(307, '/dash');
	}

	const response = await resolve(event);
	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
