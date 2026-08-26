import { createContext, useContext, useState, useCallback } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('language') || 'ko'
    document.documentElement.setAttribute('lang', saved === 'ko' ? 'ko' : 'en')
    return saved
  })

  const setLang = useCallback((l) => {
    localStorage.setItem('language', l)
    setLangState(l)
    document.documentElement.setAttribute('lang', l === 'ko' ? 'ko' : 'en')
    document.title = l === 'ko'
      ? 'OSRnD | 오에스알앤디㈜ — 공장자동화 & R&D 전문기업'
      : 'OSRnD Co., Ltd — Factory Automation & One-Stop R&D'
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export function t(lang, ko, en) {
  return lang === 'ko' ? ko : en
}
