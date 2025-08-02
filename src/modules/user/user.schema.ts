import { timestamps } from "@/drizzle/schema/columns.helpers";
import {
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum("role", ["admin", "customer"]);
export const userStatusEnum = pgEnum("status", [
  "active",
  "inactive",
  "banned",
]);

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRolesEnum("role").notNull().default("customer"),
  status: userStatusEnum("status").notNull().default("active"),
  verifiedAt: timestamp("verified_at"),
  ...timestamps,
});

export type User = typeof UserTable.$inferSelect;