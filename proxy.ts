import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/signup(.*)",
  "/api(.*)",
  "/"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminRoot = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, request) => {
 
  if (isAdminRoute(request)) {
    const { sessionClaims } = await auth.protect();
    if (sessionClaims?.metadata?.role !== "admin") {
      return Response.redirect(new URL("/", request.url));
    }
    else{
      if (isAdminRoot(request)) {
        const { userId } = await auth.protect();
        return Response.redirect(new URL(`/admin/${userId}`, request.url));
      }
    }
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};

