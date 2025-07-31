import { timestamps } from "@/drizzle/schema/columns.helpers";
import { pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userRolesEnum, userStatusEnum } from "./user.enum";

export const userTable = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRolesEnum("role").notNull().default("customer"),
  status: userStatusEnum("status").notNull().default("active"),
  verifiedAt: timestamp("verified_at"),
  ...timestamps
});