// Next.js 16 Proxy (구 middleware.ts) — 관리자 CMS 5개 섹션 + 대시보드를 세션 쿠키로 보호.
// 주의: Proxy의 matcher는 Server Action(POST) 호출도 함께 걸러내지만, 공식 문서는 matcher가
// 제외한 경로의 Server Action은 Proxy를 아예 거치지 않을 수 있다고 명시한다. 그래서 각 CMS
// Server Action 내부에서도 세션을 반드시 재검증한다(이 파일만으로 인증을 끝냈다고 가정하지 않는다).
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE_NAME, isValidSessionToken } from './app/lib/auth'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  const authed = await isValidSessionToken(token)

  if (!authed) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/notices/:path*',
    '/admin/projects/:path*',
    '/admin/documents/:path*',
    '/admin/history/:path*',
    '/admin/inquiries/:path*',
  ],
}
