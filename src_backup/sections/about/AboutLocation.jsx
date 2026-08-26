// 오시는 길 페이지
import { useEffect } from 'react'
import { useLanguage, t } from '../../contexts/LanguageContext'

const LAT = 35.567965
const LNG = 129.368154
const APP_KEY = '7d5e79e80e99f8fadef7dfde6f87f86a'

function AboutLocation({ onNavigate }) {
  const { lang } = useLanguage()

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

    // 이미 maps API까지 로드 완료된 경우
    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }

    // kakao 객체는 있지만 maps 모듈 로드 필요
    if (window.kakao) {
      window.kakao.maps.load(initMap)
      return
    }

    // 스크립트 중복 삽입 방지
    if (document.getElementById('kakao-sdk')) return

    // 동적으로 SDK 삽입 (autoload=false → kakao.maps.load 콜백 사용)
    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    script.onload = () => window.kakao.maps.load(initMap)
    document.head.appendChild(script)
  }, [])

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t(lang, '회사소개', 'About')}</a> ›
        <span>{t(lang, '오시는 길', 'Location')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '오시는 길', 'Location & Access')}</h1>
        <p>{t(lang, '오에스알앤디㈜를 방문해 주세요.', 'We welcome your visit to OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 연락처 테이블 */}
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', marginBottom: 36, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                [t(lang, '주소', 'Address'), t(lang, '44252 울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)', '821, Sansung-ro 40, Buk-gu, Ulsan 44252, Korea (UKIC, Hyomun-dong)')],
                ['TEL', '052-296-3734'],
                ['FAX', '052-296-3736'],
                ['Email', 'osrnd@osrnd.com'],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 22px', background: 'rgba(0,180,216,0.07)', fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 110, textTransform: 'uppercase' }}>{label}</td>
                  <td style={{ padding: '14px 22px', fontSize: 14, color: 'rgba(255,255,255,0.82)', fontFamily: label !== t(lang, '주소', 'Address') ? "'DM Mono', monospace" : undefined }}>{value}</td>
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
                  {t(lang, '지도 크게 보기 →', 'View Larger Map →')}
                </a>
              </div>
            </div>
          </div>

          {/* 찾아오는 방법 */}
          <div>
            <div className="loc-card">
              <h4>{t(lang, 'OSRnD 본사', 'OSRnD Headquarters')}</h4>
              <p dangerouslySetInnerHTML={{
                __html: t(lang,
                  '📍 44252 울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)<br>☎ 052-296-3734<br>📠 FAX. 052-296-3736<br>✉ osrnd@osrnd.com<br>🕐 상담시간: 월–금 09:00 ~ 18:00',
                  '📍 821, Sansung-ro 40, Buk-gu, Ulsan 44252, Korea<br>☎ 052-296-3734<br>📠 FAX. 052-296-3736<br>✉ osrnd@osrnd.com<br>🕐 Business Hours: Mon–Fri 09:00~18:00 KST'
                )
              }} />
            </div>
            <div style={{ background: 'var(--card)', padding: 24, border: '1px solid var(--border)' }}>
              <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--white)', marginBottom: 16, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                {t(lang, '찾아오시는 방법', 'Directions')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10, letterSpacing: 1, color: 'var(--bg)', background: 'var(--cyan)', padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {t(lang, '자가용', 'By Car')}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                    {t(lang, '울산 IC → 북구 방면 → 효문산업단지 → UKIC 울산지식산업센터 821호', 'Ulsan IC → Buk-gu direction → Hyomun Industrial Complex → UKIC 821')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10, letterSpacing: 1, color: 'var(--bg)', background: 'var(--orange)', padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {t(lang, '대중교통', 'By Transit')}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                    {t(lang, '울산역 또는 울산버스터미널 → 북구 효문동 방면 버스 이용', 'Ulsan Station or Bus Terminal → Bus toward Buk-gu Hyomun-dong')}
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
