// 연혁 작성/수정 공용 폼
import Link from 'next/link'
import type { HistoryEntry } from '../../lib/history'

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

export default function HistoryForm({ action, entry }: { action: (formData: FormData) => Promise<void>; entry?: HistoryEntry }) {
  return (
    <form action={action} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 28 }}>
      <div style={{ marginBottom: 18, maxWidth: 160 }}>
        <label style={labelStyle}>연도 *</label>
        <input type="text" name="year" defaultValue={entry?.year} required placeholder="예: 2026" style={inputStyle} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        <div>
          <label style={labelStyle}>내용 (한글) *</label>
          <textarea name="content_ko" defaultValue={entry?.content_ko} required placeholder="예: 03월 18일 — 부설연구전담부서 설립 인정" rows={4} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Content (English)</label>
          <textarea name="content_en" defaultValue={entry?.content_en} placeholder="e.g. Mar 18 — Accreditation of in-house R&D department" rows={4} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn-p">
          {entry ? '수정 완료' : '등록하기'}
        </button>
        <Link href="/admin/history" className="btn-s">
          취소
        </Link>
      </div>
    </form>
  )
}
