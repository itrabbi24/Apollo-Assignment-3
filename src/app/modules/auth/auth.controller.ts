
import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';

import { AuthService } from './auth.service';



// sign up user
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





// login
const loginUser = asyncHandler(async (req, res, next) => {

  const { token } = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: {
      token: token,
    },
  });
});


export const AuthController = {
  signUpUser,
  loginUser
};





// node
// Welcome to Node.js v20.4.0.
// Type ".help" for more information.
// > require('node:crypto').randomBytes(64).toString('hex')
// '568b6620639fdf54'