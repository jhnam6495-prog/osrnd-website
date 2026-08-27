// 사업실적 작성/수정 공용 폼
import Link from 'next/link'
import BlobFileInput from '../../components/BlobFileInput'
import { TAG_OPTIONS, type ProjectRecord } from '../../lib/projects'

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

export default function ProjectForm({ action, record }: { action: (formData: FormData) => Promise<void>; record?: ProjectRecord }) {
  const defaultTagIndex = record ? TAG_OPTIONS.findIndex((t) => t.ko === record.tag_ko) : 0

  return (
    <form action={action} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>연도 *</label>
          <input type="text" name="year" defaultValue={record?.year} required placeholder="예: 2026" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>날짜 *</label>
          <input type="text" name="date" defaultValue={record?.date} required placeholder="예: 2026.02" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>태그</label>
          <select name="tagIndex" defaultValue={defaultTagIndex >= 0 ? defaultTagIndex : 0} style={inputStyle}>
            {TAG_OPTIONS.map((tag, i) => (
              <option key={tag.ko} value={i}>
                {tag.ko}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>내용 (한글) *</label>
          <textarea name="content_ko" defaultValue={record?.content_ko} required placeholder="예: ㈜화신 NX5a 차체라인 설치 및 시운전" rows={3} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Content (English)</label>
          <textarea name="content_en" defaultValue={record?.content_en} placeholder="e.g. Hwashin NX5a body line installation and commissioning" rows={3} style={inputStyle} />
        </div>
      </div>

      <BlobFileInput
        name="image"
        pathPrefix="projects-files"
        label="대표 이미지 (선택)"
        accept="image/*"
        defaultFiles={record?.image ? [record.image] : undefined}
      />

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn-p">
          {record ? '수정 완료' : '등록하기'}
        </button>
        <Link href="/admin/projects" className="btn-s">
          취소
        </Link>
      </div>
    </form>
  )
}
