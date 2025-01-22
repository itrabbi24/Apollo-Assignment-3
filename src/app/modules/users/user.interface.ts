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