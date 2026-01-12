'use client';

import { useUpdateProductMutation } from '@/api/product/queries';
import { Switch } from '@/components/ui/switch';
import { onMutateError } from '@/libs/common';
import { toast } from 'react-toastify';

interface UpdateProductStatusProps {
  id: string;
  isActive: boolean;
  refetch: () => void;
}

const UpdateProductStatus = ({ id, isActive, refetch }: UpdateProductStatusProps) => {
  const { mutate, isLoading } = useUpdateProductMutation();

  const handleToggle = (checked: boolean) => {
    mutate(
      { id, formData: { isActive: checked } },
      {
        onSuccess: () => {
          toast.success(`Sản phẩm đã được ${checked ? 'kích hoạt' : 'vô hiệu hóa'}`);
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <div className="flex items-center justify-center">
      <Switch checked={isActive} onCheckedChange={handleToggle} disabled={isLoading} />
    </div>
  );
};

export default UpdateProductStatus;
