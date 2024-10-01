import NextAuth, { DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface UserAccount extends DefaultUser {

  }
  interface Session {
    username?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultUser {
    username?: string
  }
}