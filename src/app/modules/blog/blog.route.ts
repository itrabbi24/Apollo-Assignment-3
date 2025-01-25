import { Router } from "express";

import { BlogController } from "./blog.controller";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { ZodBlogPostValidationSchema } from "./blog.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/const";

const router = Router();

router.post('/', auth(USER_ROLE.user), validRequestHandler(ZodBlogPostValidationSchema), BlogController.blogPost);


router.patch('/:id', auth(USER_ROLE.admin, USER_ROLE.user), BlogController.updateBlogPost);


router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), BlogController.deleteBlog);

export const BlogRoute = router; 