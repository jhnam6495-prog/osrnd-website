// 조직도 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

function AboutOrg({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t(lang, '회사소개', 'About')}</a> ›
        <span>{t(lang, '조직도', 'Organization')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '조직도', 'Organization Chart')}</h1>
        <p>{t(lang, '오에스알앤디㈜의 조직 구성 (2025년 8월 기준)', 'OSRnD organizational structure (as of August 2025)')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ background: 'var(--panel)', padding: '60px 40px', border: '1px solid var(--border)', overflowX: 'auto' }}>
          {/* 부사장 */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ display: 'inline-block', padding: '14px 48px', background: 'linear-gradient(135deg,var(--blue),var(--blue-l))', border: '1px solid var(--cyan)', fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase' }}>
              {t(lang, '부사장 / 박동근 부사장', 'Executive VP / Park Dong-geun')}
            </div>
          </div>
          <div className="org-line" style={{ height: 28 }}></div>

          {/* 4개 부서 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)', marginBottom: 2 }}>
            {[
              { color: 'var(--cyan)', labelKo: '엔지니어링부', labelEn: 'Engineering Dept.', headKo: '(총괄) 박동근', headEn: 'Head: Park Dong-geun' },
              { color: 'var(--orange)', labelKo: '연구개발부', labelEn: 'R&D Dept.', headKo: '(총괄) 권오수', headEn: 'Head: Kwon Ohsoo' },
              { color: '#9c27b0', textColor: '#ce93d8', labelKo: '기술영업부', labelEn: 'Technical Sales', headKo: '(총괄) 박동근', headEn: 'Head: Park Dong-geun' },
              { color: 'var(--cyan)', labelKo: '영업/업무지원', labelEn: 'Sales Support', headKo: '이지홍 경리', headEn: 'Lee Ji-hong' },
            ].map(({ color, textColor, labelKo, labelEn, headKo, headEn }) => (
              <div key={labelKo} style={{ background: 'var(--card)', padding: '18px 14px', textAlign: 'center', borderTop: `2px solid ${color}` }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, color: textColor || color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  {t(lang, labelKo, labelEn)}
                </p>
                <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                  {t(lang, headKo, headEn)}
                </p>
              </div>
            ))}
          </div>

          {/* 팀 세부 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2, background: 'var(--border)' }}>
            {/* 엔지니어링 1팀 */}
            <div style={{ background: 'rgba(22,32,48,0.8)', padding: '18px 16px' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", marginBottom: 10, textTransform: 'uppercase' }}>
                {t(lang, '엔지니어링 1팀', 'Engineering Team 1')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                {[
                  [t(lang, '김상종 부장 (시운전팀장)', 'Kim Sang-jong (Commissioning Lead)')],
                  [t(lang, '우인섭 차장', 'Woo In-seop')],
                  [t(lang, '라 염 과장', 'Ra Yeom')],
                  [t(lang, '문정원 대리', 'Moon Jeong-won')],
                  [t(lang, '김기재 대리', 'Kim Gi-jae')],
                ].map(([name]) => <p key={name}>{name}</p>)}
              </div>
            </div>

            {/* 엔지니어링 2팀 */}
            <div style={{ background: 'rgba(22,32,48,0.8)', padding: '18px 16px' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", marginBottom: 10, textTransform: 'uppercase' }}>
                {t(lang, '엔지니어링 2팀', 'Engineering Team 2')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                {[
                  t(lang, '이성구 대리', 'Lee Seong-gu'),
                  t(lang, '한지형 사원', 'Han Ji-hyeong'),
                  t(lang, '김도원 사원', 'Kim Do-won'),
                  t(lang, '한성민 사원', 'Han Seong-min'),
                  t(lang, '김정미 사원', 'Kim Jeong-mi'),
                  t(lang, '전윤석 사원', 'Jeon Yun-seok'),
                ].map(name => <p key={name}>{name}</p>)}
              </div>
            </div>

            {/* 연구개발부 */}
            <div style={{ background: 'rgba(22,32,48,0.8)', padding: '18px 16px' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--orange)', fontFamily: "'DM Mono', monospace", marginBottom: 10, textTransform: 'uppercase' }}>
                {t(lang, '연구개발부', 'R&D Department')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                {[
                  t(lang, '성락일 부장', 'Seong Nak-il'),
                  t(lang, '오한재 대리', 'Oh Han-jae'),
                  t(lang, '김재민 사원', 'Kim Jae-min'),
                ].map(name => <p key={name}>{name}</p>)}
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 10, letterSpacing: 1, color: 'var(--orange)', fontFamily: "'DM Mono', monospace", marginBottom: 6, textTransform: 'uppercase' }}>
                  {t(lang, '협력업체', 'Partners')}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t(lang, '두일계전 — 김영민, 이길용 부장', 'Dooil Electric — Kim, Lee')}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t(lang, 'DY시스템 — 정명근 사장', 'DY Systems — Jeong Myeong-geun')}</p>
              </div>
            </div>

            {/* 인원 현황 */}
            <div style={{ background: 'rgba(0,180,216,0.06)', padding: '18px 16px', border: '1px solid rgba(0,180,216,0.15)' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", marginBottom: 14, textTransform: 'uppercase' }}>
                {t(lang, '인원 현황', 'Headcount')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  [t(lang, '경영진', 'Management'), '2', 'var(--cyan)'],
                  [t(lang, '연구개발부', 'R&D'), '3', 'var(--orange)'],
                  [t(lang, '엔지니어링부', 'Engineering'), '10', 'var(--cyan)'],
                  [t(lang, '영업부', 'Sales'), '1', 'var(--cyan)'],
                ].map(([label, count, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color }}>{count}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: 'var(--border)' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{t(lang, '총 인원', 'Total')}</span>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 18, color: 'var(--cyan)', fontWeight: 700 }}>16</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{t(lang, '협력사', 'Partners')}</span>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: 'var(--orange)' }}>+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default AboutOrg
