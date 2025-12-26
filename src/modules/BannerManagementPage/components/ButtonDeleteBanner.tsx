'use client';

import { deleteBanner } from '@/api/banner/requests';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { onMutateError } from '@/libs/common';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  _id: string;
  refetch: any;
  className?: string;
};

const ButtonDeleteBanner = ({ _id, refetch, className }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(deleteBanner);

  const handleDelete = () => {
    mutate(_id, {
      onSuccess: () => {
        toast.success('Xóa banner thành công!');
        setIsOpenModal(false);
        refetch();
      },
      onError: onMutateError,
    });
  };

  return (
    <AlertDialogComponent
      isOpen={isOpenModal}
      setIsOpen={setIsOpenModal}
      title="Bạn có chắc chắn muốn xóa banner này không?"
      description="Hành động này không thể hoàn tác. Nó sẽ xóa vĩnh viễn banner khỏi máy chủ của chúng tôi."
      onOk={handleDelete}
      okText={<>Xóa</>}
      cancelText={<>Quay lại</>}
      loading={isLoading}
    >
      <Button size="sm" className="h-8"
        onClick={() => setIsOpenModal(true)}>
        <Trash />
      </Button>
    </AlertDialogComponent>
  );
};

export default ButtonDeleteBanner;
