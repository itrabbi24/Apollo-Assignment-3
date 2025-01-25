import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { userModal } from "../users/user.model";
import AppError from "../../errors/AppError";
import blogModal from "./blog.model";

const blogPostServices = async (user: JwtPayload, payload: IBlog) => {
  const { email } = user;

  const isUserExist = await userModal.findOne({ email }).select('_id email name');
  if (!isUserExist) {
    throw new AppError(404, "User not found");
  }

  // Prepare the new blog data
  const createNewBlog = {
    title: payload.title,
    content: payload.content,
    author: isUserExist._id,
    isPublished: true,
  };

  const result = await blogModal.create(createNewBlog);

  // const populatedResult = await blogModal.findById(result._id).populate('author', 'name email');

  const populatedResult = await blogModal.findOne(
    { _id: result._id }
  ).select('_id title content').populate('author', 'name email');

  return populatedResult;
};


const updateBlog = async (id: string, payload: IBlog)=>{

  if(id === undefined || id === null){
    throw new AppError(400, "Blog id is required");
  }

  const blog = await blogModal.findOne({ _id: id });
  
  if(!blog){
    throw new AppError(404, "Blog Not Found !");
  }

  const updatedBlog = await blogModal.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updatedBlog;

}



export const BlogService = {
  blogPostServices,
  updateBlog
};
