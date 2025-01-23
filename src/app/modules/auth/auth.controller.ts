import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const signUpUser = asyncHandler(async (req, res, next) => {

  const result = await AuthService.signUpUser(req.body);

  const data = {
    _id: result._id,
    email: result.email,
    name: result.name,
  }

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User created successfully',
    data: data,
  });
});

export const AuthController = {
  signUpUser,
};
