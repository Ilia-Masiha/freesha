import { ExtractTablesWithRelations } from "drizzle-orm";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import { QueryResult } from "pg";

import {
  userEducationDegreesTable,
  userWorkExperiencesTable,
} from "../database/schema.js";

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

  skills?: string[] | null;
  languages?: string[] | null;
  languageCodes?: string[] | null;
  postalCode?: string;
  homeAddress?: string;
  genderId?: number;
  jobTitle?: string;
  bio?: string;
  birthDate?: string | null;

  educationDegrees?: educationDegree[];
  workExperiences?: workExperience[];

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
export type educationDegree = typeof userEducationDegreesTable.$inferSelect;
export type workExperience = typeof userWorkExperiencesTable.$inferSelect;
export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

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
