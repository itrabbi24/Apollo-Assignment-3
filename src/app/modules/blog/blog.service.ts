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


const updateBlog = async (user: JwtPayload, id: string, payload: IBlog) => {
  if (!id) {
    throw new AppError(400, "Blog ID is required");
  }

  const blog = await blogModal.findOne({ _id: id }).populate('author', '_id');
  
  if (!blog) {
    throw new AppError(404, "Blog Not Found!");
  }

  const isValid = await userModal.findOne({ _id: blog.author });

  console.log(user?.email, isValid?.email);
  
  if (user?.email != isValid?.email) {
    throw new AppError(403, "You are not authorized to update this blog");
  }

  const updatedBlog = await blogModal
    .findOneAndUpdate({ _id: id }, payload, { new: true })
    .select('_id title content')
    .populate('author', 'name email');

  return updatedBlog;
};






const deleteBlog = async (user: JwtPayload, id: string) => {
  if (!id) {
    throw new AppError(400, "Blog ID is required");
  }

  const blog = await blogModal.findOne({ _id: id }).populate('author', '_id');
  
  if (!blog) {
    throw new AppError(404, "Blog Not Found!");
  }

  const isValid = await userModal.findOne({ _id: blog.author });
  
  if (user?.email != isValid?.email) {
    throw new AppError(403, "You are not authorized to update this blog");
  }

  await blogModal.deleteOne({ _id: id });

  return { message: "Blog deleted successfully" };
};


const searchBlog = async (search: string, sortBy: string, sortOrder: 'asc' | 'desc', filter: string) => {
  let query = {};

  // Add search condition if 'search' parameter is provided
  if (search) {
    const regex = new RegExp(search, 'i');  // 'i' for case-insensitive search
    query = {
      ...query,
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } }
      ]
    };
  }

  // Add filter condition if 'filter' parameter is provided
  if (filter) {
    query = {
      ...query,
      author: filter  
    };
  }

  // Set default sort parameters
  const sortOptions: [string, 'asc' | 'desc'][] = [];
  if (sortBy) {
    sortOptions.push([sortBy, sortOrder]);  // Adds the field and sort order to the array
  } else {
    sortOptions.push(['createdAt', 'desc']);  // Default sort by createdAt (desc)
  }

  // Fetch blogs with populated author details
  const blogs = await blogModal.find(query)
    .populate('author', 'title content') 
    .sort(sortOptions);

  return blogs;
};



export const BlogService = {
  blogPostServices,
  updateBlog,
  deleteBlog,
  searchBlog
};
