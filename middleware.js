import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.includes("admin")) {
        return token?.role === "admin";
      }
      return Boolean(token);
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },
});

export const config = { matcher: ["/admin/:path*"] };
