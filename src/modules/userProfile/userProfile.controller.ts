// src/user/user.controller.ts
import { UserProfile } from "./userProfile.schema";
import { UserProfileService } from "./userProfile.service";
import { BaseController } from "@/base/base.controller";

export class UserProfileController extends BaseController<UserProfile, UserProfileService> {
  constructor() {
    super(new UserProfileService());
  }

  // Add any User-specific controller methods here if needed
}
