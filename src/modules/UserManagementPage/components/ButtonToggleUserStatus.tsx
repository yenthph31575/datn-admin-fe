import { useToggleUserStatusMutation } from '@/api/user/queries';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { onMutateError } from '@/libs/common';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ButtonToggleUserStatusProps {
  userId: string;
  isActive: boolean;
  refetch: () => void;
}

const ButtonToggleUserStatus = ({ userId, isActive, refetch }: ButtonToggleUserStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading } = useToggleUserStatusMutation();

  const handleToggleStatus = () => {
    mutate(
      { id: userId, isActive: !isActive },
      {
        onSuccess: () => {
          toast.success(`Người dùng đã ${!isActive ? 'được kích hoạt' : 'bị vô hiệu hóa'} thành công`);
          setIsOpen(false);
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <AlertDialogComponent
      onOk={handleToggleStatus}
      description={
        <div>
          <p className="line-clamp-4 font-medium text-base">
            {isActive
              ? 'Bạn có chắc chắn muốn vô hiệu hóa người dùng này không? Người dùng sẽ không thể đăng nhập hoặc sử dụng hệ thống cho đến khi được kích hoạt lại.'
              : 'Bạn có chắc chắn muốn kích hoạt người dùng này không? Người dùng sẽ có thể đăng nhập và sử dụng hệ thống.'}
          </p>
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isActive ? 'Vô hiệu hóa người dùng' : 'Kích hoạt người dùng'}
      variant="alert"
      okText={isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
      cancelText="Hủy"
      loading={isLoading}
    >
      <Button variant={isActive ? 'secondary' : 'default'} size="sm" onClick={() => setIsOpen(true)}>
        {isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
      </Button>
    </AlertDialogComponent>
  );
};

export default ButtonToggleUserStatus;
