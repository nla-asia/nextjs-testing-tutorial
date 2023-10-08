import { createArticle } from "@/lib/article.service";
import { NewPostFormSchema } from "@/types/article.types";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"




export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const {title, slug, summary, body } =  NewPostFormSchema.parse(await req.json());
   
    const author = {connect: {id: session?.user.id }};
    console.log(author);

    const article = await createArticle({title, slug, summary, body, author});

    return NextResponse.json({
      article
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