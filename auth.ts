import { api } from "api/api"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials)
        let user = null

        const { email, password } = credentials
        try {
          user = await api.post("/authentication/login", { email, password })
        } catch (err) {
          console.log(err)
        }

        if (!user) {
          throw new Error("User not found.")
        }
        return user
      },
    }),
  ],
})