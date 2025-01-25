import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";
import { AdminRouter } from "../modules/admin/admin.route";

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
    },
    {
        path: '/admin',
        route: AdminRouter
    }
]



moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;