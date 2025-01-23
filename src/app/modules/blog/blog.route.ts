import { Router } from "express";

import { BlogController } from "./blog.controller";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { ZodBlogPostValidationSchema } from "./blog.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/const";

const router = Router();

router.post('/', auth(USER_ROLE.admin), validRequestHandler(ZodBlogPostValidationSchema), BlogController.blogPost);



export const BlogRoute = router; 