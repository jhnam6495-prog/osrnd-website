// 인증서·등록증 문서 카드 그리드 — 공개 페이지(about-cert)에서 사용.
// 원본 AboutCert.jsx와 동일하게 두 가지 카드 스타일을 구분한다.
// - wide: 사업자등록증류(이미지 좌측 고정폭 + 우측에 배지/제목/상세정보/설명), 칸 채우기 없음.
// - compact: ISO/특허류(이미지 상단 전체폭 + 가운데 정렬 배지/제목/설명), 3칸 그리드로 고정하고
//   실제 문서가 3개 미만이면 점선 "추가 예정" 카드로 채운다(원본의 특허 #2/#3 슬롯과 동일).
// PDF는 카드에 절대 인라인 렌더링하지 않는다(모바일 브라우저가 PDF iframe을 못 여는 경우가 많음) —
// displayImage(미리 이미지로 변환한 파일)만 카드에 쓰고, 원본 PDF는 "원본 보기" 링크로만 남긴다.
import type { DocumentEntry } from '../lib/documents'
import type { Lang } from '../lib/i18n/dictionary'

const ACCENT_RGB: Record<'cyan' | 'orange', string> = { cyan: '0,180,216', orange: '245,124,0' }

function WideCard({ doc, lang, viewOriginalLabel }: { doc: DocumentEntry; lang: Lang; viewOriginalLabel: string }) {
  const accent = `var(--${doc.accentColor})`
  const accentRgb = ACCENT_RGB[doc.accentColor]

  return (
    <div style={{ background: 'var(--card)', padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accent},transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, flexWrap: 'wrap' }}>
        {doc.displayImage && (
          <div style={{ flexShrink: 0, width: 'min(180px, 100%)', border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doc.displayImage.url} alt={lang === 'ko' ? doc.title_ko : doc.title_en} style={{ width: '100%', display: 'block' }} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: `rgba(${accentRgb},0.1)`,
              border: `1px solid rgba(${accentRgb},0.3)`,
              fontSize: 9,
              letterSpacing: 3,
              color: accent,
              fontFamily: 'var(--font-label)',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            {lang === 'ko' ? doc.badge_ko : doc.badge_en}
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
            {lang === 'ko' ? doc.title_ko : doc.title_en}
          </h3>
          {doc.details.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
              {doc.details.map((d, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 9 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1, color: accent, fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>
                    {lang === 'ko' ? d.label_ko : d.label_en}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{lang === 'ko' ? d.value_ko : d.value_en}</span>
                </div>
              ))}
            </div>
          )}
          {(doc.desc_ko || doc.desc_en) && (
            <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.85, marginBottom: doc.originalPdf ? 14 : 0 }}>
              {lang === 'ko' ? doc.desc_ko : doc.desc_en}
            </p>
          )}
          {doc.originalPdf && (
            <a href={doc.originalPdf.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: accent, fontFamily: 'var(--font-label)', textDecoration: 'none', letterSpacing: 1 }}>
              {viewOriginalLabel} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function CompactCard({ doc, lang, viewOriginalLabel }: { doc: DocumentEntry; lang: Lang; viewOriginalLabel: string }) {
  const accent = `var(--${doc.accentColor})`

  return (
    <div style={{ background: 'var(--card)', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accent},transparent)` }} />
      {doc.displayImage && (
        <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', marginBottom: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={doc.displayImage.url} alt={lang === 'ko' ? doc.title_ko : doc.title_en} style={{ width: '100%', display: 'block' }} />
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: accent, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
          {lang === 'ko' ? doc.title_ko : doc.title_en}
        </div>
        {(doc.badge_ko || doc.badge_en) && (
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginBottom: 12 }}>
            {lang === 'ko' ? doc.badge_ko : doc.badge_en}
          </div>
        )}
        {(doc.desc_ko || doc.desc_en) && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>{lang === 'ko' ? doc.desc_ko : doc.desc_en}</p>}
        {doc.details.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
            {doc.details.map((d, i) => (
              <p key={i} style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>
                {lang === 'ko' ? d.value_ko : d.value_en}
              </p>
            ))}
          </div>
        )}
        {doc.originalPdf && (
          <a
            href={doc.originalPdf.url}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', marginTop: 10, fontSize: 11, color: accent, fontFamily: 'var(--font-label)', textDecoration: 'none', letterSpacing: 1 }}
          >
            {viewOriginalLabel} →
          </a>
        )}
      </div>
    </div>
  )
}

function EmptySlotCard({ label }: { label: string }) {
  return (
    <div
      style={{
        background: 'rgba(22,32,48,0.5)',
        padding: '32px 28px',
        border: '1px dashed rgba(245,124,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        minHeight: 220,
      }}
    >
      <div
        style={{
          width: 44,
          height: 56,
          border: '1px dashed rgba(245,124,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          opacity: 0.5,
        }}
      >
        ＋
      </div>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-label)', letterSpacing: 2, textAlign: 'center', textTransform: 'uppercase' }}>
        {label}
      </p>
    </div>
  )
}

export default function DocumentGrid({
  documents,
  lang,
  viewOriginalLabel,
  variant = 'compact',
  minSlots = 0,
  emptySlotLabel,
}: {
  documents: DocumentEntry[]
  lang: Lang
  viewOriginalLabel: string
  variant?: 'wide' | 'compact'
  minSlots?: number
  emptySlotLabel?: string
}) {
  const emptyCount = Math.max(0, minSlots - documents.length)
  if (documents.length === 0 && emptyCount === 0) return null

  const gridStyle =
    variant === 'wide'
      ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: 'var(--border)' }
      : { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--border)' }

  return (
    <div style={gridStyle} className={variant === 'compact' ? 'doc-grid-3' : undefined}>
      {documents.map((doc) =>
        variant === 'wide' ? (
          <WideCard key={doc.id} doc={doc} lang={lang} viewOriginalLabel={viewOriginalLabel} />
        ) : (
          <CompactCard key={doc.id} doc={doc} lang={lang} viewOriginalLabel={viewOriginalLabel} />
        )
      )}
      {Array.from({ length: emptyCount }, (_, i) => (
        <EmptySlotCard key={`empty-${i}`} label={emptySlotLabel ?? ''} />
      ))}
    </div>
  )
}
