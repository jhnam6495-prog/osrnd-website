// 공지사항 작성/수정 공용 폼 — 상호작용이 필요 없는 순수 form이라 Server Component로 유지.
import Link from 'next/link'
import type { Notice } from '../../lib/notices'

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

const checkboxRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 16px',
  background: 'rgba(0,180,216,0.05)',
  border: '1px solid rgba(0,180,216,0.15)',
  fontSize: 13,
  color: 'var(--muted)',
  cursor: 'pointer',
}

const checkboxStyle: React.CSSProperties = { accentColor: 'var(--cyan)', width: 16, height: 16, cursor: 'pointer' }

export default function NoticeForm({ action, notice }: { action: (formData: FormData) => Promise<void>; notice?: Notice }) {
  return (
    <form action={action} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>제목 (한글) *</label>
          <input type="text" name="title_ko" defaultValue={notice?.title_ko} required placeholder="공지사항 제목" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Title (English)</label>
          <input type="text" name="title_en" defaultValue={notice?.title_en} placeholder="Notice title in English" style={inputStyle} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>내용 (한글) *</label>
          <textarea name="content_ko" defaultValue={notice?.content_ko} required placeholder="공지 내용. HTML 태그 사용 가능합니다." rows={10} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Content (English)</label>
          <textarea
            name="content_en"
            defaultValue={notice?.content_en}
            placeholder="Enter notice content in English. HTML tags supported."
            rows={10}
            style={inputStyle}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        <label style={checkboxRowStyle}>
          <input type="checkbox" name="pinned" defaultChecked={notice?.pinned} style={checkboxStyle} />
          📌 상단 고정 (목록에서 항상 맨 위)
        </label>
        <label style={checkboxRowStyle}>
          <input type="checkbox" name="featured" defaultChecked={notice?.featured} style={checkboxStyle} />
          🔔 홈페이지 팝업 노출
        </label>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn-p">
          {notice ? '수정 완료' : '등록하기'}
        </button>
        <Link href="/admin/notices" className="btn-s">
          취소
        </Link>
      </div>
    </form>
  )
}
