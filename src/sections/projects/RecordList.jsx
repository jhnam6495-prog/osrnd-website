// 주요 사업실적 페이지
import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { useTranslation } from '../../hooks/useTranslation'

function RecordList({ onNavigate }) {
  const { lang, t } = useTranslation()
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(true)

  const fallbackYears = [
    {
      year: '2026', color: 'var(--cyan)',
      records: [
        { date: '2026.01', ko: '㈜화신 NX5a 차체라인 설치 및 시운전', en: 'Hwashin NX5a body line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2026.02', ko: '㈜화신 LX3a HEV 차종 설치 및 시운전', en: 'Hwashin LX3a HEV model installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2026.02', ko: '㈜화신 MX5a EREV 차체라인 설치 및 시운전', en: 'Hwashin MX5a EREV body line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2026.02', ko: '㈜화신 NX5a & MX5a EREV 샤시라인 설치 및 시운전', en: 'Hwashin NX5a & MX5a EREV chassis line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
      ],
    },
    {
      year: '2025', color: 'var(--orange)',
      records: [
        { date: '2025.01', ko: '㈜화신 JG1 BPC라인 설치 및 시운전', en: 'Hwashin JG1 BPC line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2025.04', ko: '수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', en: 'Soosung Precision — port cleaner automation parts and cable supply', tag: { ko: '부품공급', en: 'Parts Supply' } },
        { date: '2025.05', ko: '㈜화신 R2 CHASSIS라인 설치 및 시운전', en: 'Hwashin R2 CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2025.07', ko: '㈜화신 P833 CHASSIS라인 설치 및 시운전', en: 'Hwashin P833 CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2025.09', ko: '㈜화신 NQ5a PE HEV라인 설치 및 시운전', en: 'Hwashin NQ5a PE HEV line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
      ],
    },
    {
      year: '2024', color: 'var(--cyan)',
      records: [
        { date: '2024.02', ko: '㈜화신 LX3-CHASSIS라인 설치 및 시운전', en: 'Hwashin LX3-CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2024.04', ko: '수성정밀기계㈜ ABC 부품 및 케이블 공급', en: 'Soosung Precision — automation parts and cable supply', tag: { ko: '부품공급', en: 'Parts Supply' } },
        { date: '2024.07', ko: '㈜화신 LQ2-CHASSIS라인 설치 및 시운전', en: 'Hwashin LQ2-CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2024.10', ko: '㈜화신 JG1 BPC라인 설치 및 시운전', en: 'Hwashin JG1 BPC line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
      ],
    },
    {
      year: '2023', color: 'var(--orange)',
      records: [
        { date: '2023.01', ko: '㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 및 시운전', en: 'Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning', tag: { ko: '용접자동화', en: 'Weld Auto.' } },
        { date: '2023.07', ko: '㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 및 시운전', en: 'Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning', tag: { ko: '해외/용접', en: 'US / Weld' } },
        { date: '2023.09', ko: '㈜화신 TSD-AO1 CHASSIS라인 설치 및 시운전', en: 'Hwashin TSD-AO1 CHASSIS line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2023.10', ko: '㈜화신 Nea-CHASSI라인 설치 및 시운전', en: 'Hwashin Nea-CHASSI line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
      ],
    },
    {
      year: '2022', color: 'var(--cyan)',
      records: [
        { date: '2022.03', ko: '㈜화신 미국법인 NX4a 차종 차체/샤시 설치 및 시운전', en: 'Hwashin US Corp. NX4a body/chassis installation and commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' } },
        { date: '2022.06', ko: '㈜화신 미국법인 J3 차종 샤시 생산라인 설치 및 시운전', en: 'Hwashin US Corp. J3 chassis production line installation and commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' } },
        { date: '2022.09', ko: '㈜화신 MV_ME 차종 샤시 생산라인 설치 및 시운전', en: 'Hwashin MV_ME chassis production line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2022.11', ko: '㈜화신 CN7 PE 차종 샤시 생산라인 설치 및 시운전', en: 'Hwashin CN7 PE chassis production line installation and commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
      ],
    },
    {
      year: '2021', color: 'var(--orange)',
      records: [
        { date: '2021.01', ko: '㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', en: 'Hwashin US Corp. NX4a_DL3 production line commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' } },
        { date: '2021.03', ko: '㈜화신 NE 차종 생산 라인 시운전', en: 'Hwashin NE production line commissioning', tag: { ko: '자동화/시운전', en: 'Auto/Comm.' } },
        { date: '2021.08', ko: '㈜화신 미국법인 VW 차종 라인 시운전', en: 'Hwashin US Corp. VW line commissioning', tag: { ko: '해외/시운전', en: 'US / Comm.' } },
        { date: '2021.11', ko: '㈜화신 미국법인 NQ5a 차종 외 다수', en: 'Hwashin US Corp. NQ5a and multiple other models', tag: { ko: '해외/다수', en: 'US / Multiple' } },
      ],
    },
  ]

  const YEAR_COLORS = ['var(--cyan)', 'var(--orange)', 'var(--cyan)', 'var(--orange)', 'var(--cyan)', 'var(--orange)']

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'records'), orderBy('date', 'asc'))
        const snap = await getDocs(q)
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))

        if (docs.length === 0) {
          // Firestore 비어있을 때만 fallback 사용
          setYears(fallbackYears)
        } else {
          // Firestore 데이터만 사용 (fallback 제거)
          const grouped = {}
          docs.forEach(({ year, date, content_ko, content_en, tag_ko, tag_en }) => {
            if (!grouped[year]) grouped[year] = []
            grouped[year].push({
              date,
              ko: content_ko,
              en: content_en,
              tag: { ko: tag_ko, en: tag_en }
            })
          })

          const result = Object.entries(grouped)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([year, records], i) => ({
              year,
              color: YEAR_COLORS[i % 2],
              records
            }))
          setYears(result)
        }
      } catch (err) {
        console.error('사업실적 불러오기 실패:', err)
        setYears(fallbackYears)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [])

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('records.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('records.title')}</h1>
        <p>{t('records.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 통계 */}
        <div className="stat-grid" style={{ marginBottom: 70 }}>
          <div className="stat-card">
            <div className="stat-num">4<span className="stat-unit">+</span></div>
            <div className="stat-label">{t('records.stat1.label')}</div>
            <div className="stat-note">{t('records.stat1.note')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">29<span className="stat-unit">+</span></div>
            <div className="stat-label">{t('records.stat2.label')}</div>
            <div className="stat-note">{t('records.stat2.note')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: 'var(--orange)', fontSize: 24, paddingTop: 8 }}>{t('records.stat3.val')}</div>
            <div className="stat-label">{t('records.stat3.label')}</div>
            <div className="stat-note">{t('records.stat3.note')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">US</div>
            <div className="stat-label">{t('records.stat4.label')}</div>
            <div className="stat-note">{t('records.stat4.note')}</div>
          </div>
        </div>

        {/* 년도별 실적 */}
        {loading
          ? <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>불러오는 중...</div>
          : years.map(({ year, color, records }, yi) => (
            <div key={year} style={{ marginBottom: yi < years.length - 1 ? 56 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 32, fontWeight: 700, color }}>{year}</div>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--border)' }}>
                {records.map(({ date, ko, en, tag }, i) => (
                  <div key={i} style={{
                    background: 'var(--card)',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 140px',
                    padding: '15px 22px',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color }}>{date}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>{lang === 'ko' ? ko : en}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>
                      {lang === 'ko' ? tag.ko : tag.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div></div>
    </>
  )
}

export default RecordList