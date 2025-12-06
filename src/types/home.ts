import type { FC, PropsWithChildren } from "react";

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export interface IHomeUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IHomeApiResponse<T> {
  data: T;
  meta?: IMetaResponse;
  message?: string;
  success: boolean;
}

export interface IHomeQuery {
  page: number;
  limit: number;
  search: string;
  sortKey?: string;
  sortValue?: "asc" | "desc";
}

export interface ErrorMutate {
  code: number;
  error_code?: string;
  message: string | string[];
  dynamic_data?: {};
}

export function getHomeUsers(): IHomeUser[] {
  return [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "admin",
      created_at: "2024-01-02",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      role: "user",
      created_at: "2024-03-15",
    },
    {
      id: 3,
      name: "Hoàng Xuân Trường",
      email: "hoangxuantruong2403@gmail.com",
      role: "member",
      created_at: "2024-05-10",
    },
  ];
}

export function countUsers(users: IHomeUser[]): number {
  return users.length;
}

export function getHomeUserResponse(): IHomeApiResponse<IHomeUser[]> {
  const users = getHomeUsers();
  return {
    data: users,
    success: true,
    meta: {
      total: users.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    message: "Lấy danh sách user thành công",
  };
}

console.log("Danh sách user:", getHomeUsers());
console.log("Tổng user:", countUsers(getHomeUsers()));
console.log("API Response:", getHomeUserResponse());
