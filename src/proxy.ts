import "reflect-metadata"
export { auth as proxy } from "@/src/lib/auth" ;

export const config = {
  matcher: ["/admin/:path*"],
};