import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify} from "jose"; //IT SUPPORT web crypto 

// Must match backend signing secret exactly; otherwise valid cookies fail verification.
const jwtSecret = process.env.JWT_SECRET;

/**
 * Issue: JWT in a cookie set by the API origin is invisible here (different host).
 * Solution: `app/api/auth/signin` sets `token` on this app origin (first-party cookie).
 */

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;


  const pathname = request.nextUrl.pathname;

  
  if (!token && (pathname.startsWith("/my-task") || pathname.startsWith("/create-task") || pathname.startsWith("/all-tasks"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token) {
  try {
    if (!jwtSecret) {
      // Fail closed to avoid exposing protected pages when env is misconfigured.
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // jose expects Uint8Array key material for HS256 verification.
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);

    if (pathname.startsWith("/all-tasks") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  } catch (error) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/my-task/:path*", "/create-task/:path*", "/all-tasks/:path*"],
};