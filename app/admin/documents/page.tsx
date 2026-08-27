// 인증현황 관리 — 목록/작성/수정/삭제
import Link from 'next/link'
import AdminTopBar from '../../components/AdminTopBar'
import DeleteButton from '../../components/DeleteButton'
import { listDocuments } from '../../lib/documents'
import { deleteDocumentAction } from './actions'

export default async function AdminDocumentsPage() {
  const documents = await listDocuments()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h1 className="stitle" style={{ marginBottom: 0 }}>
              인증현황 관리
            </h1>
            <Link href="/admin/documents/new" className="btn-p">
              + 새 문서 등록
            </Link>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 120px 70px 130px',
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
              <span>순서</span>
              <span>제목 (한글)</span>
              <span>분류</span>
              <span>이미지</span>
              <span style={{ textAlign: 'right' }}>관리</span>
            </div>

            {documents.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>등록된 문서가 없습니다.</div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 120px 70px 130px',
                    padding: '13px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{doc.order}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {doc.title_ko}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{doc.category_ko || '-'}</span>
                  <span style={{ fontSize: 11, color: doc.displayImage ? 'var(--cyan)' : 'var(--muted)' }}>{doc.displayImage ? '있음' : '없음'}</span>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <Link
                      href={`/admin/documents/${doc.id}/edit`}
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
                    <form action={deleteDocumentAction.bind(null, doc.id)}>
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
