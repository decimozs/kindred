import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { insertExcludedFields, timestamps } from "./base";
import type { z } from "zod/v4";

export const usersTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  ...timestamps,
});

export const insertUserSchema = createInsertSchema(usersTable)
  .omit(insertExcludedFields)
  .strict();

export const updateUserSchema = insertUserSchema.partial();

export type User = typeof usersTable.$inferSelect;
export type InserUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
