// 관리자 세션 인증 — 단일 공유 ADMIN_PASSWORD, HMAC(Web Crypto)로 서명한 토큰을 세션 쿠키 값으로 사용.
// proxy.ts(구 middleware.ts)와 app/api/admin/* 양쪽에서 공용으로 쓴다.
// Next.js 16에서 Proxy 기본 런타임이 Node.js로 바뀌었지만, crypto.subtle은 Node/Edge 양쪽에서 동일하게
// 동작하므로 굳이 Node 전용 `crypto` 모듈로 바꾸지 않는다 — 이식성이 더 넓은 쪽을 유지.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const ADMIN_COOKIE_NAME = 'osrnd_admin_session'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7일
const encoder = new TextEncoder()
const decoder = new TextDecoder()

function requireSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET 환경변수가 설정되지 않았습니다.')
  return secret
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ])
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let bin = ''
  for (const b of arr) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(str.length / 4) * 4, '=')
  const bin = atob(padded)
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

/** ADMIN_PASSWORD 검증 — 길이가 달라도 안전하도록 상수시간 비교 */
export function isCorrectPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) throw new Error('ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.')
  // 길이가 다르면 timingSafeEqual이 즉시 false를 반환하므로, 먼저 동일 길이로 패딩해 타이밍 차이를 줄인다.
  const a = input.padEnd(Math.max(input.length, expected.length), '\0')
  const b = expected.padEnd(Math.max(input.length, expected.length), '\0')
  return timingSafeEqual(a, b) && input.length === expected.length
}

/** 로그인 성공 시 발급하는 서명된 세션 토큰(HMAC-SHA256) */
export async function createSessionToken(): Promise<string> {
  const key = await importKey(requireSecret())
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })
  const payloadB64 = toBase64Url(encoder.encode(payload))
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64))
  return `${payloadB64}.${toBase64Url(sig)}`
}

/** 쿠키에 담긴 세션 토큰이 유효한지(서명 일치 + 만료 전) 검증 */
export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [payloadB64, sigB64] = token.split('.')
  if (!payloadB64 || !sigB64) return false

  try {
    const key = await importKey(requireSecret())
    const expectedSig = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64))
    if (!timingSafeEqual(toBase64Url(expectedSig), sigB64)) return false

    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadB64))) as { exp?: number }
    return typeof payload.exp === 'number' && Date.now() < payload.exp
  } catch {
    return false
  }
}

/**
 * 모든 CMS Server Action의 맨 앞에서 호출하는 공용 가드.
 * Next.js 16 공식 문서는 Proxy의 matcher 체인이 Server Function 호출을 우회할 수 있다고 경고하므로,
 * 페이지 라우트 보호(proxy.ts)와 별개로 각 Server Action 내부에서도 세션을 반드시 재검증한다.
 */
export async function assertAdminSession(): Promise<void> {
  const store = await cookies()
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
  if (!authed) redirect('/admin')
}
