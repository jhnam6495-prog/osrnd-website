// 공장자동화 페이지
import { useTranslation } from '../../hooks/useTranslation'
import factoryPanorama from '../../assets/images/factory-panorama.png'
import factoryRobot from '../../assets/images/factory-robot-1.png'

function BizFactory({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('factory.bc')}</span>
      </div></div>

      {/* 히어로 이미지 */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <img src={factoryPanorama} alt="Factory" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,12,18,0.3),rgba(8,12,18,0.75))' }}></div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Factory Automation</div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(30px,5vw,58px)', fontWeight: 700, color: '#fff', letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>
            {t('factory.title')}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>
            {t('factory.hero.desc')}
          </p>
        </div>
      </div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start', marginBottom: 80 }}>
          <div>
            <div className="eyebrow">{t('factory.s1.eyebrow')}</div>
            <h2 className="stitle">
              <span>{t('factory.s1.t1')}</span><em>{t('factory.s1.t2')}</em>
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 2, marginBottom: 24 }}>
              {t('factory.s1.desc')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { color: 'var(--cyan)', titleKey: 'factory.item1.title', descKey: 'factory.item1.desc' },
                { color: 'var(--cyan)', titleKey: 'factory.item2.title', descKey: 'factory.item2.desc' },
                { color: 'var(--orange)', titleKey: 'factory.item3.title', descKey: 'factory.item3.desc' },
              ].map(({ color, titleKey, descKey }) => (
                <div key={titleKey} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: 'var(--card)', border: '1px solid var(--border)', borderLeft: `2px solid ${color}` }}>
                  <div style={{ color, fontSize: 11, flexShrink: 0, paddingTop: 2, fontFamily: "'DM Mono', monospace" }}>▸</div>
                  <div>
                    <p style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600, marginBottom: 4 }}>{t(titleKey)}</p>
                    <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7 }}>{t(descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="tech-badges" style={{ marginTop: 20 }}>
              <span className="tech-badge">PLC</span>
              <span className="tech-badge">Robot</span>
              <span className="tech-badge">Welding</span>
              <span className="tech-badge">Vision</span>
              <span className="tech-badge">Servo</span>
            </div>
          </div>
          <div style={{ height: 420, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img src={factoryRobot} alt="Robot welding" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 80 }}></div>

        {/* 주요 적용 분야 */}
        <div>
          <div className="eyebrow">{t('factory.s2.eyebrow')}</div>
          <h2 className="stitle"><span>{t('factory.s2.t1')}</span><em>{t('factory.s2.t2')}</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginTop: 36 }}>
            {[
              { num: '01', color: 'var(--cyan)', titleKey: 'factory.app1.title', descKey: 'factory.app1.desc' },
              { num: '02', color: 'var(--orange)', titleKey: 'factory.app2.title', descKey: 'factory.app2.desc' },
              { num: '03', color: 'var(--cyan)', titleKey: 'factory.app3.title', descKey: 'factory.app3.desc' },
            ].map(({ num, color, titleKey, descKey }) => (
              <div key={num} style={{ background: 'var(--card)', padding: '36px 28px', borderTop: `2px solid ${color}` }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 36, color: `rgba(${color === 'var(--cyan)' ? '0,180,216' : '245,124,0'},0.08)`, fontWeight: 700, marginBottom: 12 }}>{num}</div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 17, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{t(titleKey)}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85 }}>{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div></div>
    </>
  )
}

export default BizFactory
