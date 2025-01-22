import { Router } from 'express';
import validRequestHandler from '../../middlewares/validRequestHandler';
import { ZodSignupValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/singup', validRequestHandler(ZodSignupValidation), AuthController.signUpUser);


export const AuthRouter = router;
