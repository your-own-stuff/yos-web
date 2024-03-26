import { z } from 'zod';

export const updateProfileSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(8).nullable().default(null),
		passwordConfirm: z.string().min(8).nullable().default(null)
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm']
	});

export type UpdateProfileSchema = typeof updateProfileSchema;
