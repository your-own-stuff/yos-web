import { z } from 'zod';

export const adminAvatarSchema = z.object({
	avatar: z
		.instanceof(File)
		.refine((file) => file.size < 2e6, { message: 'Max 2MB upload size.' })
		.nullable()
		.optional()
});

export type AdminAvatarSchema = typeof adminAvatarSchema;
