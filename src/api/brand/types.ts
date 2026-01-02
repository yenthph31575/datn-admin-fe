import type { IMetaResponse, ITableQuery } from '../../types/loginid';

export interface IBrandQuery extends ITableQuery {}

export interface IBrand {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface IBrandResponse {
  items: IBrand[];
  meta: IMetaResponse;
}
