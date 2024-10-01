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
      if (token) {
        session.username = token.username
      }

      return session
    },

    async jwt({ token, account }) {
      if (account) {
        const findAccount = await prisma.userAccount.findFirst({ where: { id: account.providerAccountId } })
        if (findAccount) {
          token.username = findAccount.userName
        }
      }

      return token
    },

    // async signIn({ user }) {
    //   try {
    //     if (user) {
    //       const findAccount = await prisma.userAccount.findFirst({ where: { id: user.id } })

    //       if (!findAccount) {
    //         throw new Error("Account not found")
    //       }
    //     } else {
    //       throw new Error("SignIn Auth Error")
    //     }
    //   } catch (error) {
    //     console.log("[auth][signin][error]", error);
    //   }
    //   console.log("log check sign in ôke ===");

    //   return true
    // }
  },
  providers: [
    CredentialsProvider({
      id: "login-cred",
      name: "login-cred",
      credentials: {
        username: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const findAccount = await prisma.userAccount.findFirst({ where: { userName: credentials?.username } })

        if (!findAccount) {
          throw new Error("Account not found")
        }

        if (findAccount.hashPassword != credentials?.password) {
          throw new Error("Username or Password is wrong!")
        }

        return {
          id: findAccount.id,
          email: "",
          image: "",
          name: "",
        }
      },
    })
  ],
}

export async function getAuthSession() {
  return getServerSession(authOptions);
}