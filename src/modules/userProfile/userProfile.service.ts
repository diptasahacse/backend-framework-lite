import { BaseService } from "@/base/base.service";
import { UserProfileRepository, } from "./userProfile.repository";
import { UserProfile } from "./userProfile.schema";
export class UserProfileService extends BaseService<UserProfile, "id"> {
  constructor() {
    super(new UserProfileRepository());
  }

  // Add any user-specific business logic here
}
