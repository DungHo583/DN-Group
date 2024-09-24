import NextAuth, { DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface UserAccount extends DefaultUser {

  }
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultUser {

  }
}