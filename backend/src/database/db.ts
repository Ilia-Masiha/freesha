import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

import { usersTable } from "./schema.js";
import { customLog } from "../helpers/utils.js";
import {
  DbError,
  DbResponse,
  DbResult,
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

function makeDbResponse(result: DbResult, error: DbError): DbResponse {
  return { result, error };
}

export async function emailExists(email: string): Promise<DbResponse> {
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
): Promise<DbResponse> {
  try {
    const result: User[] = await db
      .insert(usersTable)
      .values({
        name: preRegisterInfo.name,
        email: preRegisterInfo.email,
        password: preRegisterInfo.hashedPassword,
        roleId: 1,
      })
      .returning({
        name: usersTable.name,
        email: usersTable.email,
        roleId: usersTable.roleId,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });

    return makeDbResponse(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}
