import z from "zod";

export const SignUpFormSchema = z.object({
    name: z.string().min(1, {message:'Name is required'}),
    email: z.string().email('Valid email is required'),
    password: z.string().min(1, {message:'Password is required'})
  });

export type SignUpData = z.infer<typeof SignUpFormSchema>;
