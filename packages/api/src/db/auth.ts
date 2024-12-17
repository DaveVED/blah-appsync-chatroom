import { getDbInstance } from "@/db/index.js";
import { NewUser, User, usersTable } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export const getUsers = async (): Promise<User[]> => {
  const db = await getDbInstance();

  const result = await db.select().from(usersTable);

  return result;
};

export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const db = await getDbInstance();
  const record = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return record[0] || undefined;
};

export const getUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  const db = await getDbInstance();
  const record = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  return record[0] || undefined;
};

export const createUser = async (user: NewUser): Promise<User> => {
  const db = await getDbInstance();
  const record = await db
    .insert(usersTable)
    .values({
      ...user,
      active: user.termsAccepted,
    })
    .returning()
    .then(([record]) => record);

  return record;
};
