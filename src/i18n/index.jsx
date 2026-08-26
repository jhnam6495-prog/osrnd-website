/**
 * i18n 시스템 — JSON 기반 완전 재구현
 *
 * - localStorage 기반 언어 설정 유지 (ko / en)
 * - useTranslation() 훅: { lang, setLang, t }
 *   · t('key')            — JSON 번역 파일 기반 키 조회
 *   · t('key', ko, en)    — 키가 없을 때 인라인 폴백
 * - 하위 호환: export function t(lang, ko, en)
 */
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import ko from './ko.json'
import en from './en.json'

// ── Context 생성 (모듈 최상위 — HMR 재실행 방지) ──────────────────────────────
const I18nContext = createContext(null)

const DICTS = { ko, en }

// ── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // 구 키('language') → 신 키('osrnd_lang') 마이그레이션
    const legacy = localStorage.getItem('language')
    if (legacy && !localStorage.getItem('osrnd_lang')) {
      localStorage.setItem('osrnd_lang', legacy)
    }
    const saved = localStorage.getItem('osrnd_lang') || 'ko'
    document.documentElement.setAttribute('lang', saved)
    return saved
  })

  const setLang = useCallback((l) => {
    if (l !== 'ko' && l !== 'en') return
    localStorage.setItem('osrnd_lang', l)
    document.documentElement.setAttribute('lang', l)
    document.title = l === 'ko'
      ? 'OSRnD | 오에스알앤디㈜ — 공장자동화 & R&D 전문기업'
      : 'OSRnD Co., Ltd — Factory Automation & One-Stop R&D'
    setLangState(l)
  }, [])

  // 번역 함수 — 키 기반 + 인라인 폴백 모두 지원
  const t = useMemo(() => {
    const dict = DICTS[lang] ?? ko
    /**
     * t('key')         → JSON에서 키 조회
     * t('key', ko, en) → 키가 없으면 inline 값 반환 (하위 호환)
     */
    return (key, koFallback, enFallback) => {
      const val = dict[key]
      if (val !== undefined) return val
      if (koFallback !== undefined) return lang === 'ko' ? koFallback : (enFallback ?? koFallback)
      return key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

// ── 훅 ────────────────────────────────────────────────────────────────────────
export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within <LanguageProvider>')
  return ctx
}

// ── 하위 호환: useLanguage = useTranslation ───────────────────────────────────
export { useTranslation as useLanguage }

// ── 하위 호환: 기존 t(lang, ko, en) 패턴 유틸리티 ───────────────────────────
export function t(lang, ko, en) {
  return lang === 'ko' ? ko : (en ?? ko)
}
