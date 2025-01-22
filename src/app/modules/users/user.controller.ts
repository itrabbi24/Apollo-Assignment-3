import asyncHandler from "../../utils/asyncHandler";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userServices.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  });





  export const UserController = {
    getAllUsers
  };