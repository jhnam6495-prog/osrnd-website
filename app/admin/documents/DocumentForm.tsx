// 인증현황 작성/수정 공용 폼 — displayImage/originalPdf 두 개의 BlobFileInput만 클라이언트 경계.
import Link from 'next/link'
import BlobFileInput from '../../components/BlobFileInput'
import { DOCUMENTS_FILE_PREFIX, type DocumentEntry } from '../../lib/documents'

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

const MAX_DETAILS = 6

export default function DocumentForm({ action, doc }: { action: (formData: FormData) => Promise<void>; doc?: DocumentEntry }) {
  const detailRows = Array.from({ length: MAX_DETAILS }, (_, i) => doc?.details[i])

  return (
    <form action={action} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>분류 (한글)</label>
          <input type="text" name="category_ko" defaultValue={doc?.category_ko} placeholder="예: ISO 인증" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Category (English)</label>
          <input type="text" name="category_en" defaultValue={doc?.category_en} placeholder="e.g. ISO Certification" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>배지 텍스트 (한글)</label>
          <input type="text" name="badge_ko" defaultValue={doc?.badge_ko} placeholder="예: 품질경영시스템" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Badge (English)</label>
          <input type="text" name="badge_en" defaultValue={doc?.badge_en} placeholder="e.g. Quality Management System" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>제목 (한글) *</label>
          <input type="text" name="title_ko" defaultValue={doc?.title_ko} required placeholder="예: ISO 9001" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Title (English)</label>
          <input type="text" name="title_en" defaultValue={doc?.title_en} placeholder="e.g. ISO 9001" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>강조색</label>
          <select name="accentColor" defaultValue={doc?.accentColor ?? 'cyan'} style={inputStyle}>
            <option value="cyan">시안 (기본)</option>
            <option value="orange">오렌지</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>정렬 순서 (작을수록 먼저)</label>
          <input type="number" name="order" defaultValue={doc?.order ?? 0} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>상세 정보 (최대 {MAX_DETAILS}개, 라벨을 비워두면 무시됩니다)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {detailRows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
              <input type="text" name={`details.${i}.label_ko`} defaultValue={row?.label_ko} placeholder="라벨(한글)" style={inputStyle} />
              <input type="text" name={`details.${i}.label_en`} defaultValue={row?.label_en} placeholder="Label(EN)" style={inputStyle} />
              <input type="text" name={`details.${i}.value_ko`} defaultValue={row?.value_ko} placeholder="값(한글)" style={inputStyle} />
              <input type="text" name={`details.${i}.value_en`} defaultValue={row?.value_en} placeholder="Value(EN)" style={inputStyle} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>설명 (한글)</label>
          <textarea name="desc_ko" defaultValue={doc?.desc_ko} rows={4} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Description (English)</label>
          <textarea name="desc_en" defaultValue={doc?.desc_en} rows={4} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <BlobFileInput
          name="displayImage"
          pathPrefix={`${DOCUMENTS_FILE_PREFIX}/images`}
          label="카드 표시 이미지 (PDF는 이미지로 변환해서 올려주세요)"
          accept="image/*"
          defaultFiles={doc?.displayImage ? [doc.displayImage] : undefined}
        />
        <BlobFileInput
          name="originalPdf"
          pathPrefix={`${DOCUMENTS_FILE_PREFIX}/originals`}
          label="원본 문서 (PDF, '원본 보기' 링크용 — 선택)"
          accept="application/pdf"
          defaultFiles={doc?.originalPdf ? [doc.originalPdf] : undefined}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="btn-p">
          {doc ? '수정 완료' : '등록하기'}
        </button>
        <Link href="/admin/documents" className="btn-s">
          취소
        </Link>
      </div>
    </form>
  )
}
