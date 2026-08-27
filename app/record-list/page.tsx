// 주요 사업실적 페이지 — 조회 실패 시 history와 동일하게 폴백(과거 실적이라 빈 화면보다 낫다).
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'
import { listProjects, groupProjectsByYear, PROJECTS_FALLBACK } from '../lib/projects'

export default async function RecordListPage() {
  const { lang, t } = await getDictionary()

  let records: Awaited<ReturnType<typeof listProjects>> = []
  try {
    records = await listProjects()
  } catch {
    records = []
  }
  const years = records.length > 0 ? groupProjectsByYear(records) : PROJECTS_FALLBACK

  return (
    <>
      <PageHero breadcrumbs={[{ label: t('common.home'), href: '/' }, { label: t('records.bc') }]} title={t('records.title')} description={t('records.ph.desc')} />

      <div className="outer">
        <div className="sec">
          {/* 통계 */}
          <div className="stat-grid" style={{ marginBottom: 70 }}>
            <div className="stat-card">
              <div className="stat-num">
                4<span className="stat-unit">+</span>
              </div>
              <div className="stat-label">{t('records.stat1.label')}</div>
              <div className="stat-note">{t('records.stat1.note')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                29<span className="stat-unit">+</span>
              </div>
              <div className="stat-label">{t('records.stat2.label')}</div>
              <div className="stat-note">{t('records.stat2.note')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num" style={{ color: 'var(--orange)', fontSize: 24, paddingTop: 8 }}>
                {t('records.stat3.val')}
              </div>
              <div className="stat-label">{t('records.stat3.label')}</div>
              <div className="stat-note">{t('records.stat3.note')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">US</div>
              <div className="stat-label">{t('records.stat4.label')}</div>
              <div className="stat-note">{t('records.stat4.note')}</div>
            </div>
          </div>

          {/* 년도별 실적 */}
          {years.map(({ year, color, records: yearRecords }, yi) => (
            <div key={year} style={{ marginBottom: yi < years.length - 1 ? 56 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-logo)', fontSize: 32, fontWeight: 700, color }}>{year}</div>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--border)' }}>
                {yearRecords.map((record) => (
                  <div
                    key={record.id}
                    style={{
                      background: 'var(--card)',
                      display: 'grid',
                      gridTemplateColumns: record.image ? '80px 60px 1fr 140px' : '80px 1fr 140px',
                      padding: '15px 22px',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, color }}>{record.date}</span>
                    {record.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={record.image.url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', border: '1px solid var(--border)' }} />
                    )}
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{lang === 'ko' ? record.content_ko : record.content_en}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', fontFamily: 'var(--font-label)' }}>
                      {lang === 'ko' ? record.tag_ko : record.tag_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
