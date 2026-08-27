// 연혁 관리 — 목록/작성/수정/삭제
import Link from 'next/link'
import AdminTopBar from '../../components/AdminTopBar'
import DeleteButton from '../../components/DeleteButton'
import { listHistory } from '../../lib/history'
import { deleteHistoryAction } from './actions'

export default async function AdminHistoryPage() {
  const entries = await listHistory()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h1 className="stitle" style={{ marginBottom: 0 }}>
              연혁 관리
            </h1>
            <Link href="/admin/history/new" className="btn-p">
              + 새 연혁 항목 작성
            </Link>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1fr 130px',
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
              <span>연도</span>
              <span>내용 (한글)</span>
              <span style={{ textAlign: 'right' }}>관리</span>
            </div>

            {entries.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>등록된 연혁이 없습니다.</div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 1fr 130px',
                    padding: '13px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-logo)', fontSize: 14, color: 'var(--cyan)' }}>{entry.year}</span>
                  <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.content_ko}
                  </span>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <Link
                      href={`/admin/history/${entry.id}/edit`}
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
                    <form action={deleteHistoryAction.bind(null, entry.id)}>
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
