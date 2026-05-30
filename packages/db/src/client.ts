import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import { getDatabaseUrl } from "./env";
import type { Database } from "./types";

const { Pool } = pg;

export function createDb(databaseUrl = getDatabaseUrl()) {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: databaseUrl
    })
  });

  return new Kysely<Database>({
    dialect
  });
}

export type DbClient = ReturnType<typeof createDb>;
