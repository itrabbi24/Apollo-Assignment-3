// filepath: /D:/Development/Personal/Level-2/Assignment/Apollo-Assignment-3/src/app/modules/blog/blog.controller.ts
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import asyncHandler from '../../utils/asyncHandler';
import { BlogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';

const blogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const user = (req as any).user as JwtPayload; // Safely casting the user from req

  const createBlog = await BlogService.blogPostServices(user, req.body);



  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Blog created successfully",
    data: createBlog,
  });
});



const updateBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const id = req.params.id;
  const user = (req as any).user as JwtPayload; // Safely casting the user from req


  const updateBlog = await BlogService.updateBlog(user, id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Blog update successfully",
    data: updateBlog,
  });

});


const deleteBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
  const id = req.params.id;
  const user = (req as any).user as JwtPayload; // Safely casting the user from req

  const deleteBlog = await BlogService.deleteBlog(user, id);


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog deleted successfully",
    data:deleteBlog,
  });

});


const getAllBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{

  const search = typeof req.query.search === 'string' ? req.query.search : '';
  const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';  
  const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';  
  const filter = typeof req.query.filter === 'string' ? req.query.filter : ''; 


  const blogs = await BlogService.searchBlog(search, sortBy, sortOrder, filter);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blogs fetched successfully",
    data:blogs,
  });


});




export const BlogController = {
  blogPost,
  updateBlogPost,
  deleteBlog,
  getAllBlog
};