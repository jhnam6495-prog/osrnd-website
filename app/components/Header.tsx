// 헤더/네비게이션 — 데스크톱 드롭다운 + 모바일 슬라이드 메뉴.
// 메뉴 구조는 app/nav-config.ts 단일 소스만 참조하므로, 메뉴 추가/변경은 그 파일만 고치면 된다.
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../lib/i18n/LangProvider'
import { nav } from '../nav-config'

export default function Header() {
  const { lang, setLang, t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  const closeAll = () => {
    setMenuOpen(false)
    setOpenSub(null)
  }

  const toggleSub = (key: string) => {
    setOpenSub((prev) => (prev === key ? null : key))
  }

  const phone = lang === 'ko' ? '052-296-3734' : '+82-52-296-3734'

  return (
    <>
      <nav id="mainNav">
        <div className="nav-wrap">
          <Link href="/" className="logo" onClick={closeAll}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/osrnd-logo.png" alt="OSRnD 오에스알앤디㈜" style={{ height: 50, mixBlendMode: 'lighten' }} />
          </Link>

          <ul className="nav-menu">
            {nav.map((menu) => (
              <li key={menu.key}>
                <Link href={menu.href}>
                  <span>{t(menu.labelKey)}</span> <span className="arr">▾</span>
                </Link>
                <div className="dropdown">
                  {menu.sub.map((item) => (
                    <Link key={item.id} href={item.href}>
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <span className="nav-phone">{phone}</span>
            <div className="lang-switch">
              <button
                type="button"
                className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
                onClick={() => setLang('ko')}
              >
                KO
              </button>
              <div className="lang-sep" />
              <button
                type="button"
                className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            <Link className="nav-btn" href="/inquiry">
              {t('nav.contact')}
            </Link>
            <Link
              className="nav-btn"
              href="/admin"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                padding: '8px 14px',
              }}
            >
              {t('footer.admin')}
            </Link>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="메뉴"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {nav.map((menu) => (
          <div className="mobile-menu-item" key={menu.key}>
            <div
              className={`mobile-menu-title${openSub === menu.key ? ' active' : ''}`}
              onClick={() => toggleSub(menu.key)}
            >
              <span>{t(menu.labelKey)}</span>
              <span className="arr">▾</span>
            </div>
            <div className={`mobile-submenu${openSub === menu.key ? ' open' : ''}`}>
              {menu.sub.map((item) => (
                <Link key={item.id} href={item.href} onClick={closeAll}>
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="mobile-phone">{phone}</div>
        <div className="mobile-btns">
          <div className="lang-switch" style={{ width: 'fit-content' }}>
            <button
              type="button"
              className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
              onClick={() => setLang('ko')}
            >
              KO
            </button>
            <div className="lang-sep" />
            <button
              type="button"
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <Link className="nav-btn" href="/inquiry" style={{ textAlign: 'center', display: 'block' }} onClick={closeAll}>
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </>
  )
}
