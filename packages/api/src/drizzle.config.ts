import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "kqabtwbmaz7seg5pbk2bj6vqt4.dsql.us-east-1.on.aws",
  },
});