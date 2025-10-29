import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

import { usersTable } from "./schema.js";
import { customLog } from "../helpers/utils.js";
import { DatabaseResponse } from "../helpers/types.js";

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

export async function emailExists(email: string): Promise<DatabaseResponse> {
  try {
    const result = await db
      .select({
        email: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return [result[0], null];
  } catch (error) {
    return [null, error as Error];
  }
}
