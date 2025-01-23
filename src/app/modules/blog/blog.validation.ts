import { z } from "zod";

export const ZodBlogPostValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string'
        }).min(2).max(255),

        content: z.string({
            required_error: 'Content is required',
            invalid_type_error: 'Content must be a string'
        }).min(2)
    })
});