// 공지사항 관리 — 목록/작성/수정/삭제
import Link from 'next/link'
import AdminTopBar from '../../components/AdminTopBar'
import DeleteButton from '../../components/DeleteButton'
import { listNotices } from '../../lib/notices'
import { deleteNoticeAction } from './actions'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1)
  } catch {
    return '-'
  }
}

export default async function AdminNoticesPage() {
  const notices = await listNotices()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h1 className="stitle" style={{ marginBottom: 0 }}>
              공지사항 관리
            </h1>
            <Link href="/admin/notices/new" className="btn-p">
              + 새 공지 작성
            </Link>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr 90px 110px 70px 130px',
                padding: '10px 16px',
                borderBottom: '1px solid var(--border)',
                fontSize: 10,
                color: 'var(--cyan)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-label)',
                gap: 8,
              }}
            >
              <span></span>
              <span>제목 (한글)</span>
              <span>노출</span>
              <span>작성일</span>
              <span>조회</span>
              <span style={{ textAlign: 'right' }}>관리</span>
            </div>

            {notices.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>등록된 공지사항이 없습니다.</div>
            ) : (
              notices.map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 1fr 90px 110px 70px 130px',
                    padding: '13px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 12 }}>{n.pinned ? '📌' : ''}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {n.title_ko || n.title_en || '(제목 없음)'}
                  </span>
                  <span style={{ fontSize: 11, color: n.featured ? 'var(--cyan)' : 'var(--muted)' }}>{n.featured ? '🔔 팝업' : '-'}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{formatDate(n.createdAt)}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{n.views}</span>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <Link
                      href={`/admin/notices/${n.id}/edit`}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(0,180,216,0.4)',
                        color: 'rgba(0,180,216,0.8)',
                        fontSize: 11,
                        padding: '4px 10px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-label)',
                      }}
                    >
                      수정
                    </Link>
                    <form action={deleteNoticeAction.bind(null, n.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
