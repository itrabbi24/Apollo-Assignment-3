import AppError from "../../errors/AppError";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./admin.service";





const blockUser = asyncHandler(async (req, res, next)=>{
    const { userId } = req.params;
  
    if (!userId) {
      throw new AppError(400, 'Email is required');
    }
  
    const user = await AuthService.blockedUser(userId);
  
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User successfully blocked',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  
  });
  


  export const AdminController = {
    blockUser
  };
  