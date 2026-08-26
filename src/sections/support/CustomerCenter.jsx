// 고객센터 메인 페이지
import { useTranslation } from '../../hooks/useTranslation'

function CustomerCenter({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('support.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('support.title')}</h1>
        <p>{t('support.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)', maxWidth: 860, margin: '0 auto' }}>
          <div
            onClick={() => onNavigate('notice')}
            style={{ background: 'var(--card)', padding: '60px 44px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', borderTop: '2px solid var(--cyan)' }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--steel)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--card)'}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>📋</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t('support.notice.title')}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>
              {t('support.notice.desc')}
            </p>
            <div style={{ display: 'inline-block', padding: '9px 24px', border: '1px solid var(--cyan)', color: 'var(--cyan)', fontSize: 11, letterSpacing: 2, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
              {t('support.notice.cta')}
            </div>
          </div>
          <div
            onClick={() => onNavigate('inquiry')}
            style={{ background: 'var(--card)', padding: '60px 44px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', borderTop: '2px solid var(--orange)' }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--steel)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--card)'}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t('support.inquiry.title')}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>
              {t('support.inquiry.desc')}
            </p>
            <div style={{ display: 'inline-block', padding: '9px 24px', border: '1px solid var(--orange)', color: 'var(--orange)', fontSize: 11, letterSpacing: 2, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
              {t('support.inquiry.cta')}
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default CustomerCenter
