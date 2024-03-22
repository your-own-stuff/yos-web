import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';
import type { YosPocketBase } from './types/yos-pocket-base';

export async function createPbAdmin() {
	const pbAdmin = new PocketBase('http://127.0.0.1:8090') as YosPocketBase;
	await pbAdmin.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
	return pbAdmin;
}
