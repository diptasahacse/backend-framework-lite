import { BaseService } from "@/base/base.service";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";
export class UserService extends BaseService<User, "id"> {
  constructor() {
    super(new UserRepository());
  }

  // Add any user-specific business logic here
}
