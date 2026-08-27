// 인증서·등록증 문서 카드 그리드 — 공개 페이지(about-cert)에서 사용.
// PDF는 카드에 절대 인라인 렌더링하지 않는다(모바일 브라우저가 PDF iframe을 못 여는 경우가 많음) —
// displayImage(미리 이미지로 변환한 파일)만 카드에 쓰고, 원본 PDF는 "원본 보기" 링크로만 남긴다.
import type { DocumentEntry } from '../lib/documents'
import type { Lang } from '../lib/i18n/dictionary'

const ACCENT_RGB: Record<'cyan' | 'orange', string> = { cyan: '0,180,216', orange: '245,124,0' }

export default function DocumentGrid({ documents, lang, viewOriginalLabel }: { documents: DocumentEntry[]; lang: Lang; viewOriginalLabel: string }) {
  if (documents.length === 0) return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: 'var(--border)' }}>
      {documents.map((doc) => {
        const accent = `var(--${doc.accentColor})`
        const accentRgb = ACCENT_RGB[doc.accentColor]

        return (
          <div key={doc.id} style={{ background: 'var(--card)', padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accent},transparent)` }} />

            {doc.displayImage && (
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={doc.displayImage.url} alt={lang === 'ko' ? doc.title_ko : doc.title_en} style={{ width: '100%', display: 'block' }} />
              </div>
            )}

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
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
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
              <a
                href={doc.originalPdf.url}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 11, color: accent, fontFamily: 'var(--font-label)', textDecoration: 'none', letterSpacing: 1 }}
              >
                {viewOriginalLabel} →
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
