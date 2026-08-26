// 제어반/동력반/OP 조작반 제품 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'
import controlPanel1 from '../../assets/images/control-panel-1.png'
import controlPanel2 from '../../assets/images/control-panel-2.png'
import powerPanel1 from '../../assets/images/power-pnael-1.png'
import opPanel from '../../assets/images/op-panel.png'
import panelInstall from '../../assets/images/panel-install.png'

function ProdPanel({ onNavigate }) {
  const { lang } = useLanguage()

  const panels = [
    {
      eyebrow: 'Control Panel', color: 'var(--cyan)',
      titleKo: '제어반', titleEn: 'Control Panel',
      descKo: '자동화 라인의 핵심 전기 제어 장치. PLC, 인버터, 서보 드라이버 등이 탑재된 종합 제어 패널.',
      descEn: 'Core electrical control device for automation lines. Comprehensive control panel integrating PLCs, inverters, servo drivers and more.',
      feats: [
        [t(lang, '고객 사양 맞춤형 설계', 'Custom design to customer specifications')],
        [t(lang, 'PLC, 인버터, I/O 모듈 통합', 'PLC, inverter, I/O module integration')],
        [t(lang, '현장 설치 및 시운전 포함', 'On-site installation and commissioning included')],
      ],
    },
    {
      eyebrow: 'Power Panel', color: 'var(--orange)',
      titleKo: '동력반', titleEn: 'Power Panel',
      descKo: '모터, 히터 등 동력 장치를 제어하는 전력 분배 패널.',
      descEn: 'Power distribution panel controlling motors, heaters and other power devices.',
      feats: [
        [t(lang, '전력 분배 및 보호 회로 설계', 'Power distribution and protection circuit design')],
        [t(lang, '마그넷 스위치, 차단기 구성', 'Magnetic switches and circuit breaker configuration')],
        [t(lang, '안전 규격 준수 설계', 'Safety standard-compliant design')],
      ],
    },
    {
      eyebrow: 'OP Panel', color: 'var(--cyan)',
      titleKo: 'OP 조작반', titleEn: 'OP Panel',
      descKo: '현장 작업자가 직접 조작하는 HMI 패널.',
      descEn: 'HMI panel operated directly by on-site workers.',
      feats: [
        [t(lang, 'HMI 터치패널 탑재', 'HMI touch panel equipped')],
        [t(lang, '비상정지, 기동/정지 버튼 구성', 'Emergency stop, start/stop button configuration')],
        [t(lang, '현장 설치 최적화 설계', 'Design optimized for on-site installation')],
      ],
    },
  ]

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '제어반 / 동력반', 'Control Panels')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '제어반 / 동력반 / OP 조작반', 'Control / Power / OP Panels')}</h1>
        <p>{t(lang, '맞춤 설계 및 제작 — 현장 설치 시운전까지 일괄 수행', 'Custom design and fabrication — including on-site installation and commissioning')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 패널 종류 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginBottom: 60 }}>
          {panels.map(({ eyebrow, color, titleKo, titleEn, descKo, descEn, feats }) => (
            <div key={titleKo} style={{ background: 'var(--card)', padding: '36px 28px', borderTop: `2px solid ${color}` }}>
              <div className="eyebrow" style={{ color, marginBottom: 12 }}>{eyebrow}</div>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                {t(lang, titleKo, titleEn)}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 18 }}>{t(lang, descKo, descEn)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {feats.map(([text]) => <div className="prod-feat" key={text}>{text}</div>)}
              </div>
            </div>
          ))}
        </div>

        {/* 사진 갤러리 */}
        <div className="eyebrow">{t(lang, '납품 사진 갤러리', 'Photo Gallery')}</div>
        <h2 className="stitle" style={{ marginBottom: 36 }}><span>{t(lang, '실제 ', 'Our ')}</span><em>{t(lang, '납품 사진', 'Delivered Products')}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '300px 300px', gap: 2, background: 'var(--border)' }}>
          <div style={{ gridRow: 'span 2', overflow: 'hidden', position: 'relative' }}>
            <img src={controlPanel1} alt="Control Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, '제어반 — 대형', 'Control Panel — Large')}</p>
            </div>
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={controlPanel2} alt="Control Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, '제어반 — 단독형', 'Control Panel — Single')}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)' }}>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img src={powerPanel1} alt="Power Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, '동력반', 'Power Panel')}</p>
              </div>
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img src={opPanel} alt="OP Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t(lang, 'OP 조작반', 'OP Panel')}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 2, overflow: 'hidden', position: 'relative', height: 260 }}>
          <img src={panelInstall} alt="Installation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', transition: 'transform 0.5s' }}
            onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(8,12,18,0.75) 0%,transparent 50%)' }}></div>
          <div style={{ position: 'absolute', left: 44, top: '50%', transform: 'translateY(-50%)' }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--cyan)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>Installation Site</p>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 26, color: 'var(--white)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
              {t(lang, '현장 설치 / 시운전', 'On-site Installation & Commissioning')}
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
              {t(lang, '제작 완료 후 현장 설치 및 시운전까지 일괄 수행합니다.', 'After fabrication, we perform on-site installation and commissioning as a complete service.')}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '제품 문의하기', 'Product Inquiry')}</button>
        </div>
      </div></div>
    </>
  )
}

export default ProdPanel
