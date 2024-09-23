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
      return session
    },

    async jwt({ token, account }) {
      return token
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const findAccount = await prisma.userAccount.findFirst({ where: { userName: credentials?.username } })

        if (!findAccount) {
          return null
        }

        if (findAccount.hashPassword != credentials?.password) {
          return null
        }

        return findAccount
      },
    })
  ],

}

export function getAuthSession() {
  return getServerSession(authOptions);
}