import AppError from "../../errors/AppError";
import { userModal } from "../users/user.model";



const blockedUser = async (email: string) => {
    const user = await userModal.findOne({ email: email });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    user.isBlocked = true;
    await user.save();
  
    return user;
  }
  
  
  
  
  export const AuthService = {
      blockedUser
  }