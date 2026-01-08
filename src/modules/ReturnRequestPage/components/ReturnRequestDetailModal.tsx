'use client';

import { useUpdateReturnRequestStatusMutation } from '@/api/return-request/queries';
import type { IReturnRequest } from '@/api/return-request/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  data: IReturnRequest;
  refetch: () => void;
}

const ReturnRequestDetailModal = ({ data, refetch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminNote, setAdminNote] = useState('');

  const { mutate, isLoading } = useUpdateReturnRequestStatusMutation({
    onSuccess: () => {
      toast.success('Cập nhật trạng thái thành công');
      refetch();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const handleUpdateStatus = (status: string) => {
    mutate({ id: data._id, status, adminNote });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
          Chi tiết
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết yêu cầu hoàn trả</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500 text-sm">Mã đơn hàng</p>
              <p>{data.orderId.orderCode}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 text-sm">Trạng thái hiện tại</p>
              <p>{data.status}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 text-sm">Lý do hoàn trả</p>
              <p>{data.reason}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 text-sm">Ngày tạo</p>
              <p>{new Date(data.createdAt).toLocaleString()}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-gray-500 text-sm">Email người yêu cầu</p>
              <p>{data.userId.email}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-gray-500 text-sm">Mô tả chi tiết</p>
              <p className="whitespace-pre-wrap rounded bg-slate-50 p-2 text-sm">{data.description}</p>
            </div>

            {data.refundInfo && (
              <div className="col-span-2 space-y-1 rounded border p-3">
                <p className="font-medium text-gray-700 text-sm">Thông tin hoàn tiền</p>
                <div className="text-sm">
                  <p>
                    <span className="text-gray-500">Ngân hàng:</span> {data.refundInfo.bankName}
                  </p>
                  <p>
                    <span className="text-gray-500">Số tài khoản:</span> {data.refundInfo.bankAccount}
                  </p>
                  <p>
                    <span className="text-gray-500">Chủ tài khoản:</span> {data.refundInfo.bankAccountName}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 font-medium text-gray-500 text-sm">Sản phẩm yêu cầu</p>
            <div className="space-y-2 rounded border p-2">
              {data.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 text-sm">
                  <div className="flex-1">
                    <p className="font-medium">Product ID: {item.productId}</p>
                    <p className="text-gray-500">Variant ID: {item.variantId}</p>
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium text-gray-500 text-sm">Hình ảnh chứng minh</p>
            <div className="flex flex-wrap gap-2">
              {data.images?.map((img, index) => (
                <Image key={index} src={img} alt="proof" width={100} height={100} className="rounded-md object-cover" />
              ))}
              {data.images?.length === 0 && <p className="text-gray-400 text-sm">Không có hình ảnh</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="adminNote" className="font-medium text-sm">
              Ghi chú của Admin
            </label>
            <textarea
              id="adminNote"
              className="min-h-[100px] w-full rounded-md border p-2"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Nhập ghi chú..."
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Đóng
          </Button>
          {data.status === 'PENDING' && (
            <>
              <Button variant="alert" onClick={() => handleUpdateStatus('REJECTED')}>
                Từ chối
              </Button>
              <Button onClick={() => handleUpdateStatus('APPROVED')}>Chấp nhận</Button>
            </>
          )}
          {data.status === 'APPROVED' && (
            <Button onClick={() => handleUpdateStatus('COMPLETED')} disabled={isLoading}>
              Hoàn thành
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestDetailModal;
