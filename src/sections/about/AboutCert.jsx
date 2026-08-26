// 인증현황 페이지
import { useTranslation } from '../../hooks/useTranslation'
import certBizKo from '../../assets/images/cert-business-ko.png'
import certBizEn from '../../assets/images/cert-business-en.png'
import certRndKo from '../../assets/images/cert-rnd-ko.png'
import certRndEn from '../../assets/images/cert-rnd-en.png'
import certIso9001Ko from '../../assets/images/cert-iso9001-ko.png'
import certIso9001En from '../../assets/images/cert-iso9001-en.png'
import certIso14001Ko from '../../assets/images/cert-iso14001-ko.png'
import certIso14001En from '../../assets/images/cert-iso14001-en.png'
import certIso45001Ko from '../../assets/images/cert-iso45001-ko.png'
import certIso45001En from '../../assets/images/cert-iso45001-en.png'
import certPatent1Ko from '../../assets/images/cert-patent1-ko.png'
import certPatent1En from '../../assets/images/cert-patent1-en.png'

function CertCard({ accentColor, badge, title, imgKo, imgEn, lang, details, desc }) {
  const imgSrc = lang === 'ko' ? imgKo : imgEn
  return (
    <div style={{ background: 'var(--card)', padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accentColor},transparent)` }}></div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0, width: 'min(180px, 100%)', border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden' }}>
          <img src={imgSrc} alt={title} style={{ width: '100%', display: 'block' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: `rgba(${accentColor === 'var(--cyan)' ? '0,180,216' : '245,124,0'},0.1)`, border: `1px solid rgba(${accentColor === 'var(--cyan)' ? '0,180,216' : '245,124,0'},0.3)`, fontSize: 9, letterSpacing: 3, color: accentColor, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 14 }}>
            {badge}
          </div>
          <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--white)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>{title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
            {details.map(([label, value]) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 9 }}>
                <span style={{ fontSize: 10, letterSpacing: 1, color: accentColor, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.85 }}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

function AboutCert({ onNavigate }) {
  const { lang, t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('cert.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('cert.title')}</h1>
        <p>{t('cert.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div className="eyebrow">{t('cert.eyebrow')}</div>
        <h2 className="stitle"><em>{t('cert.title.t1')}</em><span>{t('cert.title.t2')}</span></h2>
        <p className="sdesc">{t('cert.desc')}</p>

        {/* 1행: 사업자등록증 + R&D 인증서 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: 'var(--border)', marginBottom: 2 }}>
          <CertCard
            accentColor="var(--cyan)"
            badge={t('cert.reg.badge')}
            title={t('cert.reg.title')}
            imgKo={certBizKo} imgEn={certBizEn} lang={lang}
            details={[
              [lang === 'ko' ? '등록번호' : 'Reg. No.', '620-81-51336'],
              [lang === 'ko' ? '법인명' : 'Company', lang === 'ko' ? '오에스알앤디㈜' : 'OSRnD Co., Ltd'],
              [lang === 'ko' ? '대표자' : 'CEO', lang === 'ko' ? '권오수' : 'Kwon Ohsoo'],
              [lang === 'ko' ? '개업일' : 'Founded', lang === 'ko' ? '2014년 01월 01일' : 'January 1, 2014'],
            ]}
            desc={lang === 'ko'
              ? '국세청에서 발급한 법인사업자 등록증. 사업 종류: 제조업(산업처리공정 제어장비), 도소매 및 전자상거래업.'
              : 'Corporate business registration issued by the National Tax Service. Business types: manufacturing (industrial process control equipment), wholesale/retail and e-commerce.'}
          />
          <CertCard
            accentColor="var(--cyan)"
            badge={t('cert.rnd.badge')}
            title={t('cert.rnd.title')}
            imgKo={certRndKo} imgEn={certRndEn} lang={lang}
            details={[
              [lang === 'ko' ? '기관명' : 'Company', lang === 'ko' ? '오에스알앤디㈜' : 'OSRnD Co., Ltd'],
              [lang === 'ko' ? '인증기관' : 'Issuer', lang === 'ko' ? '과학기술정보통신부' : 'Ministry of Science and ICT'],
              [lang === 'ko' ? '인증분야' : 'Field', lang === 'ko' ? '공장자동화 및 연구개발' : 'Factory Automation & R&D'],
            ]}
            desc={lang === 'ko'
              ? '과학기술정보통신부에서 인정한 연구개발전담부서 보유 기업. 지속적인 기술혁신과 R&D 역량을 공식 인증받았습니다.'
              : 'Officially recognized by the Ministry of Science and ICT as a company with a dedicated R&D department, certifying our commitment to continuous technological innovation.'}
          />
        </div>

        {/* 2행: ISO 인증 */}
        <div style={{ marginBottom: 2 }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderBottom: 'none', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 2, height: 22, background: 'var(--cyan)', flexShrink: 0 }}></div>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('cert.iso.header')}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>{t('cert.iso.sub')}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--border)' }}>
            {[
              { code: 'ISO 9001', color: 'var(--cyan)', labelKo: '품질경영시스템', labelEn: 'Quality Management System', imgKo: certIso9001Ko, imgEn: certIso9001En, descKo: '고객 만족도 향상과 지속적인 품질 개선을 위한 국제 표준 인증.', descEn: 'International standard certification for improving customer satisfaction and continuous quality improvement.' },
              { code: 'ISO 14001', color: '#66bb6a', accentColor: '#43a047', labelKo: '환경경영시스템', labelEn: 'Environmental Management System', imgKo: certIso14001Ko, imgEn: certIso14001En, descKo: '환경 영향을 최소화하고 지속 가능한 경영을 위한 국제 표준 인증.', descEn: 'International standard certification for minimizing environmental impact and sustainable management.' },
              { code: 'ISO 45001', color: 'var(--orange)', labelKo: '안전보건경영시스템', labelEn: 'OH&S Management System', imgKo: certIso45001Ko, imgEn: certIso45001En, descKo: '근로자의 안전과 건강을 보장하기 위한 국제 표준 인증.', descEn: 'International standard certification for ensuring the safety and health of workers.' },
            ].map(({ code, color, accentColor, labelKo, labelEn, imgKo, imgEn, descKo, descEn }) => (
              <div key={code} style={{ background: 'var(--card)', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accentColor || color},transparent)` }}></div>
                <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', marginBottom: 20 }}>
                  <img src={lang === 'ko' ? imgKo : imgEn} alt={code} style={{ width: '100%', display: 'block' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, fontWeight: 700, color, marginBottom: 8 }}>{code}</div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 12 }}>
                    {lang === 'ko' ? labelKo : labelEn}
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                    {lang === 'ko' ? descKo : descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3행: 특허 */}
        <div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderBottom: 'none', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 2, height: 22, background: 'var(--orange)', flexShrink: 0 }}></div>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('cert.patent.header')}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>{t('cert.patent.sub')}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--border)' }}>
            {/* 특허 1 */}
            <div style={{ background: 'var(--card)', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right,var(--orange),transparent)' }}></div>
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', marginBottom: 20 }}>
                <img src={lang === 'ko' ? certPatent1Ko : certPatent1En} alt="특허증 1" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', fontSize: 9, letterSpacing: 3, color: 'var(--orange)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 10 }}>
                  {lang === 'ko' ? '특허증 #1' : 'Patent #1'}
                </div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 8, letterSpacing: 1 }}>
                  {lang === 'ko' ? '전등제어 시스템 및 이를 위한 전등시위치연동 제어기' : 'Lighting Switch Interlocking Controller'}
                </h4>
                <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                  {lang === 'ko' ? '특허번호: 제 10-2232124 호' : 'Patent No.: 10-2232124'}
                </p>
              </div>
            </div>

            {/* 특허 2 */}
            <div style={{ background: 'var(--card)', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right,var(--orange),transparent)' }}></div>
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', marginBottom: 20, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <div style={{ width: 44, height: 56, border: '2px solid rgba(245,124,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📜</div>
                <p style={{ fontSize: 10, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", letterSpacing: 2, textAlign: 'center', textTransform: 'uppercase' }}>{t('cert.coming')}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', fontSize: 9, letterSpacing: 3, color: 'var(--orange)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 10 }}>
                  {lang === 'ko' ? '특허증 #2' : 'Patent #2'}
                </div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 8, letterSpacing: 1 }}>{t('cert.patent.tbd')}</h4>
                <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>{t('cert.patent.num.tbd')}</p>
              </div>
            </div>

            {/* 추가 예정 */}
            <div style={{ background: 'rgba(22,32,48,0.5)', padding: '32px 28px', border: '1px dashed rgba(245,124,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, minHeight: 340 }}>
              <div style={{ width: 44, height: 56, border: '1px dashed rgba(245,124,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, opacity: 0.5 }}>＋</div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", letterSpacing: 2, textAlign: 'center', textTransform: 'uppercase' }}>{t('cert.patent.add')}</p>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default AboutCert
