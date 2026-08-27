// 공지사항 아코디언 목록 — 기존 Notice.jsx의 클릭 토글 + 조회수 1회 증가 로직 이식.
'use client'

import { useState } from 'react'
import { incrementViewsAction } from './actions'
import type { Notice } from '../lib/notices'
import type { Lang } from '../lib/i18n/dictionary'

type Labels = {
  num: string
  title: string
  date: string
  views: string
  badge: string
  empty: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1)
  } catch {
    return '-'
  }
}

export default function NoticeAccordion({ notices, lang, labels }: { notices: Notice[]; lang: Lang; labels: Labels }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())

  if (notices.length === 0) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center', border: '1px solid rgba(0,180,216,0.06)' }}>
        <p style={{ fontSize: 36, marginBottom: 14 }}>📭</p>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>{labels.empty}</p>
      </div>
    )
  }

  const normalNotices = notices.filter((n) => !n.pinned)
  const getTitle = (n: Notice) => (lang === 'ko' ? n.title_ko || n.title_en : n.title_en || n.title_ko)
  const getContent = (n: Notice) => (lang === 'ko' ? n.content_ko || n.content_en : n.content_en || n.content_ko)

  const handleOpen = (notice: Notice) => {
    const opening = openId !== notice.id
    setOpenId(opening ? notice.id : null)
    if (opening && !viewedIds.has(notice.id)) {
      setViewedIds((prev) => new Set(prev).add(notice.id))
      void incrementViewsAction(notice.id)
    }
  }

  return (
    <>
      <div className="board-hdr">
        <span>{labels.num}</span>
        <span>{labels.title}</span>
        <span>{labels.date}</span>
        <span>{labels.views}</span>
      </div>

      {notices.map((notice) => {
        const isPinned = notice.pinned
        const rowNum = isPinned ? null : normalNotices.length - normalNotices.indexOf(notice)
        const isOpen = openId === notice.id
        const displayedViews = notice.views + (viewedIds.has(notice.id) ? 1 : 0)

        return (
          <div key={notice.id}>
            <div
              className="board-row"
              onClick={() => handleOpen(notice)}
              style={{
                background: isOpen ? 'var(--cyan-d)' : isPinned ? 'rgba(0,180,216,0.04)' : 'transparent',
                borderColor: isPinned ? 'rgba(0,180,216,0.15)' : undefined,
              }}
            >
              <span>
                {isPinned ? (
                  <span
                    style={{
                      background: 'var(--cyan)',
                      color: 'var(--bg)',
                      padding: '2px 7px',
                      fontSize: 9,
                      letterSpacing: 1,
                      fontFamily: 'var(--font-label)',
                      fontWeight: 700,
                    }}
                  >
                    {labels.badge}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{rowNum}</span>
                )}
              </span>
              <span style={{ fontSize: 14, color: isOpen ? 'var(--cyan)' : 'rgba(255,255,255,0.88)', fontWeight: isOpen ? 600 : 400 }}>
                {getTitle(notice)}
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{formatDate(notice.createdAt)}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>{displayedViews}</span>
            </div>

            {isOpen && (
              <div
                style={{
                  padding: '28px 28px 28px 80px',
                  background: 'rgba(0,180,216,0.03)',
                  borderBottom: '1px solid rgba(0,180,216,0.1)',
                  borderLeft: '2px solid var(--cyan)',
                }}
              >
                <div
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 2 }}
                  dangerouslySetInnerHTML={{ __html: getContent(notice) }}
                />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
