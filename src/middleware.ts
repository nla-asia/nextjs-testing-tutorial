export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/new_post"],
 // matcher: ["/((?!register|api|new_post|login).*)"],
};