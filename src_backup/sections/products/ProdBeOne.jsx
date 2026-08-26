// 비원 (Be-One) 제품 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'
import beoneProduct from '../../assets/images/beone-product.png'

function ProdBeOne({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '비원 (Be-One)', 'Be-One')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '비원 (Be-One)', 'Be-One')}</h1>
        <p>{t(lang, 'PLC ↔ 서보앰프 프로토콜 변환 인터페이스 장치 — MRJ4ARJ / MRJ2S_A', 'PLC ↔ Servo Amplifier Protocol Converter — MRJ4ARJ / MRJ2S_A')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">{t(lang, 'OSRnD 자체 개발 제품', 'OSRnD Original Product')}</div>
            <h2 className="stitle">
              <em>Be-One</em><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 3 }}>{t(lang, '비원', 'Servo Interface Device')}</span>
            </h2>

            {/* 제품 사양 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, '제품 사양', 'Specifications')}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[
                  [t(lang, '모델명', 'Model'), 'MRJ4ARJ / MRJ2S_A'],
                  [t(lang, '용도', 'Function'), t(lang, 'PLC 이더넷 프로토콜 ↔ 서보앰프 RS232/422 프로토콜 상호 변환 중계', 'Mutual conversion between PLC Ethernet protocol and servo amplifier RS232/422 protocol')],
                  [t(lang, '적용처', 'Applications'), t(lang, '자동차 생산라인, 산업용 로봇 자동화 시스템', 'Automotive production lines, industrial robot automation systems')],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', background: 'rgba(0,180,216,0.05)', fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 90 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </table>
            </div>

            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t(lang, '주요 특징', 'Key Features')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {[
                [t(lang, '하나의 제어기로 다수의 서보모터 동시 제어 가능', 'Simultaneous control of multiple servo motors from a single controller')],
                [t(lang, 'PLC 이더넷 ↔ RS232/422 프로토콜 실시간 변환', 'Real-time conversion between PLC Ethernet and RS232/422 protocols')],
                [t(lang, '산업 환경에 최적화된 견고한 하우징 설계', 'Rugged housing design optimized for industrial environments')],
                [t(lang, '자동차 생산라인 실증 완료 (㈜화신 등)', 'Field-proven in automotive production lines (Hwashin Corp. etc.)')],
              ].map(([text]) => (
                <div className="prod-feat" key={text}>{text}</div>
              ))}
            </div>

            {/* 작동 원리 */}
            <div style={{ background: 'var(--card)', padding: 20, border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
                {t(lang, '작동 원리', 'How It Works')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>PLC</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>Ethernet</p>
                </div>
                <span style={{ color: 'var(--cyan)', fontSize: 16, fontWeight: 700 }}>⟺</span>
                <div style={{ background: 'linear-gradient(135deg,rgba(0,180,216,0.15),rgba(245,124,0,0.15))', border: '1px solid rgba(0,180,216,0.5)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--white)', fontWeight: 700 }}>BE-ONE</p>
                  <p style={{ fontSize: 9, color: 'var(--cyan)', marginTop: 2 }}>{t(lang, '변환 중계', 'Converter')}</p>
                </div>
                <span style={{ color: 'var(--orange)', fontSize: 16, fontWeight: 700 }}>⟺</span>
                <div style={{ background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)' }}>{t(lang, '서보앰프', 'Servo Amp')}</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>RS232/422</p>
                </div>
                <span style={{ color: 'var(--orange)', fontSize: 14 }}>→</span>
                <div style={{ background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)' }}>{t(lang, '서보모터', 'Servo Motors')}</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>× N</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '제품 문의하기', 'Product Inquiry')}</button>
            </div>
          </div>

          {/* 제품 이미지 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={beoneProduct} alt="Be-One" style={{ width: '100%', height: 320, objectFit: 'contain', background: 'var(--card)', padding: 24, transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.12)', padding: '14px 18px' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>
                <span style={{ color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{t(lang, '모델', 'Model')}</span><br />
                MRJ4ARJ / MRJ2S_A<br />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t(lang, '오에스알앤디㈜ 자체 설계·제작', 'Designed & manufactured by OSRnD Co., Ltd')}</span>
              </p>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default ProdBeOne
