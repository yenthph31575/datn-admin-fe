import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const createAccountSchema = z.object({
  avatar: z.string().min(1, validationMessages.required('Ảnh đại diện')),
  username: z.string().min(1, validationMessages.required('Tên đăng nhập')).max(50, validationMessages.max(50, 'Tên đăng nhập')),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const editAccountSchema = z.object({
  avatar: z.string().min(1, validationMessages.required('Ảnh đại diện')),
  username: z.string().min(1, validationMessages.required('Tên đăng nhập')).max(50, validationMessages.max(50, 'Tên đăng nhập')),
  wallet_address: z.string().min(1, validationMessages.required('Địa chỉ ví')).max(50, validationMessages.max(50, 'Địa chỉ ví')),
});
export type EditAccountSchema = z.infer<typeof editAccountSchema>;
