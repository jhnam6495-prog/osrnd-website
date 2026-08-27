// 관리자 로그인 처리 — ADMIN_PASSWORD 검증 후 HMAC 서명된 세션 쿠키 발급.
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME, createSessionToken, isCorrectPassword } from '../../../lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')

  if (!isCorrectPassword(password)) {
    return NextResponse.redirect(new URL('/admin?error=1', request.url), { status: 303 })
  }

  const token = await createSessionToken()
  const store = await cookies()
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
  })

  return NextResponse.redirect(new URL('/admin/dashboard', request.url), { status: 303 })
}
