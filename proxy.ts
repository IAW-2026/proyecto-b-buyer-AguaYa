/*import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // exclude _next, static files and the Clerk auth routes (signin/callbacks)
  matcher: ["/((?!.*\\..*|_next|signin).*)"],
};*/

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/signup(.*)",
  "/"
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], 
};
