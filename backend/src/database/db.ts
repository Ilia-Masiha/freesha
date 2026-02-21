import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { customLog, isNone } from "../helpers/utils.js";
import { DbError, DbResponse } from "../helpers/types.js";
import { fixDatabaseUrl } from "../helpers/utils.js";

export let db: NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export function connectDb() {
  if (isNone(process.env.DATABASE_URL)) {
    customLog("database", "Database URL is empty, check the .env file");
    customLog("server", "Exiting due to no database connection");
    process.exit(1);
  }

  fixDatabaseUrl();

  db = drizzle(process.env.DATABASE_URL);

  customLog("database", "Connected via drizzle");
}

export async function disconnectDb() {
  await db.$client.end();

  customLog("database", "Connection closed");
}

export function makeDbResponse<T>(result: T, error: DbError): DbResponse<T> {
  return { result, error };
}
