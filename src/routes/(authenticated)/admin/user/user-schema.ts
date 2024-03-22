import { z } from 'zod';

export const createUserSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(8),
		passwordConfirm: z.string().min(8),
		isAdmin: z.boolean()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm']
	});

export type CreateUserSchema = typeof createUserSchema;
