import { userModal } from "./user.model";

const getAllUser = async()=>{
    const users = await userModal.find();
    return users;
}





export const userServices = {
    getAllUser
}