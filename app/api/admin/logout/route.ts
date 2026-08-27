// 관리자 로그아웃 — 세션 쿠키 삭제 후 로그인 페이지로 이동.
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME } from '../../../lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const store = await cookies()
  store.delete(ADMIN_COOKIE_NAME)
  return NextResponse.redirect(new URL('/admin', request.url), { status: 303 })
}
