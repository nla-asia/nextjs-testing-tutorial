import { getArticles, getArticlesWithTotalCount } from "@/lib/article.service";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
    const limit = 6;
    const start = (page - 1)*limit;
    
    const articlesData = await getArticlesWithTotalCount({}, start, limit, {createdAt:"asc"});
    const totalPages = articlesData.totalCount? Math.ceil(articlesData.totalCount/limit) : 1;
    
    return NextResponse.json({
      articles: articlesData.articles,
      totalPages
    });

  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}