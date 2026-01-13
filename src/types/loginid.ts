import type { ReactNode, ReactElement } from 'react';

/** Function Component generic */
export type FCC<P = {}> = (props: P & { children?: ReactNode }) => ReactElement;

/** Meta response */
export interface IMetaResponse {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

/** Table query */
export interface ITableQuery {
  page?: number;
  limit?: number;
  search?: string;
}

/** Text component props */
export interface TextProps {
  children?: ReactNode;
  className?: string;
}

export interface IPagination {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}
