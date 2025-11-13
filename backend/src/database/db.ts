import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { Pool } from "pg";

import {
  gendersTable,
  languagesTable,
  rolesTable,
  userLanguagesTable,
  userSkillsTable,
  usersTable,
} from "./schema.js";
import { customLog } from "../helpers/utils.js";
import {
  DbError,
  DbResponse,
  DbResult,
  None,
  PreRegisterInfo,
  User,
} from "../helpers/types.js";

export let db: NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export function connectDb() {
  db = drizzle(process.env.DATABASE_URL!);

  customLog("database", "Connected via drizzle");
}

export async function disconnectDb() {
  await db.$client.end();

  customLog("database", "Connection closed");
}

function makeDbResponse<T>(result: T, error: DbError): DbResponse<T> {
  return { result, error };
}

export async function emailExists(
  email: string
): Promise<DbResponse<DbResult>> {
  try {
    const result = await db
      .select({
        email: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return makeDbResponse(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function insertUser(
  preRegisterInfo: PreRegisterInfo
): Promise<DbResponse<DbResult>> {
  try {
    const result = await db
      .insert(usersTable)
      .values({
        name: preRegisterInfo.name,
        email: preRegisterInfo.email,
        password: preRegisterInfo.hashedPassword,
        roleId: 1,
      })
      .returning({
        id: usersTable.id,
      });

    return makeDbResponse(result[0]?.id, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getUser(id: number): Promise<DbResponse<User | None>> {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        roleName: rolesTable.roleName,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
      .where(eq(usersTable.id, id));

    return makeDbResponse<User | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getUserByEmail(
  email: string
): Promise<DbResponse<User | None>> {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        hashedPassword: usersTable.password,
        roleName: rolesTable.roleName,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
      .where(eq(usersTable.email, email));

    return makeDbResponse<User | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function updateLastLogin(
  id: number
): Promise<DbResponse<true | null>> {
  try {
    await db
      .update(usersTable)
      .set({
        lastLoginAt: sql`NOW()`,
      })
      .where(eq(usersTable.id, id));

    return makeDbResponse(true, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function updateUser(
  id: number,
  values: Partial<User>
): Promise<DbResponse<User | None>> {
  try {
    const result = await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ ...values, updatedAt: sql`NOW()` })
        .where(eq(usersTable.id, id));

      return await tx
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          roleName: rolesTable.roleName,

          skills: sql`ARRAY_AGG(DISTINCT user_skills.skill)`,
          languages: sql`ARRAY_AGG(DISTINCT languages.language_name_fa)`,
          postalCode: usersTable.postalCode,
          homeAddress: usersTable.homeAddress,
          genderName: gendersTable.genderName,
          jobTitle: usersTable.jobTitle,
          bio: usersTable.bio,
          birthDate: usersTable.birthDate,

          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        })
        .from(usersTable)
        .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
        .innerJoin(userSkillsTable, eq(usersTable.id, userSkillsTable.userId))
        .innerJoin(
          userLanguagesTable,
          eq(usersTable.id, userLanguagesTable.userId)
        )
        .innerJoin(
          languagesTable,
          eq(userLanguagesTable.languageCode, languagesTable.code)
        )
        .innerJoin(gendersTable, eq(usersTable.genderId, gendersTable.id))
        .where(eq(usersTable.id, id));
    });
    return makeDbResponse(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}
