// 클라이언트 측 i18n — 기존 src/i18n/index.jsx의 t(key) / t(key, ko, en) 이중 시그니처를 그대로 이식.
// 서버 렌더 쪽(dictionary.ts)과 언어를 맞추기 위해 localStorage뿐 아니라 osrnd_lang 쿠키도 함께 쓰고,
// 전환 시 router.refresh()로 Server Component가 렌더한 CMS 콘텐츠(공지/연혁 등)도 즉시 갱신한다.
'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import ko from './ko.json'
import en from './en.json'

export type Lang = 'ko' | 'en'

type Dict = Record<string, string>

const DICTS: Record<Lang, Dict> = { ko, en }

const COOKIE_NAME = 'osrnd_lang'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1년
const LEGACY_LOCALSTORAGE_KEY = 'language'

type I18nValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, koFallback?: string, enFallback?: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function writeLangCookie(lang: Lang) {
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}`
}

function applyDocumentLang(lang: Lang) {
  document.documentElement.setAttribute('lang', lang)
  document.title =
    lang === 'ko'
      ? 'OSRnD | 오에스알앤디㈜ — 공장자동화 & R&D 전문기업'
      : 'OSRnD Co., Ltd — Factory Automation & One-Stop R&D'
}

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const router = useRouter()
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback(
    (l: Lang) => {
      if (l !== 'ko' && l !== 'en') return
      localStorage.setItem(COOKIE_NAME, l)
      writeLangCookie(l)
      applyDocumentLang(l)
      setLangState(l)
      router.refresh()
    },
    [router]
  )

  // 최초 마운트 시 방문자의 localStorage(구 버전 포함)와 서버 렌더 기준(쿠키)이 다르면 localStorage를 우선한다.
  useEffect(() => {
    const legacy = localStorage.getItem(LEGACY_LOCALSTORAGE_KEY)
    if (legacy && !localStorage.getItem(COOKIE_NAME)) {
      localStorage.setItem(COOKIE_NAME, legacy)
    }
    const saved = localStorage.getItem(COOKIE_NAME)
    if ((saved === 'ko' || saved === 'en') && saved !== initialLang) {
      writeLangCookie(saved)
      applyDocumentLang(saved)
      setLangState(saved)
      router.refresh()
    } else {
      writeLangCookie(initialLang)
    }
    // 마운트 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = useMemo(() => {
    const dict = DICTS[lang]
    return (key: string, koFallback?: string, enFallback?: string) => {
      const val = dict[key]
      if (val !== undefined) return val
      if (koFallback !== undefined) return lang === 'ko' ? koFallback : (enFallback ?? koFallback)
      return key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within <LangProvider>')
  return ctx
}

export { useTranslation as useLanguage }

// 하위 호환: 기존 t(lang, ko, en) 패턴 유틸리티
export function t(lang: Lang, koText: string, enText?: string): string {
  return lang === 'ko' ? koText : (enText ?? koText)
}
