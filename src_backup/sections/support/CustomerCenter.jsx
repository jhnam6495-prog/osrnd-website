// 고객센터 메인 페이지
import { useLanguage, t } from '../../contexts/LanguageContext'

function CustomerCenter({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <span>{t(lang, '고객센터', 'Support')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '고객센터', 'Customer Support')}</h1>
        <p>{t(lang, '공지사항 확인 및 상담 문의를 이용하실 수 있습니다.', 'Check announcements and submit your inquiries here.')}</p>
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
              {t(lang, '공지사항', 'Notice')}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>
              {t(lang, '회사 공지 및 새소식을 확인하세요.', 'Check company announcements and news.')}
            </p>
            <div style={{ display: 'inline-block', padding: '9px 24px', border: '1px solid var(--cyan)', color: 'var(--cyan)', fontSize: 11, letterSpacing: 2, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
              {t(lang, '공지 보기 →', 'View Notices →')}
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
              {t(lang, '상담문의', 'Inquiry')}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>
              {t(lang, '프로젝트 및 제품 상담 문의를 남겨주세요.', 'Submit your project and product inquiries.')}
            </p>
            <div style={{ display: 'inline-block', padding: '9px 24px', border: '1px solid var(--orange)', color: 'var(--orange)', fontSize: 11, letterSpacing: 2, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
              {t(lang, '문의하기 →', 'Contact Us →')}
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default CustomerCenter
