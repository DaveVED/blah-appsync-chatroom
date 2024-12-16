import { getDbInstance } from "@/db/index.js";
import { users } from "@/db/schema.js";

export const getUsers = async () => {
    const db = await getDbInstance();
    const result = db.select().from(users);
    return result;
}

export const createUser = async ({email, hashed_password}: {email: string, hashed_password: string}) => {
    const db = await getDbInstance();
    const record = await db.insert(users).values({
        hashed_password,
        email
    }).returning().then(([record]) => record);

    return record;
}