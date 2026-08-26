// 제어반/동력반/OP 조작반 제품 페이지
import { useTranslation } from '../../hooks/useTranslation'
import controlPanel1 from '../../assets/images/control-panel-1.png'
import controlPanel2 from '../../assets/images/control-panel-2.png'
import powerPanel1 from '../../assets/images/power-pnael-1.png'
import opPanel from '../../assets/images/op-panel.png'
import panelInstall from '../../assets/images/panel-install.png'

function ProdPanel({ onNavigate }) {
  const { lang, t } = useTranslation()

  const panels = [
    {
      eyebrow: 'Control Panel', color: 'var(--cyan)',
      titleKo: '제어반', titleEn: 'Control Panel',
      descKo: '자동화 라인의 핵심 전기 제어 장치. PLC, 인버터, 서보 드라이버 등이 탑재된 종합 제어 패널.',
      descEn: 'Core electrical control device for automation lines. Comprehensive control panel integrating PLCs, inverters, servo drivers and more.',
      feats: [
        { ko: '고객 사양 맞춤형 설계', en: 'Custom design to customer specifications' },
        { ko: 'PLC, 인버터, I/O 모듈 통합', en: 'PLC, inverter, I/O module integration' },
        { ko: '현장 설치 및 시운전 포함', en: 'On-site installation and commissioning included' },
      ],
    },
    {
      eyebrow: 'Power Panel', color: 'var(--orange)',
      titleKo: '동력반', titleEn: 'Power Panel',
      descKo: '모터, 히터 등 동력 장치를 제어하는 전력 분배 패널.',
      descEn: 'Power distribution panel controlling motors, heaters and other power devices.',
      feats: [
        { ko: '전력 분배 및 보호 회로 설계', en: 'Power distribution and protection circuit design' },
        { ko: '마그넷 스위치, 차단기 구성', en: 'Magnetic switches and circuit breaker configuration' },
        { ko: '안전 규격 준수 설계', en: 'Safety standard-compliant design' },
      ],
    },
    {
      eyebrow: 'OP Panel', color: 'var(--cyan)',
      titleKo: 'OP 조작반', titleEn: 'OP Panel',
      descKo: '현장 작업자가 직접 조작하는 HMI 패널.',
      descEn: 'HMI panel operated directly by on-site workers.',
      feats: [
        { ko: 'HMI 터치패널 탑재', en: 'HMI touch panel equipped' },
        { ko: '비상정지, 기동/정지 버튼 구성', en: 'Emergency stop, start/stop button configuration' },
        { ko: '현장 설치 최적화 설계', en: 'Design optimized for on-site installation' },
      ],
    },
  ]

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('panel.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('panel.title')}</h1>
        <p>{t('panel.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 패널 종류 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginBottom: 60 }}>
          {panels.map(({ eyebrow, color, titleKo, titleEn, descKo, descEn, feats }) => (
            <div key={titleKo} style={{ background: 'var(--card)', padding: '36px 28px', borderTop: `2px solid ${color}` }}>
              <div className="eyebrow" style={{ color, marginBottom: 12 }}>{eyebrow}</div>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                {lang === 'ko' ? titleKo : titleEn}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 18 }}>
                {lang === 'ko' ? descKo : descEn}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {feats.map(({ ko, en }) => (
                  <div className="prod-feat" key={ko}>{lang === 'ko' ? ko : en}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 사진 갤러리 */}
        <div className="eyebrow">{t('panel.gallery.eyebrow')}</div>
        <h2 className="stitle" style={{ marginBottom: 36 }}><span>{t('panel.gallery.t1')}</span><em>{t('panel.gallery.t2')}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '300px 300px', gap: 2, background: 'var(--border)' }}>
          <div style={{ gridRow: 'span 2', overflow: 'hidden', position: 'relative' }}>
            <img src={controlPanel1} alt="Control Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('panel.cp.large')}</p>
            </div>
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={controlPanel2} alt="Control Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('panel.cp.single')}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)' }}>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img src={powerPanel1} alt="Power Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('panel.pp')}</p>
              </div>
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img src={opPanel} alt="OP Panel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px', background: 'linear-gradient(transparent,rgba(8,12,18,0.85))' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('panel.op')}</p>
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
              {t('panel.install.title')}
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
              {t('panel.install.desc')}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t('common.cta.inquiry')}</button>
        </div>
      </div></div>
    </>
  )
}

export default ProdPanel
