import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const signUpUser = asyncHandler(async (req, res, next) => {

  const result = await AuthService.signUpUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User created successfully',
    data: result,
  });
});

export const AuthController = {
  signUpUser,
};
