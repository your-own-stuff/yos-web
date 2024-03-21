import type PocketBase from 'pocketbase';
import type { RecordService, SendOptions } from 'pocketbase';

export type Systemstatus = {
	id: string;
	name: string;
	value: string;
};

export type DataResource = {
	id: string;
	resourceName: string;
	path: string;
	type: 'file' | 'dir';
	reader: string[] | null;
	editors: string[] | null;
	parent: string | null;
	created: Date;
	updated: Date;
};

export type AsyncActionResult<T> = Promise<T>;

export interface YosPocketBase extends PocketBase {
	send<T>(path: string, options: SendOptions): Promise<T>;
	send(path: '/rebuild-index', options: SendOptions): Promise<{ status: 'started' }>;

	collection(idOrName: string): RecordService;
	collection(idOrName: 'systemstatus'): RecordService<Systemstatus>;
	collection(idOrName: 'data_resources'): RecordService<DataResource>;
}
