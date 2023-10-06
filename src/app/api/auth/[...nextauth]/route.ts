import NextAuth from "next-auth";
import  prisma  from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/user.service";


const handler = NextAuth({
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    adapter: PrismaAdapter(prisma as any),
    pages: {
      signIn: "/signin",
    },
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user = await getUserByEmail(credentials.email);
          if (!user || !(await compare(credentials.password, user.password!))) {
            return null;
          }
  
          return user as any; // or use strict: false
        },
      }),
    ],
    callbacks: {
      jwt: ({ token, user }) => {
            if (user) {
              const u = user as unknown as any;
              return {
                ...token,
                id: u.id,
                randomKey: u.randomKey,
              };
            }
            return token;
      },
      session: ({ session, token }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            randomKey: token.randomKey,
          },
        };
      },

    },
  });
export { handler as GET, handler as POST };

