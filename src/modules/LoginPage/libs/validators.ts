import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

export const authSchema = z.object({

  identifier: z.string({ required_error: 'Tên đăng nhập không được để trống' }).nonempty(validationMessages.required('Tên đăng nhập')),
  password: z
    .string({ required_error: 'Mật khẩu là bắt buộc' })
    .nonempty(validationMessages.required('Mật khẩu'))


    .min(6, {
      message: 'Tên đăng nhập hoặc mật khẩu bạn nhập không đúng!',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
    }),
});

export type AuthSchema = z.infer<typeof authSchema>;
