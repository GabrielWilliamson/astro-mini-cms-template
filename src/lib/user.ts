// src/lib/user.ts
import { db, eq, user } from "astro:db";
import { hashPassword, verifyPassword } from "./auth";

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: string
) {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .get();

  if (existingUser) {
    throw new Error("This email is already in use");
  }

  const hashedPassword = await hashPassword(password);
  const userId = crypto.randomUUID();

  await db.insert(user).values({
    id: userId,
    email,
    password: hashedPassword,
    name,
    role,
  });

  return userId;
}

export async function validateCredentials(email: string, password: string) {
  const currrentUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .get();

  if (!currrentUser) {
    return null;
  }

  const validPassword = await verifyPassword(password, currrentUser.password);

  if (!validPassword) {
    return null;
  }

  return currrentUser;
}

export async function getUserById(userId: string) {
  return db.select().from(user).where(eq(user.id, userId)).get();
}
