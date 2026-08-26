// 연구개발 (R&D) 페이지
import { useTranslation } from '../../hooks/useTranslation'
import engineer3 from '../../assets/images/engineer-4.png'
import office1 from '../../assets/images/rnd-office-1.png'
import office2 from '../../assets/images/rnd-office-2.png'
import part1 from '../../assets/images/rnd-part-1.png'
import part2 from '../../assets/images/rnd-part-2.png'

function BizRnd({ onNavigate }) {
  const { lang, t } = useTranslation()

  const rndItems = [
    {
      num: '01',
      titleKo: '생산관리 시스템', titleEn: 'Production Management',
      feats: [
        { ko: '고객 맞춤형 생산현황판 제작 및 공급', en: 'Custom production status board fabrication and supply' },
        { ko: '인터넷을 이용한 타지역 공장 생산 모니터링', en: 'Remote factory production monitoring via internet' },
        { ko: '장비 고장 이력 관리 → 예방 및 보전 시스템', en: 'Equipment failure history → preventive maintenance system' },
        { ko: '간이형 재고 및 물류관리 시스템 구축', en: 'Lightweight inventory and logistics management system' },
      ],
      badges: [{ label: 'MES' }, { label: 'IoT' }, { label: 'SCADA' }],
    },
    {
      num: '02',
      titleKo: '서보모터 제어', titleEn: 'Servo Motor Control',
      feats: [
        { ko: '마이크로프로세서를 이용한 PLC↔서보계간 인터페이스 구현', en: 'PLC↔servo interface implementation using microprocessors' },
        { ko: '하나의 제어기로 다수의 서보모터 동시 제어', en: 'Simultaneous control of multiple servo motors from one controller' },
        { ko: 'RS232/422 프로토콜 변환 중계 장치(비원) 자체 개발', en: 'In-house development of RS232/422 protocol converter (Be-One)' },
      ],
      badges: [{ label: 'MCU', orange: true }, { label: 'RS232/422', orange: true }],
    },
    {
      num: '03',
      titleKo: '기타 R&D', titleEn: 'Applied Technology',
      feats: [
        { ko: '용접 전압·전류 감시 → 용접불량 판별 장비 개발', en: 'Weld voltage/current monitoring → weld defect detection equipment' },
        { ko: 'EZScan — 바코드 스캔 네트워크 인터페이스 장치', en: 'EZScan — barcode scan network interface device' },
        { ko: '전등제어 시스템 및 연동 제어기', en: 'Lighting control system and linked controllers' },
      ],
      badges: [{ label: 'Sensor' }, { label: 'Embedded' }],
    },
  ]

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('rnd.bc')}</span>
      </div></div>

      {/* 히어로 이미지 */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img src={engineer3} alt="R&D" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,12,18,0.4),rgba(8,12,18,0.82))' }}></div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Research & Development</div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(28px,4.5vw,54px)', fontWeight: 700, color: '#fff', letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>
            {t('rnd.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>
            {t('rnd.hero.desc')}
          </p>
        </div>
      </div>

      <div className="outer"><div className="sec">
        <div className="vis-grid">
          {rndItems.map(({ num, titleKo, titleEn, feats, badges }) => (
            <div className="vis-card" key={num}>
              <div className="vis-num">{num}</div>
              <h3>{lang === 'ko' ? titleKo : titleEn}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {feats.map(({ ko, en }) => (
                  <div className="prod-feat" key={ko}>{lang === 'ko' ? ko : en}</div>
                ))}
              </div>
              <div className="tech-badges" style={{ marginTop: 16 }}>
                {badges.map(({ label, orange }) => (
                  <span key={label} className="tech-badge" style={orange ? { borderColor: 'rgba(245,124,0,0.4)', color: 'var(--orange)' } : {}}>{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 작업 환경 */}
        <div style={{ marginTop: 70 }}>
          <div className="eyebrow">{t('rnd.env.eyebrow')}</div>
          <h2 className="stitle"><span>{t('rnd.env.t1')}</span><em>{t('rnd.env.t2')}</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '260px 260px', gap: 2, background: 'var(--border)', marginTop: 36 }}>
            <div style={{ overflow: 'hidden' }}>
              <img src={office1} alt="Office" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <img src={office2} alt="Engineer" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <img src={part1} alt="Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              < img src={part2} alt="Meeting" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
          </div>
        </div>
      </div></div >
    </>
  )
}

export default BizRnd
