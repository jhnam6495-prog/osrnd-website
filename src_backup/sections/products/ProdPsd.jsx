// 생산현황판 (PSD5-24) 제품 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'
import psd324Installed from '../../assets/images/PSD5-24-installed.png'
import psd324Product2 from '../../assets/images/PSD5-24-product-2.png'

function ProdPsd({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '생산현황판 (PSD5-24)', 'Production Display (PSD5-24)')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '생산현황판 (PSD5-24)', 'Production Status Display (PSD5-24)')}</h1>
        <p>{t(lang, '실시간 생산현황 모니터링 시스템', 'Real-Time Production Status Monitoring System')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">{t(lang, 'OSRnD 자체 개발 제품', 'OSRnD Original Product')}</div>
            <h2 className="stitle">
              <em>PSD5-24</em><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 2 }}>{t(lang, '생산현황판', 'Production Display')}</span>
            </h2>

            {/* 제품 사양 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: 'rgba(245,124,0,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, '제품 사양', 'Specifications')}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[
                  [t(lang, '모델명', 'Model'), 'PSD5-24 (PSDS5-24)', 'var(--orange)'],
                  [t(lang, '용도', 'Function'), t(lang, '생산현황 관련 실시간 생산데이터 및 생산카운터 표시', 'Real-time display of production data and counters on the factory floor'), 'var(--orange)'],
                  [t(lang, '통신', 'Communication'), t(lang, 'Ethernet (192.168.x.x) 원격 모니터링 지원', 'Ethernet (192.168.x.x) remote monitoring supported'), 'var(--orange)'],
                ].map(([label, value, color]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', background: 'rgba(245,124,0,0.05)', fontSize: 10, letterSpacing: 1, color, fontFamily: "'DM Mono', monospace", width: 90 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </table>
            </div>

            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t(lang, '주요 기능', 'Key Functions')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {[
                t(lang, '현재계획 vs 현재실적 실시간 비교 표시', 'Real-time comparison display: plan vs. actual production'),
                t(lang, '생산 카운터 및 차종 정보 실시간 표시', 'Real-time display of production counters and model information'),
                t(lang, 'LINE C/T, YF 등 생산 효율 지표 표시', 'Display of production efficiency indicators such as LINE C/T and YF'),
                t(lang, '인터넷 연결을 통한 원격 공장 모니터링', 'Remote factory monitoring via internet connection'),
                t(lang, '고객 맞춤형 데이터 표시 항목 구성 가능', 'Customizable data display items to customer requirements'),
              ].map(text => (
                <div className="prod-feat" key={text}>{text}</div>
              ))}
            </div>
            <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '제품 문의하기', 'Product Inquiry')}</button>
          </div>

          {/* 제품 이미지 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={psd324Installed} alt="PSD5-24" style={{ width: '100%', height: 260, objectFit: 'contain', background: 'var(--card)', padding: 16, transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={psd324Product2} alt="PSD5-24 installed" style={{ width: '100%', height: 220, objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ background: 'rgba(245,124,0,0.05)', border: '1px solid rgba(245,124,0,0.12)', padding: '12px 16px' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>{t(lang, '위: 제품 외관 | 아래: 현장 설치 가동 사진', 'Top: Product exterior | Bottom: Installed and in operation')}</p>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default ProdPsd
