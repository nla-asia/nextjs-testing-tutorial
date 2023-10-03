export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create-post"],
  // matcher: ["/((?!register|api|login).*)"],
};