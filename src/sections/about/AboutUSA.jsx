// 미국법인 페이지
import { useTranslation } from '../../hooks/useTranslation'

function AboutUSA({ onNavigate }) {
  const { lang, t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('usa.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('usa.title')}</h1>
        <p>{t('usa.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec">

        {/* 회사 개요 */}
        <div style={{ marginBottom: 80 }}>
          <div className="eyebrow">Company Overview</div>
          <h2 className="stitle">
            <em>OSRND USA, INC</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginTop: 40 }}>
            <div>
              <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 24, marginBottom: 28 }}>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 2, fontWeight: 500 }}>
                  {lang === 'ko'
                    ? 'OSRND USA, INC는 미국 내 한국 고객사를 위한 기술 지원 및 솔루션 제공을 위해 설립된 OSRnD의 미국 법인입니다.'
                    : 'OSRND USA, INC is the U.S. subsidiary of OSRnD, established to provide technical support and solutions for Korean clients operating in the United States.'}
                </p>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>
                {lang === 'ko'
                  ? '고객의 현지 운영 니즈에 맞춘 전문적이고 유연한 기술 서비스를 제공하며, 설립 후 3년 내 기술 인력 완전 현지화를 목표로 합니다.'
                  : 'We deliver specialized and flexible technical services tailored to local operational needs, with a goal of full localization of technical personnel within 3 years of establishment.'}
              </p>
            </div>

            {/* 프로필 테이블 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 22px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>
                  Company Profile
                </p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[
                  [lang === 'ko' ? '법인명' : 'Company', 'OSRND USA, INC'],
                  [lang === 'ko' ? '설립일' : 'Founded', lang === 'ko' ? '2025년 7월 28일' : 'July 28, 2025'],
                  [lang === 'ko' ? '소재지' : 'Address', '1022 Hillcrest Pkwy, Dublin, GA 31021, USA'],
                  [lang === 'ko' ? '사업목적' : 'Purpose', lang === 'ko' ? '기술지원 및 솔루션 제공' : 'Technical Support & Solutions'],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '13px 20px', background: 'rgba(0,180,216,0.05)', fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 110 }}>{label}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>

        {/* 5개년 사업 실행계획 */}
        <div style={{ marginBottom: 80 }}>
          <div className="eyebrow">5-Year Business Plan</div>
          <h2 className="stitle">
            {lang === 'ko' ? <><span>5개년</span> <em>사업 실행계획</em></> : <><span>5-Year</span> <em>Business Roadmap</em></>}
          </h2>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--border)' }}>
            {[
              {
                year: '2025',
                goal: lang === 'ko' ? '법인 설립 및 초기 셋업' : 'Establishment & Initial Setup',
                actions: lang === 'ko' ? '법인등록, 사무실 임대, 직원 고용 준비, 초기 영업 준비' : 'Company registration, office lease, hiring preparation, initial sales setup',
                color: 'var(--cyan)',
              },
              {
                year: '2026',
                goal: lang === 'ko' ? '기술인력 현지화' : 'Technical Staff Localization',
                actions: lang === 'ko' ? '현지 엔지니어 채용 및 교육' : 'Local engineer recruitment and training',
                color: 'var(--cyan)',
              },
              {
                year: '2027',
                goal: lang === 'ko' ? '인력 현지화 가속 / 서비스 다각화 준비' : 'Accelerate Localization / Service Diversification',
                actions: lang === 'ko' ? '지속적 현지 채용, 현지 시장 조사' : 'Continued local hiring, local market research',
                color: 'var(--cyan)',
              },
              {
                year: '2028',
                goal: lang === 'ko' ? '현지 파트너십 확대' : 'Expand Local Partnerships',
                actions: lang === 'ko' ? '업무협약 및 파트너 계약 체결' : 'MOU and partner contract agreements',
                color: 'var(--orange)',
              },
              {
                year: '2029',
                goal: lang === 'ko' ? '수익 모델 확장' : 'Revenue Model Expansion',
                actions: lang === 'ko' ? '서비스 고도화, 사업 분야 확대' : 'Service advancement, business area expansion',
                color: 'var(--orange)',
              },
            ].map(({ year, goal, actions, color }) => (
              <div key={year} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 2fr', background: 'var(--card)', gap: 0 }}>
                <div style={{ padding: '20px 24px', borderTop: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 18, fontWeight: 700, color }}>{year}</span>
                </div>
                <div style={{ padding: '20px 24px', borderLeft: '1px solid var(--border)', borderTop: `2px solid ${color}` }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{goal}</p>
                </div>
                <div style={{ padding: '20px 24px', borderLeft: '1px solid var(--border)', borderTop: `2px solid ${color}` }}>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8 }}>{actions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 조직도 */}
        <div>
          <div className="eyebrow">Organization</div>
          <h2 className="stitle">
            {lang === 'ko' ? <><span>조직도</span> <em>(예상)</em></> : <><span>Organizational</span> <em>Structure</em></>}
          </h2>
          <div style={{ marginTop: 40, background: 'var(--panel)', padding: '50px 40px', border: '1px solid var(--border)', overflowX: 'auto' }}>

            {/* Country Director */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
              {[
                { title: 'Country Director', sub: lang === 'ko' ? '(주재원)' : '(Dispatched Employee)', color: 'var(--cyan)' },
                { title: 'Secretary', sub: lang === 'ko' ? '(현지 채용)' : '(Locally Hired Staff)', color: 'var(--cyan)' },
              ].map(({ title, sub, color }) => (
                <div key={title} style={{ background: 'var(--card)', padding: '14px 32px', borderTop: `2px solid ${color}`, textAlign: 'center', minWidth: 180 }}>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, color, letterSpacing: 1 }}>{title}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{sub}</p>
                </div>
              ))}
            </div>
            <div className="org-line" style={{ height: 28 }}></div>

            {/* 4개 부서 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)', marginBottom: 2 }}>
              {[
                { title: 'Corporate Training Division', color: 'var(--cyan)' },
                { title: 'Alabama Site', color: 'var(--orange)' },
                { title: 'Georgia Site', color: 'var(--orange)' },
                { title: 'In-house Product Team', color: '#9c27b0', textColor: '#ce93d8' },
              ].map(({ title, color, textColor }) => (
                <div key={title} style={{ background: 'var(--card)', padding: '16px 14px', textAlign: 'center', borderTop: `2px solid ${color}` }}>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: textColor || color, letterSpacing: 1 }}>{title}</p>
                </div>
              ))}
            </div>

            {/* 하위 조직 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)' }}>
              {[
                { role: 'Technical Training Representative', sub: '', color: 'var(--cyan)' },
                { role: 'General Manager', sub: lang === 'ko' ? '(현지 채용)' : '(Hiring Local Talent)', color: 'var(--orange)' },
                { role: 'General Manager', sub: lang === 'ko' ? '(현지 채용)' : '(Hiring Local Talent)', color: 'var(--orange)' },
                { role: 'General Manager', sub: lang === 'ko' ? '(현지 채용)' : '(Hiring Local Talent)', color: '#ce93d8' },
              ].map(({ role, sub, color }, i) => (
                <div key={i} style={{ background: 'rgba(22,32,48,0.8)', padding: '16px 14px', textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{role}</p>
                  {sub && <p style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</p>}
                </div>
              ))}
            </div>

            {/* 비고 */}
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(0,180,216,0.04)', border: '1px solid rgba(0,180,216,0.12)' }}>
              {[
                lang === 'ko' ? '초기 단계에서 영업은 Country Director가 총괄합니다.' : 'During the early stage, sales will be overseen by the Country Director.',
                lang === 'ko' ? '현지 직원 교육은 Technical Training Representative가 담당합니다.' : 'Training of local employees will be handled by the Technical Training Representative.',
                lang === 'ko' ? '교육은 기초부터 심화 단계로 순차적으로 진행됩니다.' : 'Education will be delivered in stages, from basic to advanced levels.',
                lang === 'ko' ? '조직 구성은 Alabama Site → Georgia Site → In-house Product Team 순으로 단계적으로 진행됩니다.' : 'Organizational formation: Alabama Site (Year 1) → Georgia Site (Year 2) → In-house Product Team.',
              ].map((note, i) => (
                <p key={i} style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>
                  {i + 1}. {note}
                </p>
              ))}
            </div>
          </div>
        </div>

      </div></div>
    </>
  )
}

export default AboutUSA