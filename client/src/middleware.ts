import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify} from "jose"; //IT SUPPORT web crypto 



// secret should be unit8array not string which is in jsonwebtoken
const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
console.log("secret",secret)


export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;


  const pathname = request.nextUrl.pathname;

  
  if (!token && (pathname.startsWith("/my-task") || pathname.startsWith("/create-task") || pathname.startsWith("/all-tasks"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    console.log("Decoded token:", payload);

    if (pathname.startsWith("/all-tasks") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  } catch (error) {
    console.log("Invalid token", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/my-task/:path*", "/create-task/:path*", "/all-tasks/:path*"],
};