import { drizzle } from "drizzle-orm/node-postgres";
import { BaseRepository } from "@/base/base.repository";
import { UserProfile, UserProfileTable } from "./userProfile.schema";

export class UserProfileRepository extends BaseRepository<UserProfile, "id"> {
  constructor() {
    super(UserProfileTable, "id");
  }

  // Add any User-specific queries here if needed
}
