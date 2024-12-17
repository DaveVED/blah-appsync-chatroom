import { sql } from "drizzle-orm";
import { pgSchema, uuid, boolean, timestamp, text } from "drizzle-orm/pg-core";

export const chatSchema = pgSchema("chat_dev");

export const usersTable = chatSchema.table("users", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  hashedPassword: text("hashed_password").notNull().unique(),
  termsAccepted: boolean("terms_accepted").notNull(),
  active: boolean().notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdBy: text("created_by").notNull().default("system"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedBy: text("updated_by").notNull().default("system"),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
