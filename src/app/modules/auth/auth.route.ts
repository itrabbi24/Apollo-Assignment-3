import { Router } from 'express';
import validRequestHandler from '../../middlewares/validRequestHandler';
import { ZodLoginValidationSchema, ZodSignupValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/register', validRequestHandler(ZodSignupValidation), AuthController.signUpUser);

router.post('/login', validRequestHandler(ZodLoginValidationSchema), AuthController.loginUser);

export const AuthRouter = router;
