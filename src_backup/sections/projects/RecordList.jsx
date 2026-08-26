// 주요 사업실적 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

function RecordList({ onNavigate }) {
  const { lang } = useLanguage()

  const years = [
    {
      year: '2024', color: 'var(--cyan)',
      records: [
        { date: '2024.02', ko: '㈜화신 LX3-CHASSIS라인 설치 공사 및 시운전', en: 'Hwashin LX3-CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: true },
        { date: '2024.04', ko: '수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', en: 'Soosung Precision — automation parts and cable supply', tag: { ko: '부품공급', en: 'Parts Supply' }, highlight: false },
        { date: '2024.07', ko: '㈜화신 LQ2-CHASSIS라인 설치 공사 및 시운전', en: 'Hwashin LQ2-CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: true },
        { date: '2024.10', ko: '㈜화신 JG1 BPC라인 설치 공사 및 시운전', en: 'Hwashin JG1 BPC line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: true },
      ],
    },
    {
      year: '2023', color: 'var(--orange)',
      records: [
        { date: '2023.01', ko: '㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 공사 및 시운전', en: 'Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning', tag: { ko: '용접자동화', en: 'Weld Auto.' }, highlight: false },
        { date: '2023.07', ko: '㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 공사 및 시운전', en: 'Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning', tag: { ko: '해외/용접', en: 'US / Weld' }, highlight: false },
        { date: '2023.09', ko: '㈜화신 TSD-AO1 CHASSIS라인 설치 공사 및 시운전', en: 'Hwashin TSD-AO1 CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: false },
        { date: '2023.10', ko: '㈜화신 Nea-CHASSI라인 설치 공사 및 시운전', en: 'Hwashin Nea-CHASSI line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: false },
      ],
    },
    {
      year: '2022', color: 'var(--cyan)',
      records: [
        { date: '2022.03', ko: '㈜화신 미국법인 NX4a 차종 차체/샤시 설치 공사 및 시운전', en: 'Hwashin US Corp. NX4a body/chassis installation and commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' }, highlight: false },
        { date: '2022.06', ko: '㈜화신 미국법인 J3 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Hwashin US Corp. J3 chassis production line installation and commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' }, highlight: false },
        { date: '2022.09', ko: '㈜화신 MV_ME 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Hwashin MV_ME chassis production line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: false },
        { date: '2022.11', ko: '㈜화신 CN7 PE 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Hwashin CN7 PE chassis production line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: false },
      ],
    },
    {
      year: '2021', color: 'var(--orange)',
      records: [
        { date: '2021.01', ko: '㈜화신 미국법인 NX4a_DL3 차종 생산 라인 공사/시운전', en: 'Hwashin US Corp. NX4a_DL3 production line construction/commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' }, highlight: false },
        { date: '2021.03', ko: '㈜화신 NE 차종 생산 라인 공사 및 시운전', en: 'Hwashin NE production line construction and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' }, highlight: false },
        { date: '2021.08', ko: '㈜화신 미국법인 VW 차종 공사 및 시운전', en: 'Hwashin US Corp. VW construction and commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' }, highlight: false },
        { date: '2021.11', ko: '㈜화신 미국법인 NQ5a 차종 외 다수', en: 'Hwashin US Corp. NQ5a and multiple other models', tag: { ko: '해외/다수', en: 'US / Multiple' }, highlight: false },
      ],
    },
  ]

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '주요 사업실적', 'Project Records')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '주요 사업실적', 'Project Records')}</h1>
        <p>{t(lang, '오에스알앤디㈜의 주요 사업 수행 실적입니다.', 'Major project records of OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 통계 */}
        <div className="stat-grid" style={{ marginBottom: 70 }}>
          <div className="stat-card">
            <div className="stat-num">4<span className="stat-unit">+</span></div>
            <div className="stat-label">{t(lang, '연간 실적 기간', 'Years of Projects')}</div>
            <div className="stat-note">{t(lang, '2021~2024년 주요 실적', 'Key projects 2021~2024')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">20<span className="stat-unit">+</span></div>
            <div className="stat-label">{t(lang, '연간 프로젝트', 'Projects / Year')}</div>
            <div className="stat-note">{t(lang, '연간 주요 프로젝트 수', 'Major projects per year')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: 'var(--orange)', fontSize: 24, paddingTop: 8 }}>{t(lang, '㈜화신', 'Hwashin')}</div>
            <div className="stat-label">{t(lang, '핵심 고객사', 'Key Client')}</div>
            <div className="stat-note">{t(lang, '자동차 부품 분야 주요 고객', 'Leading automotive parts client')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{t(lang, 'US', 'US')}</div>
            <div className="stat-label">{t(lang, '글로벌 프로젝트', 'Global Projects')}</div>
            <div className="stat-note">{t(lang, '미국 현지 법인 시운전 수행', 'Commissioning at US corporation sites')}</div>
          </div>
        </div>

        {/* 년도별 실적 */}
        {years.map(({ year, color, records }, yi) => (
          <div key={year} style={{ marginBottom: yi < years.length - 1 ? 56 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 32, fontWeight: 700, color }}>{year}</div>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--border)' }}>
              {records.map(({ date, ko, en, tag, highlight }) => (
                <div key={date} style={{
                  background: 'var(--card)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 140px',
                  padding: '15px 22px',
                  alignItems: 'center',
                  borderLeft: highlight ? `2px solid ${color}` : 'none',
                }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color }}>{date}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{t(lang, ko, en)}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{t(lang, tag.ko, tag.en)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div></div>
    </>
  )
}

export default RecordList
