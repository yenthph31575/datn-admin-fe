import type { FC, HTMLAttributes, PropsWithChildren, SVGProps } from "react";

/* ---------- Common ---------- */
export type FCC<P = unknown> = FC<PropsWithChildren<P>>;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/* ---------- Error ---------- */
export interface ErrorMutate {
  code: number;
  error_code?: string;
  message: string | string[];
  dynamic_data?: Record<string, unknown>;
}

/* ---------- UI ---------- */
export interface TextProps extends HTMLAttributes<HTMLHeadingElement> {}

/* ---------- Table / Query ---------- */
export interface ITableQuery {
  page: number;
  limit: number;
  sortKey?: string;
  sortValue?: "asc" | "desc";
  search?: string;
}

/* ---------- Pagination ---------- */
export interface IPagination {
  page: number;
  limit: number;
  total_page: number;
  total_item: number;
  current_page: number;
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
