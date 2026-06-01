import { serve } from "@hono/node-server";

import app from "./index";

const port = Number(process.env.PORT ?? 3001);

serve({
  fetch: app.fetch,
  port
});

console.log(`Hi5Central API listening on :${port}`);
