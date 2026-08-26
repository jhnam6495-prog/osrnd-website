// 회사 개요 페이지
import { useTranslation } from '../../hooks/useTranslation'

function AboutIntro({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('about.overview.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('about.overview.title')}</h1>
        <p>{t('about.overview.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">About OSRnD</div>
            <h2 className="stitle">
              <span>{t('about.overview.eyebrow1')}</span>
              <em>{t('about.overview.eyebrow2')}</em>
            </h2>
            <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 24, margin: '28px 0' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 2, fontWeight: 500 }}
                dangerouslySetInnerHTML={{ __html: t('about.overview.quote') }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 2, marginBottom: 28 }}>
              {t('about.overview.desc')}
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <button className="btn-p" onClick={() => onNavigate('biz-factory')}>{t('common.cta.biz')}</button>
              <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t('common.cta.contact')}</button>
            </div>
          </div>

          {/* 회사 프로필 테이블 */}
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>
                {t('about.profile.label')}
              </p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {[
                [t('about.profile.company'), t('about.profile.company.val')],
                [t('about.profile.ceo'), t('about.profile.ceo.val')],
                [t('about.profile.founded'), t('about.profile.founded.val')],
                [t('about.profile.reg'), '620-81-51336'],
                [t('about.profile.address'), t('about.profile.address.val')],
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
          <div className="eyebrow">{t('about.values.eyebrow')}</div>
          <h2 className="stitle">{t('about.values.title1')}<em>{t('about.values.title2')}</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginTop: 30 }}>
          {[
            { en: 'After You', name: t('about.values.v1.name'), desc: t('about.values.v1.desc'), color: 'var(--cyan)' },
            { en: 'Positive Thinking', name: t('about.values.v2.name'), desc: t('about.values.v2.desc'), color: 'var(--orange)' },
            { en: 'Passion', name: t('about.values.v3.name'), desc: t('about.values.v3.desc'), color: 'var(--cyan)' },
          ].map(({ en, name, desc, color }) => (
            <div key={en} style={{ background: 'var(--card)', padding: '40px 32px', borderTop: `2px solid ${color}` }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, color, letterSpacing: 3, marginBottom: 14 }}>{en}</div>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, color: 'var(--white)', marginBottom: 12, textTransform: 'uppercase' }}>
                {name}
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
