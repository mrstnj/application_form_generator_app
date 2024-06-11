import { checkAccessToken } from "@/actions/session"
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = await checkAccessToken();

  if (!accessToken && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return Response.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};