// 스크롤 진입 시 페이드인 — 기존 HomePage.jsx의 IntersectionObserver+.fi 패턴을 재사용 컴포넌트로 분리.
// 페이지 자체는 Server Component로 유지하고, 이 래퍼만 클라이언트 경계로 최소화한다.
'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function FadeIn({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in')),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fi ${className}`} style={style}>
      {children}
    </div>
  )
}
