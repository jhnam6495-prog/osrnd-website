// 추구 이념 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

function AboutPhilosophy({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t(lang, '회사소개', 'About')}</a> ›
        <span>{t(lang, '추구 이념', 'Philosophy')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '추구 이념', 'Philosophy')}</h1>
        <p>{t(lang, '오에스알앤디㈜가 추구하는 이념입니다.', 'The founding philosophy of OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div className="eyebrow">Our Philosophy</div>
        <h2 className="stitle"><em>{t(lang, '추구', 'Our')}</em><span>{t(lang, ' 이념', ' Philosophy')}</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)', marginTop: 50 }}>
          {/* 휴머니티 */}
          <div style={{ background: 'var(--card)', padding: '56px 44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: 20, fontFamily: "'Orbitron', sans-serif", fontSize: 80, fontWeight: 700, color: 'rgba(0,180,216,0.05)' }}>01</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}>Humanity</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 26, color: 'var(--white)', marginBottom: 20, letterSpacing: 1 }}>
              {t(lang, '휴머니티', 'Humanity')}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 2.1 }}
              dangerouslySetInnerHTML={{
                __html: t(lang,
                  '엔지니어의 마음속에는 항상 휴머니티가 있어야 한다.<br>흘러가는 강물처럼 모든 게 변할지라도 인간의 기본 이념은 변하지 않는다.',
                  'Humanity must always reside in the heart of an engineer.<br>Even as everything changes like a flowing river, the fundamental principles of humanity remain constant.'
                )
              }} />
          </div>

          {/* 창조 */}
          <div style={{ background: 'var(--card)', padding: '56px 44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -10, right: 20, fontFamily: "'Orbitron', sans-serif", fontSize: 80, fontWeight: 700, color: 'rgba(245,124,0,0.05)' }}>02</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--orange)', letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}>Creation</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 26, color: 'var(--white)', marginBottom: 20, letterSpacing: 1 }}>
              {t(lang, '창조', 'Creation')}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 2.1 }}>
              {t(lang,
                '항상 새로운 것에 대한 갈증과 추구를 원칙으로 삼는 진정한 창조가 되기 위해 노력한다.',
                'We strive to be true creators, always thirsting for and pursuing the new as our core principle.'
              )}
            </p>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default AboutPhilosophy
