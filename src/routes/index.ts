import UserRoutes from "@/modules/user/user.route";
import { Router } from "express";
const apiRouter = Router();
const moduleRoutes = [
  {
    path: "/users",
    routes: UserRoutes,
  },
];

moduleRoutes.forEach((item) => apiRouter.use(item.path, item.routes));

export default apiRouter;
