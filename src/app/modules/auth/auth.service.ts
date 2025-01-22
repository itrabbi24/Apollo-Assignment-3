import AppError from '../errors/AppError';
import { IUser } from '../users/user.interface';
import { userModal } from '../users/user.model';

const signUpUser = async (payload: IUser) => {
  const { email } = payload;
  

  const userExist = await userModal.isUserExist(email);

  if (userExist) {
    throw new AppError(401, 'User already exist');
  }

  const result = await userModal.create(payload);
  return result;
};





export const AuthService = {
    signUpUser,
}