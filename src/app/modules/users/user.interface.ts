import { Model } from "mongoose";

export type TUserRole = 'admin' | 'user';

export interface IUser {

    name : string;
    email: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;

}



export interface IUserMethod extends Model<IUser> {
    isUserExist(email: string): Promise<IUser>;
    isMatchPassword(plainPassword: string,hashPassword: string): Promise<boolean>;
  }
  