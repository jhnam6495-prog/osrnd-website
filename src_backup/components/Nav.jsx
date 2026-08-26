// 네비게이션 컴포넌트
import { useLanguage, t } from '../contexts/LanguageContext'

function Nav({ onNavigate }) {
  const { lang, setLang } = useLanguage()

  return (
    <nav id="mainNav">
      <div className="nav-wrap">
        {/* 로고 */}
        <div className="logo" onClick={() => onNavigate('home')}>
          <div className="logo-icon">OS</div>
          <div className="logo-text">
            <span className="logo-main">OSRnD</span>
            <span className="logo-sub">One-Stop R&D</span>
          </div>
        </div>

        {/* 메뉴 */}
        <ul className="nav-menu">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-intro') }}>
              <span>{t(lang, '회사소개', 'About Us')}</span> <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-intro') }}>{t(lang, '회사 개요', 'Company Overview')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-philosophy') }}>{t(lang, '추구 이념', 'Philosophy')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-history') }}>{t(lang, '회사 연혁', 'History')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-org') }}>{t(lang, '조직도', 'Organization')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-cert') }}>{t(lang, '인증현황', 'Certifications')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about-location') }}>{t(lang, '오시는 길', 'Location')}</a>
            </div>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('biz-factory') }}>
              <span>{t(lang, '사업분야', 'Business')}</span> <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('biz-factory') }}>{t(lang, '공장자동화', 'Factory Automation')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('biz-rnd') }}>{t(lang, '연구개발 (R&D)', 'R&D')}</a>
            </div>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('prod-beone') }}>
              <span>{t(lang, '제품소개', 'Products')}</span> <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('prod-beone') }}>{t(lang, '비원 (Be-One)', 'Be-One')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('prod-psd') }}>{t(lang, '생산현황판 (PSD5-24)', 'Production Display')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('prod-panel') }}>{t(lang, '제어반 / 동력반', 'Control Panels')}</a>
            </div>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('record-list') }}>
              <span>{t(lang, '사업실적', 'Projects')}</span> <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('record-list') }}>{t(lang, '주요 사업실적', 'Project Records')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('clients') }}>{t(lang, '고객사 / 협력사', 'Clients & Partners')}</a>
            </div>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('notice') }}>
              <span>{t(lang, '고객센터', 'Support')}</span> <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('notice') }}>{t(lang, '공지사항', 'Notice')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('inquiry') }}>{t(lang, '상담문의', 'Inquiry')}</a>
            </div>
          </li>
        </ul>

        {/* 우측 영역 */}
        <div className="nav-right">
          <span className="nav-phone">052-296-3734</span>
          <div className="lang-switch">
            <button
              type="button"
              className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
              onClick={() => setLang('ko')}
            >KO</button>
            <div className="lang-sep"></div>
            <button
              type="button"
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
          </div>
          <a className="nav-btn" href="#" onClick={(e) => { e.preventDefault(); onNavigate('inquiry') }}>
            {t(lang, '상담문의', 'Contact Us')}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
