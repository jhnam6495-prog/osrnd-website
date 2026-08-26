// 오시는 길 페이지
import { useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const LAT = 35.567965
const LNG = 129.368154
const APP_KEY = '7d5e79e80e99f8fadef7dfde6f87f86a'

function AboutLocation({ onNavigate }) {
  const { lang, t } = useTranslation()

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById('kakao-map')
      if (!container) return
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(LAT, LNG),
        level: 4,
      })
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(LAT, LNG),
      })
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:6px 12px;font-size:13px;font-weight:600;white-space:nowrap;color:#000;">오에스알앤디㈜</div>',
      })
      infowindow.open(map, marker)
    }

    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }
    if (window.kakao) {
      window.kakao.maps.load(initMap)
      return
    }
    if (document.getElementById('kakao-sdk')) return

    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    script.onload = () => window.kakao.maps.load(initMap)
    document.head.appendChild(script)
  }, [])

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('location.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('location.ph.title')}</h1>
        <p>{t('location.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 연락처 테이블 */}
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', marginBottom: 36, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                [t('location.address.label'), t('location.address.val')],
                ['TEL', lang === 'ko' ? '052-296-3734' : '+82-52-296-3734'],
                ['FAX', lang === 'ko' ? '052-296-3736' : '+82-52-296-3736'],
                ['Email', 'osrnd@osrnd.com'],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 22px', background: 'rgba(0,180,216,0.07)', fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 110, textTransform: 'uppercase' }}>{label}</td>
                  <td style={{ padding: '14px 22px', fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="map-wrap">
          {/* 지도 */}
          <div>
            <div style={{ width: '100%', border: '1px solid var(--border)' }}>
              <div id="kakao-map" style={{ width: '100%', height: 360 }} />
              <div style={{ padding: '10px 16px', background: 'var(--panel)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>카카오맵</span>
                <a href="https://map.kakao.com/?q=울산+북구+산성로+40" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', fontFamily: "'DM Mono', monospace" }}>
                  {t('location.map.larger')}
                </a>
              </div>
            </div>
          </div>

          {/* 찾아오는 방법 */}
          <div>
            <div className="loc-card">
              <h4>{t('location.hq')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('location.hq.desc') }} />
            </div>
            <div style={{ background: 'var(--card)', padding: 24, border: '1px solid var(--border)' }}>
              <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--white)', marginBottom: 16, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                {t('location.directions')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10, letterSpacing: 1, color: 'var(--bg)', background: 'var(--cyan)', padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {t('location.by.car')}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                    {t('location.by.car.desc')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10, letterSpacing: 1, color: 'var(--bg)', background: 'var(--orange)', padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {t('location.by.transit')}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                    {t('location.by.transit.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default AboutLocation
