// 회사 연혁 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

const historyData = [
  {
    year: '2025',
    events: [
      { ko: '현재 운영 중 — 국내외 자동차 부품사 대상 공장자동화 프로젝트 수행', en: 'Ongoing — factory automation projects for domestic and international automotive parts manufacturers' },
      { ko: '임직원 16명 + 협력사 3명 (2025년 8월 기준)', en: '16 staff + 3 partner personnel (as of August 2025)' },
    ]
  },
  {
    year: '2024',
    events: [
      { ko: '02월 — ㈜화신 LX3-CHASSIS라인 설치 공사 및 시운전', en: 'Feb — Hwashin LX3-CHASSIS line installation and commissioning' },
      { ko: '04월 — 수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', en: 'Apr — Automation parts and cable supply to Soosung Precision Machinery' },
      { ko: '07월 — ㈜화신 LQ2-CHASSIS라인 설치 공사 및 시운전', en: 'Jul — Hwashin LQ2-CHASSIS line installation and commissioning' },
      { ko: '10월 — ㈜화신 JG1 BPC라인 설치 공사 및 시운전', en: 'Oct — Hwashin JG1 BPC line installation and commissioning' },
      { ko: '연매출 35억원 달성', en: 'Annual revenue of KRW 3.5 Billion achieved' },
    ]
  },
  {
    year: '2023',
    events: [
      { ko: '01월 — ㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 공사 및 시운전', en: 'Jan — Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning' },
      { ko: '07월 — ㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 공사 및 시운전', en: 'Jul — Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning' },
      { ko: '09월 — ㈜화신 TSD-AO1 CHASSIS라인 설치 공사 및 시운전', en: 'Sep — Hwashin TSD-AO1 CHASSIS line installation and commissioning' },
      { ko: '10월 — ㈜화신 Nea-CHASSI라인 설치 공사 및 시운전', en: 'Oct — Hwashin Nea-CHASSI line installation and commissioning' },
    ]
  },
  {
    year: '2022',
    events: [
      { ko: '03월 — ㈜화신 미국법인 NX4a 차종 차체/샤시 설치 공사 및 시운전', en: 'Mar — Hwashin US Corp. NX4a body/chassis installation and commissioning' },
      { ko: '06월 — ㈜화신 미국법인 J3 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Jun — Hwashin US Corp. J3 chassis production line installation and commissioning' },
      { ko: '09월 — ㈜화신 MV_ME 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Sep — Hwashin MV_ME chassis production line installation and commissioning' },
      { ko: '11월 — ㈜화신 CN7 PE 차종 샤시 생산라인 설치 공사 및 시운전', en: 'Nov — Hwashin CN7 PE chassis production line installation and commissioning' },
    ]
  },
  {
    year: '2021',
    events: [
      { ko: '01월 — ㈜화신 미국법인 NX4a_DL3 차종 생산 라인 공사/시운전', en: 'Jan — Hwashin US Corp. NX4a_DL3 production line construction/commissioning' },
      { ko: '03월 — ㈜화신 NE 차종 생산 라인 공사 및 시운전', en: 'Mar — Hwashin NE production line construction and commissioning' },
      { ko: '08월 — ㈜화신 미국법인 VW 차종 공사 및 시운전', en: 'Aug — Hwashin US Corp. VW construction and commissioning' },
      { ko: '11월 — ㈜화신 미국법인 NQ5a 차종 외 다수', en: 'Nov — Hwashin US Corp. NQ5a and multiple other projects' },
    ]
  },
  {
    year: '2014',
    events: [
      { ko: '01월 01일 — 오에스알앤디㈜ 설립', en: 'January 1 — OSRnD Co., Ltd. founded' },
      { ko: '울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)', en: 'Location: 821, Sansung-ro 40, Buk-gu, Ulsan (UKIC)' },
      { ko: '공장자동화 및 연구개발 사업 개시', en: 'Factory automation and R&D business commenced' },
    ]
  },
]

function AboutHistory({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t(lang, '회사소개', 'About')}</a> ›
        <span>{t(lang, '회사 연혁', 'History')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '회사 연혁', 'Company History')}</h1>
        <p>{t(lang, '오에스알앤디㈜의 발전 역사입니다.', 'The milestones of OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec"><div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div className="hist-wrap">
          {historyData.map(({ year, events }) => (
            <div className="hist-item" key={year}>
              <div className="hist-year">{year}</div>
              <div className="hist-events">
                {events.map((ev, i) => (
                  <div className="hist-ev" key={i}>{t(lang, ev.ko, ev.en)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div></div></div>
    </>
  )
}

export default AboutHistory
