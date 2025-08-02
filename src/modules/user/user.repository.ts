import { drizzle } from "drizzle-orm/node-postgres";
import { BaseRepository } from "@/base/base.repository";
import { User, UserTable } from "./user.schema";

export class UserRepository extends BaseRepository<User, "id"> {
  constructor() {
    super(UserTable, "id");
  }

  // Add any User-specific queries here if needed
}
