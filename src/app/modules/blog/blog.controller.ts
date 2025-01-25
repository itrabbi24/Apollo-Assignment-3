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

  const updateBlog = await BlogService.updateBlog(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Blog created successfully",
    data: updateBlog,
  });

});



export const BlogController = {
  blogPost,
  updateBlogPost
};