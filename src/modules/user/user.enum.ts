import { pgEnum } from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum("role", ["admin", "customer"]);
export const userStatusEnum = pgEnum("status", ["active", "inactive"]);
