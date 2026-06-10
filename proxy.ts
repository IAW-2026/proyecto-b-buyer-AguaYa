
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getAuthRoles } from "./lib/auth-custom";
const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/signup(.*)",
  "/api(.*)",
  "/"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminRoot = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, request) => {

  if (isAdminRoot(request)) {
    const { userId } = await auth.protect();
    return Response.redirect(new URL(`/admin/${userId}`, request.url));
  }

  if (isAdminRoute(request)) {
    await auth.protect();
    const roles = await getAuthRoles();
    const isAdmin = roles.includes('admin_buyer');
    if (!isAdmin) {
      return Response.redirect(new URL("/", request.url));
    }
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
