import { QueryResult } from "pg";

export interface PreRegisterInfo {
  name: string;
  email: string;
  hashedPassword: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roleId?: number;
  roleName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DbResponse<T> {
  result: T | None;
  error: DbError;
}

export interface ResObj {
  message: string;
  data: Object;
}

export interface SessionData {
  id: number;
  name: string;
  email: string;
  roleName: string;
}

export type Tag = "server" | "database" | "redis";
export type None = undefined | null;
export type DbResult = QueryResult | Object | Object[] | null | undefined;
export type DbError = Error | None;
export type RedisValue = string | number | null;
