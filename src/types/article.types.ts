import { Prisma } from "@prisma/client";
import z from "zod";


export type Article = Prisma.ArticleGetPayload<{
  include: { author: true }, //TODO: NEED TO FIX THIS BECAUSE THIS IS INCLUDEING PASSWORD OF AUTHOR
}>;

export const NewPostFormSchema = z.object({
    title: z.string().min(5, {message:'Title is required'}),
    slug: z.string().min(5,'Slug is required'),
    summary: z.string().min(5, {message:'Summary is required'}),
    body: z.string().min(15, {message:'Article Body is required'}),
});

export type NewPostData = z.infer<typeof NewPostFormSchema>;

