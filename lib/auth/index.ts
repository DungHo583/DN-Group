import NextAuth, { getServerSession, NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/server/prisma"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async session({ session, token }) {
      console.log("log check session ===", session);
      console.log("log check token ===", token);

      return session
    },

    async jwt({ token, account }) {
      console.log("log check token jwt ===", token);
      console.log("log check account jwt ===", account);

      return token
    }
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        username: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const findAccount = await prisma.userAccount.findFirst({ where: { userName: credentials?.username } })

        console.log("log check find account ===", findAccount);

        if (!findAccount) {
          throw new Error("Account not found")
        }

        if (findAccount.hashPassword != credentials?.password) {
          throw new Error("Username or Password is wrong!")
        }

        return findAccount
      },
    })
  ],

}

export function getAuthSession() {
  return getServerSession(authOptions);
}