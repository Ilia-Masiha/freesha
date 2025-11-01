import { QueryResult } from "pg";

export interface PreRegisterInfo {
  name: string;
  email: string;
  hashedPassword: string;
}

export interface User {
  name: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbResponse {
  result: DbResult;
  error: DbError;
}

export type Tag = "server" | "database" | "redis";
export type None = undefined | null;
export type DbResult = QueryResult | Object | Object[] | null | undefined;
export type DbError = Error | None;
export type RedisValue = string | number | null;
