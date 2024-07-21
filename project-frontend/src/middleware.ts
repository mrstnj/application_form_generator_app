import { checkAccessToken } from "@/actions/session"
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = await checkAccessToken();

  // アクセストークンがない場合、管理画面ログイン画面に遷移する
  if (!accessToken && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return Response.redirect(new URL('/admin/login', request.url));
  }
  // ルートにアクセスした場合、管理画面ログイン画面に遷移する
  if (request.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};