import { sql } from "drizzle-orm";
import { pgSchema, uuid, varchar, timestamp , text} from "drizzle-orm/pg-core";

/**
 * Needs to be config driven eventually.... Ideall, we can set someting in the lambda.
 */
export const mySchema = pgSchema("chat_dev");
export const colors = mySchema.enum("colors", ["red", "green", "blue"]);

export const users = mySchema.table("users", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashed_password: text(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),  
});

export type User = typeof users.$inferSelect;