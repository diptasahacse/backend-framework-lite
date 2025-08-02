import { Router } from "express";
import { UserController } from "./user.controller";

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get("/", userController.findAll);
// UserRoutes.get("/:id", userController.getById);
// UserRoutes.post("/", userController.create);
// UserRoutes.put("/:id", userController.update);
// UserRoutes.delete("/:id", userController.delete);

export default UserRoutes;
