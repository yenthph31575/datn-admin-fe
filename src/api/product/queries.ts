import { createMutation, createQuery } from 'react-query-kit';
import { getProductById, getProducts, updateProduct } from './requests';
import type { IProduct, IProductQuery, IProductResponse } from './types';

export const useProductsQuery = createQuery<IProductResponse, Partial<IProductQuery>>({
  queryKey: ['admin/products'],
  fetcher: (params) => getProducts(params),
});

export const useProductByIdQuery = createQuery<IProduct, string>({
  queryKey: ['product'],
  fetcher: (id) => getProductById(id),
});

export const useUpdateProductMutation = createMutation<IProduct, { id: string; formData: any }>({
  mutationFn: (data) => updateProduct(data),
});
