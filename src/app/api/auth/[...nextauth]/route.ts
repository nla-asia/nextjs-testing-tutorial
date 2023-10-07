import NextAuth from "next-auth";
import  prisma  from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { getUserByEmail } from "@/lib/user.service";
import { authOptions } from "@/lib/auth";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

