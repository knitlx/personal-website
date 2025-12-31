import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedGithubEmails = (process.env.ALLOWED_GITHUB_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

      if (
        profile?.email &&
        allowedGithubEmails.includes(profile.email.toLowerCase())
      ) {
        console.log(`Авторизация разрешена для GitHub email: ${profile.email}`);
        return true;
      } else {
        console.warn(
          `Авторизация отклонена для GitHub email: ${profile?.email}. Несанкционированная попытка входа.`,
        );
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
