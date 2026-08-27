// 서브페이지 공통 상단 영역 — 브레드크럼 + 페이지 헤더. 기존 .bc/.ph 블록의 1:1 이식.
// 문자열은 호출부(각 page.tsx)가 getDictionary()로 미리 해석해 props로 넘긴다.
// breadcrumbs 마지막 항목은 href 없이 현재 페이지로 취급한다.
import { Fragment } from 'react'
import Link from 'next/link'

export type Crumb = { label: string; href?: string }

export default function PageHero({
  breadcrumbs,
  title,
  description,
}: {
  breadcrumbs: Crumb[]
  title: string
  description?: string
}) {
  return (
    <>
      <div className="bc">
        <div className="bc-in">
          {breadcrumbs.map((crumb, i) => (
            <Fragment key={i}>
              {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              {i < breadcrumbs.length - 1 ? '›' : null}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="ph">
        <div className="ph-in">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
    </>
  )
}
