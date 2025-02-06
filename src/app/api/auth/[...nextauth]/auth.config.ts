import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/libs/mongodb"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { db } = await connectToDB()

          const user = await db.collection("users").findOne({
            email: credentials?.email,
          })

          if (!user) throw new Error("User not found")

          const passwordMatch = await bcrypt.compare(
            credentials?.password || "",
            user.password,
          )

          if (!passwordMatch) throw new Error("Wrong pass or e-mail")

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error: any) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ""
      }
      return session
    },
  },
}
