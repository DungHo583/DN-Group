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
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          return user
        } else {
          return null
        }
      },
    })
  ],

}

export function getAuthSession() {
  return getServerSession(authOptions);
}