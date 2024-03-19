import PocketBase from 'pocketbase';
import type { YosPocketBase } from './types/yos-pocket-base';

export function createPb() {
	return new PocketBase('http://127.0.0.1:8090') as YosPocketBase;
}
