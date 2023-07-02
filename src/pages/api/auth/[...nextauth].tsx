import { PrismaClient } from '@prisma/client'
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session:
  {
    strategy: "jwt",
  },
  providers:
  [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        
        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password
          }
        })
        if(user === null)
        {
          throw new Error("invalid credentials");
        }
        else
        {
          return {...user, password: "hidden"};
        }
    },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
        session.user.id = token.id;
        return session;
    },
  },
  pages: {
    signIn: "/login"
  },
};

export default NextAuth(authOptions);