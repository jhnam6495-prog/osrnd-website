// 네비게이션 단일 소스 — 헤더 드롭다운/모바일 메뉴, 향후 페이지별 SectionTabs 설정이 모두 이 파일만 참조한다.
// label은 i18n 키만 저장하고, 실제 문자열은 호출부에서 t(labelKey)로 해석한다.

export type NavSubItem = {
  id: string
  labelKey: string
  href: string
}

export type NavItem = {
  key: string
  labelKey: string
  href: string
  sub: NavSubItem[]
}

export const nav: NavItem[] = [
  {
    key: 'about',
    labelKey: 'nav.about',
    href: '/about-intro',
    sub: [
      { id: 'about-intro', labelKey: 'nav.about.overview', href: '/about-intro' },
      { id: 'about-philosophy', labelKey: 'nav.about.philosophy', href: '/about-philosophy' },
      { id: 'about-history', labelKey: 'nav.about.history', href: '/about-history' },
      { id: 'about-org', labelKey: 'nav.about.org', href: '/about-org' },
      { id: 'about-cert', labelKey: 'nav.about.cert', href: '/about-cert' },
      { id: 'about-location', labelKey: 'nav.about.location', href: '/about-location' },
      { id: 'about-usa', labelKey: 'nav.about.usa', href: '/about-usa' },
    ],
  },
  {
    key: 'biz',
    labelKey: 'nav.biz',
    href: '/biz-factory',
    sub: [
      { id: 'biz-factory', labelKey: 'nav.biz.factory', href: '/biz-factory' },
      { id: 'biz-rnd', labelKey: 'nav.biz.rnd', href: '/biz-rnd' },
    ],
  },
  {
    key: 'prod',
    labelKey: 'nav.prod',
    href: '/prod-beone',
    sub: [
      { id: 'prod-beone', labelKey: 'nav.prod.beone', href: '/prod-beone' },
      { id: 'prod-psd', labelKey: 'nav.prod.psd', href: '/prod-psd' },
      { id: 'prod-panel', labelKey: 'nav.prod.panel', href: '/prod-panel' },
      { id: 'prod-embedded', labelKey: 'nav.prod.embedded', href: '/prod-embedded' },
    ],
  },
  {
    key: 'projects',
    labelKey: 'nav.projects',
    href: '/record-list',
    sub: [
      { id: 'record-list', labelKey: 'nav.projects.records', href: '/record-list' },
      { id: 'clients', labelKey: 'nav.projects.clients', href: '/clients' },
    ],
  },
  {
    key: 'support',
    labelKey: 'nav.support',
    href: '/notice',
    sub: [
      { id: 'notice', labelKey: 'nav.support.notice', href: '/notice' },
      { id: 'inquiry', labelKey: 'nav.support.inquiry', href: '/inquiry' },
    ],
  },
]
