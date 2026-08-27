// 홈 진입 시 "노출" 처리된 공지 전부를 캐러셀로 보여주는 팝업 (framework-spec 8장).
// 과거 1건 제한이 있었던 원본 프로젝트와 달리, 여러 건이 동시에 featured여도 prev/next + N/M 카운터로
// 전부 순회할 수 있게 하고, 닫힌 공지는 항목별로 localStorage에 개별 기록한다.
// 5장 회귀 규칙: 항목마다 본문 길이가 달라도 상단 위치가 흔들리지 않도록 항상 상단 정렬(padding-top 고정)로 배치.
'use client'

import { useEffect, useState } from 'react'
import type { Notice } from '../lib/notices'
import type { Lang } from '../lib/i18n/dictionary'

const DISMISS_PREFIX = 'notice-popup-dismissed-'

function isDismissedToday(id: string): boolean {
  try {
    const value = localStorage.getItem(DISMISS_PREFIX + id)
    if (!value) return false
    return value === 'forever' || value === new Date().toDateString()
  } catch {
    return false
  }
}

function markDismissed(id: string, forever: boolean) {
  try {
    localStorage.setItem(DISMISS_PREFIX + id, forever ? 'forever' : new Date().toDateString())
  } catch {
    // localStorage 접근 불가(프라이빗 브라우징 등) — 이번 방문 동안만 닫힘 처리되고 새로고침 시 다시 노출됨
  }
}

export default function HomeNoticePopup({ notices, lang }: { notices: Notice[]; lang: Lang }) {
  const [visible, setVisible] = useState<Notice[]>([])
  const [index, setIndex] = useState(0)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // localStorage는 서버가 미리 알 수 없는 브라우저 전용 값이라 마운트 후 필터링이 불가피하다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(notices.filter((n) => !isDismissedToday(n.id)))
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted || visible.length === 0) return null

  const current = visible[index]
  const title = lang === 'ko' ? current.title_ko || current.title_en : current.title_en || current.title_ko
  const content = lang === 'ko' ? current.content_ko || current.content_en : current.content_en || current.content_ko

  const closeCurrent = () => {
    markDismissed(current.id, dontShowToday)
    const next = visible.filter((n) => n.id !== current.id)
    setVisible(next)
    setIndex((i) => Math.min(i, Math.max(next.length - 1, 0)))
    setDontShowToday(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(4,6,10,0.72)',
        zIndex: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', maxWidth: 480, width: '100%' }}>
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <div>
            {visible.length > 1 && (
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: 'var(--font-label)', marginBottom: 6 }}>
                {index + 1} / {visible.length}
              </p>
            )}
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--white)', letterSpacing: 1 }}>{title}</h3>
          </div>
          <button
            type="button"
            onClick={closeCurrent}
            aria-label={lang === 'ko' ? '닫기' : 'Close'}
            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 18, cursor: 'pointer', lineHeight: 1, flexShrink: 0, paddingTop: 2 }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 22, maxHeight: 320, overflowY: 'auto' }}>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              style={{ accentColor: 'var(--cyan)' }}
            />
            {lang === 'ko' ? '오늘 하루 보지 않기' : "Don't show again today"}
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + visible.length) % visible.length)}
                  className="btn-s"
                  style={{ padding: '6px 14px', fontSize: 11 }}
                  aria-label={lang === 'ko' ? '이전 공지' : 'Previous notice'}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % visible.length)}
                  className="btn-s"
                  style={{ padding: '6px 14px', fontSize: 11 }}
                  aria-label={lang === 'ko' ? '다음 공지' : 'Next notice'}
                >
                  ›
                </button>
              </>
            )}
            <button type="button" onClick={closeCurrent} className="btn-p" style={{ padding: '6px 16px', fontSize: 11 }}>
              {lang === 'ko' ? '닫기' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
