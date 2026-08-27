// 오시는 길 페이지
import PageHero from '../components/PageHero'
import KakaoMap from '../components/KakaoMap'
import { getDictionary } from '../lib/i18n/dictionary'

const LAT = 35.567965
const LNG = 129.368154

export default async function AboutLocationPage() {
  const { lang, t } = await getDictionary()
  const isKo = lang === 'ko'

  const contactRows: [string, string][] = [
    [t('location.address.label'), t('location.address.val')],
    ['TEL', isKo ? '052-296-3734' : '+82-52-296-3734'],
    ['FAX', isKo ? '052-296-3736' : '+82-52-296-3736'],
    ['Email', 'osrnd@osrnd.com'],
  ]

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('nav.about'), href: '/about-intro' },
          { label: t('location.bc') },
        ]}
        title={t('location.ph.title')}
        description={t('location.ph.desc')}
      />

      <div className="outer">
        <div className="sec">
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', marginBottom: 36, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {contactRows.map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td
                      style={{
                        padding: '14px 22px',
                        background: 'rgba(0,180,216,0.07)',
                        fontSize: 10,
                        letterSpacing: 2,
                        color: 'var(--cyan)',
                        fontFamily: 'var(--font-label)',
                        width: 110,
                        textTransform: 'uppercase',
                      }}
                    >
                      {label}
                    </td>
                    <td style={{ padding: '14px 22px', fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="map-wrap">
            <div>
              <div style={{ width: '100%', border: '1px solid var(--border)' }}>
                <KakaoMap lat={LAT} lng={LNG} markerLabel="오에스알앤디㈜" />
                <div
                  style={{
                    padding: '10px 16px',
                    background: 'var(--panel)',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>카카오맵</span>
                  <a
                    href="https://map.kakao.com/?q=울산+북구+산성로+40"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', fontFamily: 'var(--font-label)' }}
                  >
                    {t('location.map.larger')}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="loc-card">
                <h4>{t('location.hq')}</h4>
                <p dangerouslySetInnerHTML={{ __html: t('location.hq.desc') }} />
              </div>
              <div style={{ background: 'var(--card)', padding: 24, border: '1px solid var(--border)' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 14,
                    color: 'var(--white)',
                    marginBottom: 16,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  {t('location.directions')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: 1,
                        color: 'var(--bg)',
                        background: 'var(--cyan)',
                        padding: '3px 10px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        fontFamily: 'var(--font-label)',
                      }}
                    >
                      {t('location.by.car')}
                    </span>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>{t('location.by.car.desc')}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: 1,
                        color: 'var(--bg)',
                        background: 'var(--orange)',
                        padding: '3px 10px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        fontFamily: 'var(--font-label)',
                      }}
                    >
                      {t('location.by.transit')}
                    </span>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>{t('location.by.transit.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
