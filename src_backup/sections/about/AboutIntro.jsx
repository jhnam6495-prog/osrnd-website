// 회사 개요 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

function AboutIntro({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '회사 개요', 'Company Overview')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '회사 개요', 'Company Overview')}</h1>
        <p>{t(lang, '오에스알앤디㈜ — One-Stop Research and Development', 'OSRnD Co., Ltd — One-Stop Research and Development')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">About OSRnD</div>
            <h2 className="stitle">
              <span>{t(lang, '믿음과 신뢰의 ', '22 Years of ')}</span>
              <em>{t(lang, '22년', 'Trust & Innovation')}</em>
            </h2>
            <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 24, margin: '28px 0' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 2, fontWeight: 500 }}
                dangerouslySetInnerHTML={{
                  __html: t(lang,
                    '고객을 먼저 생각하고, 긍정적인 생각을 가진 오에스알앤디㈜.<br>열정을 가진 오에스알앤디㈜는 항상 고객과 함께 합니다.',
                    'OSRnD always puts customers first with a positive mindset.<br>With passion, OSRnD is always with its customers.'
                  )
                }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 2, marginBottom: 28 }}>
              {t(lang,
                '오에스알앤디㈜는 2014년 설립 이래 공장자동화 및 연구개발 분야에서 고객의 생산성 향상과 기술 혁신을 위해 최선을 다하고 있습니다. 로봇 자동화, PLC 제어, 생산관리시스템, 자체 제품 개발까지 원스톱으로 제공합니다.',
                'Since its founding in 2014, OSRnD has been dedicated to improving customer productivity and driving technological innovation in factory automation and R&D. We provide one-stop services from robot automation and PLC control to production management systems and proprietary product development.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <button className="btn-p" onClick={() => onNavigate('biz-factory')}>{t(lang, '사업분야 보기', 'Our Business')}</button>
              <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t(lang, '문의하기', 'Contact Us')}</button>
            </div>
          </div>

          {/* 회사 프로필 테이블 */}
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>
                {t(lang, '회사 프로필', 'Company Profile')}
              </p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {[
                [t(lang, '회사명', 'Company'), t(lang, '오에스알앤디㈜ / OSRnD Co., Ltd', 'OSRnD Co., Ltd (오에스알앤디㈜)')],
                [t(lang, '대표이사', 'CEO'), t(lang, '권오수 (Kwon Ohsoo)', 'Kwon Ohsoo (권오수)')],
                [t(lang, '설립일', 'Founded'), '2014년 01월 01일 / January 1, 2014'],
                [t(lang, '사업자번호', 'Reg. No.'), '620-81-51336'],
                [t(lang, '자본금', 'Capital'), t(lang, '1억원 (100,000,000원)', 'KRW 100,000,000')],
                [t(lang, '연매출', 'Revenue'), t(lang, '35억원 (2024년 기준)', 'KRW 3.5 Billion (FY2024)')],
                [t(lang, '임직원', 'Staff'), t(lang, '16명 + 협력사 3명', '16 staff + 3 partner personnel')],
                [t(lang, '소재지', 'Address'), t(lang, '울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)', '821, Sansung-ro 40, Buk-gu, Ulsan, Korea (UKIC)')],
              ].map(([label, value], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '13px 20px', background: 'rgba(0,180,216,0.05)', fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 110 }}>{label}</td>
                  <td style={{ padding: '13px 20px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>

        {/* 핵심 가치 */}
        <div style={{ marginTop: 80 }}>
          <div className="eyebrow">{t(lang, '핵심 가치', 'Core Values')}</div>
          <h2 className="stitle">{t(lang, '우리의 ', 'Our ')}<em>{t(lang, '약속', 'Promise')}</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginTop: 30 }}>
          {[
            { en: 'After You', ko: '고객 우선', enTitle: 'Customer First', desc: t(lang, '고객을 먼저 생각합니다. 언제나 고객의 입장에서 최선의 솔루션을 찾겠습니다.', 'We always put customers first, finding the best solutions from their perspective.'), color: 'var(--cyan)' },
            { en: 'Positive Thinking', ko: '긍정적 사고', enTitle: 'Positive Mindset', desc: t(lang, '어떤 상황에서도 긍정적인 자세로 도전합니다. 불가능은 없습니다.', 'We face any challenge with a positive attitude. Nothing is impossible.'), color: 'var(--orange)' },
            { en: 'Passion', ko: '열정', enTitle: 'Passion', desc: t(lang, '일에 대한 열정으로 최고의 결과를 만들어냅니다. 끝까지 최선을 다합니다.', 'We bring passion to our work and deliver outstanding results. We give our best until the end.'), color: 'var(--cyan)' },
          ].map(({ en, ko, enTitle, desc, color }) => (
            <div key={en} style={{ background: 'var(--card)', padding: '40px 32px', borderTop: `2px solid ${color}` }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, color, letterSpacing: 3, marginBottom: 14 }}>{en}</div>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, color: 'var(--white)', marginBottom: 12, textTransform: 'uppercase' }}>
                {t(lang, ko, enTitle)}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div></div>
    </>
  )
}

export default AboutIntro
