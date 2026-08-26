// 네비게이션 컴포넌트
import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

function Nav({ onNavigate }) {
  const { lang, setLang, t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)

  const handleNavigate = (page) => {
    onNavigate(page)
    setMenuOpen(false)
    setOpenSub(null)
  }

  const toggleSub = (key) => {
    setOpenSub(openSub === key ? null : key)
  }

  const menus = [
    {
      key: 'about', label: t('nav.about'),
      items: [
        { label: t('nav.about.overview'), page: 'about-intro' },
        { label: t('nav.about.philosophy'), page: 'about-philosophy' },
        { label: t('nav.about.history'), page: 'about-history' },
        { label: t('nav.about.org'), page: 'about-org' },
        { label: t('nav.about.cert'), page: 'about-cert' },
        { label: t('nav.about.location'), page: 'about-location' },
        { label: t('nav.about.usa'), page: 'about-usa' },
      ]
    },
    {
      key: 'biz', label: t('nav.biz'),
      items: [
        { label: t('nav.biz.factory'), page: 'biz-factory' },
        { label: t('nav.biz.rnd'), page: 'biz-rnd' },
      ]
    },
    {
      key: 'prod', label: t('nav.prod'),
      items: [
        { label: t('nav.prod.beone'), page: 'prod-beone' },
        { label: t('nav.prod.psd'), page: 'prod-psd' },
        { label: t('nav.prod.panel'), page: 'prod-panel' },
        { label: t('nav.prod.embedded'), page: 'prod-embedded' },
      ]
    },
    {
      key: 'projects', label: t('nav.projects'),
      items: [
        { label: t('nav.projects.records'), page: 'record-list' },
        { label: t('nav.projects.clients'), page: 'clients' },
      ]
    },
    {
      key: 'support', label: t('nav.support'),
      items: [
        { label: t('nav.support.notice'), page: 'notice' },
        { label: t('nav.support.inquiry'), page: 'inquiry' },
      ]
    },
  ]

  return (
    <>
      <nav id="mainNav">
        <div className="nav-wrap">
          {/* 로고 */}
          <div className="logo" onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/osrnd-logo.png" alt="OSRnD 오에스알앤디㈜"
              style={{ height: '50px', mixBlendMode: 'lighten' }} />
          </div>

          {/* PC 메뉴 */}
          <ul className="nav-menu">
            {menus.map(({ key, label, items }) => (
              <li key={key}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate(items[0].page) }}>
                  <span>{label}</span> <span className="arr">▾</span>
                </a>
                <div className="dropdown">
                  {items.map(({ label: l, page }) => (
                    <a key={page} href="#" onClick={(e) => { e.preventDefault(); handleNavigate(page) }}>{l}</a>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* 우측 영역 */}
          <div className="nav-right">
            <span className="nav-phone">{lang === 'ko' ? '052-296-3734' : '+82-52-296-3734'}</span>
            <div className="lang-switch">
              <button type="button" className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
                onClick={() => setLang('ko')}>KO</button>
              <div className="lang-sep"></div>
              <button type="button" className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}>EN</button>
            </div>
            <a className="nav-btn" href="#" onClick={(e) => { e.preventDefault(); handleNavigate('inquiry') }}>
              {t('nav.contact')}
            </a>
            <a className="nav-btn" href="#" onClick={(e) => { e.preventDefault(); handleNavigate('admin') }}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '8px 14px' }}>
              {t('footer.admin')}
            </a>
            {/* 햄버거 버튼 */}
            <button className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 드로어 메뉴 */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {menus.map(({ key, label, items }) => (
          <div className="mobile-menu-item" key={key}>
            <div className={`mobile-menu-title${openSub === key ? ' active' : ''}`}
              onClick={() => toggleSub(key)}>
              <span>{label}</span>
              <span className="arr">▾</span>
            </div>
            <div className={`mobile-submenu${openSub === key ? ' open' : ''}`}>
              {items.map(({ label: l, page }) => (
                <a key={page} onClick={() => handleNavigate(page)}>{l}</a>
              ))}
            </div>
          </div>
        ))}
        <div className="mobile-phone">
          {lang === 'ko' ? '052-296-3734' : '+82-52-296-3734'}
        </div>
        <div className="mobile-btns">
          <div className="lang-switch" style={{ width: 'fit-content' }}>
            <button type="button" className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
              onClick={() => setLang('ko')}>KO</button>
            <div className="lang-sep"></div>
            <button type="button" className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="nav-btn" href="#"
            onClick={(e) => { e.preventDefault(); handleNavigate('inquiry') }}
            style={{ textAlign: 'center', display: 'block' }}>
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </>
  )
}

export default Nav