import { Router } from "express";
import { UserRouter } from "../modules/users/user.route";

const router = Router();

const moduleRouter =
[
    {
        path: '/users',
        route: UserRouter
    }
]



moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;