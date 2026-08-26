// 추구 이념 페이지
import { useTranslation } from '../../hooks/useTranslation'

function AboutPhilosophy({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('philosophy.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('philosophy.title')}</h1>
        <p>{t('philosophy.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div className="eyebrow">Our Philosophy</div>
        <h2 className="stitle"><em>{t('philosophy.t1')}</em><span>{t('philosophy.t2')}</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)', marginTop: 50 }}>
          {/* 휴머니티 */}
          <div style={{ background: 'var(--card)', padding: '56px 44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: 20, fontFamily: "'Orbitron', sans-serif", fontSize: 80, fontWeight: 700, color: 'rgba(0,180,216,0.05)' }}>01</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}>Humanity</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 26, color: 'var(--white)', marginBottom: 20, letterSpacing: 1 }}>
              {t('philosophy.h1.title')}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 2.1 }}
              dangerouslySetInnerHTML={{ __html: t('philosophy.h1.desc') }} />
          </div>

          {/* 창조 */}
          <div style={{ background: 'var(--card)', padding: '56px 44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: 20, fontFamily: "'Orbitron', sans-serif", fontSize: 80, fontWeight: 700, color: 'rgba(245,124,0,0.05)' }}>02</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--orange)', letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}>Creation</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 26, color: 'var(--white)', marginBottom: 20, letterSpacing: 1 }}>
              {t('philosophy.h2.title')}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 2.1 }}>
              {t('philosophy.h2.desc')}
            </p>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default AboutPhilosophy
