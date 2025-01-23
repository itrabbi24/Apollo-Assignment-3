import { z } from "zod";


export const ZodSignupValidation = z.object({
    body: z.object({
        
        name: z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string'
        }).min(2).max(255),

        email: z.string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }).email(),
        
        password: z.string(
            {
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string'
            }
        ).min(6),

        role: z.enum(['admin', 'user'],{ required_error: 'Role is required'}).default('user'),
        
        isBlocked: z.boolean().default(false),
        createAt: z.date().default(new Date()),
        updateAt: z.date().default(new Date()),
    })
});

export const ZodLoginValidationSchema = z.object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email({ message: "Invalid email address" }),
      password: z.string().min(6),
    }),
  });
  