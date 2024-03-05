import { z } from 'zod';

export const updateMeDto = z.object({
  fullName: z.string().min(1, 'Name is required'),
  isVerified: z.boolean().optional(),
  avatarUrl: z.string(),
});

export type UpdateMeDto = z.TypeOf<typeof updateMeDto>;
