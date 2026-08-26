// 회사 연혁 페이지
import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { useTranslation } from '../../hooks/useTranslation'

function AboutHistory({ onNavigate }) {
  const { lang, t } = useTranslation()
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)

  // 하드코딩 데이터 (Firestore가 비어있을 때 폴백)
  const fallbackData = [
    {
      year: '2026',
      events: [
        { ko: '현재 운영 중 — 국내외 자동차 부품사 대상 공장자동화 프로젝트 수행', en: 'Ongoing — factory automation projects for domestic and international automotive parts manufacturers' },
        { ko: '임직원 16명 + 협력사 3명 (2026년 3월 기준)', en: '16 staff + 3 partner personnel (as of March 2026)' },
        { ko: '02월 06일 — ISO 9001/14001/45001 인증', en: 'Feb 6 — ISO 9001/14001/45001 certification' },
        { ko: '03월 18일 — 부설연구전담부서 설립 인정', en: 'Mar 18 — Accreditation of in-house dedicated research department' },
      ]
    },
    {
      year: '2025',
      events: [
        { ko: '07월 28일 — 미국법인(OSRND USA, INC) 설립', en: 'Jul 28 — U.S. subsidiary established' },
        { ko: '사업장: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA', en: 'Location: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA' },
      ]
    },
    {
      year: '2024',
      events: [
        { ko: '02월 — ㈜화신 LX3-CHASSIS라인 설치 공사 및 시운전', en: 'Feb — Hwashin LX3-CHASSIS line installation and commissioning' },
        { ko: '04월 — 수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', en: 'Apr — Automation parts and cable supply to Soosung Precision Machinery' },
        { ko: '07월 — ㈜화신 LQ2-CHASSIS라인 설치 공사 및 시운전', en: 'Jul — Hwashin LQ2-CHASSIS line installation and commissioning' },
        { ko: '10월 — ㈜화신 JG1 BPC라인 설치 공사 및 시운전', en: 'Oct — Hwashin JG1 BPC line installation and commissioning' },
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
        { ko: '01월 — ㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', en: 'Jan — Hwashin US Corp. NX4a_DL3 production line commissioning' },
        { ko: '03월 — ㈜화신 NE 차종 생산 라인 시운전', en: 'Mar — Hwashin NE production line commissioning' },
        { ko: '08월 — ㈜화신 미국법인 VW 차종 라인 시운전', en: 'Aug — Hwashin US Corp. VW line commissioning' },
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
    {
      year: '2007',
      events: [
        { ko: '06월 09일 — 울산 북구 효문동 812-1번지로 사업장 이전', en: 'Jun 9 — Relocated to 812-1, Hyomun-dong, Buk-gu, Ulsan' },
      ]
    },
    {
      year: '2004',
      events: [
        { ko: '01월 03일 — OSRnD로 회사명 변경 (대표: 권오수)', en: 'Jan 3 — Company renamed to OSRnD (CEO: Kwon Oh-soo)' },
        { ko: '사업장: 울산 중구 학성동 427-3번지', en: 'Location: 427-3, Hakseong-dong, Jung-gu, Ulsan' },
      ]
    },
    {
      year: '2001',
      events: [
        { ko: '07월 01일 — e-kos 설립 (대표: 권오수)', en: 'Jul 1 — e-kos founded (CEO: Kwon Oh-soo)' },
        { ko: '사업장: 울산 북구 화봉동 884-12번지', en: 'Location: 884-12, Hwabong-dong, Buk-gu, Ulsan' },
      ]
    },
  ]

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'history'), orderBy('year', 'desc'))
        const snap = await getDocs(q)
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))

        if (docs.length === 0) {
          // Firestore 비어있을 때만 fallback 사용
          setHistoryData(fallbackData)
        } else {
          // Firestore 데이터만 사용 (fallback 제거)
          const grouped = {}
          docs.forEach(({ year, content_ko, content_en }) => {
            const y = year.toString().slice(0, 4)
            if (!grouped[y]) grouped[y] = []
            grouped[y].push({ ko: content_ko, en: content_en })
          })

          const result = Object.entries(grouped)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([year, events]) => ({ year, events }))
          setHistoryData(result)
        }
      } catch (err) {
        console.error('연혁 불러오기 실패:', err)
        setHistoryData(fallbackData)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('history.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('history.title')}</h1>
        <p>{t('history.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec"><div style={{ maxWidth: 780, margin: '0 auto' }}>
        {loading
          ? <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>불러오는 중...</div>
          : <div className="hist-wrap">
            {historyData.map(({ year, events }) => (
              <div className="hist-item" key={year}>
                <div className="hist-year">{year.toString().slice(0, 4)}</div>
                <div className="hist-events">
                  {events.map((ev, i) => (
                    <div className="hist-ev" key={i}>{lang === 'ko' ? ev.ko : ev.en}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      </div></div></div>
    </>
  )
}

export default AboutHistory