import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private';
import { PUBLIC_YOS_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import type { YosPocketBase } from './types/yos-pocket-base';

export async function createPbAdmin() {
	const pbAdmin = new PocketBase(PUBLIC_YOS_URL) as YosPocketBase;
	await pbAdmin.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
	return pbAdmin;
}
