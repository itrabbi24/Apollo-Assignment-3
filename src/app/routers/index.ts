import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";

const router = Router();
const moduleRouter =
[
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/blogs',
        route: BlogRoute
    }
]



moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;