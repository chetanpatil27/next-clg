import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware running...");

  const token = req.cookies.get("authToken");
  console.log("Token in middleware:", token);

  if (!token) {
    console.log("Redirecting to /login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Token found, allowing access.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Ensure this path exists in pages folder
};
