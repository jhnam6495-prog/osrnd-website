// 홈 페이지 - 히어로, 사업분야, 제품, 고객사, CTA 섹션
import { useEffect, useRef } from 'react'
import { useLanguage, t } from '../../contexts/LanguageContext'
import factoryPanorama from '../../assets/images/factory-panorama.png'
import factoryRobot from '../../assets/images/factory-robot-1.png'
import beoneProduct from '../../assets/images/beone-product.png'
import psd324Installed from '../../assets/images/PSD5-24-installed.png'
import controlPanel1 from '../../assets/images/control-panel-1.png'
import logoHwashin from '../../assets/images/logo-hwashin.png'
import logoDonghee from '../../assets/images/logo-donghee.png'
import logoHhi from '../../assets/images/logo-hhi.png'
import logoYaskawa from '../../assets/images/logo-yaskawa.png'

function HomePage({ onNavigate }) {
  const { lang } = useLanguage()
  const fiRefs = useRef([])

  // 스크롤 페이드인 효과
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    fiRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addFiRef = (el) => {
    if (el && !fiRefs.current.includes(el)) fiRefs.current.push(el)
  }

  return (
    <>
      {/* ── 히어로 ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={factoryPanorama} alt="OSRnD" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(8,12,18,0.95) 0%,rgba(8,12,18,0.72) 55%,rgba(8,12,18,0.38) 100%)' }}></div>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 44px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 700 }}>
            {/* 배지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 18px', border: '1px solid rgba(0,180,216,0.4)', background: 'rgba(0,180,216,0.08)', color: 'var(--cyan-l)', fontSize: 10, letterSpacing: 4, marginBottom: 30, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>
              <span style={{ width: 7, height: 7, background: 'var(--cyan)', borderRadius: '50%', animation: 'blink 2s infinite', display: 'inline-block' }}></span>
              {t(lang, 'Since 2014 · 공장자동화 & R&D 전문기업', 'Since 2014 · Factory Automation & R&D Specialists')}
            </div>

            {/* 타이틀 */}
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(40px,6vw,76px)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '0.48em', letterSpacing: 5, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                {t(lang, '오에스알앤디(주)', 'OSRND CO., LTD')}
              </span>
              {t(lang, '공장', 'Factory')}<br />
              <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>{t(lang, '자동화', 'Automation')}</em><br />
              <span style={{ color: 'var(--orange)' }}>&</span> {t(lang, '연구개발', 'R&D')}
            </h1>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--muted)', marginBottom: 28, textTransform: 'uppercase' }}>
              {t(lang, '정밀 · 혁신 · 신뢰', 'PRECISION · INNOVATION · RELIABILITY')}
            </p>

            <p style={{ fontSize: 15, lineHeight: 2, color: 'rgba(255,255,255,0.6)', maxWidth: 520, marginBottom: 44 }}
              dangerouslySetInnerHTML={{
                __html: t(lang,
                  "오에스알앤디㈜는 공장자동화 및 연구개발 분야의 <strong style='color:rgba(255,255,255,0.88);'>원스톱 솔루션</strong>을 제공합니다.<br>로봇 자동화부터 PLC 제어, 생산관리시스템까지 — 고객의 성공이 우리의 목표입니다.",
                  "OSRnD provides <strong style='color:rgba(255,255,255,0.88);'>one-stop solutions</strong> in factory automation and R&D.<br>From robot automation to PLC control and MES — your success is our mission."
                )
              }}
            />

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn-p" onClick={() => onNavigate('biz-factory')}>{t(lang, '사업분야 보기', 'Our Business')}</button>
              <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '문의하기', 'Contact Us')}</button>
            </div>

            {/* 통계 */}
            <div style={{ display: 'flex', gap: 0, marginTop: 56, borderTop: '1px solid rgba(0,180,216,0.15)', paddingTop: 28 }}>
              <div style={{ paddingRight: 32, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 30, fontWeight: 700, color: 'var(--cyan)' }}>11<span style={{ fontSize: 14, color: 'var(--orange)' }}>+</span></div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginTop: 4 }}>{t(lang, '창립 연수', 'Years')}</div>
              </div>
              <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 30, fontWeight: 700, color: 'var(--orange)' }}>16<span style={{ fontSize: 14, color: 'var(--muted)' }}>+</span></div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginTop: 4 }}>{t(lang, '전문 엔지니어', 'Engineers')}</div>
              </div>
              <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 30, fontWeight: 700, color: 'var(--cyan)' }}>35<span style={{ fontSize: 14, color: 'var(--orange)' }}>{t(lang, '억', 'B₩')}</span></div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginTop: 4 }}>{t(lang, '연매출(2024)', 'Revenue(2024)')}</div>
              </div>
              <div style={{ paddingLeft: 32 }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 30, fontWeight: 700, color: 'var(--orange)' }}>100<span style={{ fontSize: 14, color: 'var(--muted)' }}>+</span></div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginTop: 4 }}>{t(lang, '프로젝트 수행', 'Projects Done')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 표시 */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 9, letterSpacing: 4, fontFamily: "'DM Mono', monospace", zIndex: 2, textTransform: 'uppercase' }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--cyan),transparent)', animation: 'sa 2s infinite' }}></div>
          <span>{t(lang, '스크롤', 'Scroll')}</span>
        </div>
      </section>

      {/* ── 사업분야 ── */}
      <div className="outer alt">
        <div className="sec fi" ref={addFiRef}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 56 }}>
            <div>
              <div className="eyebrow">{t(lang, '핵심 사업분야', 'Core Business Areas')}</div>
              <h2 className="stitle">
                <em>{t(lang, '원스톱', 'One-Stop')}</em><br />
                <span>{t(lang, '솔루션 제공', 'Solutions')}</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.9 }}>
                {t(lang,
                  '공장자동화와 연구개발 두 축을 기반으로 고객 맞춤형 솔루션을 제공합니다.',
                  'We deliver customer-tailored solutions built on two pillars: factory automation and R&D.'
                )}
              </p>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', height: 260, border: '1px solid var(--border)' }}>
              <img src={factoryRobot} alt="Robot welding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,var(--panel) 0%,transparent 30%)' }}></div>
            </div>
          </div>
          <div className="str-grid">
            <div className="str-card" onClick={() => onNavigate('biz-factory')}>
              <div className="str-icon">🤖</div>
              <h4>{t(lang, '로봇 용접 자동화', 'Robot Welding')}</h4>
              <p>{t(lang,
                '자동차 차체·샤시 용접 장비의 전기장치 설계·제작·시운전을 일괄 수행합니다.',
                'Full-service electrical design, fabrication and commissioning of automotive body/chassis welding equipment.'
              )}</p>
              <div className="tech-badges">
                <span className="tech-badge">PLC</span>
                <span className="tech-badge">Robot</span>
                <span className="tech-badge">Welding</span>
              </div>
            </div>
            <div className="str-card" onClick={() => onNavigate('biz-factory')}>
              <div className="str-icon">⚙️</div>
              <h4>{t(lang, '도장 / 물류 자동화', 'Paint / Logistics')}</h4>
              <p>{t(lang,
                '도장공정 및 물류 이송·적재공정의 로봇 자동화 시스템을 설계·구축합니다.',
                'Design and build robot automation systems for paint processes and material handling/stacking.'
              )}</p>
              <div className="tech-badges">
                <span className="tech-badge">Conveyor</span>
                <span className="tech-badge">Vision</span>
                <span className="tech-badge">Servo</span>
              </div>
            </div>
            <div className="str-card" onClick={() => onNavigate('biz-rnd')}>
              <div className="str-icon">📊</div>
              <h4>{t(lang, '생산관리 시스템', 'Production MES')}</h4>
              <p>{t(lang,
                '맞춤형 생산현황판 제작, 실시간 모니터링, 장비 이력관리 및 예방보전 시스템을 구축합니다.',
                'Custom production displays, real-time monitoring, equipment history management and preventive maintenance systems.'
              )}</p>
              <div className="tech-badges">
                <span className="tech-badge">MES</span>
                <span className="tech-badge">IoT</span>
                <span className="tech-badge">SCADA</span>
              </div>
            </div>
            <div className="str-card" onClick={() => onNavigate('biz-rnd')}>
              <div className="str-icon">🔬</div>
              <h4>{t(lang, 'R&D / 제품개발', 'R&D / Products')}</h4>
              <p>{t(lang,
                '서보모터 제어 인터페이스, 용접불량 판별 장비 등 자체 연구개발을 수행합니다.',
                'In-house R&D including servo motor control interfaces and weld defect detection equipment.'
              )}</p>
              <div className="tech-badges">
                <span className="tech-badge">Servo</span>
                <span className="tech-badge">MCU</span>
                <span className="tech-badge">Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 제품 ── */}
      <div className="outer">
        <div className="sec fi" ref={addFiRef}>
          <div className="eyebrow">{t(lang, '자체 생산품', 'Our Products')}</div>
          <h2 className="stitle"><em>{t(lang, '자체', 'Our')}</em>{t(lang, ' 생산품', ' Products')}</h2>
          <p className="sdesc">{t(lang, '직접 설계·제작한 산업용 제어 장비입니다.', 'Industrial control equipment designed and manufactured in-house.')}</p>
          <div className="prod-grid">
            <div className="prod-card" onClick={() => onNavigate('prod-beone')}>
              <div className="prod-img">
                <img src={beoneProduct} alt="Be-One" />
                <span className="prod-tag">{t(lang, '서보 인터페이스', 'Servo Interface')}</span>
              </div>
              <div className="prod-body">
                <h3>{t(lang, '비원 (Be-One)', 'Be-One')}</h3>
                <p>{t(lang, 'PLC 이더넷 ↔ 서보앰프 RS232/422 프로토콜 상호 변환 중계 장치.', 'Industrial interface device that converts between PLC Ethernet and servo amplifier RS232/422 protocols.')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t(lang, '하나의 제어기로 다수 서보모터 제어', 'Control multiple servo motors from one controller')}</div>
                  <div className="prod-feat">{t(lang, '산업 현장 실증 완료 (㈜화신 등)', 'Field-proven in production (Hwashin Corp. etc.)')}</div>
                </div>
              </div>
            </div>
            <div className="prod-card" onClick={() => onNavigate('prod-psd')}>
              <div className="prod-img">
                <img src={psd324Installed} alt="PSD5-24" />
                <span className="prod-tag" style={{ background: 'var(--orange)' }}>{t(lang, '생산현황판', 'Production Display')}</span>
              </div>
              <div className="prod-body">
                <h3>{t(lang, '생산현황판 (PSD5-24)', 'Production Display (PSD5-24)')}</h3>
                <p>{t(lang, '실시간 생산데이터 및 생산카운터를 대형 디스플레이에 표시하는 장비.', 'Large-format display showing real-time production data and counters on the factory floor.')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t(lang, '계획 대비 실적 실시간 표시', 'Real-time plan vs. actual production display')}</div>
                  <div className="prod-feat">{t(lang, '인터넷 원격 공장 모니터링', 'Remote factory monitoring via internet')}</div>
                </div>
              </div>
            </div>
            <div className="prod-card" onClick={() => onNavigate('prod-panel')}>
              <div className="prod-img">
                <img src={controlPanel1} alt="Control Panel" />
                <span className="prod-tag">{t(lang, '제어반/동력반', 'Control Panels')}</span>
              </div>
              <div className="prod-body">
                <h3>{t(lang, '제어반 / 동력반 / OP 조작반', 'Control / Power / OP Panels')}</h3>
                <p>{t(lang, '산업 현장 맞춤형 전기 제어 장치 설계·제작·납품·시운전.', 'Custom-designed electrical control equipment: fabrication, delivery and commissioning.')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t(lang, '고객 사양 맞춤 설계', 'Custom design to client specifications')}</div>
                  <div className="prod-feat">{t(lang, '현장 설치 및 시운전 포함', 'On-site installation and commissioning included')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 고객사 ── */}
      <div className="outer alt">
        <div className="sec fi" ref={addFiRef}>
          <div className="eyebrow">{t(lang, '주요 고객사', 'Key Clients')}</div>
          <h2 className="stitle"><span>{t(lang, '신뢰받는 ', 'Trusted by ')}</span><em>{t(lang, '고객사', 'Industry Leaders')}</em></h2>
          <p className="sdesc">{t(lang, '국내 주요 자동차 부품사 및 로봇 제조사와 함께합니다.', "Partnering with Korea's leading automotive parts manufacturers and robotics companies.")}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)' }}>
            {[
              { src: logoHwashin, alt: '㈜화신' },
              { src: logoDonghee, alt: '동희산업㈜' },
              { src: logoHhi, alt: 'HD현대로보틱스' },
              { src: logoYaskawa, alt: '야스카와' },
            ].map(({ src, alt }) => (
              <div key={alt} className="logo-card">
                <div className="logo-wrap">
                  <img className="logo-img" src={src} alt={alt} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button className="btn-o" onClick={() => onNavigate('clients')} style={{ display: 'inline-block' }}>
              {t(lang, '전체 고객사 보기 →', 'View All Clients →')}
            </button>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-banner fi" ref={addFiRef}>
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2>{t(lang, '프로젝트를 함께 시작해보세요', "Let's Start Your Project Together")}</h2>
          <p>{t(lang, '공장자동화·R&D 분야의 어떤 과제든 원스톱으로 해결해 드립니다.', 'Whatever the challenge in factory automation or R&D — we solve it in one stop.')}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '문의하기', 'Contact Us')}</button>
            <a className="btn-s" href="tel:052-296-3734">{t(lang, '052-296-3734 전화', 'Call 052-296-3734')}</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
