import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client";

/**
 * Get Multiple Articles
 * @returns Array<Article>
 */
export async function getArticles(filter: Prisma.ArticleWhereInput, skip:number=0, take:number = 10, orderBy: Prisma.ArticleOrderByWithRelationInput={createdAt:'desc'}) {
        const posts = await prisma.article.findMany({
            skip: skip,
            take: take,
            where: filter,
            orderBy: orderBy
        })
        return posts;
}

/**
 * Get Single Article by Id
 * @returns Article
 */
export async function getArticleById(id: number) {
    const post = await prisma.article.findUnique({where: { id: id}});
    return post;
}


/**
 * Get Single Article by Slug
 * @returns Article
 */
export async function getArticleBySlug(slug: string) {
    const post = await prisma.article.findUnique({where: { slug: slug}});
    return post;
}

/**
 * Create Single Article
 * @returns Article
 */
export async function createArticle(article: Prisma.ArticleCreateInput) {     
    const post = await prisma.article.create({data: article});
    return post;
}


/**
 * Update Single Article
 * @returns Article
 */
export async function updateArticle(id:number, article: Prisma.ArticleCreateInput) {     
    const updatePost = await prisma.article.update({where:{ id: id}, data: article});
    return updatePost;
}

/**
 * Delete Single Article
 * @returns boolean
 */
export async function deleteArticle(id:number) {     
    const result = await prisma.article.delete({where:{ id: id}});
    return result;
}

