import { Router } from 'express';
import validRequestHandler from '../../middlewares/validRequestHandler';
import { ZodLoginValidationSchema, ZodSignupValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../utils/const';

const router = Router();

router.post('/singup', validRequestHandler(ZodSignupValidation), AuthController.signUpUser);

router.post('/login', validRequestHandler(ZodLoginValidationSchema), AuthController.loginUser);

router.patch('/block-user/:id', auth(USER_ROLE.admin), AuthController.blockUser);

export const AuthRouter = router;
