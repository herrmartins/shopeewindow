import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🧪 Received credentials:", credentials);
        console.log("✅ Successfully authorized", user.email);
        await connectDB();

        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          console.log("❌ User not found:", credentials.username);
          return null;
        }
        console.log("✅ User found:", user.email);
        
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          console.log("❌ Password mismatch");
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🔐 Adding user data to token", user);
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("📦 Session token received", token);
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
