import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, exclude studio and api routes
  matcher: ["/((?!studio|api|_next/static|_next/image|favicon.ico).*)"],
};
