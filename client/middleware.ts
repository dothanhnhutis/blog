import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  privateRegExpRoutes,
  roleAccessRoutes,
  DEFAULT_LOGOUT_REDIRECT,
  EMAIL_VERIFY_ROUTE,
  middleRegExpRoutes,
  COMPLETE_PROFILE_ROUTE,
} from "@/routes";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./app/actions";
import { cookies } from "next/headers";
import { User } from "./schemas/user";
import configs from "./config";

function redirect(request: NextRequest, path?: string) {
  const { nextUrl, url } = request;
  //add Header
  const headers = new Headers(request.headers);
  headers.set("x-current-path", nextUrl.pathname);
  headers.set("x-current-search-params", nextUrl.searchParams.toString());
  headers.set(
    "x-forwarded-for",
    request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for") ||
      ""
  );
  headers.set("x-user-agent", userAgent(request).ua || "");

  if (path) {
    const response = NextResponse.redirect(new URL(path, request.nextUrl), {
      headers,
    });
    if (path == "/login") response.cookies.delete("session");
    return response;
  } else {
    const response = NextResponse.next({
      request: {
        headers,
      },
    });
    return response;
  }
}

export async function middleware(request: NextRequest) {
  //Protected Route
  const { nextUrl } = request;

  const user = await getCurrentUser();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRegExpRoutes.some((routes) =>
    routes.test(nextUrl.pathname)
  );

  // if (isPrivateRoute) {
  //   if (!user) return redirect(request, DEFAULT_LOGOUT_REDIRECT);

  //   if (!user.emailVerified) {
  //     return redirect(request, EMAIL_VERIFY_ROUTE);
  //   }

  //   // if (EMAIL_VERIFY_ROUTE == nextUrl.pathname) {
  //   //   return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //   // }

  //   if (user.gender == null || user.birthDate == null)
  //     return redirect(request, COMPLETE_PROFILE_ROUTE);

  //   // if (COMPLETE_PROFILE_ROUTE == nextUrl.pathname) {
  //   //   return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //   // }

  //   const validRoute = roleAccessRoutes[user.role].some((routes) =>
  //     routes.test(nextUrl.pathname)
  //   );

  //   if (!validRoute) {
  //     return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //   }
  // }
  //-----------------------------------

  // if (user) {
  //   if (emailVerified) {
  //     if (nextUrl.pathname == EMAIL_VERIFY_ROUTE) {
  //       return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //     }

  //     if (
  //       isPrivateRoute &&
  //       !roleAccessRoutes[user.role].some((routes) =>
  //         routes.test(nextUrl.pathname)
  //       )
  //     ) {
  //       return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //     }
  //   } else {
  //     if (isPrivateRoute) {
  //       return redirect(request, EMAIL_VERIFY_ROUTE);
  //     }
  //   }
  //   if (authRoutes.test(nextUrl.pathname)) {
  //     return redirect(request, DEFAULT_LOGIN_REDIRECT);
  //   }
  // } else {
  //   if (isPrivateRoute || nextUrl.pathname == EMAIL_VERIFY_ROUTE) {
  //     return redirect(request, DEFAULT_LOGOUT_REDIRECT);
  //   }
  // }
  return redirect(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
