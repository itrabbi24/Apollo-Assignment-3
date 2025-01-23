import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/users/user.interface';
import asyncHandler from '../utils/asyncHandler';
import { userModal } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Validate the token
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    // Check if the user exists
    const users = await userModal.isUserExist(email);

    if (!users) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // Check if the user is blocked
    const isDeleted = users?.isBlocked;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // Check if the user's role matches
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // req.user = decoded as JwtPayload & { role: string };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = decoded as JwtPayload & { role: string };


    next();
  });
};

export default auth;
