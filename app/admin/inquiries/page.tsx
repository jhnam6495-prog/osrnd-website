// 상담문의 관리 — 목록 + 상태 필터(쿼리스트링, 클라이언트 JS 불필요) + 삭제
import Link from 'next/link'
import AdminTopBar from '../../components/AdminTopBar'
import DeleteButton from '../../components/DeleteButton'
import { listInquiries, ADMIN_INQUIRY_TYPE_LABEL, type InquiryStatus } from '../../lib/inquiries'
import { deleteInquiryAction } from './actions'

const STATUS_MAP: Record<InquiryStatus, { label: string; bg: string; color: string; border: string }> = {
  new: { label: '미처리', bg: 'rgba(204,34,0,0.15)', color: '#ff6b6b', border: 'rgba(204,34,0,0.4)' },
  processing: { label: '처리중', bg: 'rgba(245,124,0,0.15)', color: 'var(--orange)', border: 'rgba(245,124,0,0.4)' },
  done: { label: '완료', bg: 'rgba(0,180,216,0.12)', color: 'var(--cyan)', border: 'rgba(0,180,216,0.3)' },
}

const FILTERS: { value: InquiryStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'new', label: '미처리' },
  { value: 'processing', label: '처리중' },
  { value: 'done', label: '완료' },
]

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1)
  } catch {
    return '-'
  }
}

export default async function AdminInquiriesPage(props: PageProps<'/admin/inquiries'>) {
  const searchParams = await props.searchParams
  const statusFilter = (Array.isArray(searchParams?.status) ? searchParams.status[0] : searchParams?.status) ?? 'all'

  const all = await listInquiries()
  const inquiries = statusFilter === 'all' ? all : all.filter((iq) => iq.status === statusFilter)

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle" style={{ marginBottom: 20 }}>
            상담문의 관리
          </h1>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {FILTERS.map((f) => (
              <Link
                key={f.value}
                href={f.value === 'all' ? '/admin/inquiries' : `/admin/inquiries?status=${f.value}`}
                style={{
                  padding: '8px 16px',
                  fontSize: 12,
                  textDecoration: 'none',
                  border: `1px solid ${statusFilter === f.value ? 'var(--cyan)' : 'var(--border)'}`,
                  color: statusFilter === f.value ? 'var(--cyan)' : 'var(--muted)',
                  fontFamily: 'var(--font-label)',
                }}
              >
                {f.label}
              </Link>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr 140px 90px 110px 130px',
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
              <span>상태</span>
              <span>이름 / 연락처</span>
              <span>문의유형</span>
              <span>접수일</span>
              <span></span>
              <span style={{ textAlign: 'right' }}>관리</span>
            </div>

            {inquiries.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>해당 상태의 문의가 없습니다.</div>
            ) : (
              inquiries.map((iq) => {
                const s = STATUS_MAP[iq.status]
                return (
                  <div
                    key={iq.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr 140px 90px 110px 130px',
                      padding: '13px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span>
                      <span style={{ fontSize: 10, padding: '3px 10px', letterSpacing: 1, fontFamily: 'var(--font-label)', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {s.label}
                      </span>
                    </span>
                    <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)' }}>
                      {iq.name} · {iq.phone}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{ADMIN_INQUIRY_TYPE_LABEL[iq.inquiry_type] ?? iq.inquiry_type}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{formatDate(iq.createdAt)}</span>
                    <span />
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <Link
                        href={`/admin/inquiries/${iq.id}`}
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
                        상세/답변
                      </Link>
                      <form action={deleteInquiryAction.bind(null, iq.id)}>
                        <DeleteButton />
                      </form>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}
