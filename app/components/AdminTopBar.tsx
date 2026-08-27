// 관리자 화면 공통 상단바 — 대시보드/공지/실적/문서/연혁/문의 탭 + 로그아웃.
// /admin/* 5개 CMS 섹션(Phase 4~5)이 전부 이 컴포넌트를 그대로 재사용한다.
import Link from 'next/link'

const SECTIONS = [
  { href: '/admin/dashboard', label: '대시보드' },
  { href: '/admin/notices', label: '공지사항' },
  { href: '/admin/projects', label: '사업실적' },
  { href: '/admin/documents', label: '인증현황' },
  { href: '/admin/history', label: '연혁' },
  { href: '/admin/inquiries', label: '상담문의' },
]

export default function AdminTopBar() {
  return (
    <div style={{ background: 'var(--panel)', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 44px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={{
                padding: '10px 16px',
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
        <form method="POST" action="/api/admin/logout">
          <button type="submit" className="btn-s" style={{ padding: '8px 18px', fontSize: 11 }}>
            로그아웃
          </button>
        </form>
      </div>
    </div>
  )
}
