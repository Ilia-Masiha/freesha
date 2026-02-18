import "../helpers/load_env.js";

import { defineConfig } from "drizzle-kit";

import { fixDatabaseUrl } from "../helpers/utils.js";

fixDatabaseUrl();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
