/**
 * 언어 컨텍스트 — 완전 재구현
 *
 * - localStorage 기반 언어 설정 유지 (ko / en)
 * - useLanguage() 훅: { lang, setLang, t }
 *   · t(key)            — 번역 파일 기반 키 조회 (신규 방식)
 *   · t('key', ko, en)  — 인라인 폴백: key가 없으면 ko/en 직접 반환
 * - export function t(lang, ko, en) — 기존 컴포넌트 하위 호환용 유틸리티
 */
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import koTranslations from '../translations/ko'
import enTranslations from '../translations/en'

// ── Context 생성 (모듈 최상위 — HMR 재실행 방지) ──────────────────────────────
const LanguageContext = createContext(null)

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
  const translate = useMemo(() => {
    const dict = lang === 'ko' ? koTranslations : enTranslations
    /**
     * t(key)         → 번역 파일에서 키 조회
     * t(key, ko, en) → 키가 번역 파일에 없으면 inline 값 반환 (하위 호환)
     */
    return (key, koFallback, enFallback) => {
      const fromDict = dict[key]
      if (fromDict !== undefined) return fromDict
      // 인라인 폴백 (기존 t(lang, ko, en) 패턴과 동일한 로직)
      if (koFallback !== undefined) return lang === 'ko' ? koFallback : (enFallback ?? koFallback)
      return key // 마지막 폴백: 키 자체 반환
    }
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: translate }),
    [lang, setLang, translate]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>')
  return ctx
}

// ── 기존 컴포넌트 하위 호환용 인라인 유틸리티 ─────────────────────────────────
// 사용법: import { t } from '../../contexts/LanguageContext'
//         const { lang } = useLanguage()
//         t(lang, '한국어', 'English')
export function t(lang, ko, en) {
  return lang === 'ko' ? ko : (en ?? ko)
}
