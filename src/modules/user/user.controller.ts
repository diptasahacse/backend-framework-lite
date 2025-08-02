// src/user/user.controller.ts
import { UserService } from "./user.service";
import { BaseController } from "@/base/base.controller";
import { User } from "./user.schema";

export class UserController extends BaseController<User, UserService> {
  constructor() {
    super(new UserService());
  }

  // Add any User-specific controller methods here if needed
}
