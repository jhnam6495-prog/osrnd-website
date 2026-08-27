// 브라우저 → Blob 직접 업로드용 presigned URL 발급 라우트.
// 이 라우트는 proxy.ts의 matcher(/admin/*) 밖이므로 미들웨어 보호를 받지 않는다 — 여기서 별도로
// 세션 쿠키를 직접 검증한다. handleUpload/upload()(구식 client-token 방식)는 OIDC 연결 스토어에서
// "No read-write token found"로 실패하므로 쓰지 않고, handleUploadPresigned + issueSignedToken을 쓴다.
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client'
import { issueSignedToken } from '@vercel/blob'
import { ADMIN_COOKIE_NAME, isValidSessionToken } from '../../lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadPresignedBody

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        const store = await cookies()
        const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
        if (!authed) throw new Error('인증되지 않은 요청입니다.')

        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          maximumSizeInBytes: 50 * 1024 * 1024,
          validUntil: Date.now() + 5 * 60 * 1000,
        })
        return { token }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('[blob-upload]', error) // 반드시 로그 — 실패 시 화면 실패 원인이 여기에만 남는다
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '업로드 처리 중 오류가 발생했습니다.' },
      { status: 400 }
    )
  }
}
