import { timestamps } from "@/drizzle/schema/columns.helpers";
import { UserTable } from "@/drizzle/schema";
import {
  date,
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
export const UserProfileTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .unique()
    .notNull()
    .references(() => UserTable.id, {
      onDelete: "cascade",
    }),
  dob: date("dob"),
  profilePicture: varchar("profile_picture", { length: 500 }),
  bio: varchar("bio", { length: 1000 }), 
  ...timestamps,
});
