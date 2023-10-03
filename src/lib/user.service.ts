import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";



/**
 * Get Single User by Id
 * @returns User
 */
export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({where: { id: id}});
    return user;
}


/**
 * Get Single User by Email
 * @returns User
 */
export async function getArticleByEmail(email: string) {
    const user = await prisma.user.findUnique({where: { email: email}});
    return user;
}

/**
 * Create Single User
 * @returns User
 */
export async function createUser(userData: Prisma.UserCreateInput) {     
    const hash = bcrypt.hashSync(userData.password, 10);
        userData.password = hash;
    const user = await prisma.user.create({data: userData});
    return user;
}


/**
 * Update Single Article
 * @returns Article
 */
export async function updateUser(id:number, article: Prisma.ArticleCreateInput) {     
    const updatePost = await prisma.article.update({where:{ id: id}, data: article});
    return updatePost;
}


