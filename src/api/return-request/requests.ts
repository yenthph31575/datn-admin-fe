import client from '../axios';
import type { IReturnRequest, IReturnRequestQuery, IReturnRequestResponse } from './types';

export const getReturnRequests = async (params: Partial<IReturnRequestQuery>): Promise<IReturnRequestResponse> => {
  const { data } = await client({
    url: '/api/admin/return-requests',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getReturnRequestById = async (id: string): Promise<IReturnRequest> => {
  const { data } = await client({
    url: `/api/admin/return-requests/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const updateReturnRequestStatus = async ({
  id,
  status,
  adminNote,
}: {
  id: string;
  status: string;
  adminNote?: string;
}): Promise<IReturnRequest> => {
  const { data } = await client({
    url: `/api/admin/return-requests/${id}/status`,
    method: 'PATCH',
    data: { status, adminNote },
  });
  return data?.data;
};
