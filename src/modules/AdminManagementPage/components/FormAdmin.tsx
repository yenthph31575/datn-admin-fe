import { TextField } from '@/components/form';
import { SelectCustomField } from '@/components/form/SelectCustomField';
import { UploadAvatarField } from '@/components/form/UploadAvatarField';
import { HStack, VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { AdminSchema } from '../libs/validators';

const FormAdmin = ({ mode }: any) => {
  const form = useFormContext<AdminSchema>();
  return (
    <VStack spacing={16}>
      <HStack pos="center" className="overflow-hidden">
        <UploadAvatarField control={form.control} name="avatar" />
      </HStack>
      <TextField required control={form.control} name="username" label="Tên đăng nhập" className="h-12" fullWidth />
      <TextField required control={form.control} name="email" label="Email" className="h-12" fullWidth />

      <TextField required={mode !== 'edit'} control={form.control} name="password" label="Mật khẩu" className="h-12" fullWidth />
      <SelectCustomField
        data={[{ label: 'Quản trị viên', value: 'ADMIN' }]}
        required
        control={form.control}
        name="role"
        label="Vai trò"
        className="h-12"
        fullWidth
      />
    </VStack>
  );
};

export default FormAdmin;
