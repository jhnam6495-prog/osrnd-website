// 서브페이지 공통 상단 영역 — 브레드크럼 + 페이지 헤더. 기존 .bc/.ph 블록의 1:1 이식.
// 문자열은 호출부(각 page.tsx)가 getDictionary()로 미리 해석해 props로 넘긴다.
import Link from 'next/link'

export default function PageHero({
  homeLabel,
  breadcrumb,
  title,
  description,
}: {
  homeLabel: string
  breadcrumb: string
  title: string
  description?: string
}) {
  return (
    <>
      <div className="bc">
        <div className="bc-in">
          <Link href="/">{homeLabel}</Link> ›<span>{breadcrumb}</span>
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
