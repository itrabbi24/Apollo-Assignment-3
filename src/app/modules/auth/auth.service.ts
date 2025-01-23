import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../users/user.interface';
import { userModal } from '../users/user.model';
import { ILogin } from './aut.interface';
import jwt from 'jsonwebtoken';

const signUpUser = async (payload: IUser) => {
  const { email } = payload;
  

  const userExist = await userModal.isUserExist(email);

  if (userExist) {
    throw new AppError(401, 'User already exist');
  }

  const result = await userModal.create(payload);
  return result;
};



// login user

const loginUser = async (payload: ILogin)=>{

  const { email, password }  = payload;

  const user = await userModal.findOne({email: email});

  if(!user){
    throw new AppError(404, "User not found");
  }

  const isMatch = await userModal.isMatchPassword(password, user.password);

  if(!isMatch){
    throw new AppError(401, "Incorrect password");
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked === true) {
    throw new AppError(401, "User is blocked");
    
  }

  // generate token
  const JwtPayload = {
    email: user?.email,
    role: user?.role
  }

  const jwtToken = jwt.sign(JwtPayload, config.JWT_SECRET as string, {
    expiresIn: config.JWT_EXPIRES_IN
  });

  // send token
  return { token: jwtToken };

}




export const AuthService = {
    signUpUser,
    loginUser
}