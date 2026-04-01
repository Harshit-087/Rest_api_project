import { NextResponse } from "next/server";

/**
 * Sign-out must clear the cookie on the **Next.js origin** (same reason as
 * signin/route.ts). Calling the API directly would only clear api-host cookies,
 * leaving the app-origin cookie untouched.
 */
export async function POST() {
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendBase) {
    try {
      await fetch(`${backendBase.replace(/\/$/, "")}/user-api/v1/signout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Still clear the browser cookie so the user stays logged out on the app.
    }
  }

  const response = NextResponse.json({ message: "signout successfully" });
  response.cookies.delete("token");

  return response;
}
