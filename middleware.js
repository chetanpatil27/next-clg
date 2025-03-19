import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  const pathname = req.nextUrl.pathname;

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
