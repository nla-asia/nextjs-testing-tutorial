import { createUser, getUserByEmail } from "@/lib/user.service";
import { SignUpFormSchema } from "@/types/auth.types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const { name, email, password } =  SignUpFormSchema.parse(await req.json());
    let emailExist = await getUserByEmail(email);
    if(emailExist){
      throw new Error(`Email address is already in use!`);
    }

    const user = await createUser({name, email, password});

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
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