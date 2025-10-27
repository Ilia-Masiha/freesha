import "./helpers/load_env.js";

import { Application } from "express-serve-static-core";

import { createApp } from "./app/app.js";

const app: Application = createApp();
const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
