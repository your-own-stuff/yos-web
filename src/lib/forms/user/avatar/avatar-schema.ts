import { z } from 'zod';

export const avatarSchema = z.object({
	avatar: z
		.instanceof(File)
		.refine((file) => file.size < 2e6, { message: 'Max 2MB upload size.' })
		.nullable()
		.optional()
});

export type AvatarSchema = typeof avatarSchema;
