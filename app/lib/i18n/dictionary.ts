// Server Component용 번역 조회 — 쿠키(osrnd_lang)로 언어를 판별해 t(key)를 반환한다.
// 클라이언트 쪽 동일 로직은 LangProvider.tsx 참고 (React Context를 쓸 수 없는 서버 컴포넌트를 위한 대응 축).
import { cookies } from 'next/headers'
import ko from './ko.json'
import en from './en.json'

export type Lang = 'ko' | 'en'

type Dict = Record<string, string>

const DICTS: Record<Lang, Dict> = { ko, en }

export const LANG_COOKIE = 'osrnd_lang'

export async function getLang(): Promise<Lang> {
  const store = await cookies()
  return store.get(LANG_COOKIE)?.value === 'en' ? 'en' : 'ko'
}

export function makeT(lang: Lang) {
  const dict = DICTS[lang]
  return (key: string, koFallback?: string, enFallback?: string): string => {
    const val = dict[key]
    if (val !== undefined) return val
    if (koFallback !== undefined) return lang === 'ko' ? koFallback : (enFallback ?? koFallback)
    return key
  }
}

export async function getDictionary() {
  const lang = await getLang()
  return { lang, t: makeT(lang) }
}
