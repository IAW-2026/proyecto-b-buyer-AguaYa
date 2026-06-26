
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isAdminFromSessionClaims } from "./lib/auth-custom";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/signup(.*)",
  "/api(.*)",
  "/",
  "/vendors"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminRoot = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, request) => {

  if (isAdminRoot(request)) {
    const { userId } = await auth.protect();
    return NextResponse.redirect(new URL(`/admin/${userId}`, request.url));
  }

  if (isAdminRoute(request)) {
    await auth.protect();
    const { sessionClaims } = await auth();
    if (!isAdminFromSessionClaims(sessionClaims)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
//mensajes de prueba
  const sessionClaims = (await auth()).sessionClaims

  console.log("===[ CLERK SESSION CLAIMS ]===", JSON.stringify(sessionClaims, null, 2));
  console.log("Roles detectados en servidor:", sessionClaims?.metadata.role);
  
  console.log("el usuario es admin:", isAdminFromSessionClaims(sessionClaims));
  //-------------------------------------------
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
