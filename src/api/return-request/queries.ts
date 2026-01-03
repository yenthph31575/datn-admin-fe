import { createMutation, createQuery } from 'react-query-kit';
import { getReturnRequestById, getReturnRequests, updateReturnRequestStatus } from './requests';
import type { IReturnRequest, IReturnRequestQuery, IReturnRequestResponse } from './types';

export const useReturnRequestsQuery = createQuery<IReturnRequestResponse, Partial<IReturnRequestQuery>>({
  queryKey: ['admin/return-requests'],
  fetcher: (params) => getReturnRequests(params),
});

export const useReturnRequestByIdQuery = createQuery<IReturnRequest, string>({
  queryKey: ['admin/return-request'],
  fetcher: (id) => getReturnRequestById(id),
});

export const useUpdateReturnRequestStatusMutation = createMutation<IReturnRequest, { id: string; status: string; adminNote?: string }>({
  mutationFn: ({ id, status, adminNote }) => updateReturnRequestStatus({ id, status, adminNote }),
});
