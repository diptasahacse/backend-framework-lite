
import { UserService } from "./user.service";
import { BaseController } from "@/base/base.controller";
import { User } from "./user.schema";
export class UserController extends BaseController<User, "id"> {
  constructor() {
    super(new UserService());
  }
}