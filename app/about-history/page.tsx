// 회사 연혁 페이지 — Blob이 비어있으면(데이터 이관 전) 하드코딩 폴백을 보여준다.
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'
import { listHistory, groupHistoryByYear, HISTORY_FALLBACK } from '../lib/history'

export default async function AboutHistoryPage() {
  const { lang, t } = await getDictionary()

  // 기존 AboutHistory.jsx와 동일하게, 조회 실패(네트워크 오류 등) 시에도 폴백으로 내려간다 —
  // 연혁은 과거 사실이라 CMS가 일시적으로 응답하지 않아도 빈 화면보다 폴백을 보여주는 편이 낫다.
  let entries: Awaited<ReturnType<typeof listHistory>> = []
  try {
    entries = await listHistory()
  } catch {
    entries = []
  }
  const grouped = entries.length > 0 ? groupHistoryByYear(entries) : HISTORY_FALLBACK

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('nav.about'), href: '/about-intro' },
          { label: t('history.bc') },
        ]}
        title={t('history.title')}
        description={t('history.subtitle')}
      />

      <div className="outer">
        <div className="sec">
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div className="hist-wrap">
              {grouped.map(({ year, items }) => (
                <div className="hist-item" key={year}>
                  <div className="hist-year">{year}</div>
                  <div className="hist-events">
                    {items.map((item) => (
                      <div className="hist-ev" key={item.id}>
                        {lang === 'ko' ? item.content_ko : item.content_en}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
