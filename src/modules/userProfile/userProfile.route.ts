import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";

const UserProfileRoutes = Router();
const userProfileController = new UserProfileController();

UserProfileRoutes.get("/", userProfileController.findAll);
UserProfileRoutes.get("/:id", userProfileController.findById);
UserProfileRoutes.post("/", userProfileController.create);
UserProfileRoutes.put("/:id", userProfileController.update);
UserProfileRoutes.delete("/:id", userProfileController.delete);

export default UserProfileRoutes;
