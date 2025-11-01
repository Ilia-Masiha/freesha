import "../src/helpers/load_env.js";
import { connectDb, seed } from "../src/database/db.js";

connectDb();
await seed();
