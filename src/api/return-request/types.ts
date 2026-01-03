import type { IMetaResponse, ITableQuery } from '../../types/header';

export const ReturnRequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
};

export type ReturnRequestStatusType = keyof typeof ReturnRequestStatus;

export interface IReturnRequest {
  _id: string;
  orderId: {
    _id: string;
    orderCode: string;
  };
  userId: {
    _id: string;
    email: string;
  };
  email: string;
  type: 'RETURN' | 'EXCHANGE'; // Add other potential types if known
  reason: string;
  description: string;
  status: ReturnRequestStatusType;
  items: {
    productId: string;
    variantId: string;
    quantity: number;
    // Add product details if available in response or need separate fetch?
    // Based on user provided JSON, it's just IDs.
    // The UI might need to fetch product info or it might be populated?
    // Let's assume for now it's just IDs, but ideally it should have product info for display.
    // Wait, the JSON shows pure IDs. This is tricky for display.
  }[];
  exchangeOrderId: string | null;
  images: string[];
  refundInfo?: {
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
  };
  exchangeItems: any[]; // Define properly if exchange items structure is known
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReturnRequestQuery extends ITableQuery {
  status?: ReturnRequestStatusType;
  startDate?: string;
  endDate?: string;
}

export interface IReturnRequestResponse {
  items: IReturnRequest[];
  meta: IMetaResponse;
}
