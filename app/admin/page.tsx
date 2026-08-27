// 관리자 로그인 페이지 — 단일 공유 ADMIN_PASSWORD. 이미 로그인된 세션이면 대시보드로 바로 이동.
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME, isValidSessionToken } from '../lib/auth'

export default async function AdminLoginPage(props: PageProps<'/admin'>) {
  const store = await cookies()
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value)
  if (authed) redirect('/admin/dashboard')

  const searchParams = await props.searchParams
  const hasError = searchParams?.error !== undefined

  return (
    <div className="outer" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="sec" style={{ maxWidth: 420, margin: '0 auto', padding: '40px 20px' }}>
        <div className="eyebrow">Admin</div>
        <h1 className="stitle">관리자 로그인</h1>
        <form method="POST" action="/api/admin/login" style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            autoFocus
            style={{
              padding: '14px 16px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--white)',
              fontSize: 14,
            }}
          />
          {hasError ? <p style={{ color: 'var(--orange)', fontSize: 13 }}>비밀번호가 올바르지 않습니다.</p> : null}
          <button type="submit" className="btn-p">
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
