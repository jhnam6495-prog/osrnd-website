// 상담문의 상세 — 내용 확인 + 상태 변경 + 답변 작성
import { notFound } from 'next/navigation'
import AdminTopBar from '../../../components/AdminTopBar'
import { getInquiry, ADMIN_INQUIRY_TYPE_LABEL } from '../../../lib/inquiries'
import { saveReplyAction, updateStatusAction } from '../actions'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  letterSpacing: 2,
  color: 'var(--cyan)',
  fontFamily: 'var(--font-label)',
  textTransform: 'uppercase',
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--white)',
  fontSize: 14,
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  resize: 'vertical',
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ko-KR')
  } catch {
    return '-'
  }
}

export default async function AdminInquiryDetailPage(props: PageProps<'/admin/inquiries/[id]'>) {
  const { id } = await props.params
  const inquiry = await getInquiry(id)
  if (!inquiry) notFound()

  const fields: [string, string][] = [
    ['이름', inquiry.name],
    ['연락처', inquiry.phone],
    ['이메일', inquiry.email || '-'],
    ['회사명', inquiry.company || '-'],
    ['문의유형', ADMIN_INQUIRY_TYPE_LABEL[inquiry.inquiry_type] ?? inquiry.inquiry_type],
    ['접수일', formatDate(inquiry.createdAt)],
    ['접수 언어', inquiry.lang === 'ko' ? '한국어' : 'English'],
  ]

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">상담문의 상세</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {fields.map(([label, value]) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 10 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>{label}</span>
                    <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)' }}>{value}</span>
                  </div>
                ))}
              </div>
              <label style={labelStyle}>문의 내용</label>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{inquiry.message}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <form action={updateStatusAction.bind(null, id)} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 24, display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>처리상태</label>
                  <select name="status" defaultValue={inquiry.status} style={inputStyle}>
                    <option value="new">미처리</option>
                    <option value="processing">처리중</option>
                    <option value="done">완료</option>
                  </select>
                </div>
                <button type="submit" className="btn-s" style={{ padding: '10px 20px', fontSize: 12 }}>
                  상태 변경
                </button>
              </form>

              <form action={saveReplyAction.bind(null, id)} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 24 }}>
                <label style={labelStyle}>답변 작성 (저장하면 처리상태가 자동으로 &ldquo;완료&rdquo;가 됩니다)</label>
                <textarea name="reply" defaultValue={inquiry.reply ?? ''} rows={8} placeholder="고객에게 전달할 답변 내용을 입력하세요." style={{ ...inputStyle, marginBottom: 16 }} />
                {inquiry.repliedAt && (
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>마지막 답변: {formatDate(inquiry.repliedAt)}</p>
                )}
                <button type="submit" className="btn-p">
                  답변 저장
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
