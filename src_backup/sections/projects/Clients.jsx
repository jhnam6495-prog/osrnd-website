// 고객사 / 협력사 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'
import logoHwashin from '../../assets/images/logo-hwashin.png'
import logoHwashinPrecision from '../../assets/images/logo-hwashin-precision.png'
import logoSimwon from '../../assets/images/logo-simwon.png'
import logoDonghee from '../../assets/images/logo-donghee.png'
import logoJunghyun from '../../assets/images/logo-junghyun.png'
import logoHhi from '../../assets/images/logo-hhi.png'
import logoYaskawa from '../../assets/images/logo-yaskawa.png'
import logoSoosung from '../../assets/images/logo-soosung.png'

function Clients({ onNavigate }) {
  const { lang } = useLanguage()

  const autoClients = [
    { img: logoHwashin,          nameKo: '㈜화신',      nameEn: 'Hwashin',            catKo: '자동차부품', catEn: 'Auto Parts' },
    { img: logoHwashinPrecision, nameKo: '㈜화신정공',  nameEn: 'Hwashin Precision',  catKo: '자동차부품', catEn: 'Auto Parts' },
    { img: logoSimwon,           nameKo: '심원㈜',       nameEn: 'Simwon',             catKo: '자동차부품', catEn: 'Auto Parts' },
    { img: logoDonghee,          nameKo: '동희산업㈜',  nameEn: 'Donghee Industrial', catKo: '자동차부품', catEn: 'Auto Parts' },
    { img: logoJunghyun,         nameKo: '㈜정현',      nameEn: 'Junghyun',           catKo: '자동차부품', catEn: 'Auto Parts' },
  ]

  const robotClients = [
    { img: logoHhi,     nameKo: 'HD현대로보틱스', nameEn: 'HD Hyundai Robotics', catKo: '로봇 관련', catEn: 'Robotics' },
    { img: logoYaskawa, nameKo: '한국야스카와㈜', nameEn: 'Yaskawa Korea',        catKo: '로봇 관련', catEn: 'Robotics' },
  ]

  const rndClients = [
    { img: logoSoosung, nameKo: '수성정밀기계㈜', nameEn: 'Soosung Precision', catKo: 'R&D 관련', catEn: 'R&D' },
    { img: logoHwashin, nameKo: '㈜화신',          nameEn: 'Hwashin',           catKo: 'R&D 관련', catEn: 'R&D' },
  ]

  const partners = [
    { abbr: '두일', color: 'var(--cyan)', nameKo: '두일계전', nameEn: 'Dooil Electric', typeKo: '제작/설치공사', typeEn: 'Fabrication / Installation', descKo: '전기 제작 및 설치 공사 분야 협력사', descEn: 'Partner for electrical fabrication and installation work' },
    { abbr: 'NS', color: 'var(--orange)', nameKo: 'NS전자', nameEn: 'NS Electronics', typeKo: '연구개발', typeEn: 'R&D', descKo: '연구개발 분야 기술 협력사', descEn: 'Technology partner for R&D activities' },
    { abbr: '동호 · 현창', color: 'var(--cyan)', nameKo: '동호전기상사 · 현창전기산업', nameEn: 'Dongho Electric · Hyunchang', typeKo: '자재', typeEn: 'Materials', descKo: '전기 자재 공급 협력사', descEn: 'Electrical materials supply partners' },
    { abbr: '청운 · LAPP', color: 'var(--orange)', nameKo: '청운전기 · LAPP Korea', nameEn: 'Chungun Electric · LAPP Korea', typeKo: '자재', typeEn: 'Materials', descKo: '케이블 및 자재 공급 협력사', descEn: 'Cable and materials supply partners' },
  ]

  const ClientCard = ({ img, nameKo, nameEn, catKo, catEn }) => (
    <div className="logo-card">
      <div className="logo-wrap">
        <img className="logo-img" src={img} alt={nameKo} />
      </div>
      <p className="logo-name">{t(lang, nameKo, nameEn)}</p>
      <p className="logo-cat">{t(lang, catKo, catEn)}</p>
    </div>
  )

  const SectionHeader = ({ color, labelKo, labelEn }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color, textTransform: 'uppercase' }}>
        {t(lang, labelKo, labelEn)}
      </span>
      <div style={{ flex: 1, height: 1, background: color === 'var(--cyan)' ? 'rgba(0,180,216,0.2)' : 'rgba(245,124,0,0.2)' }}></div>
    </div>
  )

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '고객사 / 협력사', 'Clients & Partners')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '고객사 / 협력사', 'Clients & Partners')}</h1>
        <p>{t(lang, '오에스알앤디㈜와 함께하는 고객사와 협력사입니다.', 'The clients and partners who work with OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 고객사 */}
        <div style={{ marginBottom: 90 }}>
          <div className="eyebrow">Our Clients</div>
          <h2 className="stitle">{t(lang, '고객사', 'Clients')}</h2>

          {/* 자동차 부품 */}
          <div style={{ marginTop: 40, marginBottom: 32 }}>
            <SectionHeader color="var(--cyan)" labelKo="자동차 부품 관련" labelEn="Automotive Parts" />
            <div className="client-grid">
              {autoClients.map(c => <ClientCard key={c.nameKo} {...c} />)}
            </div>
          </div>

          {/* 로봇 관련 */}
          <div style={{ marginBottom: 32 }}>
            <SectionHeader color="var(--orange)" labelKo="로봇 관련" labelEn="Robotics" />
            <div className="client-grid">
              {robotClients.map(c => <ClientCard key={c.nameKo} {...c} />)}
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
            </div>
          </div>

          {/* R&D 관련 */}
          <div>
            <SectionHeader color="var(--cyan)" labelKo="연구개발 관련" labelEn="R&D Related" />
            <div className="client-grid">
              {rndClients.map(c => <ClientCard key={c.nameKo + c.catKo} {...c} />)}
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
              <div style={{ background: 'rgba(22,32,48,0.4)' }}></div>
            </div>
          </div>
        </div>

        {/* 협력사 */}
        <div>
          <div className="eyebrow">Our Partners</div>
          <h2 className="stitle">{t(lang, '협력사', 'Partners')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', marginTop: 40 }}>
            {partners.map(({ abbr, color, nameKo, nameEn, typeKo, typeEn, descKo, descEn }) => (
              <div key={nameKo} style={{ background: 'var(--card)', padding: '36px 24px', textAlign: 'center', borderTop: `2px solid ${color}` }}>
                <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{ width: 72, height: 72, border: `1px solid ${color === 'var(--cyan)' ? 'rgba(0,180,216,0.3)' : 'rgba(245,124,0,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: abbr.length > 4 ? 11 : 14, fontWeight: 700, color }}>{abbr}</span>
                  </div>
                </div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: nameKo.length > 8 ? 15 : 17, fontWeight: 700, color: 'var(--white)', letterSpacing: 1, marginBottom: 6 }}>
                  {t(lang, nameKo, nameEn)}
                </h4>
                <p style={{ fontSize: 10, letterSpacing: 2, color, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 8 }}>{t(lang, typeKo, typeEn)}</p>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7 }}>{t(lang, descKo, descEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </div></div>
    </>
  )
}

export default Clients
