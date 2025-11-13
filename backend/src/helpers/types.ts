import { QueryResult } from "pg";

export type PreRegisterInfo = Required<
  Pick<User, "name" | "email" | "hashedPassword">
>;

export interface User {
  id: number;
  name: string;
  email: string;
  hashedPassword?: string;
  roleId?: number;
  roleName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DbResponse<T> {
  result: T;
  error: DbError;
}

export interface ResObj {
  message: string;
  data: Object;
}

export type SessionData = Required<
  Pick<User, "id" | "name" | "email" | "roleName">
>;

export type Tag = "server" | "database" | "redis";
export type RoleName = "user" | "admin";
export type JobPostStatus = "pending" | "accepted" | "cancelled" | "done";
export type GenderName = "N" | "M" | "F";
export type None = undefined | null;
export type DbResult = QueryResult | Object | Object[] | null | undefined;
export type DbError = Error | None;
export type RedisValue = string | number | null;

export type LanguageCode =
  | "en"
  | "fa"
  | "tr"
  | "ar"
  | "zh"
  | "he"
  | "es"
  | "ru"
  | "de"
  | "fr"
  | "it"
  | "pl"
  | "pt"
  | "ja"
  | "ko"
  | "ur"
  | "sv"
  | "no"
  | "fi"
  | "cy"
  | "hy"
  | "el"
  | "da"
  | "ku"
  | "hi"
  | "az"
  | "eo";
