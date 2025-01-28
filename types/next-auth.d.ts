import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string,
    name: string,
    role: string
  }
  interface Session {
    user: User 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string,
    name: string,
    role: string
  }
}