import UserRoutes from "@/modules/user/user.route";
import UserProfileRoutes from "@/modules/userProfile/userProfile.route";
import { Router } from "express";
const apiRouter = Router();
const moduleRoutes = [
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/user-profiles",
    routes: UserProfileRoutes,
  },
];

moduleRoutes.forEach((item) => apiRouter.use(item.path, item.routes));

export default apiRouter;
