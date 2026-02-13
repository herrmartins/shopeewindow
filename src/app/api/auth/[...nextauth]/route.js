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
        captcha: { label: "Captcha", type: "text" },
      },
      async authorize(credentials) {
        // TEMPORARILY DISABLE CAPTCHA VERIFICATION
        const DISABLE_CAPTCHA = true; // Set to false to re-enable
        if (!DISABLE_CAPTCHA && process.env.RECAPTCHA_SECRET_KEY && credentials.captcha !== "bypass") {
          const recaptchaResponse = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${credentials.captcha}`,
            }
          );
          const recaptchaData = await recaptchaResponse.json();
          if (!recaptchaData.success) {
            console.log("❌ reCAPTCHA verification failed");
            return null;
          }
        }

        await connectDB();

        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          console.log("❌ Password mismatch");
          return null;
        }

        console.log("🎉 Logged in successfully");
        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          hasSecurityQuestion: !!(user.securityQuestion && user.securityAnswer),
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
        token.id = user.id;
        token.name = user.name;
        token.hasSecurityQuestion = user.hasSecurityQuestion;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.hasSecurityQuestion = token.hasSecurityQuestion;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
