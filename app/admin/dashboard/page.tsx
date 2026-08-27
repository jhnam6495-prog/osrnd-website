// 관리자 대시보드 — CMS 5개 섹션으로 가는 카드 허브. 각 섹션 페이지는 Phase 4~5에서 구축.
import Link from 'next/link'
import AdminTopBar from '../../components/AdminTopBar'

const CARDS = [
  { href: '/admin/notices', title: '공지사항', desc: '홈페이지 공지사항 게시물을 작성·수정·삭제합니다.' },
  { href: '/admin/projects', title: '사업실적', desc: '주요 사업실적(프로젝트) 게시물을 관리합니다.' },
  { href: '/admin/documents', title: '인증현황', desc: '인증서·등록증 문서와 이미지를 관리합니다.' },
  { href: '/admin/history', title: '연혁', desc: '회사 연혁 항목을 관리합니다.' },
  { href: '/admin/inquiries', title: '상담문의', desc: '고객 상담문의를 확인하고 답변합니다.' },
]

export default function AdminDashboardPage() {
  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <div className="eyebrow">Admin</div>
          <h1 className="stitle">관리자 대시보드</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', marginTop: 40 }}>
            {CARDS.map((c) => (
              <Link key={c.href} href={c.href} className="str-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
