import { NextResponse } from "next/server";

/**
 * PRODUCTION COOKIE ISSUE (cross-origin SPA + separate API host)
 * ----------------------------------------------------------------
 * When the browser POSTs login directly to the API (e.g. api.example.com), the
 * Set-Cookie header is scoped to THAT host. Your Next.js app runs on another
 * host (e.g. app.example.com). Cookies are never shared across unrelated
 * origins, so `middleware.ts` on the Next app never sees `token` — it looks
 * "removed on reload" because it was never stored for the app origin.
 *
 * SOLUTION
 * --------
 * This Route Handler runs on the SAME origin as the Next.js UI. We forward
 * credentials to the backend, read `token` from the JSON body, and set an
 * httpOnly cookie on the **frontend** host so `middleware` can verify JWT on
 * every navigation to protected routes.
 */
export async function POST(request: Request) {
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendBase) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const res = await fetch(`${backendBase.replace(/\/$/, "")}/user-api/v1/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const token = typeof data.token === "string" ? data.token : null;
  if (!token) {
    return NextResponse.json(
      { message: "Backend signin succeeded but did not return a token" },
      { status: 502 }
    );
  }

  const response = NextResponse.json(data, { status: 200 });
  const isProd = process.env.NODE_ENV === "production";

  // Same-site as the Next app: no cross-site third-party cookie rules.
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: isProd,
    sameSite: "lax",
  });

  return response;
}
