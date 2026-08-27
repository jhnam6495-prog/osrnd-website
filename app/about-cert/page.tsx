// 인증현황 페이지 — 신규 CMS 연동(documents-data). 원본의 3단 배열(등록증류/ISO/특허)을
// category_ko 기준 그룹핑으로 재현한다. "준비중"/"추가 예정" 플레이스홀더 카드는 실제 CRUD가
// 생기면서 더 이상 필요 없어져 제외했다.
import PageHero from '../components/PageHero'
import DocumentGrid from '../components/DocumentGrid'
import { getDictionary } from '../lib/i18n/dictionary'
import { listDocuments, groupDocumentsByCategory } from '../lib/documents'

export default async function AboutCertPage() {
  const { lang, t } = await getDictionary()

  let documents: Awaited<ReturnType<typeof listDocuments>> = []
  try {
    documents = await listDocuments()
  } catch {
    documents = []
  }

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('nav.about'), href: '/about-intro' },
          { label: t('cert.bc') },
        ]}
        title={t('cert.title')}
        description={t('cert.subtitle')}
      />

      <div className="outer">
        <div className="sec">
          <div className="eyebrow">{t('cert.eyebrow')}</div>
          <h2 className="stitle">
            <em>{t('cert.title.t1')}</em>
            <span>{t('cert.title.t2')}</span>
          </h2>
          <p className="sdesc">{t('cert.desc')}</p>

          {documents.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center', border: '1px solid rgba(0,180,216,0.06)' }}>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>{t('cert.empty', '등록된 인증현황이 없습니다.', 'No certifications registered yet.')}</p>
            </div>
          ) : (
            groupDocumentsByCategory(documents).map((group, i) => {
              const accent = `var(--${group.accentColor})`
              const label = group.category_ko ? (lang === 'ko' ? group.category_ko : group.category_en) : null
              return (
                <div key={group.category_ko || `uncategorized-${i}`} style={{ marginBottom: 2 }}>
                  {label && (
                    <div
                      style={{
                        background: 'var(--panel)',
                        border: '1px solid var(--border)',
                        borderBottom: 'none',
                        padding: '16px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <div style={{ width: 2, height: 22, background: accent, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: accent, letterSpacing: 2, textTransform: 'uppercase' }}>
                        {label}
                      </span>
                    </div>
                  )}
                  <DocumentGrid documents={group.documents} lang={lang} viewOriginalLabel={t('cert.view.original', '원본 보기', 'View Original')} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
