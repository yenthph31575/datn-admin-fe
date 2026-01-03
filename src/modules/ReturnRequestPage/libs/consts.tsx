import type { IReturnRequest } from '@/api/return-request/types';
import { Badge } from '@/components/ui/badge';
import type { ITableColumn } from '@/components/ui/table';
import { format } from 'date-fns';
import ReturnRequestDetailModal from '../components/ReturnRequestDetailModal';

export const RETURN_REQUEST_STATUS_LABELS = {
  PENDING: 'Chờ xử lý',
  APPROVED: 'Đã chấp nhận',
  REJECTED: 'Đã từ chối',
  COMPLETED: 'Hoàn thành',
};

export const RETURN_REQUEST_STATUS_COLORS = {
  PENDING: 'orange',
  APPROVED: 'blue',
  REJECTED: 'red',
  COMPLETED: 'green',
};

export const COLUMNS = (refetch: any): ITableColumn[] => [
  {
    title: 'Mã đơn hàng',
    key: 'orderId',
    getCell: ({ row }: { row: IReturnRequest }) => (typeof row.orderId === 'object' ? row.orderId.orderCode : row.orderId),
  },
  {
    title: 'Người yêu cầu',
    key: 'userId',
    getCell: ({ row }: { row: IReturnRequest }) => <>{row.userId?.email || row.userId}</>,
  },
  {
    title: 'Lý do',
    key: 'reason',
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    getCell: ({ row }: { row: IReturnRequest }) => <>{format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm')}</>,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    getCell: ({ row }: { row: IReturnRequest }) => (
      <Badge color={RETURN_REQUEST_STATUS_COLORS[row.status]}>{RETURN_REQUEST_STATUS_LABELS[row.status]}</Badge>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    getCell: ({ row }: { row: IReturnRequest }) => <ReturnRequestDetailModal data={row} refetch={refetch}></ReturnRequestDetailModal>,
  },
];

export const defaultQuery = {
  page: 1,
  limit: 10,
  sortKey: 'createdAt',
  sortOrder: 'desc' as const,
};
