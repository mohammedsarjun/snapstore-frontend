import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // With localStorage for JWT, server-side middleware cannot access the token easily.
  // We handle redirects mainly on the client side now.
  
  if (path === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
