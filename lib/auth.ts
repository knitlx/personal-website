import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const isDevelopment = process.env.NODE_ENV === "development";

const validateEnvVars = () => {
  const requiredVars = ["GITHUB_ID", "GITHUB_SECRET"];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  if (!isDevelopment && (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32)) {
    throw new Error("NEXTAUTH_SECRET must be set and be at least 32 characters in production");
  }

  if (isDevelopment && !process.env.NEXTAUTH_SECRET && !process.env.NEXTAUTH_URL) {
    console.warn("NEXTAUTH_SECRET not set. Using temporary secret for development only.");
  }
};

validateEnvVars();

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedGithubEmails = (process.env.ALLOWED_GITHUB_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

      if (profile?.email && allowedGithubEmails.includes(profile.email.toLowerCase())) {
        if (isDevelopment) {
          console.log(`Авторизация разрешена для GitHub email: ${profile.email}`);
        }
        return true;
      } else {
        if (isDevelopment) {
          console.warn(
            `Авторизация отклонена для GitHub email: ${profile?.email}. Несанкционированная попытка входа.`
          );
        }
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/admin/login",
  },
};
