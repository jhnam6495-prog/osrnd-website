// 공장자동화 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'
import factoryPanorama from '../../assets/images/factory-panorama.png'
import factoryRobot from '../../assets/images/factory-robot-1.png'
import engineer1 from '../../assets/images/engineer-1.png'

function BizFactory({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '공장자동화', 'Factory Automation')}</span>
      </div></div>

      {/* 히어로 이미지 */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <img src={factoryPanorama} alt="Factory" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,12,18,0.3),rgba(8,12,18,0.75))' }}></div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Factory Automation</div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(30px,5vw,58px)', fontWeight: 700, color: '#fff', letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>
            {t(lang, '공장자동화', 'Factory Automation')}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>
            {t(lang, '로봇 자동화부터 PLC 제어까지 — 원스톱 솔루션', 'From robot automation to PLC control — one-stop solutions')}
          </p>
        </div>
      </div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start', marginBottom: 80 }}>
          <div>
            <div className="eyebrow">{t(lang, '01 — 로봇 용접 자동화', '01 — Robot Welding')}</div>
            <h2 className="stitle">
              <span>{t(lang, '로봇 용접 ', 'Robot Welding ')}</span><em>{t(lang, '자동화', 'Automation')}</em>
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 2, marginBottom: 24 }}>
              {t(lang,
                '자동차 차체 및 샤시 용접 장비의 전기장치 설계 및 제작/시운전, 로봇을 이용한 도장/물류 자동화를 수행합니다.',
                'We perform electrical design, fabrication and commissioning of automotive body and chassis welding equipment, as well as robot-based paint and logistics automation.'
              )}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { color: 'var(--cyan)', titleKo: '자동차 차체/샤시 용접 자동화', titleEn: 'Automotive Body/Chassis Welding Automation', descKo: '차체 및 샤시 용접 장비의 전기장치 설계, 제작, 현장 시운전까지 일괄 수행', descEn: 'Comprehensive service: electrical design, fabrication, and on-site commissioning of body and chassis welding equipment' },
                { color: 'var(--cyan)', titleKo: '도장공정 / 물류 자동화', titleEn: 'Paint Process / Logistics Automation', descKo: '도장공정 및 물류 이송·적재공정의 로봇 자동화 시스템 구축', descEn: 'Building robot automation systems for paint processes and material handling/stacking operations' },
                { color: 'var(--orange)', titleKo: '기타 PLC 자동화 설비', titleEn: 'Other PLC Automation Equipment', descKo: '비전시스템(유무판정/측정), 서보제어 물류이송, 다전극 용접장치', descEn: 'Vision systems (detection/measurement), servo-controlled material transport, multi-electrode welding devices' },
              ].map(({ color, titleKo, titleEn, descKo, descEn }) => (
                <div key={titleKo} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: 'var(--card)', border: '1px solid var(--border)', borderLeft: `2px solid ${color}` }}>
                  <div style={{ color, fontSize: 11, flexShrink: 0, paddingTop: 2, fontFamily: "'DM Mono', monospace" }}>▸</div>
                  <div>
                    <p style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600, marginBottom: 4 }}>{t(lang, titleKo, titleEn)}</p>
                    <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7 }}>{t(lang, descKo, descEn)}</p>
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
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2, height: 420 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={factoryRobot} alt="Robot welding" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={engineer1} alt="Field engineer" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 80 }}></div>

        {/* 주요 적용 분야 */}
        <div>
          <div className="eyebrow">{t(lang, '02 — 주요 적용 분야', '02 — Application Fields')}</div>
          <h2 className="stitle"><span>{t(lang, '주요 ', 'Key ')}</span><em>{t(lang, '적용 분야', 'Applications')}</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginTop: 36 }}>
            {[
              { num: '01', color: 'var(--cyan)', titleKo: '자동차 생산라인', titleEn: 'Automotive Production Lines', descKo: '차체·샤시 용접, 조립 공정의 자동화. ㈜화신 미국법인 포함 국내외 주요 자동차 부품사에 공급.', descEn: 'Automation of body/chassis welding and assembly. Supplied to major domestic and international automotive parts manufacturers including Hwashin US Corp.' },
              { num: '02', color: 'var(--orange)', titleKo: '도장 / 물류 공정', titleEn: 'Paint / Logistics Process', descKo: '도장공정 자동화, 물류 이송·적재 자동화. 서보모터 제어 기반의 정밀 물류 자동화.', descEn: 'Paint process automation, material handling/stacking automation. Precision logistics automation based on servo motor control.' },
              { num: '03', color: 'var(--cyan)', titleKo: '제어반 / 전기장치', titleEn: 'Control Panels / Electrical', descKo: '제어반, 동력반, OP 조작반 설계·제작·납품. 고객 사양 맞춤형 전기장치 일괄 제공.', descEn: 'Design, fabrication and delivery of control panels, power panels, and OP panels. Complete custom electrical equipment solutions.' },
            ].map(({ num, color, titleKo, titleEn, descKo, descEn }) => (
              <div key={num} style={{ background: 'var(--card)', padding: '36px 28px', borderTop: `2px solid ${color}` }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 36, color: `rgba(${color === 'var(--cyan)' ? '0,180,216' : '245,124,0'},0.08)`, fontWeight: 700, marginBottom: 12 }}>{num}</div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 17, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{t(lang, titleKo, titleEn)}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85 }}>{t(lang, descKo, descEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </div></div>
    </>
  )
}

export default BizFactory
