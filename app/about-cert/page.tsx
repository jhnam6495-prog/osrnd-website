// 인증현황 페이지 — 신규 CMS 연동(documents-data). 원본은 하드코딩이었으나 관리자가 자유롭게
// 추가/삭제할 수 있게 되었으므로 "준비중"/"추가 예정" 플레이스홀더 카드는 더 이상 필요 없다.
import PageHero from '../components/PageHero'
import DocumentGrid from '../components/DocumentGrid'
import { getDictionary } from '../lib/i18n/dictionary'
import { listDocuments } from '../lib/documents'

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
            <DocumentGrid documents={documents} lang={lang} viewOriginalLabel={t('cert.view.original', '원본 보기', 'View Original')} />
          )}
        </div>
      </div>
    </>
  )
}
