import type PocketBase from 'pocketbase';
import type { RecordService, SendOptions } from 'pocketbase';

export type Systemstatus = {
	id: string;
	name: string;
	value: string;
};

export type AsyncActionResult<T> = Promise<T>;

export interface YosPocketBase extends PocketBase {
	send<T>(path: string, options: SendOptions): Promise<T>;
	send(path: '/rebuild-index', options: SendOptions): Promise<{ status: 'started' }>;

	collection(idOrName: string): RecordService;
	collection(idOrName: 'systemstatus'): RecordService<Systemstatus>;
}
