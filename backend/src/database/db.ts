import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

import { rolesTable, usersTable } from "./schema.js";
import { customLog } from "../helpers/utils.js";
import {
  DbError,
  DbResponse,
  DbResult,
  None,
  PreRegisterInfo,
  User,
} from "../helpers/types.js";

let db: NodePgDatabase<Record<string, never>> & {
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

function makeDbResponse<T>(
  result: T | None,
  error: DbError
): DbResponse<T | None> {
  return { result, error };
}

export async function seed() {
  try {
    await db
      .insert(rolesTable)
      .values([
        { id: 1, roleName: "user" },
        { id: 2, roleName: "admin" },
      ])
      .onConflictDoNothing();

    customLog("database", "Roles seeded successfully");
    process.exit(0);
  } catch (error) {
    customLog("database", `Seeding failed: ${error}`);
    process.exit(1);
  }
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

    return makeDbResponse<User>(result[0], null);
  } catch (error) {
    return makeDbResponse<null>(null, error as Error);
  }
}
