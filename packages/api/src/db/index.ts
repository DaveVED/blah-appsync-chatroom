import { drizzle } from "drizzle-orm/node-postgres";
import { DsqlSigner } from "@aws-sdk/dsql-signer";
import pg from "pg";
const { Pool } = pg;

const region = "us-east-1";
const hostname = "kqabtwbmaz7seg5pbk2bj6vqt4.dsql.us-east-1.on.aws";
const database = "postgres";

let pool: pg.Pool | null = null;
let tokenExpiry: Date | null = null;

const getAuthToken = async (): Promise<string> => {
  const signer = new DsqlSigner({ hostname, region });
  const token = await signer.getDbConnectAdminAuthToken();

  tokenExpiry = new Date(Date.now() + 13 * 60 * 1000);
  return token;
};

const getDatabasePool = async (): Promise<pg.Pool> => {
  if (pool && tokenExpiry && tokenExpiry > new Date()) {
    return pool;
  }

  const token = await getAuthToken();

  pool = new Pool({
    host: hostname,
    user: "admin",
    password: token,
    database,
    port: 5432,
    ssl: { rejectUnauthorized: false },
  });

  return pool;
};

export const getDbInstance = async () => {
  const pool = await getDatabasePool();
  return drizzle(pool);
};
