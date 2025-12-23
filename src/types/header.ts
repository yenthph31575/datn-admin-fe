import type {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  SVGProps,
} from "react";

/* =====================================================
 * COMMON TYPES
 * ===================================================== */

/**
 * FC có sẵn children
 */
export type FCC<P = Record<string, unknown>> = FC<PropsWithChildren<P>>;

/**
 * Props dùng chung cho Icon SVG
 */
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};


/* =====================================================
 * ERROR / API ERROR
 * ===================================================== */

/**
 * Cấu trúc lỗi trả về từ API
 */
export interface ErrorMutate {
  code: number;
  errorCode?: string;
  message: string | string[];
  dynamicData?: Record<string, unknown>;
}


/* =====================================================
 * UI
 * ===================================================== */

/**
 * Props cho component Text / Heading
 */
export interface TextProps
  extends HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: string;
}


/* =====================================================
 * TABLE / QUERY
 * ===================================================== */

export interface ITableQuery {
  page: number;
  limit: number;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}


/* =====================================================
 * API META RESPONSE (DATA TỪ BACKEND)
 * ===================================================== */

/**
 * Meta trả về từ API
 * ❌ KHÔNG có totalPages
 */
export interface IMetaResponse {
  page: number;
  limit: number;
  total: number;
}


/* =====================================================
 * PAGINATION (DATA DÙNG CHO UI)
 * ===================================================== */

/**
 * Phân trang hiển thị UI
 * ✅ totalPages được tính ở frontend
 */
export interface IPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
