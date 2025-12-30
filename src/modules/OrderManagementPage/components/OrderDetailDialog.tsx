import type { IOrder } from '@/api/order/types';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatCurrency } from '@/libs/common';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { PAYMENT_METHOD_LABELS, getPaymentStatusBadge, getShippingStatusBadge } from '../libs/consts';

interface OrderDetailDialogProps {
  order: IOrder | null;
}

const OrderDetailDialog = ({ order }: OrderDetailDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Eye className="h-4 w-4" />
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>

          <div className="rounded-lg border bg-white p-4 text-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="font-bold text-tertiary-600 text-xl">Hóa đơn</h2>
                <p className="text-gray-500 text-xs">Đơn hàng #{order?.orderCode}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">Ngày: {formatDateTime(order?.createdAt)}</p>
                <p className="text-gray-500 text-xs">ID: {order?._id}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6 grid grid-cols-1 gap-6 rounded-md bg-gray-50 p-3 md:grid-cols-2">
              <div>
                <h3 className="mb-2 border-b pb-1 font-semibold text-secondary-600 text-sm">Thông tin khách hàng</h3>
                <p className="text-xs">
                  <span className="font-medium">Tên:</span> {order?.userId?.username}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Email:</span> {order?.userId?.email}
                </p>
              </div>
              <div>
                <h3 className="mb-2 border-b pb-1 font-semibold text-secondary-600 text-sm">Địa chỉ giao hàng</h3>
                <p className="font-medium text-xs">{order?.shippingAddress?.fullName}</p>
                <p className="text-xs">{order?.shippingAddress?.phone}</p>
                <p className="text-xs">{order?.shippingAddress?.addressLine1}</p>
                {order?.shippingAddress?.addressLine2 && <p className="text-xs">{order?.shippingAddress?.addressLine2}</p>}
                <p className="text-xs">
                  {order?.shippingAddress?.ward}, {order?.shippingAddress?.district}, {order?.shippingAddress?.city}
                  {order?.shippingAddress?.postalCode && `, ${order?.shippingAddress?.postalCode}`}
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mb-6 grid grid-cols-1 gap-4 border-b pb-4 md:grid-cols-3">
              <div>
                <h3 className="mb-2 font-semibold text-secondary-600 text-sm">Phương thức thanh toán</h3>
                <p className="text-xs">{(PAYMENT_METHOD_LABELS as any)[order?.paymentMethod as any] || order?.paymentMethod}</p>
                <p className="text-gray-500 text-xs">Ngày thanh toán: {formatDateTime(order?.paidAt)}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-secondary-600 text-sm">Trạng thái thanh toán</h3>
                {getPaymentStatusBadge(order?.paymentStatus as any)}
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-secondary-600 text-sm">Trạng thái giao hàng</h3>
                {getShippingStatusBadge(order?.shippingStatus as any)}
                <div className="mt-2 text-xs">
                  {order?.shippedAt && <p>Đã giao: {formatDateTime(order?.shippedAt)}</p>}
                  {order?.deliveredAt && <p>Đã nhận: {formatDateTime(order?.deliveredAt)}</p>}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-secondary-600 text-sm">Sản phẩm trong đơn hàng</h3>
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 text-left text-gray-600">
                    <tr>
                      <th className="p-2">Sản phẩm</th>
                      <th className="p-2">Thuộc tính</th>
                      <th className="p-2 text-center">Số lượng</th>
                      <th className="p-2 text-right">Giá</th>
                      <th className="p-2 text-right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order?.items?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-2">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.productImage || '/images/no-image.svg'}
                              alt={item.productName}
                              className="h-10 w-10 rounded object-cover"
                            />
                            <span className="font-medium text-xs">{item.productName}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          {item.attributes &&
                            Object.entries(item.attributes)?.map(([key, value]) => (
                              <div key={key} className="text-xs">
                                <span className="text-gray-500">{key}:</span> {value}
                              </div>
                            ))}
                        </td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-right">{formatCurrency(item.price)}</td>
                        <td className="p-2 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="w-full space-y-2 rounded-md bg-gray-50 p-3 md:w-1/2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Tổng đơn hàng</span>
                    <span>{formatCurrency(Number(order?.totalAmount) + Number(order?.discountAmount))}</span>
                  </div>
                  {order && order?.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 text-xs">
                      <span>Giảm giá:</span>
                      <span>-{formatCurrency(order?.discountAmount)}</span>
                    </div>
                  )}
                  {order?.voucherId && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Voucher:</span>
                      <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 text-xs">
                        {typeof order?.voucherId === 'object' ? order?.voucherId : order?.voucherId}
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-bold text-sm">
                    <span className="text-gray-800">Tổng cộng:</span>
                    <span className="text-tertiary-600">{formatCurrency(order?.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t pt-4 text-center text-gray-500 text-xs">
              <p>Cảm ơn bạn đã mua hàng!</p>
              <p>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.</p>
              <p className="mt-2">© {new Date().getFullYear()} Kiddie Kingdom</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetailDialog;
