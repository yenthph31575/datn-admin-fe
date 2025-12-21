import { BANNER_TYPES } from '@/modules/BannerManagementPage/libs/validators';
import type { IMetaResponse, ITableQuery } from '../../types/header';

export interface IBannerQuery extends ITableQuery {
  type?: (typeof BANNER_TYPES)[number];
}

export interface IBanner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  type: (typeof BANNER_TYPES)[number];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBannerResponse {
  items: IBanner[];
  meta: IMetaResponse;
}
