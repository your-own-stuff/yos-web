import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase('http://127.0.0.1:8090');
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	pb.authStore.model;

	event.locals.pb = pb;

	if (event.url.pathname === '/') {
		if (pb.authStore.isValid && pb.authStore.isAdmin) {
			redirect(307, '/admin');
		} else if (pb.authStore.isValid) {
			redirect(307, '/dash');
		} else {
			redirect(307, '/auth');
		}
	}

	if (event.url.pathname !== '/auth' && !pb.authStore.isValid) {
		redirect(307, '/auth');
	}

	if (event.url.pathname === '/auth' && pb.authStore.isValid) {
		redirect(307, '/dash');
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set(
		'set-cookie',
		pb.authStore.exportToCookie({ httpOnly: false, secure: false })
	);

	return response;
};
