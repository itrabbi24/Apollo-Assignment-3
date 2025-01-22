import { Router } from "express";
import { UserRouter } from "../modules/users/user.route";
import { AuthRouter } from "../modules/auth/auth.route";

const router = Router();
const moduleRouter =
[
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    }
]



moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;