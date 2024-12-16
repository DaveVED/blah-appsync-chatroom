import { drizzle } from "drizzle-orm/node-postgres";
import { DsqlSigner } from "@aws-sdk/dsql-signer";
import pg from "pg";
const { Pool } = pg;
// Schema and Table Definitions

// AWS RDS Configuration
const region = "us-east-1";
const hostname = "kqabtwbmaz7seg5pbk2bj6vqt4.dsql.us-east-1.on.aws";
const database = "postgres";

let pool: pg.Pool | null = null;
let tokenExpiry: Date | null = null;

// Helper to get or refresh the token
const getAuthToken = async (): Promise<string> => {
  const signer = new DsqlSigner({ hostname, region });
  const token = await signer.getDbConnectAdminAuthToken();

  // Set token expiry to 13 minutes from now (assuming a 15-minute token lifespan)
  tokenExpiry = new Date(Date.now() + 13 * 60 * 1000);
  return token;
};

// Get or refresh the database pool
const getDatabasePool = async (): Promise<pg.Pool> => {
  if (pool && tokenExpiry && tokenExpiry > new Date()) {
    return pool; // Return existing pool if the token is still valid
  }

  const token = await getAuthToken();

  // Create a new pool with the updated token
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

// Get Drizzle instance
export const getDbInstance = async () => {
  const pool = await getDatabasePool();
  return drizzle(pool);
};