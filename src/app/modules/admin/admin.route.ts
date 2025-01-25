import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/const";
import { AdminController } from "./admin.controller";

const router = Router(); 


router.patch('/users/:userId/block', auth(USER_ROLE.admin), AdminController.blockUser);

export const AdminRouter = router;